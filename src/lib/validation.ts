import { z } from "zod";

// Email validation schema
export const emailSchema = z.string()
  .email("Please enter a valid email address")
  .min(5, "Email must be at least 5 characters")
  .max(254, "Email must not exceed 254 characters");

// Services validation schema
export const servicesSchema = z.record(
  z.string(),
  z.number().min(0, "Service count cannot be negative")
);

// Legacy send-email API schema
export const sendEmailRequestSchema = z.object({
  email: emailSchema,
  services: servicesSchema.refine(
    (services) => Object.values(services).some(count => count > 0),
    { message: "At least one service must be selected" }
  ),
  totalPrice: z.number().min(0, "Total price cannot be negative"),
  marketingConsent: z.boolean()
});

// Submit-package API schema
export const submitPackageRequestSchema = z.object({
  email: emailSchema,
  services: servicesSchema.refine(
    (services) => Object.values(services).some(count => count > 0),
    { message: "At least one service must be selected" }
  ),
  points: z.number().min(0, "Points cannot be negative"),
  marketingConsent: z.boolean()
});

// Supabase package request schema
export const packageRequestSchema = z.object({
  email: emailSchema,
  services: servicesSchema,
  points: z.number().min(0),
  marketing_consent: z.boolean(),
  created_at: z.string()
});

export type EmailRequestBody = z.infer<typeof sendEmailRequestSchema>;
export type SubmitPackageRequestBody = z.infer<typeof submitPackageRequestSchema>;
export type PackageRequest = z.infer<typeof packageRequestSchema>;