import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer';
import axios from 'axios';

interface EmailRequestBody {
  email: string;
  services: { [key: string]: number };
  points: number;
  marketingConsent: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, services, points, marketingConsent } = req.body as EmailRequestBody

  // Basic validation
  if (!email || !services || typeof points === 'undefined') {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const emailData = {
      to: 'vincent@vincialmedia.com',
      from: 'noreply@yourdomain.com',
      subject: `New Package Request from ${email}`,
      html: `
        <h2>New Package Request</h2>
        <p><strong>Customer Email:</strong> ${email}</p>
        <p><strong>Total Points:</strong> ${points}</p>
        <p><strong>Marketing Consent:</strong> ${marketingConsent ? 'Yes' : 'No'}</p>
        <h3>Selected Services:</h3>
        <ul>
          ${Object.entries(services).map(([serviceId, count]) => 
            `<li>${serviceId.charAt(0).toUpperCase() + serviceId.slice(1)}: ${count}</li>`
          ).join('')}
        </ul>
        <p>Please follow up with this customer to discuss their package requirements.</p>
      `
    }

    // === EMAIL SENDING ===
    const transporter = nodemailer.createTransport({
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
          points,
          // Add any other custom fields you want
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
      message: 'Package request submitted successfully. Email sent!',
      success: true 
    })

  } catch (error) {
    console.error('Error processing request:', error)
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ 
      message: `Failed to submit package request: ${errorMessage}`,
      success: false 
    })
  }
}
