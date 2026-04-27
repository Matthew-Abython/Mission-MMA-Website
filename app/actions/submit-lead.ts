"use server";

import { LeadInputSchema, type LeadInput } from "@/lib/lead-schema";

export type { LeadInput };
export { LeadInputSchema };

export type LeadActionResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * STUB — Step 3.2 replaces this with the real n8n webhook POST.
 * Returns ok=true after a brief delay to simulate network latency.
 */
export async function submitLead(input: LeadInput): Promise<LeadActionResult> {
  const parsed = LeadInputSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid input" };
  }

  // Simulated latency for testing UI states
  await new Promise((resolve) => setTimeout(resolve, 800));

  // TODO Step 3.2: POST to process.env.N8N_WEBHOOK_URL with normalized payload
  console.log("Lead received (stub):", parsed.data);

  return { ok: true };
}
