
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'YOUR_SUPABASE_PROJECT_URL'
const supabaseKey = 'YOUR_SUPABASE_API_KEY'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;