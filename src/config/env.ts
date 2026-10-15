import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  CONTENT_SOURCE: z.enum(["source", "database"]).default("source"),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().optional().default(""),
  TURNSTILE_SECRET_KEY: z.string().optional().default(""),
  SUPABASE_URL: z.string().url().optional().or(z.literal("")),
  SUPABASE_PUBLISHABLE_KEY: z.string().optional().default(""),
  SUPABASE_SECRET_KEY: z.string().optional().default(""),
  RESEND_API_KEY: z.string().optional().default(""),
  LEAD_NOTIFY_TO: z.string().email().optional().or(z.literal("")),
  LEAD_NOTIFY_FROM: z.string().optional().default("")
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  CONTENT_SOURCE: process.env.CONTENT_SOURCE,
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY: process.env.SUPABASE_PUBLISHABLE_KEY,
  SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  LEAD_NOTIFY_TO: process.env.LEAD_NOTIFY_TO,
  LEAD_NOTIFY_FROM: process.env.LEAD_NOTIFY_FROM
});
