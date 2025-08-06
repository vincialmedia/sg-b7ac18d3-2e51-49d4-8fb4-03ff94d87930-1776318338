// Shared email utilities for Supabase Edge Functions

export interface ServiceDetails {
  name: string;
  description: string;
  points: number;
}

export const serviceConfig: { [key: string]: ServiceDetails } = {
  website: {
    name: 'Website Development',
    description: 'Professional website design and development',
    points: 400
  },
  social: {
    name: 'Social Media Management', 
    description: 'Strategic social media management',
    points: 300
  },
  automation: {
    name: 'Marketing Automation',
    description: 'Marketing automation and workflows',
    points: 350
  }
};

// Get service details with fallback
export function getServiceDetails(serviceId: string): ServiceDetails {
  return serviceConfig[serviceId] || {
    name: serviceId.charAt(0).toUpperCase() + serviceId.slice(1),
    description: 'Professional digital service',
    points: 0
  };
}

// Validate environment variables for email sending
export function validateEmailEnvironment(): string | null {
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
  
  if (!RESEND_API_KEY) {
    return 'RESEND_API_KEY environment variable is not set';
  }
  
  return null;
}

// Send email via Resend API
export async function sendEmailViaResend(
  to: string,
  subject: string,
  html: string,
  from = 'Vincialmedia <noreply@vincialmedia.com>'
): Promise<{ success: boolean; emailId?: string; error?: string }> {
  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      return {
        success: false,
        error: `Failed to send email: ${errorBody.message || response.statusText}`
      };
    }

    const result = await response.json();
    return {
      success: true,
      emailId: result.id
    };
  } catch (error) {
    return {
      success: false,
      error: `Email sending error: ${error.message}`
    };
  }
}

// Generate service list for admin notifications
export function generateAdminServicesList(services: { [key: string]: number }): string {
  return Object.entries(services)
    .filter(([, count]) => count > 0)
    .map(([serviceId, count]) => {
      const { name, points } = getServiceDetails(serviceId);
      const totalPoints = count * points;
      
      return `<li style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
        <strong>${name}:</strong> ${count} × ${points} points = ${totalPoints} points
      </li>`;
    })
    .join('');
}

// Generate service list for customer confirmations
export function generateCustomerServicesList(services: { [key: string]: number }): string {
  return Object.entries(services)
    .filter(([, count]) => count > 0)
    .map(([serviceId]) => {
      const { name, description } = getServiceDetails(serviceId);
      
      return `<li style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <strong style="color: #1e40af;">${name}</strong>
            <p style="margin: 4px 0 0 0; color: #64748b; font-size: 14px;">${description}</p>
          </div>
          <span style="color: #059669; font-weight: bold;">✓</span>
        </div>
      </li>`;
    })
    .join('');
}

// Common email styles
export const emailStyles = {
  container: 'font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;',
  header: 'color: #2563eb; text-align: center;',
  section: 'background-color: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e2e8f0;',
  highlight: 'background-color: #f0fdf4; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #22c55e;',
  warning: 'background-color: #fffbeb; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #fde68a;'
};