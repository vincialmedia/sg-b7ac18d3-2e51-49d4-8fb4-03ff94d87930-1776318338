// Email template utilities for consistent styling and content

export interface ServiceInfo {
  name: string;
  price: number;
}

export const servicePrices: { [key: string]: ServiceInfo } = {
  webdesign: { name: 'Fortschrittliches Webdesign', price: 500 },
  socialmedia: { name: 'Social Media', price: 250 },
  automation: { name: 'Marketing Automation', price: 250 }
};

export const servicePoints: { [key: string]: number } = {
  website: 400,
  social: 300,
  automation: 350
};

// Generate service list HTML for legacy send-email endpoint
export function generateServicesList(services: { [key: string]: number }): string {
  return Object.entries(services)
    .filter(([, count]) => count > 0)
    .map(([serviceId, count]) => {
      const serviceInfo = servicePrices[serviceId];
      const serviceName = serviceInfo?.name || serviceId.charAt(0).toUpperCase() + serviceId.slice(1);
      const servicePrice = serviceInfo?.price || 0;
      return `<li><strong>${serviceName}</strong> - Ab CHF ${servicePrice}.- (${count}x ausgewählt)</li>`;
    })
    .join('');
}

// Calculate total price for legacy send-email endpoint
export function calculateTotalPrice(services: { [key: string]: number }): number {
  return Object.entries(services)
    .filter(([, count]) => count > 0)
    .reduce((total, [serviceId, count]) => {
      const servicePrice = servicePrices[serviceId]?.price || 0;
      return total + (servicePrice * count);
    }, 0);
}

// Generate admin notification email HTML
export function generateAdminEmailHtml(
  email: string, 
  services: { [key: string]: number },
  calculatedTotal: number,
  marketingConsent: boolean
): string {
  const servicesList = generateServicesList(services);
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">Neue Service-Anfrage</h2>
      
      <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Kunde:</strong> ${email}</p>
        <p><strong>Marketing-Einverständnis:</strong> ${marketingConsent ? 'Ja' : 'Nein'}</p>
      </div>
      
      <h3 style="color: #333; margin-top: 30px;">Ausgewählte Services:</h3>
      <ul style="background-color: #ffffff; padding: 20px; border-left: 4px solid #e74c3c; margin: 15px 0;">
        ${servicesList}
      </ul>
      
      <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
        <p style="margin: 0; font-size: 18px;"><strong>Geschätzter Gesamtpreis: Ab CHF ${calculatedTotal}.-</strong></p>
      </div>
      
      <div style="margin-top: 30px; padding: 15px; background-color: #fff3cd; border-radius: 8px;">
        <p style="margin: 0; color: #856404;"><strong>Nächste Schritte:</strong> Bitte kontaktieren Sie den Kunden für ein detailliertes Beratungsgespräch und Angebot.</p>
      </div>
    </div>
  `;
}

// Common email styling constants
export const emailStyles = {
  container: "font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;",
  header: "color: #2563eb; text-align: center;",
  section: "background-color: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e2e8f0;",
  highlight: "background-color: #f0fdf4; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #22c55e;",
  button: "display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;",
  footer: "color: #64748b; font-size: 12px; text-align: center;"
};