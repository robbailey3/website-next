import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import spotifyAuthService from '../services/spotify-auth.service';
import spotifyPlayerService from '../services/spotify-player.service';
import spotifyService from '../services/spotify.service';

const initialState = {
  spotify: spotifyService,
  auth: spotifyAuthService,
  player: spotifyPlayerService,
};

const SpotifyContext = React.createContext(initialState);

const SpotifyProvider = (props: { children: JSX.Element | JSX.Element[] }) => {
  const { children } = props;

  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const isSpotifyPage = useCallback(() => {
    return (
      router.pathname.includes('/projects/spotify') &&
      !router.pathname.includes('/projects/spotify/auth-success')
    );
  }, [router.pathname]);

  useEffect(() => {
    console.log('USE EFFECT');
    const checkLogin = async () => {
      const isLoggedIn = await spotifyAuthService.isLoggedIn();
      if (!isLoggedIn) {
        console.log('Not logged in, redirecting to login');
        window.location.replace('/api/spotify/auth/login');
      }
      spotifyPlayerService.injectScript();
      spotifyPlayerService.$playerState.subscribe((state) => {
        if (state === 'ready') {
          spotifyService.transferPlayback([
            spotifyPlayerService.deviceId as string,
          ]);
          setLoading(false);
        }
      });
    };
    if (isSpotifyPage()) {
      checkLogin();
    }
  }, [isSpotifyPage, router.pathname]);

  if (loading && isSpotifyPage()) {
    return null;
  }

  return (
    <SpotifyContext.Provider value={initialState}>
      {children}
    </SpotifyContext.Provider>
  );
};

function useSpotify() {
  const context = React.useContext(SpotifyContext);
  if (context === undefined) {
    throw new Error('useSpotify needs to be used within a SpotifyProvider');
  }
  return context;
}

export { SpotifyProvider, useSpotify };
