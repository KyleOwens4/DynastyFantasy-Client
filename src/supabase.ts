import { createClient } from "@supabase/supabase-js";

console.log(import.meta.env);
export const SUPABASE_URL =
  import.meta.env.SUPABSE_URL ?? "http://127.0.0.1:54321";
export const SUPABASE_ANON_KEY = import.meta.env.SUPABASE_ANON_KEY ?? "FAIL";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
