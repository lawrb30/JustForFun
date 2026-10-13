import { createClient } from "@supabase/supabase-js";

// Uses the service role key, so import this ONLY from server code
// (route handlers, server actions). Never from a "use client" file.
export const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
);