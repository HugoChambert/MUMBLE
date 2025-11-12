import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseSpotifyCallback, getSpotifyUser } from '../lib/spotify';
import { supabase } from '../lib/supabase';
import styles from './Callback.module.css';

export const Callback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { accessToken, expiresIn } = parseSpotifyCallback(window.location.hash);

        if (!accessToken) {
          throw new Error('No access token received');
        }

        const spotifyUser = await getSpotifyUser(accessToken);

        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email: `${spotifyUser.id}@spotify.mumble.app`,
          password: crypto.randomUUID(),
        });

        if (signUpError && signUpError.message !== 'User already registered') {
          throw signUpError;
        }

        const userId = authData.user?.id;

        if (!userId) {
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email: `${spotifyUser.id}@spotify.mumble.app`,
            password: crypto.randomUUID(),
          });

          if (signInError) {
            throw new Error('Authentication failed');
          }
        }

        const session = await supabase.auth.getSession();
        const currentUserId = session.data.session?.user?.id;

        if (!currentUserId) {
          throw new Error('Failed to get user session');
        }

        const expiresAt = new Date(Date.now() + parseInt(expiresIn || '3600') * 1000).toISOString();

        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: currentUserId,
            spotify_user_id: spotifyUser.id,
            display_name: spotifyUser.display_name,
            email: spotifyUser.email,
            spotify_access_token: accessToken,
            token_expires_at: expiresAt,
            updated_at: new Date().toISOString(),
          });

        if (profileError) {
          throw profileError;
        }

        navigate('/dashboard');
      } catch (err) {
        console.error('Callback error:', err);
        setError(err instanceof Error ? err.message : 'Authentication failed');
      }
    };

    handleCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Authentication Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/')} className={styles.button}>
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Connecting to Spotify...</p>
      </div>
    </div>
  );
};
