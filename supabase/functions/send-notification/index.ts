import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { 
  validateEmailEnvironment, 
  sendEmailViaResend, 
  generateAdminServicesList,
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
    const { to, subject, packageRequest } = await req.json();

    if (!packageRequest?.email || !packageRequest?.services) {
      return createErrorResponse('Invalid package request data', 400);
    }

    // Generate admin notification email HTML
    const servicesList = generateAdminServicesList(packageRequest.services);
    
    const emailHtml = `
      <div style="${emailStyles.container}">
        <h2 style="${emailStyles.header}">New Package Request - Vincialmedia</h2>
        
        <div style="${emailStyles.section}">
          <h3 style="margin-top: 0; color: #1e3a8a;">Customer Information</h3>
          <p><strong>Email:</strong> ${packageRequest.email}</p>
          <p><strong>Total Points:</strong> ${packageRequest.points}</p>
          <p><strong>Marketing Consent:</strong> ${packageRequest.marketing_consent ? 'Yes' : 'No'}</p>
          <p><strong>Submitted:</strong> ${new Date(packageRequest.created_at).toLocaleString()}</p>
        </div>

        <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #cce7ff;">
          <h3 style="margin-top: 0; color: #1e40af;">Selected Services</h3>
          <ul style="list-style-type: none; padding: 0;">
            ${servicesList}
          </ul>
        </div>

        ${packageRequest.points >= 1000 ? `
          <div style="${emailStyles.highlight}">
            <h3 style="margin-top: 0; color: #15803d;">🎁 Premium Customer Alert!</h3>
            <p style="margin-bottom: 0;">This customer has reached 1000+ points and qualifies for special bonuses or discounts!</p>
          </div>
        ` : ''}

        <div style="${emailStyles.warning}">
          <h3 style="margin-top: 0; color: #92400e;">Action Required</h3>
          <p>Please follow up with this customer to discuss their package requirements and provide a detailed proposal.</p>
          <p style="margin-bottom: 0;"><strong>Customer Email:</strong> <a href="mailto:${packageRequest.email}" style="color: #1d4ed8;">${packageRequest.email}</a></p>
        </div>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
        <p style="color: #64748b; font-size: 12px; text-align: center;">
          This email was automatically generated from your Vincialmedia website package request form.
        </p>
      </div>
    `;

    // Send email
    const emailResult = await sendEmailViaResend(to, subject, emailHtml);
    
    if (!emailResult.success) {
      console.error('Failed to send admin notification:', emailResult.error);
      return createErrorResponse(emailResult.error || 'Failed to send email', 500);
    }

    console.log('Admin notification sent successfully:', emailResult.emailId);
    return createSuccessResponse('Email sent successfully', emailResult.emailId);

  } catch (error) {
    console.error('Error in send-notification function:', error);
    return createErrorResponse(error.message || 'Internal server error');
  }
});