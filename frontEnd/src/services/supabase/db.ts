// Supabase client singleton for database operations
// Import this client in any component/service that needs database access

import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import {
  supabaseConfig,
  validateSupabaseConfig,
} from '@/services/supabase/config'

// Validate environment variables on initialization
validateSupabaseConfig()

/**
 * Supabase client instance
 * Configured with environment variables from .env file
 *
 * Auth uses PKCE flow for security: OAuth redirects receive a temporary
 * `code` parameter instead of exposing access_token in the URL hash.
 *
 * Usage example:
 * ```typescript
 * import { supabase } from '@/services/supabase/db'
 *
 * const { data, error } = await supabase
 *   .from('users')
 *   .select('*')
 * ```
 */
export const supabase: SupabaseClient = createClient(
  supabaseConfig.url,
  supabaseConfig.anonKey,
  {
    auth: {
      flowType: 'pkce',
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
)
