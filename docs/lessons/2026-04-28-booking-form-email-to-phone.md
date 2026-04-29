# Lesson: Booking form — replace email with phone number

**Date:** 2026-04-28

## What the problem was
The `/book` page `CoachSchedulingCard` form asked for first name, last name, and **email address**. The gym's follow-up system (VAPI, Twilio SMS, n8n) operates entirely by phone number, so collecting email was misaligned with how leads are actually worked.

## What the fix was
- Renamed state `email`/`setEmail` → `phone`/`setPhone` in `components/ui/coach-scheduling-card.tsx`.
- Changed the form field: label "Email Address" → "Phone Number", input `type="email"` → `type="tel"`, placeholder updated to `(555) 555-5555`.
- Updated all guards (`handleSubmit` early return, button `disabled` prop) to reference `phone`.
- Updated `BookingSchema` in `app/actions/submit-booking.ts` to validate phone with the same regex used in `lib/lead-schema.ts` (`/^[\d\s().+\-]{10,20}$/`) — accepts any common phone format.
- The `{ ...parsed.data, source: "booking-page" }` spread means n8n automatically receives `phone` in the JSON payload with no other changes needed.

## Why it happened
The form was initially scaffolded with email as a generic contact field. The downstream automation stack was never wired to use email — it was always phone-first.

## What to watch for in the future
- Always verify that form fields match what the downstream automation (n8n, VAPI, Twilio) actually consumes.
- The `lib/lead-schema.ts` phone regex (`/^[\d\s().+\-]{10,20}$/`) is the canonical phone validator for this project — reuse it rather than writing a new one.
