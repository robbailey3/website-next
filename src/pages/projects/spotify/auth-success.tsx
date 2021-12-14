import spotifyService from '@/features/spotify/services/spotify-auth.service';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AuthSuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    const { access_token, refresh_token, expires_in } = router.query;
    spotifyService.login(
      access_token as string,
      parseInt(expires_in as string, 10),
      refresh_token as string
    );
    router.push('/projects/spotify');
  });

  return null;
};

export default AuthSuccessPage;
