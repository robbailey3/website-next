import RecentlyPlayed from '@/features/spotify/components/recently-played/recently-played';
import SpotifyHeader from '@/features/spotify/components/spotify-header/spotify-header';
import spotifyAuthService from '@/features/spotify/services/spotify-auth.service';
import spotifyPlayerService from '@/features/spotify/services/spotify-player.service';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const SpotifyPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!spotifyAuthService.isLoggedIn()) {
      router.push('/api/spotify/auth/login');
    } else {
      spotifyPlayerService.injectScript();
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative">
      <SpotifyHeader />
      <RecentlyPlayed />
    </div>
  );
};

export default SpotifyPage;
