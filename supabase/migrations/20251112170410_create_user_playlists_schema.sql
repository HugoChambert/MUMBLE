/*
  # Create MUMBLE Database Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key) - References auth.users
      - `spotify_user_id` (text) - Spotify user identifier
      - `display_name` (text) - User's display name
      - `email` (text) - User's email
      - `spotify_access_token` (text) - Encrypted access token
      - `spotify_refresh_token` (text) - Encrypted refresh token
      - `token_expires_at` (timestamptz) - Token expiration time
      - `created_at` (timestamptz) - Account creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

    - `playlists`
      - `id` (uuid, primary key) - Unique playlist identifier
      - `user_id` (uuid) - References profiles.id
      - `country` (text) - Target country for playlist
      - `genre` (text) - Genre or podcast category
      - `spotify_playlist_id` (text) - Spotify playlist ID
      - `playlist_name` (text) - Generated playlist name
      - `track_count` (integer) - Number of tracks in playlist
      - `created_at` (timestamptz) - Creation timestamp

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Users can only access their own profiles and playlists

  3. Important Notes
    - Tokens are stored for Spotify API integration
    - Each playlist is tied to a specific user
    - Country and genre selections are tracked for analytics
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  spotify_user_id text UNIQUE,
  display_name text,
  email text,
  spotify_access_token text,
  spotify_refresh_token text,
  token_expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create playlists table
CREATE TABLE IF NOT EXISTS playlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  country text NOT NULL,
  genre text NOT NULL,
  spotify_playlist_id text,
  playlist_name text,
  track_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete own profile"
  ON profiles FOR DELETE
  TO authenticated
  USING (auth.uid() = id);

-- Playlists policies
CREATE POLICY "Users can view own playlists"
  ON playlists FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own playlists"
  ON playlists FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own playlists"
  ON playlists FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own playlists"
  ON playlists FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_playlists_user_id ON playlists(user_id);
CREATE INDEX IF NOT EXISTS idx_playlists_created_at ON playlists(created_at DESC);
