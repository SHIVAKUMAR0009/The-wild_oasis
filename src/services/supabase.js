import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://fwmejnmvtfhwycgpadfi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3bWVqbm12dGZod3ljZ3BhZGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM4MjA4NDIsImV4cCI6MjAwOTM5Njg0Mn0.65bRVMiJ7cxzcoIn1DGtIa1i7qXo0ZvrNTLXf67yckk";
const supabase = createClient(supabaseUrl, supabaseKey);
export { supabase };
