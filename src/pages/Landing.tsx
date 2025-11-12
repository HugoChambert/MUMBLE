import { useState, useEffect, useRef } from 'react';
import { getSpotifyAuthUrl } from '../lib/spotify';
import styles from './Landing.module.css';

export const Landing = () => {
  const [isHowItWorksVisible, setIsHowItWorksVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const howItWorksRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsHowItWorksVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (howItWorksRef.current) {
      observer.observe(howItWorksRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSignIn = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  const handleScrollDown = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.noodleBackground}>
        <div
          className={styles.noodle1}
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px) rotateX(${mousePosition.y * 15}deg) rotateY(${mousePosition.x * 15}deg)`,
          }}
        />
        <div
          className={styles.noodle2}
          style={{
            transform: `translate(${mousePosition.x * -25}px, ${mousePosition.y * -25}px) rotateX(${mousePosition.y * -12}deg) rotateY(${mousePosition.x * -12}deg)`,
          }}
        />
        <div
          className={styles.noodle3}
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * -20}px) rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg)`,
          }}
        />
        <div
          className={styles.noodle4}
          style={{
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * 25}px) rotateX(${mousePosition.y * -8}deg) rotateY(${mousePosition.x * 8}deg)`,
          }}
        />
      </div>

      <div className={styles.heroSection}>
        <div className={styles.content}>
          <div className={styles.logoContainer}>
            <h1 className={styles.logo}>
              MUMBLE
            </h1>
            <div className={styles.tagline}>Discover music from around the world</div>
          </div>

          <p className={styles.description}>
            Connect your Spotify account and explore curated playlists
            tailored to any country and genre you desire.
          </p>

          <button onClick={handleSignIn} className={styles.signInButton}>
            <svg className={styles.spotifyIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Sign in with Spotify
          </button>

          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <div className={styles.featureText}>Explore global music scenes</div>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 18V5l12-2v13M9 18c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm12-2c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"/>
                </svg>
              </div>
              <div className={styles.featureText}>Discover new genres</div>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M9 10h6M9 14h6"/>
                </svg>
              </div>
              <div className={styles.featureText}>Curated playlists</div>
            </div>
          </div>
        </div>

        <button
          onClick={handleScrollDown}
          className={styles.scrollIndicator}
          aria-label="Scroll down"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </button>
      </div>

      <section
        ref={howItWorksRef}
        className={`${styles.howItWorks} ${isHowItWorksVisible ? styles.visible : ''}`}
      >
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>01</div>
            <div className={styles.stepIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </div>
            <h3 className={styles.stepTitle}>Connect</h3>
            <p className={styles.stepDescription}>
              Sign in with your Spotify account to get started. Your credentials remain secure.
            </p>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>02</div>
            <div className={styles.stepIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/>
              </svg>
            </div>
            <h3 className={styles.stepTitle}>Choose</h3>
            <p className={styles.stepDescription}>
              Enter any country and genre combination. From Brazilian Jazz to Korean Hip-Hop.
            </p>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>03</div>
            <div className={styles.stepIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <path d="M22 4L12 14.01l-3-3"/>
              </svg>
            </div>
            <h3 className={styles.stepTitle}>Discover</h3>
            <p className={styles.stepDescription}>
              We curate a playlist instantly and add it to your Spotify library. Start listening.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
