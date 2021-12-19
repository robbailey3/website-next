import UserPlaylists from '@/features/spotify/components/user-playlists/user-playlists';
import RecentlyPlayed from '@/features/spotify/components/recently-played/recently-played';
import SpotifyHeader from '@/features/spotify/components/spotify-header/spotify-header';
import React from 'react';

const SpotifyPage = () => {
  return (
    <div className="relative">
      <SpotifyHeader />
      <RecentlyPlayed />
      <UserPlaylists />
    </div>
  );
};

export default SpotifyPage;
