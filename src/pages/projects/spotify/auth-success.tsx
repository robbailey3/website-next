import spotifyService from '@/features/spotify/services/spotify.service';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AuthSuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    console.log({ router });
    const { access_token, refresh_token, expires_in } = router.query;
    spotifyService.saveAuthTokens(
      access_token as string,
      refresh_token as string,
      expires_in as string
    );
    router.push('/projects/spotify');
  });

  return null;
};

export default AuthSuccessPage;
