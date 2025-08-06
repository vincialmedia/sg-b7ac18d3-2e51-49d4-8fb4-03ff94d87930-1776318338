import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer';
import axios from 'axios';

interface EmailRequestBody {
  email: string;
  services: { [key: string]: number };
  totalPrice: number;
  marketingConsent: boolean;
}

// Service pricing map
const servicePrices: { [key: string]: { name: string; price: number } } = {
  webdesign: { name: 'Fortschrittliches Webdesign', price: 500 },
  socialmedia: { name: 'Social Media', price: 250 },
  automation: { name: 'Marketing Automation', price: 250 }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, services, totalPrice, marketingConsent } = req.body as EmailRequestBody

  // Basic validation
  if (!email || !services) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Generate service list with names and prices
    const servicesList = Object.entries(services)
      .filter(([, count]) => count > 0)
      .map(([serviceId, count]) => {
        const serviceInfo = servicePrices[serviceId];
        const serviceName = serviceInfo?.name || serviceId.charAt(0).toUpperCase() + serviceId.slice(1);
        const servicePrice = serviceInfo?.price || 0;
        return `<li><strong>${serviceName}</strong> - Ab CHF ${servicePrice}.- (${count}x ausgewählt)</li>`;
      })
      .join('');

    const calculatedTotal = Object.entries(services)
      .filter(([, count]) => count > 0)
      .reduce((total, [serviceId, count]) => {
        const servicePrice = servicePrices[serviceId]?.price || 0;
        return total + (servicePrice * count);
      }, 0);

    const emailData = {
      to: 'vincent@vincialmedia.com',
      from: 'noreply@vincialmedia.com',
      subject: `Neue Service-Anfrage von ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">Neue Service-Anfrage</h2>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
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
      `
    }

    // === EMAIL SENDING ===
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST, // e.g. 'smtp.gmail.com'
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail(emailData);

    // === HUBSPOT (OPTIONAL, ONLY IF YOU HAVE API KEY) ===
    if (process.env.HUBSPOT_API_KEY) {
      const hubspotApiKey = process.env.HUBSPOT_API_KEY;
      const contactData = {
        properties: {
          email,
          marketing_consent: marketingConsent ? "yes" : "no",
          estimated_total_price: calculatedTotal,
          services_requested: Object.entries(services)
            .filter(([, count]) => count > 0)
            .map(([serviceId]) => servicePrices[serviceId]?.name || serviceId)
            .join(', ')
        }
      };

      await axios.post(
        'https://api.hubapi.com/crm/v3/objects/contacts',
        contactData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${hubspotApiKey}`
          }
        }
      );
    }

    res.status(200).json({ 
      message: 'Service-Anfrage erfolgreich übermittelt!',
      success: true 
    })

  } catch (error) {
    console.error('Error processing request:', error)
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ 
      message: `Fehler beim Übermitteln der Anfrage: ${errorMessage}`,
      success: false 
    })
  }
}
