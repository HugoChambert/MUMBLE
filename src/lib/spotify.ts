const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

export const getSpotifyAuthUrl = async () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const response = await fetch(`${supabaseUrl}/functions/v1/spotify-auth?action=login`);

  if (!response.ok) {
    throw new Error('Failed to get Spotify auth URL');
  }

  const data = await response.json();
  return data.url;
};

export const parseSpotifyCallback = (hash: string) => {
  const params = new URLSearchParams(hash.substring(1));
  return {
    accessToken: params.get('access_token'),
    expiresIn: params.get('expires_in'),
  };
};

export const getSpotifyUser = async (accessToken: string) => {
  const response = await fetch(`${SPOTIFY_API_BASE}/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return response.json();
};

export const searchSpotifyTracks = async (
  accessToken: string,
  query: string,
  limit = 50
) => {
  const params = new URLSearchParams({
    q: query,
    type: 'track',
    limit: limit.toString(),
  });

  const response = await fetch(`${SPOTIFY_API_BASE}/search?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to search tracks');
  }

  return response.json();
};

export const createPlaylist = async (
  accessToken: string,
  userId: string,
  name: string,
  description: string
) => {
  const response = await fetch(`${SPOTIFY_API_BASE}/users/${userId}/playlists`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
      public: false,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create playlist');
  }

  return response.json();
};

export const addTracksToPlaylist = async (
  accessToken: string,
  playlistId: string,
  trackUris: string[]
) => {
  const response = await fetch(
    `${SPOTIFY_API_BASE}/playlists/${playlistId}/tracks`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uris: trackUris,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to add tracks to playlist');
  }

  return response.json();
};
