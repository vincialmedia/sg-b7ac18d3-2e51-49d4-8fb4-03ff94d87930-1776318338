import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import { z } from "zod";

interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: string[];
}

interface ApiSuccessResponse {
  success: true;
  message: string;
}

type ApiResponse = ApiErrorResponse | ApiSuccessResponse;

const clinicsDemoRequestSchema = z.object({
  firstName: z.string().min(1),
  company: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  website: z.string().optional().nullable(),
  inquiryHandling: z.enum(["manual", "slow", "no-followup", "unknown"])
});

function validateEnvironment(): string[] {
  const errors: string[] = [];
  if (!process.env.RESEND_API_KEY) errors.push("RESEND_API_KEY is required for email sending");
  return errors;
}

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getInquiryHandlingLabel(value: "manual" | "slow" | "no-followup" | "unknown"): string {
  switch (value) {
    case "manual":
      return "Wir antworten manuell";
    case "slow":
      return "Eher langsam / uneinheitlich";
    case "no-followup":
      return "Kein klares Follow-up";
    case "unknown":
      return "Weiss nicht genau";
  }
}

function buildAdminEmailHtml(data: z.infer<typeof clinicsDemoRequestSchema>): string {
  const website = data.website?.trim() ? escapeHtml(data.website.trim()) : "—";
  const inquiryHandling = getInquiryHandlingLabel(data.inquiryHandling);

  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;">
      <h1 style="margin: 0 0 8px 0; font-size: 20px; color: #111827;">Neue Demo-Anfrage (Kliniken)</h1>
      <p style="margin: 0 0 20px 0; color: #6b7280;">vincialmedia.com/kliniken</p>

      <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
        <h2 style="margin: 0 0 12px 0; font-size: 14px; color: #111827;">Kontakt</h2>
        <p style="margin: 6px 0; color: #111827;"><strong>Vorname:</strong> ${escapeHtml(data.firstName)}</p>
        <p style="margin: 6px 0; color: #111827;"><strong>Klinik / Firma:</strong> ${escapeHtml(data.company)}</p>
        <p style="margin: 6px 0; color: #111827;"><strong>E-Mail:</strong> ${escapeHtml(data.email)}</p>
        <p style="margin: 6px 0; color: #111827;"><strong>Telefon:</strong> ${escapeHtml(data.phone)}</p>
        <p style="margin: 6px 0; color: #111827;"><strong>Website:</strong> ${website}</p>
      </div>

      <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px;">
        <h2 style="margin: 0 0 12px 0; font-size: 14px; color: #111827;">Status</h2>
        <p style="margin: 6px 0; color: #111827;"><strong>Was passiert aktuell mit neuen Anfragen?</strong></p>
        <p style="margin: 6px 0; color: #111827;">${escapeHtml(inquiryHandling)}</p>
      </div>

      <div style="margin-top: 18px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0; color: #6b7280; font-size: 12px;">
          Hinweis: Diese Anfrage wurde über die Outreach-Landingpage /kliniken gesendet.
        </p>
      </div>
    </div>
  `;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed - only POST requests are accepted" });
  }

  const envErrors = validateEnvironment();
  if (envErrors.length > 0) {
    return res.status(500).json({
      success: false,
      message: "Server configuration error",
      errors: envErrors
    });
  }

  const validationResult = clinicsDemoRequestSchema.safeParse(req.body);
  if (!validationResult.success) {
    const errors = validationResult.error.errors.map((err) => `${err.path.join(".")}: ${err.message}`);
    return res.status(400).json({ success: false, message: "Invalid request data", errors });
  }

  try {
    const data = validationResult.data;
    const resend = new Resend(process.env.RESEND_API_KEY);

    const emailResult = await resend.emails.send({
      from: "Vincialmedia <no-reply@vincialmedia.com>",
      to: "vincent@vincialmedia.com",
      subject: `Demo-Anfrage (Kliniken) – ${data.company}`,
      html: buildAdminEmailHtml(data)
    });

    if (emailResult.error) {
      return res.status(502).json({
        success: false,
        message: "Failed to send email notification"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Demo request submitted successfully"
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({
      success: false,
      message: `Failed to process request: ${message}`
    });
  }
}