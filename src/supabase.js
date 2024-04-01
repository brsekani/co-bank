import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kmsjwcxsqzvspglyabew.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttc2p3Y3hzcXp2c3BnbHlhYmV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE5NjA0MjksImV4cCI6MjAyNzUzNjQyOX0.5v19Yc-tstFFzmcFqHqsm9cDha7OFyxNuqeYFGSunYg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
