import SpotifyHeader from '@/features/spotify/component/spotify-header/spotify-header';
import spotifyAuthService from '@/features/spotify/services/spotify-auth.service';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const SpotifyPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!spotifyAuthService.isLoggedIn()) {
      router.push('/api/spotify/auth/login');
    }
  }, [router]);

  return (
    <div className="relative">
      <SpotifyHeader></SpotifyHeader>
    </div>
  );
};

export default SpotifyPage;
