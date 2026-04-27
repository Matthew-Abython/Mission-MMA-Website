"use server";

import { LeadInputSchema, type LeadInput } from "@/lib/lead-schema";

export type LeadActionResult =
  | { ok: true }
  | { ok: false; error: string };

const WEBHOOK_TIMEOUT_MS = 6000;

/**
 * Normalize US phone input to E.164 format.
 * Strips all non-digit characters, adds country code if missing.
 *
 * Accepts: "(312) 555-1234", "312-555-1234", "312.555.1234", "13125551234"
 * Returns: "+13125551234"
 */
function normalizePhoneE164(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return digits;
}

/**
 * Submit a lead to the n8n webhook configured via N8N_WEBHOOK_URL.
 *
 * Defensive design:
 * - 6-second timeout — n8n cloud occasionally has slow cold starts on free tier
 * - Catches all network errors, returns typed result instead of throwing
 * - Logs server-side for debugging without exposing details to client
 * - Returns generic error message to client to avoid leaking webhook details
 */
export async function submitLead(input: LeadInput): Promise<LeadActionResult> {
  const parsed = LeadInputSchema.safeParse(input);
  if (!parsed.success) {
    console.warn("[submitLead] validation failed:", parsed.error.flatten());
    return { ok: false, error: "Please check your information and try again." };
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[submitLead] N8N_WEBHOOK_URL not configured");
    return {
      ok: false,
      error: "Form is temporarily unavailable. Please call 312-265-1856.",
    };
  }

  const payload = {
    firstName: parsed.data.firstName,
    lastName: parsed.data.lastName,
    phone: normalizePhoneE164(parsed.data.phone),
    phoneRaw: parsed.data.phone,
    interest: parsed.data.interest ?? null,
    source: parsed.data.source ?? "unknown",
    submittedAt: new Date().toISOString(),
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "MissionMMA-Website/1.0",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(
        `[submitLead] webhook returned ${response.status}:`,
        await response.text().catch(() => "(no body)"),
      );
      return {
        ok: false,
        error:
          "We couldn't process your submission. Please try again or call 312-265-1856.",
      };
    }

    return { ok: true };
  } catch (err) {
    clearTimeout(timeoutId);

    if (err instanceof Error && err.name === "AbortError") {
      console.error(
        "[submitLead] webhook timed out after",
        WEBHOOK_TIMEOUT_MS,
        "ms",
      );
      return {
        ok: false,
        error: "Submission timed out. Please try again or call 312-265-1856.",
      };
    }

    console.error("[submitLead] unexpected error:", err);
    return {
      ok: false,
      error:
        "Something went wrong. Please try again or call 312-265-1856.",
    };
  }
}
