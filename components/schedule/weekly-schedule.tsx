"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  m,
  AnimatePresence,
  LayoutGroup,
  useReducedMotion,
} from "framer-motion";
import {
  WEEKLY_SCHEDULE,
  DAYS_OF_WEEK,
  DAY_LABELS,
  DISCIPLINE_LABELS,
  DISCIPLINE_COLORS,
  BJJ_DISCIPLINES,
  MUAY_THAI_DISCIPLINES,
  KIDS_DISCIPLINES,
  WOMENS_DISCIPLINES,
  type Discipline,
  type DayOfWeek,
} from "@/lib/schedule";
import { EASE_MISSION } from "@/lib/motion";

type FilterKey =
  | "all"
  | "bjj"
  | "muay-thai"
  | "womens-bjj"
  | "kids"
  | "open-mat"
  | "strength";

const FILTER_OPTIONS: {
  key: FilterKey;
  label: string;
  matches: (d: Discipline) => boolean;
}[] = [
  { key: "all", label: "All Classes", matches: () => true },
  {
    key: "bjj",
    label: "BJJ",
    matches: (d) => BJJ_DISCIPLINES.includes(d as (typeof BJJ_DISCIPLINES)[number]),
  },
  {
    key: "muay-thai",
    label: "Muay Thai",
    matches: (d) => MUAY_THAI_DISCIPLINES.includes(d as (typeof MUAY_THAI_DISCIPLINES)[number]),
  },
  {
    key: "womens-bjj",
    label: "Women's BJJ",
    matches: (d) => WOMENS_DISCIPLINES.includes(d as (typeof WOMENS_DISCIPLINES)[number]),
  },
  {
    key: "kids",
    label: "Kids",
    matches: (d) => KIDS_DISCIPLINES.includes(d as (typeof KIDS_DISCIPLINES)[number]),
  },
  {
    key: "open-mat",
    label: "Open Mat",
    matches: (d) => d === "open-mat" || d === "open-weight",
  },
  { key: "strength", label: "Strength", matches: (d) => d === "strength" },
];

function slugToFilterKey(slug: string | null): FilterKey {
  if (!slug) return "all";
  if (slug === "brazilian-jiu-jitsu") return "bjj";
  if (slug === "muay-thai") return "muay-thai";
  if (slug === "womens-bjj") return "womens-bjj";
  if (slug === "kids") return "kids";
  if (slug === "open-mat") return "open-mat";
  if (slug === "strength-conditioning") return "strength";
  return "all";
}

export function WeeklySchedule() {
  const searchParams = useSearchParams();
  const initialFilter = slugToFilterKey(searchParams.get("discipline"));
  const [activeFilter, setActiveFilter] = useState<FilterKey>(initialFilter);
  const reduced = useReducedMotion();

  const activeOption =
    FILTER_OPTIONS.find((f) => f.key === activeFilter) ?? FILTER_OPTIONS[0];

  const classesByDay = useMemo(() => {
    return DAYS_OF_WEEK.map((day) => ({
      day,
      classes: WEEKLY_SCHEDULE.filter(
        (c) => c.day === day && activeOption.matches(c.discipline),
      ).sort((a, b) => a.time.localeCompare(b.time)),
    }));
  }, [activeOption]);

  const totalMatching = classesByDay.reduce(
    (sum, d) => sum + d.classes.length,
    0,
  );

  return (
    <div className="space-y-8">
      {/* Filter chips */}
      <LayoutGroup id="schedule-filters">
        <div className="flex flex-wrap gap-2 md:gap-3">
          {FILTER_OPTIONS.map((option) => {
            const isActive = option.key === activeFilter;
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => setActiveFilter(option.key)}
                className={`relative px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors duration-200 md:text-base ${
                  isActive
                    ? "text-mission-white"
                    : "text-mission-gray-500 hover:text-mission-gray-300"
                }`}
                aria-pressed={isActive}
              >
                {option.label}
                {isActive && (
                  <m.span
                    layoutId="active-filter-underline"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-mission-red"
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 400, damping: 30 }
                    }
                  />
                )}
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      {/* Result count */}
      <div className="text-sm text-mission-gray-300">
        Showing {totalMatching}{" "}
        {totalMatching === 1 ? "class" : "classes"} per week
        {activeFilter !== "all" && (
          <>
            {" "}
            in{" "}
            <span className="text-mission-white">{activeOption.label}</span>
          </>
        )}
        .
      </div>

      {/* Schedule grid */}
      <LayoutGroup id="schedule-grid">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-7 md:gap-2 lg:gap-3">
          {classesByDay.map(({ day, classes }) => (
            <DayColumn
              key={day}
              day={day}
              classes={classes}
              reduced={reduced ?? false}
            />
          ))}
        </div>
      </LayoutGroup>

      {totalMatching === 0 && (
        <div className="rounded-lg border border-white/10 bg-mission-gray-900/40 p-8 text-center text-mission-gray-300">
          No classes match this filter. Try another discipline.
        </div>
      )}
    </div>
  );
}

function DayColumn({
  day,
  classes,
  reduced,
}: {
  day: DayOfWeek;
  classes: typeof WEEKLY_SCHEDULE;
  reduced: boolean;
}) {
  return (
    <div className="space-y-2">
      <div className="border-b border-white/10 pb-2">
        <div className="font-display text-sm uppercase tracking-wider text-mission-white md:text-base">
          {DAY_LABELS[day]}
        </div>
      </div>
      <AnimatePresence mode="popLayout" initial={false}>
        {classes.length === 0 ? (
          <m.div
            key={`${day}-empty`}
            layout={!reduced}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs italic text-mission-gray-500"
          >
            —
          </m.div>
        ) : (
          classes.map((c) => (
            <m.article
              key={`${c.day}-${c.time}-${c.name}`}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: EASE_MISSION }}
              className={`rounded-md border px-3 py-2 ${DISCIPLINE_COLORS[c.discipline]}`}
            >
              <div className="font-display text-xs uppercase tracking-wider opacity-80">
                {c.displayTime}
              </div>
              <div className="mt-1 text-sm font-medium leading-tight">
                {c.name}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-wider opacity-60">
                {DISCIPLINE_LABELS[c.discipline]}
              </div>
            </m.article>
          ))
        )}
      </AnimatePresence>
    </div>
  );
}
