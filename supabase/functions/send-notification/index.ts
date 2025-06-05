
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, subject, packageRequest } = await req.json()

    // You'll need to configure your email service here
    // For example, using Resend (recommended for Supabase Edge Functions)
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY environment variable is not set')
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Package Request - Vincialmedia</h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Customer Information</h3>
          <p><strong>Email:</strong> ${packageRequest.email}</p>
          <p><strong>Total Points:</strong> ${packageRequest.points}</p>
          <p><strong>Marketing Consent:</strong> ${packageRequest.marketing_consent ? 'Yes' : 'No'}</p>
          <p><strong>Submitted:</strong> ${new Date(packageRequest.created_at).toLocaleString()}</p>
        </div>

        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e40af;">Selected Services</h3>
          <ul style="list-style-type: none; padding: 0;">
            ${Object.entries(packageRequest.services).map(([serviceId, count]) => {
              const serviceName = serviceId.charAt(0).toUpperCase() + serviceId.slice(1)
              const points = serviceId === 'website' ? 400 : serviceId === 'social' ? 300 : 350
              return `<li style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                <strong>${serviceName}:</strong> ${count} × ${points} points = ${Number(count) * points} points
              </li>`
            }).join('')}
          </ul>
        </div>

        ${packageRequest.points >= 1000 ? `
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
            <h3 style="margin-top: 0; color: #15803d;">🎁 Gift Unlocked!</h3>
            <p>This customer has reached 1000+ points and qualifies for a surprise gift or discount!</p>
          </div>
        ` : ''}

        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #92400e;">Next Steps</h3>
          <p>Please follow up with this customer to discuss their package requirements and provide a detailed proposal.</p>
          <p><strong>Customer Email:</strong> <a href="mailto:${packageRequest.email}">${packageRequest.email}</a></p>
        </div>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
        <p style="color: #64748b; font-size: 14px; text-align: center;">
          This email was automatically generated from your Vincialmedia website package request form.
        </p>
      </div>
    `

    // Send email using Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Vincialmedia <noreply@vincialmedia.com>', // You'll need to verify this domain in Resend
        to: [to],
        subject: subject,
        html: emailHtml,
      }),
    })

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text()
      throw new Error(`Failed to send email: ${errorText}`)
    }

    const emailResult = await emailResponse.json()

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
    )

  } catch (error) {
    console.error('Error in send-notification function:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
