"use client";

import { useState } from "react";
import {
  Calendar,
  CalendarGrid,
  CalendarCell,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarGridBody,
  Heading,
  Button,
} from "react-aria-components";
import {
  today,
  getLocalTimeZone,
  getDayOfWeek,
  type DateValue,
  type CalendarDate,
} from "@internationalized/date";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Valid email required"),
});

type FormValues = z.infer<typeof schema>;

// getDayOfWeek returns 0=Sun,1=Mon,...,4=Thu,...,6=Sat for "en-US" locale
function getClassInfo(date: CalendarDate) {
  if (getDayOfWeek(date, "en-US") === 1) {
    return { label: "Muay Thai Free Trial", time: "5:30 PM", class: "Muay Thai Free Trial" };
  }
  return { label: "Brazilian Jiu-Jitsu Free Trial", time: "7:30 PM", class: "BJJ Free Trial" };
}

export function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const minValue = today(getLocalTimeZone());

  const isDateUnavailable = (date: DateValue) => {
    const dow = getDayOfWeek(date, "en-US");
    return dow !== 1 && dow !== 4;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const classInfo = selectedDate ? getClassInfo(selectedDate) : null;

  const onSubmit = async (values: FormValues) => {
    if (!selectedDate || !classInfo) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_N8N_BOOKING_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          selectedDate: selectedDate.toString(),
          selectedClass: classInfo.class,
          selectedTime: classInfo.time,
        }),
      });
      if (!res.ok) throw new Error("Bad response");
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitState === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-lg bg-white/5 border border-white/10 p-10 text-center">
        <CheckCircle className="h-12 w-12 text-green-400" aria-hidden="true" />
        <p className="text-lg font-medium text-mission-white">
          You&apos;re booked! We&apos;ll confirm via email within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Calendar */}
      <div className="flex justify-center">
        <Calendar
          minValue={minValue}
          isDateUnavailable={isDateUnavailable}
          value={selectedDate}
          onChange={(date) => setSelectedDate(date as CalendarDate)}
          aria-label="Select a trial class date"
        >
          <div className="w-full max-w-sm rounded-lg bg-white/5 border border-white/10 p-5">
            {/* Calendar header */}
            <div className="mb-4 flex items-center justify-between">
              <Button
                slot="previous"
                className="rounded-md p-1.5 text-mission-gray-300 transition-colors hover:text-mission-white focus:outline-none focus-visible:ring-2 focus-visible:ring-mission-red"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </Button>
              <Heading className="font-display text-sm uppercase tracking-wider text-mission-white" />
              <Button
                slot="next"
                className="rounded-md p-1.5 text-mission-gray-300 transition-colors hover:text-mission-white focus:outline-none focus-visible:ring-2 focus-visible:ring-mission-red"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>

            <CalendarGrid>
              <CalendarGridHeader>
                {(day) => (
                  <CalendarHeaderCell className="pb-2 text-center text-xs font-medium uppercase tracking-wider text-mission-gray-500">
                    {day}
                  </CalendarHeaderCell>
                )}
              </CalendarGridHeader>
              <CalendarGridBody>
                {(date) => (
                  <CalendarCell
                    date={date}
                    className={[
                      "mx-auto flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-sm transition-colors",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-mission-red",
                      "data-[unavailable]:opacity-30 data-[unavailable]:cursor-not-allowed",
                      "data-[outside-month]:opacity-20",
                      "data-[selected]:bg-mission-red data-[selected]:text-mission-white data-[selected]:font-bold",
                      "data-[hovered]:bg-white/10 data-[hovered]:text-mission-white",
                      "text-mission-gray-300",
                    ].join(" ")}
                  />
                )}
              </CalendarGridBody>
            </CalendarGrid>
          </div>
        </Calendar>
      </div>

      {/* Class info + form — shown after date selection */}
      {selectedDate && classInfo && (
        <div className="space-y-6">
          <div className="rounded-md bg-white/5 border border-white/10 px-5 py-4 text-center">
            <p className="font-display text-lg uppercase tracking-wider text-mission-red">
              {classInfo.label}
            </p>
            <p className="mt-1 text-sm text-mission-gray-300">{classInfo.time}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-mission-white"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  autoComplete="given-name"
                  {...register("firstName")}
                  className="block w-full rounded-md border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-mission-white placeholder-mission-gray-500 transition-colors focus:border-mission-red focus:outline-none focus:ring-1 focus:ring-mission-red"
                  placeholder="Jane"
                />
                {errors.firstName && (
                  <p className="text-xs text-mission-red">{errors.firstName.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-mission-white"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  autoComplete="family-name"
                  {...register("lastName")}
                  className="block w-full rounded-md border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-mission-white placeholder-mission-gray-500 transition-colors focus:border-mission-red focus:outline-none focus:ring-1 focus:ring-mission-red"
                  placeholder="Smith"
                />
                {errors.lastName && (
                  <p className="text-xs text-mission-red">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-mission-white"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                className="block w-full rounded-md border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-mission-white placeholder-mission-gray-500 transition-colors focus:border-mission-red focus:outline-none focus:ring-1 focus:ring-mission-red"
                placeholder="jane@example.com"
              />
              {errors.email && (
                <p className="text-xs text-mission-red">{errors.email.message}</p>
              )}
            </div>

            {submitState === "error" && (
              <div className="flex items-start gap-3 rounded-md border border-mission-red/40 bg-mission-red/10 px-4 py-3">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-mission-red" aria-hidden="true" />
                <p className="text-sm text-mission-white">
                  Something went wrong. Please call us at{" "}
                  <a href="tel:3122651856" className="font-medium text-mission-red hover:underline">
                    312-265-1856
                  </a>
                  .
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-mission-red px-6 py-3 text-sm font-bold uppercase tracking-wider text-mission-white transition-colors hover:bg-mission-red-dark disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Booking…" : "Confirm Booking"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
