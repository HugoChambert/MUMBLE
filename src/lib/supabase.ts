import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Profile {
  id: string;
  spotify_user_id: string | null;
  display_name: string | null;
  email: string | null;
  spotify_access_token: string | null;
  spotify_refresh_token: string | null;
  token_expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Playlist {
  id: string;
  user_id: string;
  country: string;
  genre: string;
  spotify_playlist_id: string | null;
  playlist_name: string | null;
  track_count: number;
  created_at: string;
}
