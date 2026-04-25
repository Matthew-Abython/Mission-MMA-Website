# Schedule Data — Ready to Paste

When you reach Phase 1 step 1.2, paste this into `lib/schedule.ts`. Pre-populated from the gym's actual weekly schedule.

```typescript
// lib/schedule.ts

export type Discipline =
  | "muay-thai"
  | "bjj-no-gi"
  | "bjj-gi"
  | "womens-bjj"
  | "kids-muay-thai"
  | "kids-bjj"
  | "strength"
  | "open-mat"
  | "sparring"
  | "open-weight";

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type Audience = "adult" | "kids" | "womens" | "all";

export interface ScheduleEntry {
  /** Day of the week */
  day: DayOfWeek;
  /** 24-hour start time in HH:MM format (for sorting + JSON-LD) */
  time: string;
  /** Display time like "4:30 PM" */
  displayTime: string;
  /** Full class name as shown to users */
  name: string;
  /** Discipline tag for filtering + color coding */
  discipline: Discipline;
  /** Optional duration in minutes (default 60) */
  durationMinutes?: number;
  /** Audience targeting */
  audience: Audience;
}

export const WEEKLY_SCHEDULE: ScheduleEntry[] = [
  // MONDAY
  { day: "monday", time: "16:30", displayTime: "4:30 PM", name: "Kids Muay Thai", discipline: "kids-muay-thai", audience: "kids" },
  { day: "monday", time: "17:30", displayTime: "5:30 PM", name: "Adult Muay Thai", discipline: "muay-thai", audience: "adult" },
  { day: "monday", time: "18:30", displayTime: "6:30 PM", name: "Adult Muay Thai Sparring", discipline: "sparring", audience: "adult" },

  // TUESDAY
  { day: "tuesday", time: "06:30", displayTime: "6:30 AM", name: "Adult Brazilian Jiu Jitsu (No Gi)", discipline: "bjj-no-gi", audience: "adult" },
  { day: "tuesday", time: "06:30", displayTime: "6:30 AM", name: "Strength and Conditioning", discipline: "strength", audience: "adult" },
  { day: "tuesday", time: "07:30", displayTime: "7:30 AM", name: "Adult Muay Thai", discipline: "muay-thai", audience: "adult" },
  { day: "tuesday", time: "16:30", displayTime: "4:30 PM", name: "Kids Muay Thai", discipline: "kids-muay-thai", audience: "kids" },
  { day: "tuesday", time: "17:30", displayTime: "5:30 PM", name: "Adult Brazilian Jiu Jitsu (No Gi)", discipline: "bjj-no-gi", audience: "adult" },
  { day: "tuesday", time: "18:30", displayTime: "6:30 PM", name: "Adult Muay Thai", discipline: "muay-thai", audience: "adult" },

  // WEDNESDAY
  { day: "wednesday", time: "06:00", displayTime: "6:00 AM", name: "Adult Brazilian Jiu Jitsu (No Gi)", discipline: "bjj-no-gi", audience: "adult" },
  { day: "wednesday", time: "07:00", displayTime: "7:00 AM", name: "Women's Brazilian Jiu Jitsu", discipline: "womens-bjj", audience: "womens" },
  { day: "wednesday", time: "16:30", displayTime: "4:30 PM", name: "Kids Muay Thai", discipline: "kids-muay-thai", audience: "kids" },
  { day: "wednesday", time: "17:30", displayTime: "5:30 PM", name: "Adult Brazilian Jiu Jitsu (No Gi)", discipline: "bjj-no-gi", audience: "adult" },
  { day: "wednesday", time: "18:30", displayTime: "6:30 PM", name: "Adult Muay Thai", discipline: "muay-thai", audience: "adult" },

  // THURSDAY
  { day: "thursday", time: "06:30", displayTime: "6:30 AM", name: "Strength and Conditioning", discipline: "strength", audience: "adult" },
  { day: "thursday", time: "07:30", displayTime: "7:30 AM", name: "Adult Muay Thai", discipline: "muay-thai", audience: "adult" },
  { day: "thursday", time: "12:00", displayTime: "12:00 PM", name: "Adult Brazilian Jiu Jitsu (Gi)", discipline: "bjj-gi", audience: "adult" },
  { day: "thursday", time: "16:30", displayTime: "4:30 PM", name: "Kids Muay Thai", discipline: "kids-muay-thai", audience: "kids" },
  { day: "thursday", time: "17:30", displayTime: "5:30 PM", name: "Adult Brazilian Jiu Jitsu (No Gi)", discipline: "bjj-no-gi", audience: "adult" },
  { day: "thursday", time: "18:30", displayTime: "6:30 PM", name: "Adult Muay Thai", discipline: "muay-thai", audience: "adult" },
  { day: "thursday", time: "19:30", displayTime: "7:30 PM", name: "Adult Brazilian Jiu Jitsu (Gi)", discipline: "bjj-gi", audience: "adult" },

  // FRIDAY
  { day: "friday", time: "07:00", displayTime: "7:00 AM", name: "Women's Brazilian Jiu Jitsu", discipline: "womens-bjj", audience: "womens" },
  { day: "friday", time: "12:00", displayTime: "12:00 PM", name: "Adult Brazilian Jiu Jitsu (Gi)", discipline: "bjj-gi", audience: "adult" },
  { day: "friday", time: "18:30", displayTime: "6:30 PM", name: "Adult Open Mat", discipline: "open-mat", audience: "adult" },

  // SATURDAY
  { day: "saturday", time: "08:00", displayTime: "8:00 AM", name: "Adult Open Weight Training", discipline: "open-weight", audience: "adult" },
  { day: "saturday", time: "09:30", displayTime: "9:30 AM", name: "Kids Muay Thai", discipline: "kids-muay-thai", audience: "kids" },
  { day: "saturday", time: "10:30", displayTime: "10:30 AM", name: "Women's Brazilian Jiu Jitsu Open Mat", discipline: "womens-bjj", audience: "womens" },
  { day: "saturday", time: "10:30", displayTime: "10:30 AM", name: "Kids Brazilian Jiu Jitsu (Gi)", discipline: "kids-bjj", audience: "kids" },
  { day: "saturday", time: "11:30", displayTime: "11:30 AM", name: "Adult Muay Thai", discipline: "muay-thai", audience: "adult" },
  { day: "saturday", time: "12:30", displayTime: "12:30 PM", name: "Adult Brazilian Jiu Jitsu (Gi)", discipline: "bjj-gi", audience: "adult" },

  // SUNDAY — no classes
];

/** Display labels for discipline filter chips */
export const DISCIPLINE_LABELS: Record<Discipline, string> = {
  "muay-thai": "Muay Thai",
  "bjj-no-gi": "BJJ (No Gi)",
  "bjj-gi": "BJJ (Gi)",
  "womens-bjj": "Women's BJJ",
  "kids-muay-thai": "Kids Muay Thai",
  "kids-bjj": "Kids BJJ",
  "strength": "Strength & Conditioning",
  "open-mat": "Open Mat",
  "sparring": "Sparring",
  "open-weight": "Open Weight Training",
};

/** Tailwind color classes per discipline */
export const DISCIPLINE_COLORS: Record<Discipline, string> = {
  "muay-thai": "border-mission-red bg-mission-red/10 text-mission-red",
  "bjj-no-gi": "border-white/40 bg-white/5 text-white",
  "bjj-gi": "border-white/60 bg-white/10 text-white",
  "womens-bjj": "border-red-400 bg-red-400/10 text-red-300",
  "kids-muay-thai": "border-neutral-400 bg-neutral-400/10 text-neutral-300",
  "kids-bjj": "border-neutral-400 bg-neutral-400/10 text-neutral-300",
  "strength": "border-neutral-500 bg-neutral-500/10 text-neutral-300",
  "open-mat": "border-white/30 bg-white/5 text-neutral-200",
  "sparring": "border-red-700 bg-red-700/10 text-red-400",
  "open-weight": "border-neutral-500 bg-neutral-500/10 text-neutral-300",
};

/** Filter group helpers — used for class page schedule filtering */
export const BJJ_DISCIPLINES: Discipline[] = ["bjj-no-gi", "bjj-gi"];
export const MUAY_THAI_DISCIPLINES: Discipline[] = ["muay-thai", "sparring"];
export const KIDS_DISCIPLINES: Discipline[] = ["kids-muay-thai", "kids-bjj"];
export const WOMENS_DISCIPLINES: Discipline[] = ["womens-bjj"];

export const DAYS_OF_WEEK: DayOfWeek[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const DAY_LABELS: Record<DayOfWeek, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

/** Helpers */
export function classesByDay(day: DayOfWeek): ScheduleEntry[] {
  return WEEKLY_SCHEDULE
    .filter((c) => c.day === day)
    .sort((a, b) => a.time.localeCompare(b.time));
}

export function classesByDiscipline(disciplines: Discipline[]): ScheduleEntry[] {
  return WEEKLY_SCHEDULE.filter((c) => disciplines.includes(c.discipline));
}

export function totalWeeklyClasses(): number {
  return WEEKLY_SCHEDULE.length;
}
```

## Sanity check (counts per day)

- Monday: 3 classes
- Tuesday: 6 classes
- Wednesday: 5 classes
- Thursday: 7 classes
- Friday: 3 classes
- Saturday: 6 classes
- Sunday: 0 classes
- **Total: 30 classes/week**

## Use in components

```tsx
import { WEEKLY_SCHEDULE, BJJ_DISCIPLINES, classesByDiscipline } from "@/lib/schedule";

// All BJJ classes (Gi + No-Gi):
const bjjClasses = classesByDiscipline(BJJ_DISCIPLINES);
// → 11 classes
```
