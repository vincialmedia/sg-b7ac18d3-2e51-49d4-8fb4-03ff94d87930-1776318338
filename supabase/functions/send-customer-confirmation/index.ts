
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { packageRequest } = await req.json();

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Email sending not configured: RESEND_API_KEY missing.' 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        },
      );
    }

    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin-bottom: 10px;">Thank You for Your Package Request!</h1>
          <p style="color: #64748b; font-size: 16px;">We've received your request and will be in touch soon.</p>
        </div>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 25px; border: 1px solid #e2e8f0;">
          <h3 style="margin-top: 0; color: #1e3a8a;">Your Package Summary</h3>
          <p><strong>Total Points Earned:</strong> ${packageRequest.points}</p>
          <p><strong>Submission Date:</strong> ${new Date(packageRequest.created_at).toLocaleDateString()}</p>
        </div>

        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 25px; border: 1px solid #cce7ff;">
          <h3 style="margin-top: 0; color: #1e40af;">Selected Services</h3>
          <ul style="list-style-type: none; padding: 0; margin: 0;">
            ${Object.entries(packageRequest.services).map(([serviceId, count]) => {
              const serviceName = serviceId.charAt(0).toUpperCase() + serviceId.slice(1);
              let serviceDescription = '';
              if (serviceId === 'website') serviceDescription = 'Professional website design and development';
              else if (serviceId === 'social') serviceDescription = 'Strategic social media management';
              else if (serviceId === 'automation') serviceDescription = 'Marketing automation and workflows';
              
              return `<li style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <strong style="color: #1e40af;">${serviceName}</strong>
                    <p style="margin: 4px 0 0 0; color: #64748b; font-size: 14px;">${serviceDescription}</p>
                  </div>
                  <span style="color: #059669; font-weight: bold;">✓</span>
                </div>
              </li>`;
            }).join('')}
          </ul>
        </div>

        ${packageRequest.points >= 1000 ? `
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #22c55e;">
            <h3 style="margin-top: 0; color: #15803d;">🎁 Congratulations!</h3>
            <p style="margin-bottom: 0;">You've unlocked a surprise gift! We'll include special bonuses or discounts in your custom proposal.</p>
          </div>
        ` : ''}

        <div style="background-color: #fffbeb; padding: 20px; border-radius: 8px; margin-bottom: 25px; border: 1px solid #fde68a;">
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

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Vincialmedia <noreply@vincialmedia.com>', 
        to: [packageRequest.email],
        subject: 'Thank you for your package request - Vincialmedia',
        html: customerEmailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const errorBody = await emailResponse.json();
      console.error('Failed to send customer confirmation email:', emailResponse.status, errorBody);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Failed to send confirmation email: ${errorBody.message || emailResponse.statusText}` 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: emailResponse.status,
        },
      );
    }

    const emailResult = await emailResponse.json();

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Customer confirmation email sent successfully',
        emailId: emailResult.id 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );

  } catch (error) {
    console.error('Error in send-customer-confirmation function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    );
  }
});
