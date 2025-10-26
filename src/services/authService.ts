import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://ajdejrfprzdiokljhhxy.supabase.co";
const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqZGVqcmZwcnpkaW9rbGpoaHh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwOTM3OTAsImV4cCI6MjA3NjY2OTc5MH0.ZlVdeY9btALGIBWgpDUUA1utO2XYjnjiXrU0g-hJphQ";

export const supabase = createClient(supabaseUrl, supabaseKey);

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};
