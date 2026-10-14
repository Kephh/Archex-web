import "server-only";
import { Resend } from "resend";
import { env } from "@/config/env";

type LeadEmail = {
  name: string;
  email: string;
  company: string;
  project_type: string;
  message: string;
  budget_range: string | null;
  desired_start: string | null;
  contact_method: string | null;
};

export async function sendLeadNotification(lead: LeadEmail) {
  if (!env.RESEND_API_KEY || !env.LEAD_NOTIFY_TO || !env.LEAD_NOTIFY_FROM) {
    return { ok: true as const, skipped: true, reason: "Resend notification is not configured." };
  }

  const resend = new Resend(env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: env.LEAD_NOTIFY_FROM,
    to: env.LEAD_NOTIFY_TO,
    subject: `New project enquiry from ${lead.company}`,
    text: [
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Company: ${lead.company}`,
      `Project type: ${lead.project_type}`,
      `Budget: ${lead.budget_range || "Not provided"}`,
      `Desired start: ${lead.desired_start || "Not provided"}`,
      `Preferred contact method: ${lead.contact_method || "Not provided"}`,
      "",
      lead.message
    ].join("\n")
  });

  if (error || !data?.id) return { ok: false as const };
  return { ok: true as const, skipped: false };
}
