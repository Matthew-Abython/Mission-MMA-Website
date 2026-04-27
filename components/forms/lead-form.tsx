"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

import { LeadInputSchema, type LeadInput } from "@/lib/lead-schema";
import { submitLead } from "@/app/actions/submit-lead";

type Variant = "standard" | "compact";
type Status = "idle" | "submitting" | "success" | "error";

export interface LeadFormProps {
  source: string;
  defaultInterest?: string;
  variant?: Variant;
  className?: string;
}

export function LeadForm({
  source,
  defaultInterest,
  variant = "standard",
  className = "",
}: LeadFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const reduced = useReducedMotion();

  // Cast to ZodType<LeadInput> so the resolver has a consistent type regardless of variant.
  // The compact schema uses .default("") so lastName is always a string at runtime.
  const schema = (
    variant === "compact"
      ? LeadInputSchema.extend({ lastName: z.string().optional().default("") })
      : LeadInputSchema
  ) as z.ZodType<LeadInput>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      interest: defaultInterest,
      source,
    },
    mode: "onSubmit",
  });

  const onSubmit = async (values: LeadInput) => {
    setStatus("submitting");
    setErrorMessage(null);

    try {
      const payload: LeadInput = {
        ...values,
        lastName: values.lastName?.trim() ? values.lastName : "—",
        interest: defaultInterest ?? values.interest,
        source,
      };

      const result = await submitLead(payload);

      if (result.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
        setErrorMessage(result.error);
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong. Please try again or call 312-265-1856.",
      );
    }
  };

  if (status === "success") {
    return (
      <m.div
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`rounded-lg border border-mission-red/40 bg-mission-red/5 p-6 text-center ${className}`}
      >
        <CheckCircle2
          className="mx-auto h-10 w-10 text-mission-red"
          aria-hidden="true"
          strokeWidth={1.5}
        />
        <h3 className="mt-3 font-display text-xl uppercase text-mission-white">
          Got it
        </h3>
        <p className="mt-2 text-sm text-mission-gray-300">
          We&apos;ll text you within 24 hours to schedule your free class.
        </p>
      </m.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-4 ${className}`}
      noValidate
      aria-label="Free trial signup"
    >
      <input type="hidden" {...register("interest")} value={defaultInterest ?? ""} />
      <input type="hidden" {...register("source")} value={source} />

      <FormField
        id={`${source}-firstName`}
        label="First name"
        error={errors.firstName?.message}
        register={register("firstName")}
      />

      {variant === "standard" && (
        <FormField
          id={`${source}-lastName`}
          label="Last name"
          error={errors.lastName?.message}
          register={register("lastName")}
        />
      )}

      <FormField
        id={`${source}-phone`}
        label="Phone"
        type="tel"
        autoComplete="tel"
        error={errors.phone?.message}
        register={register("phone")}
      />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="relative inline-flex w-full items-center justify-center rounded-md bg-mission-red px-6 py-3 font-bold uppercase tracking-wider text-mission-white transition-colors hover:bg-mission-red-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-mission-white focus-visible:ring-offset-2 focus-visible:ring-offset-mission-black disabled:opacity-70"
      >
        <AnimatePresence mode="wait" initial={false}>
          {status === "submitting" ? (
            <m.span
              key="submitting"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2"
            >
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </m.span>
          ) : (
            <m.span
              key="idle"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              Get Started
            </m.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {status === "error" && errorMessage && (
          <m.div
            initial={reduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduced ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-start gap-2 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300"
            role="alert"
          >
            <AlertCircle
              className="mt-0.5 h-4 w-4 shrink-0"
              aria-hidden="true"
              strokeWidth={2}
            />
            <span>{errorMessage}</span>
          </m.div>
        )}
      </AnimatePresence>

      <p className="text-xs text-mission-gray-500">
        We&apos;ll text within 24 hours. By submitting you agree to receive SMS
        messages from Mission MMA &amp; Fitness.
      </p>
    </form>
  );
}

// Internal field component with animated error slide-in
function FormField({
  id,
  label,
  type = "text",
  autoComplete,
  error,
  register,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  error?: string;
  // The type returned by calling .register(fieldName)
  register: ReturnType<ReturnType<typeof useForm<LeadInput>>["register"]>;
}) {
  const reduced = useReducedMotion();

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-mission-white"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full rounded-md border border-white/10 bg-mission-black px-3 py-2.5 text-mission-white placeholder:text-mission-gray-500 focus:border-mission-red focus:outline-none focus:ring-1 focus:ring-mission-red"
        {...register}
      />
      <AnimatePresence>
        {error && (
          <m.p
            id={`${id}-error`}
            initial={reduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduced ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-red-400"
            role="alert"
          >
            {error}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
}
