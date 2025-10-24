import { createClient } from "@supabase/supabase-js";
import { supabaseKey, supabaseUrl } from "./constant";

export const supabase = createClient(supabaseUrl, supabaseKey);
