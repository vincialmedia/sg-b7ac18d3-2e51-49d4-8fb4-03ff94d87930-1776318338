import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer';
import axios from 'axios';
import { sendEmailRequestSchema, EmailRequestBody } from '@/lib/validation';
import { generateAdminEmailHtml, calculateTotalPrice } from '@/lib/email-templates';

// Enhanced error response interface
interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: string[];
}

interface ApiSuccessResponse {
  success: true;
  message: string;
}

type ApiResponse = ApiErrorResponse | ApiSuccessResponse;

// Validate environment variables
function validateEnvironment(): string[] {
  const errors: string[] = [];
  
  if (!process.env.SMTP_HOST) errors.push('SMTP_HOST is required');
  if (!process.env.SMTP_USER) errors.push('SMTP_USER is required');
  if (!process.env.SMTP_PASS) errors.push('SMTP_PASS is required');
  
  return errors;
}

// Create email transporter with error handling
function createEmailTransporter() {
  try {
    return nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } catch (error) {
    console.error('Failed to create email transporter:', error);
    throw new Error('Email service configuration error');
  }
}

// Send contact to HubSpot CRM
async function syncToHubSpot(email: string, services: { [key: string]: number }, calculatedTotal: number, marketingConsent: boolean) {
  if (!process.env.HUBSPOT_API_KEY) {
    console.log('HubSpot integration skipped - API key not configured');
    return;
  }

  try {
    const contactData = {
      properties: {
        email,
        marketing_consent: marketingConsent ? "yes" : "no",
        estimated_total_price: calculatedTotal,
        services_requested: Object.entries(services)
          .filter(([, count]) => count > 0)
          .map(([serviceId]) => serviceId.charAt(0).toUpperCase() + serviceId.slice(1))
          .join(', ')
      }
    };

    await axios.post(
      'https://api.hubapi.com/crm/v3/objects/contacts',
      contactData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`
        },
        timeout: 10000 // 10 second timeout
      }
    );
    
    console.log('Contact successfully synced to HubSpot');
  } catch (error) {
    console.error('HubSpot sync failed:', error instanceof Error ? error.message : 'Unknown error');
    // Don't throw - HubSpot sync failure shouldn't break the main flow
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Method validation
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed - only POST requests are accepted' 
    });
  }

  // Environment validation
  const envErrors = validateEnvironment();
  if (envErrors.length > 0) {
    console.error('Environment validation failed:', envErrors);
    return res.status(500).json({
      success: false,
      message: 'Server configuration error',
      errors: envErrors
    });
  }

  try {
    // Request validation using Zod schema
    const validationResult = sendEmailRequestSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      const validationErrors = validationResult.error.errors.map(err => 
        `${err.path.join('.')}: ${err.message}`
      );
      
      return res.status(400).json({
        success: false,
        message: 'Invalid request data',
        errors: validationErrors
      });
    }

    const { email, services, marketingConsent } = validationResult.data as EmailRequestBody;

    // Calculate total price using shared utility
    const calculatedTotal = calculateTotalPrice(services);

    // Generate admin email HTML using shared template
    const emailHtml = generateAdminEmailHtml(email, services, calculatedTotal, marketingConsent);

    // Create email transporter
    const transporter = createEmailTransporter();

    // Send admin notification email
    const emailData = {
      to: 'vincent@vincialmedia.com',
      from: 'noreply@vincialmedia.com',
      subject: `Neue Service-Anfrage von ${email}`,
      html: emailHtml
    };

    await transporter.sendMail(emailData);
    console.log('Admin notification email sent successfully');

    // Sync to HubSpot (optional, non-blocking)
    await syncToHubSpot(email, services, calculatedTotal, marketingConsent);

    return res.status(200).json({ 
      success: true,
      message: 'Service-Anfrage erfolgreich übermittelt!'
    });

  } catch (error) {
    console.error('Error processing service request:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    return res.status(500).json({ 
      success: false,
      message: `Fehler beim Übermitteln der Anfrage: ${errorMessage}`
    });
  }
}