// Shared validation schemas for Supabase Edge Functions
// Note: Using basic validation since Zod is not available in Deno by default

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: string[];
}

// Email validation
export function validateEmail(email: unknown): ValidationResult<string> {
  if (typeof email !== 'string') {
    return { success: false, errors: ['Email must be a string'] };
  }
  
  if (email.length < 5) {
    return { success: false, errors: ['Email must be at least 5 characters'] };
  }
  
  if (email.length > 254) {
    return { success: false, errors: ['Email must not exceed 254 characters'] };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, errors: ['Please enter a valid email address'] };
  }
  
  return { success: true, data: email };
}

// Services validation
export function validateServices(services: unknown): ValidationResult<{ [key: string]: number }> {
  if (!services || typeof services !== 'object') {
    return { success: false, errors: ['Services must be an object'] };
  }
  
  const servicesObj = services as { [key: string]: unknown };
  const validServices: { [key: string]: number } = {};
  const errors: string[] = [];
  
  for (const [serviceId, count] of Object.entries(servicesObj)) {
    if (typeof count !== 'number') {
      errors.push(`Service ${serviceId} count must be a number`);
      continue;
    }
    
    if (count < 0) {
      errors.push(`Service ${serviceId} count cannot be negative`);
      continue;
    }
    
    validServices[serviceId] = count;
  }
  
  if (errors.length > 0) {
    return { success: false, errors };
  }
  
  // Check that at least one service is selected
  const hasServices = Object.values(validServices).some(count => count > 0);
  if (!hasServices) {
    return { success: false, errors: ['At least one service must be selected'] };
  }
  
  return { success: true, data: validServices };
}

// Package request validation
export interface PackageRequest {
  email: string;
  services: { [key: string]: number };
  points: number;
  marketing_consent: boolean;
  created_at: string;
}

export function validatePackageRequest(data: unknown): ValidationResult<PackageRequest> {
  if (!data || typeof data !== 'object') {
    return { success: false, errors: ['Request data must be an object'] };
  }
  
  const requestData = data as { [key: string]: unknown };
  const errors: string[] = [];
  
  // Validate email
  const emailResult = validateEmail(requestData.email);
  if (!emailResult.success) {
    errors.push(...(emailResult.errors || []));
  }
  
  // Validate services
  const servicesResult = validateServices(requestData.services);
  if (!servicesResult.success) {
    errors.push(...(servicesResult.errors || []));
  }
  
  // Validate points
  if (typeof requestData.points !== 'number' || requestData.points < 0) {
    errors.push('Points must be a non-negative number');
  }
  
  // Validate marketing consent
  if (typeof requestData.marketing_consent !== 'boolean') {
    errors.push('Marketing consent must be a boolean');
  }
  
  // Validate created_at
  if (typeof requestData.created_at !== 'string') {
    errors.push('Created at must be a string');
  }
  
  if (errors.length > 0) {
    return { success: false, errors };
  }
  
  return {
    success: true,
    data: {
      email: emailResult.data!,
      services: servicesResult.data!,
      points: requestData.points as number,
      marketing_consent: requestData.marketing_consent as boolean,
      created_at: requestData.created_at as string
    }
  };
}

// Notification request validation
export interface NotificationRequest {
  to: string;
  subject: string;
  packageRequest: PackageRequest;
}

export function validateNotificationRequest(data: unknown): ValidationResult<NotificationRequest> {
  if (!data || typeof data !== 'object') {
    return { success: false, errors: ['Request data must be an object'] };
  }
  
  const requestData = data as { [key: string]: unknown };
  const errors: string[] = [];
  
  // Validate to email
  const toResult = validateEmail(requestData.to);
  if (!toResult.success) {
    errors.push('Invalid "to" email: ' + (toResult.errors?.join(', ') || ''));
  }
  
  // Validate subject
  if (typeof requestData.subject !== 'string' || requestData.subject.trim().length === 0) {
    errors.push('Subject must be a non-empty string');
  }
  
  // Validate package request
  const packageResult = validatePackageRequest(requestData.packageRequest);
  if (!packageResult.success) {
    errors.push('Invalid package request: ' + (packageResult.errors?.join(', ') || ''));
  }
  
  if (errors.length > 0) {
    return { success: false, errors };
  }
  
  return {
    success: true,
    data: {
      to: toResult.data!,
      subject: requestData.subject as string,
      packageRequest: packageResult.data!
    }
  };
}

// Customer confirmation request validation
export interface CustomerConfirmationRequest {
  packageRequest: PackageRequest;
}

export function validateCustomerConfirmationRequest(data: unknown): ValidationResult<CustomerConfirmationRequest> {
  if (!data || typeof data !== 'object') {
    return { success: false, errors: ['Request data must be an object'] };
  }
  
  const requestData = data as { [key: string]: unknown };
  
  // Validate package request
  const packageResult = validatePackageRequest(requestData.packageRequest);
  if (!packageResult.success) {
    return { success: false, errors: packageResult.errors };
  }
  
  return {
    success: true,
    data: {
      packageRequest: packageResult.data!
    }
  };
}