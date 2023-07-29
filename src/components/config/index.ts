import { createClient } from "@supabase/supabase-js";

export namespace cfg {
  export const KILOBYTE = 1024;
  export const MEGABYTE = KILOBYTE * KILOBYTE;
  export const MAX_IMG_SIZE_IN_MEGABYTE = 4;
  export const HOURS = 60 * 60 * 1000;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Supabase URL or Key is missing in the environment variables."
    );
  }
  export const supabase = createClient(supabaseUrl, supabaseKey);
}
