"use server";

import { z } from "zod";

const BookingSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().regex(/^[\d\s().+\-]{10,20}$/, "Please enter a valid phone number"),
  selectedDate: z.string(),
  selectedClass: z.string(),
  selectedTime: z.string(),
});

const WEBHOOK_TIMEOUT_MS = 6000;

export async function submitBooking(data: unknown): Promise<{ ok: boolean; error?: string }> {
  const parsed = BookingSchema.safeParse(data);
  if (!parsed.success) {
    console.warn("[submitBooking] validation failed:", parsed.error.flatten());
    return { ok: false, error: "Invalid form data" };
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[submitBooking] N8N_WEBHOOK_URL not configured");
    return { ok: false, error: "Webhook not configured" };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", "User-Agent": "MissionMMA-Website/1.0" },
      body: JSON.stringify({ ...parsed.data, source: "booking-page" }),
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.error(`[submitBooking] webhook returned ${res.status}`);
      return { ok: false, error: "Webhook error" };
    }

    return { ok: true };
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof Error && err.name === "AbortError") {
      console.error("[submitBooking] webhook timed out after", WEBHOOK_TIMEOUT_MS, "ms");
    } else {
      console.error("[submitBooking] unexpected error:", err);
    }
    return { ok: false, error: "Network error" };
  }
}
