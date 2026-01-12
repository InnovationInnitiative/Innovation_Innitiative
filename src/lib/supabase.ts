
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // We don't throw error here to allow build to pass without env vars (e.g. CI)
  // But usage will fail
  console.warn('Missing Supabase environment variables')
}

console.log("Supabase Init - URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "Found" : "Missing");
console.log("Supabase Init - Key:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Found" : "Missing");

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
