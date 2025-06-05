
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts"; // Assuming you might create a shared CORS config

// If you don't have a shared CORS config, define it here:
// const corsHeaders = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
// };


serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { to, subject, packageRequest } = await req.json();

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

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
        <h2 style="color: #2563eb; text-align: center;">New Package Request - Vincialmedia</h2>
        
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
          <h3 style="margin-top: 0; color: #1e3a8a;">Customer Information</h3>
          <p><strong>Email:</strong> ${packageRequest.email}</p>
          <p><strong>Total Points:</strong> ${packageRequest.points}</p>
          <p><strong>Marketing Consent:</strong> ${packageRequest.marketing_consent ? 'Yes' : 'No'}</p>
          <p><strong>Submitted:</strong> ${new Date(packageRequest.created_at).toLocaleString()}</p>
        </div>

        <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #cce7ff;">
          <h3 style="margin-top: 0; color: #1e40af;">Selected Services</h3>
          <ul style="list-style-type: none; padding: 0;">
            ${Object.entries(packageRequest.services).map(([serviceId, count]) => {
              const serviceName = serviceId.charAt(0).toUpperCase() + serviceId.slice(1);
              // Ensure points calculation is robust
              let pointsPerService = 0;
              if (serviceId === 'website') pointsPerService = 400;
              else if (serviceId === 'social') pointsPerService = 300;
              else if (serviceId === 'automation') pointsPerService = 350;
              const totalPointsForService = (typeof count === 'number' ? count : 0) * pointsPerService;
              return `<li style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                <strong>${serviceName}:</strong> ${count} × ${pointsPerService} points = ${totalPointsForService} points
              </li>`;
            }).join('')}
          </ul>
        </div>

        ${packageRequest.points >= 1000 ? `
          <div style="background-color: #f0fdf4; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #22c55e;">
            <h3 style="margin-top: 0; color: #15803d;">🎁 Gift Unlocked!</h3>
            <p>This customer has reached 1000+ points and qualifies for a surprise gift or discount!</p>
          </div>
        ` : ''}

        <div style="background-color: #fffbeb; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #fde68a;">
          <h3 style="margin-top: 0; color: #92400e;">Next Steps</h3>
          <p>Please follow up with this customer to discuss their package requirements and provide a detailed proposal.</p>
          <p><strong>Customer Email:</strong> <a href="mailto:${packageRequest.email}" style="color: #1d4ed8;">${packageRequest.email}</a></p>
        </div>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
        <p style="color: #64748b; font-size: 12px; text-align: center;">
          This email was automatically generated from your Vincialmedia website package request form.
        </p>
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
        to: [to],
        subject: subject,
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const errorBody = await emailResponse.json();
      console.error('Failed to send email:', emailResponse.status, errorBody);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Failed to send email: ${errorBody.message || emailResponse.statusText}` 
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
        message: 'Email sent successfully',
        emailId: emailResult.id 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );

  } catch (error) {
    console.error('Error in send-notification function:', error);
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
