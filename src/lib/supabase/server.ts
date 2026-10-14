import "server-only";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/config/env";

export function getSupabaseAdmin() {
  if (!env.SUPABASE_URL || !env.SUPABASE_SECRET_KEY) return null;
  return createClient(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}
