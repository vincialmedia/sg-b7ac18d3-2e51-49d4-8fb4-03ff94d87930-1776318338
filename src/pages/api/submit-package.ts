import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import { submitPackageRequestSchema, SubmitPackageRequestBody } from '@/lib/validation';
import { servicePoints } from '@/lib/email-templates';

// Enhanced response interfaces
interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: string[];
}

interface ApiSuccessResponse {
  success: true;
  message?: string;
}

type ApiResponse = ApiErrorResponse | ApiSuccessResponse;

// Validate environment variables
function validateEnvironment(): string[] {
  const errors: string[] = [];
  
  if (!process.env.RESEND_API_KEY) {
    errors.push('RESEND_API_KEY is required for email sending');
  }
  
  return errors;
}

// Generate service display names and descriptions
function getServiceDetails(serviceId: string): { name: string; description: string } {
  const serviceMap: { [key: string]: { name: string; description: string } } = {
    website: { 
      name: 'Website Development', 
      description: 'Professional website design and development' 
    },
    social: { 
      name: 'Social Media Management', 
      description: 'Strategic social media content and management' 
    },
    automation: { 
      name: 'Marketing Automation', 
      description: 'Automated marketing workflows and systems' 
    }
  };

  return serviceMap[serviceId] || { 
    name: serviceId.charAt(0).toUpperCase() + serviceId.slice(1), 
    description: 'Professional digital service' 
  };
}

// Create enhanced admin email template
function generateAdminEmailTemplate(data: SubmitPackageRequestBody): string {
  const servicesList = Object.entries(data.services)
    .filter(([, count]) => count > 0)
    .map(([serviceId, count]) => {
      const { name } = getServiceDetails(serviceId);
      const pointsPerService = servicePoints[serviceId] || 0;
      const totalServicePoints = count * pointsPerService;
      
      return `<li style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
        <strong>${name}</strong><br>
        <span style="color: #64748b;">Quantity: ${count} × ${pointsPerService} points = ${totalServicePoints} points</span>
      </li>`;
    })
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #2563eb; margin: 0;">New Package Request</h1>
        <p style="color: #64748b; margin: 10px 0 0 0;">Vincialmedia Customer Inquiry</p>
      </div>
      
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
        <h3 style="color: #1e3a8a; margin: 0 0 15px 0;">Customer Information</h3>
        <p style="margin: 5px 0;"><strong>Email:</strong> ${data.email}</p>
        <p style="margin: 5px 0;"><strong>Total Points:</strong> ${data.points}</p>
        <p style="margin: 5px 0;"><strong>Marketing Consent:</strong> ${data.marketingConsent ? "Yes" : "No"}</p>
      </div>

      <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
        <h3 style="color: #1e40af; margin: 0 0 15px 0;">Selected Services</h3>
        <ul style="list-style: none; padding: 0; margin: 0;">
          ${servicesList}
        </ul>
      </div>

      ${data.points >= 1000 ? `
        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #22c55e;">
          <h3 style="color: #15803d; margin: 0 0 10px 0;">🎁 Premium Customer Alert!</h3>
          <p style="margin: 0; color: #15803d;">This customer qualifies for special bonuses or discounts (1000+ points)</p>
        </div>
      ` : ''}

      <div style="background-color: #fffbeb; padding: 20px; border-radius: 8px; border: 1px solid #fde68a;">
        <h3 style="color: #92400e; margin: 0 0 10px 0;">Action Required</h3>
        <p style="margin: 0; color: #92400e;">
          Contact this customer within 24 hours: 
          <a href="mailto:${data.email}" style="color: #1d4ed8;">${data.email}</a>
        </p>
      </div>
    </div>
  `;
}

// Create customer confirmation email template
function generateCustomerEmailTemplate(data: SubmitPackageRequestBody): string {
  const servicesList = Object.entries(data.services)
    .filter(([, count]) => count > 0)
    .map(([serviceId, count]) => {
      const { name, description } = getServiceDetails(serviceId);
      
      return `<li style="padding: 15px 0; border-bottom: 1px solid #e2e8f0;">
        <strong style="color: #1e40af;">${name}</strong><br>
        <span style="color: #64748b; font-size: 14px;">${description}</span>
        <span style="color: #059669; float: right; font-size: 18px;">✓</span>
      </li>`;
    })
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #2563eb;">Thank You for Your Package Request!</h1>
        <p style="color: #64748b; font-size: 16px;">We've received your request and will be in touch soon.</p>
      </div>
      
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
        <h3 style="color: #1e3a8a; margin: 0 0 15px 0;">Your Package Summary</h3>
        <p><strong>Total Points Earned:</strong> ${data.points}</p>
        <p><strong>Services Selected:</strong> ${Object.values(data.services).reduce((a, b) => a + b, 0)}</p>
      </div>

      <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
        <h3 style="color: #1e40af; margin: 0 0 15px 0;">Selected Services</h3>
        <ul style="list-style: none; padding: 0; margin: 0;">
          ${servicesList}
        </ul>
      </div>

      ${data.points >= 1000 ? `
        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #22c55e;">
          <h3 style="color: #15803d; margin: 0 0 10px 0;">🎁 Congratulations!</h3>
          <p style="margin: 0;">You've unlocked special bonuses! We'll include extra value in your proposal.</p>
        </div>
      ` : ''}

      <div style="text-align: center; margin: 30px 0;">
        <p style="color: #64748b; margin-bottom: 15px;">Questions? We're here to help!</p>
        <a href="mailto:vincent@vincialmedia.com" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Contact Us</a>
      </div>
    </div>
  `;
}

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<ApiResponse>
) {
  // Method validation
  if (req.method !== "POST") {
    return res.status(405).json({ 
      success: false, 
      message: "Method not allowed - only POST requests are accepted" 
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
    const validationResult = submitPackageRequestSchema.safeParse(req.body);
    
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

    const validatedData = validationResult.data as SubmitPackageRequestBody;
    
    // Initialize Resend client
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send admin notification email
    const adminEmailResult = await resend.emails.send({
      from: "Vincialmedia <no-reply@vincialmedia.com>",
      to: "vincent@vincialmedia.com",
      subject: `New Package Request from ${validatedData.email}`,
      html: generateAdminEmailTemplate(validatedData)
    });

    if (adminEmailResult.error) {
      console.error('Failed to send admin notification:', adminEmailResult.error);
      throw new Error('Failed to send admin notification email');
    }

    // Send customer confirmation email
    const customerEmailResult = await resend.emails.send({
      from: "Vincialmedia <no-reply@vincialmedia.com>",
      to: validatedData.email,
      subject: "Your package request confirmation - Vincialmedia",
      html: generateCustomerEmailTemplate(validatedData)
    });

    if (customerEmailResult.error) {
      console.error('Failed to send customer confirmation:', customerEmailResult.error);
      // Don't fail the entire request if customer email fails
      console.warn('Customer confirmation email failed, but request was processed');
    }

    console.log('Package request processed successfully:', {
      email: validatedData.email,
      points: validatedData.points,
      adminEmailId: adminEmailResult.data?.id,
      customerEmailId: customerEmailResult.data?.id
    });

    return res.status(200).json({ 
      success: true,
      message: 'Package request submitted successfully'
    });

  } catch (error) {
    console.error('Error processing package request:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    return res.status(500).json({ 
      success: false,
      message: `Failed to process package request: ${errorMessage}`
    });
  }
}