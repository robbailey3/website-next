import SpotifyHeader from '@/features/spotify/component/spotify-header/spotify-header';
import { CurrentUser } from '@/features/spotify/interfaces/CurrentUser';
import spotifyService from '@/features/spotify/services/spotify-auth.service';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const SpotifyPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!spotifyService.isLoggedIn()) {
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
