import { useSpotify } from '@/features/spotify/context/spotify.context';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AuthSuccessPage = () => {
  const router = useRouter();

  const { auth } = useSpotify();

  useEffect(() => {
    const { access_token, refresh_token, expires_in } = router.query;
    auth.login(
      access_token as string,
      parseInt(expires_in as string, 10),
      refresh_token as string
    );
    router.push('/projects/spotify');
  });

  return null;
};

export default AuthSuccessPage;
