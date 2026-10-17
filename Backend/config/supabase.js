import { createClient } from "@supabase/supabase-js";

let client = null;
if (process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY) {
  try {
    client = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SECRET_KEY
    );
  } catch (err) {
    console.warn("Failed to initialize Supabase client:", err.message);
  }
}

export const supabase = client;
export const getSupabase = () => client;
export default client;
