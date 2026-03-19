import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return url.length > 10 && !url.includes("placeholder");
}

// Demo credentials
export const DEMO_EMAIL = "test@dhun.app";
export const DEMO_PASSWORD = "demo1234";
export const DEMO_COOKIE = "dhun_demo";
