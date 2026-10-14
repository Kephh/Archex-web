"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { leadSchema, projectTypes, type LeadInput } from "@/features/leads/schema";
import { Button } from "@/components/ui/button";
import { TurnstileField } from "@/components/forms/turnstile-field";

const projectLabels: Record<(typeof projectTypes)[number], string> = {
  "new-product": "New product or application",
  "ai-integration": "AI integration",
  modernization: "Modernization",
  "ongoing-engineering": "Ongoing engineering",
  "not-sure": "Not sure yet"
};

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-2 text-sm text-danger">{message}</p> : null;
}

function RequiredMark() {
  return (
    <span className="required-mark ml-1" aria-hidden="true">
      *
    </span>
  );
}

export function EnquiryForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      projectType: "not-sure",
      privacy: false,
      website: "",
      turnstileToken: ""
    }
  });

  async function onSubmit(values: LeadInput) {
    setStatus(null);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values)
      });
      const result = (await response.json()) as { ok: boolean; message: string };
      if (result.ok) {
        reset();
      }
      setStatus({ type: result.ok ? "success" : "error", message: result.message });
    } catch {
      setStatus({ type: "error", message: "We could not send your enquiry. Please try again." });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-5 rounded-md border border-border bg-surface p-5 sm:p-7"
      noValidate
    >
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Name<RequiredMark />
          <input
            className="mt-2 w-full rounded-md border border-border px-3 py-3 transition focus:border-forest focus:outline-none"
            {...register("name")}
          />
          <FieldError message={errors.name?.message} />
        </label>
        <label className="text-sm font-medium">
          Work email<RequiredMark />
          <input
            className="mt-2 w-full rounded-md border border-border px-3 py-3 transition focus:border-forest focus:outline-none"
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </label>
      </div>
      <label className="text-sm font-medium">
        Company<RequiredMark />
        <input
          className="mt-2 w-full rounded-md border border-border px-3 py-3 transition focus:border-forest focus:outline-none"
          {...register("company")}
        />
        <FieldError message={errors.company?.message} />
      </label>
      {!compact ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-medium">
            Budget range
            <input
              className="mt-2 w-full rounded-md border border-border px-3 py-3 transition focus:border-forest focus:outline-none"
              {...register("budgetRange")}
            />
          </label>
          <label className="text-sm font-medium">
            Desired start
            <input
              className="mt-2 w-full rounded-md border border-border px-3 py-3 transition focus:border-forest focus:outline-none"
              {...register("desiredStart")}
            />
          </label>
        </div>
      ) : null}
      <label className="text-sm font-medium">
        Project type<RequiredMark />
        <select
          className="mt-2 w-full rounded-md border border-border px-3 py-3 transition focus:border-forest focus:outline-none"
          {...register("projectType")}
        >
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {projectLabels[type]}
            </option>
          ))}
        </select>
        <FieldError message={errors.projectType?.message} />
      </label>
      <label className="text-sm font-medium">
        Describe the challenge<RequiredMark />
        <textarea
          className="mt-2 min-h-36 w-full rounded-md border border-border px-3 py-3 transition focus:border-forest focus:outline-none"
          {...register("message")}
        />
        <FieldError message={errors.message?.message} />
      </label>
      {!compact ? (
        <label className="text-sm font-medium">
          Preferred contact method
          <input
            className="mt-2 w-full rounded-md border border-border px-3 py-3 transition focus:border-forest focus:outline-none"
            {...register("contactMethod")}
          />
        </label>
      ) : null}
      <label className="flex gap-3 text-sm leading-6 text-muted">
        <input type="checkbox" className="mt-1 h-4 w-4" {...register("privacy")} />
        <span>
          <RequiredMark />I understand
        Archex will use my details to respond, and that this enquiry may be stored in Supabase as
        described in the privacy policy.
        </span>
      </label>
      <FieldError message={errors.privacy?.message} />
      <TurnstileField
        onToken={(token) => setValue("turnstileToken", token, { shouldValidate: true })}
      />
      <input type="hidden" {...register("turnstileToken")} />
      {status ? (
        <div
          role="status"
          aria-live="polite"
          className={
            status.type === "success"
              ? "rounded-md bg-success/15 p-4 text-sm"
              : "rounded-md bg-danger/15 p-4 text-sm"
          }
        >
          {status.message}
        </div>
      ) : null}
      <Button type="submit" disabled={isSubmitting} busy={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send enquiry"}
      </Button>
    </form>
  );
}
