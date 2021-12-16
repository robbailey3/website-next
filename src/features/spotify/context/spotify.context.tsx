import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
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

  const isSpotifyPage = () => {
    return router.pathname.includes('/projects/spotify');
  };

  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await spotifyAuthService.isLoggedIn();
      if (!isLoggedIn) {
        window.location.replace('/api/spotify/auth/login');
      }
      spotifyPlayerService.injectScript();
      spotifyPlayerService.$playerState.subscribe((state) => {
        console.log(state);
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
  }, [router.pathname]);

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
