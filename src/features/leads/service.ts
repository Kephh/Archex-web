import "server-only";
import { env } from "@/config/env";
import { leadInsertSchema, leadSchema } from "@/features/leads/schema";
import { sendLeadNotification } from "@/lib/email/leads";
import { getSupabaseAdmin } from "@/lib/supabase/server";

async function verifyTurnstile(token?: string) {
  if (!env.TURNSTILE_SECRET_KEY) return true;
  if (!token) return false;

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token })
    });
    if (!response.ok) return false;
    const result = (await response.json()) as { success?: boolean };
    return Boolean(result.success);
  } catch {
    return false;
  }
}

export async function createLead(payload: unknown) {
  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success) {
    return { ok: false as const, status: 400, message: "Please check the highlighted fields." };
  }

  if (parsed.data.website) {
    return { ok: true as const, status: 202, message: "Thanks. We received your enquiry." };
  }

  const turnstileOk = await verifyTurnstile(parsed.data.turnstileToken);
  if (!turnstileOk) {
    return { ok: false as const, status: 400, message: "Spam protection could not be verified." };
  }

  const lead = leadInsertSchema.parse(parsed.data);
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    if (process.env.NODE_ENV === "production") {
      return { ok: false as const, status: 503, message: "Enquiries are temporarily unavailable." };
    }
    return {
      ok: true as const,
      status: 202,
      message: "Development mode: lead validated, but Supabase is not configured."
    };
  }

  const { error } = await supabase.from("leads").insert(lead);
  if (error) {
    console.error("Lead persistence failed", error);
    return {
      ok: false as const,
      status: 503,
      message: "We could not save your enquiry. Please try again."
    };
  }

  try {
    const notification = await sendLeadNotification(lead);
    if (!notification.ok) {
      return {
        ok: true as const,
        status: 202,
        message: "Thanks. We saved your enquiry, but the notification email needs attention."
      };
    }
  } catch {
    return {
      ok: true as const,
      status: 202,
      message: "Thanks. We saved your enquiry, but the notification email needs attention."
    };
  }

  return { ok: true as const, status: 201, message: "Thanks. We received your enquiry." };
}
