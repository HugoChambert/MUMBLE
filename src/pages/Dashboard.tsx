import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Playlist } from '../lib/supabase';
import { searchSpotifyTracks, createPlaylist, addTracksToPlaylist } from '../lib/spotify';
import styles from './Dashboard.module.css';

export const Dashboard = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [country, setCountry] = useState('');
  const [genre, setGenre] = useState('');
  const [loading, setLoading] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    fetchPlaylists();
  }, [user, navigate]);

  const fetchPlaylists = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('playlists')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPlaylists(data);
    }
  };

  const handleCreatePlaylist = async () => {
    if (!country.trim() || !genre.trim()) {
      setError('Please enter both country and genre');
      return;
    }

    if (!profile?.spotify_access_token) {
      setError('Spotify access token not found. Please sign in again.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const searchQuery = `genre:"${genre}" country:"${country}"`;
      const searchResults = await searchSpotifyTracks(
        profile.spotify_access_token,
        searchQuery,
        30
      );

      const tracks = searchResults.tracks?.items || [];

      if (tracks.length === 0) {
        setError('No tracks found for this country and genre combination. Try different keywords.');
        setLoading(false);
        return;
      }

      const playlistName = `${country} ${genre} - MUMBLE`;
      const playlistDescription = `Curated playlist featuring ${genre} from ${country}. Created by MUMBLE.`;

      const newPlaylist = await createPlaylist(
        profile.spotify_access_token,
        profile.spotify_user_id!,
        playlistName,
        playlistDescription
      );

      const trackUris = tracks.map((track: any) => track.uri);
      await addTracksToPlaylist(
        profile.spotify_access_token,
        newPlaylist.id,
        trackUris
      );

      const { error: dbError } = await supabase.from('playlists').insert({
        user_id: user!.id,
        country: country.trim(),
        genre: genre.trim(),
        spotify_playlist_id: newPlaylist.id,
        playlist_name: playlistName,
        track_count: tracks.length,
      });

      if (dbError) {
        console.error('Failed to save playlist to database:', dbError);
      }

      await fetchPlaylists();
      setCountry('');
      setGenre('');
    } catch (err) {
      console.error('Playlist creation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to create playlist');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.logo}>MUMBLE</h1>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{profile?.display_name || 'User'}</span>
          <button onClick={handleSignOut} className={styles.signOutButton}>
            Sign Out
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.createSection}>
          <h2 className={styles.sectionTitle}>Create a Playlist</h2>
          <p className={styles.sectionDescription}>
            Discover music from any country and genre. We'll curate a perfect playlist for you.
          </p>

          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <label htmlFor="country" className={styles.label}>Country</label>
              <input
                id="country"
                type="text"
                placeholder="e.g., Brazil, Japan, Sweden"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={styles.input}
                disabled={loading}
              />
            </div>

            <div className={styles.inputWrapper}>
              <label htmlFor="genre" className={styles.label}>Genre / Podcast</label>
              <input
                id="genre"
                type="text"
                placeholder="e.g., Jazz, Rock, Pop, Comedy"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className={styles.input}
                disabled={loading}
              />
            </div>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button
            onClick={handleCreatePlaylist}
            disabled={loading || !country.trim() || !genre.trim()}
            className={styles.createButton}
          >
            {loading ? 'Creating Playlist...' : 'Create Playlist'}
          </button>
        </div>

        <div className={styles.playlistsSection}>
          <h2 className={styles.sectionTitle}>Your Playlists</h2>

          {playlists.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No playlists yet. Create your first one above!</p>
            </div>
          ) : (
            <div className={styles.playlistGrid}>
              {playlists.map((playlist) => (
                <div key={playlist.id} className={styles.playlistCard}>
                  <div className={styles.playlistIcon}>🎵</div>
                  <h3 className={styles.playlistName}>{playlist.playlist_name}</h3>
                  <div className={styles.playlistDetails}>
                    <span className={styles.playlistMeta}>
                      {playlist.country} • {playlist.genre}
                    </span>
                    <span className={styles.trackCount}>
                      {playlist.track_count} tracks
                    </span>
                  </div>
                  {playlist.spotify_playlist_id && (
                    <a
                      href={`https://open.spotify.com/playlist/${playlist.spotify_playlist_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.openButton}
                    >
                      Open in Spotify
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
