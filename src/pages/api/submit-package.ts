// /pages/api/submit-package.ts

import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { email, services, points, marketingConsent } = req.body;

    // Prepare the email body for admin (you)
    const servicesList = Object.entries(services)
      .map(([service, count]) => `${service} x${count}`)
      .join(", ");

    // Send email to YOU
    await resend.emails.send({
      from: "no-reply@vincialmedia.com", // Use your verified domain
      to: "vincent@vincialmedia.com",
      subject: "New Package Request Received",
      html: `
        <h1>New Package Request</h1>
        <p><b>Email:</b> ${email}</p>
        <p><b>Services:</b> ${servicesList}</p>
        <p><b>Points:</b> ${points}</p>
        <p><b>Marketing Consent:</b> ${marketingConsent ? "Yes" : "No"}</p>
      `
    });

    // Send email to USER
    await resend.emails.send({
      from: "no-reply@vincialmedia.com",
      to: email,
      subject: "Your order confirmation",
      html: `
        <h1>Your Package Request</h1>
        <p>Thank you for your interest in our services! Here’s what you selected:</p>
        <ul>
          ${Object.entries(services)
            .map(
              ([service, count]) => `<li><b>${service}</b> x${count}</li>`
            )
            .join("")}
        </ul>
        <p>Total Points: <b>${points}</b></p>
        <p>We’ll be in touch soon!</p>
      `
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}