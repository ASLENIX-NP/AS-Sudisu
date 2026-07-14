import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Vite only exposes variables prefixed with VITE_. If these are absent in a
// deployment, createClient would throw before React can render anything.
const missingSupabaseConfig = !supabaseUrl || !supabaseAnonKey;

if (missingSupabaseConfig) {
  console.error(
    "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in the deployment environment.",
  );
}

// The fallback keeps public, static pages usable and lets the console provide
// a useful configuration error instead of showing a blank white screen.
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key",
);

export { missingSupabaseConfig };
