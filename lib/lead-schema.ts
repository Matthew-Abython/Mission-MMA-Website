import { z } from "zod";

/**
 * Shared lead form schema — imported by both the server action and the client form.
 * No "use server" or "use client" directive so it's usable in both contexts.
 */
export const LeadInputSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  phone: z
    .string()
    .trim()
    .regex(
      /^[\d\s().+\-]{10,20}$/,
      "Please enter a valid phone number",
    ),
  interest: z.string().optional(),
  source: z.string().optional(),
});

export type LeadInput = z.infer<typeof LeadInputSchema>;
