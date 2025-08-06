import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { 
  validateEmailEnvironment, 
  sendEmailViaResend, 
  generateCustomerServicesList,
  emailStyles 
} from "../_shared/email-utils.ts";
import { 
  createErrorResponse, 
  createSuccessResponse, 
  handleCorsOptions 
} from "../_shared/response-utils.ts";

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return handleCorsOptions();
  }

  try {
    // Validate environment
    const envError = validateEmailEnvironment();
    if (envError) {
      console.error(envError);
      return createErrorResponse('Email sending not configured: RESEND_API_KEY missing.', 500);
    }

    // Parse request body
    const { packageRequest } = await req.json();

    if (!packageRequest?.email || !packageRequest?.services) {
      return createErrorResponse('Invalid package request data', 400);
    }

    // Generate customer confirmation email HTML
    const servicesList = generateCustomerServicesList(packageRequest.services);
    
    const customerEmailHtml = `
      <div style="${emailStyles.container}">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin-bottom: 10px;">Thank You for Your Package Request!</h1>
          <p style="color: #64748b; font-size: 16px;">We've received your request and will be in touch soon.</p>
        </div>
        
        <div style="${emailStyles.section}">
          <h3 style="margin-top: 0; color: #1e3a8a;">Your Package Summary</h3>
          <p><strong>Total Points Earned:</strong> ${packageRequest.points}</p>
          <p><strong>Submission Date:</strong> ${new Date(packageRequest.created_at).toLocaleDateString()}</p>
        </div>

        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 25px; border: 1px solid #cce7ff;">
          <h3 style="margin-top: 0; color: #1e40af;">Selected Services</h3>
          <ul style="list-style-type: none; padding: 0; margin: 0;">
            ${servicesList}
          </ul>
        </div>

        ${packageRequest.points >= 1000 ? `
          <div style="${emailStyles.highlight}">
            <h3 style="margin-top: 0; color: #15803d;">🎁 Congratulations!</h3>
            <p style="margin-bottom: 0;">You've unlocked a surprise gift! We'll include special bonuses or discounts in your custom proposal.</p>
          </div>
        ` : ''}

        <div style="${emailStyles.warning}">
          <h3 style="margin-top: 0; color: #92400e;">What Happens Next?</h3>
          <ol style="margin: 0; padding-left: 20px; color: #92400e;">
            <li style="margin-bottom: 8px;">We'll review your package requirements within 24 hours</li>
            <li style="margin-bottom: 8px;">Our team will prepare a detailed proposal tailored to your needs</li>
            <li style="margin-bottom: 8px;">We'll schedule a consultation call to discuss your project</li>
            <li>You'll receive a custom quote with timeline and next steps</li>
          </ol>
        </div>

        <div style="text-align: center; margin-bottom: 25px;">
          <p style="color: #64748b; margin-bottom: 15px;">Have questions? We're here to help!</p>
          <a href="mailto:vincent@vincialmedia.com" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Contact Us</a>
        </div>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
        <div style="text-align: center;">
          <p style="color: #64748b; font-size: 14px; margin-bottom: 5px;"><strong>Vincialmedia</strong></p>
          <p style="color: #64748b; font-size: 12px; margin: 0;">Transforming businesses through digital excellence</p>
        </div>
      </div>
    `;

    // Send customer confirmation email
    const emailResult = await sendEmailViaResend(
      packageRequest.email,
      'Thank you for your package request - Vincialmedia',
      customerEmailHtml
    );
    
    if (!emailResult.success) {
      console.error('Failed to send customer confirmation:', emailResult.error);
      return createErrorResponse(emailResult.error || 'Failed to send confirmation email', 500);
    }

    console.log('Customer confirmation sent successfully:', emailResult.emailId);
    return createSuccessResponse('Customer confirmation email sent successfully', emailResult.emailId);

  } catch (error) {
    console.error('Error in send-customer-confirmation function:', error);
    return createErrorResponse(error.message || 'Internal server error');
  }
});