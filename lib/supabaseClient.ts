import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://supa.morr.biz";
const SUPABASE_ANON_KEY =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc0MTU5MzMwMCwiZXhwIjo0ODk3MjY2OTAwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.S1tZgZyYmzdeiR4aqwSjcc42RTScan9dI87lB04q2c4";

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabaseClient;
