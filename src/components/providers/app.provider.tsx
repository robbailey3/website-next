import { SpotifyProvider } from '@/features/spotify/context/spotify.context';

const AppProvider = (props: { children: JSX.Element | JSX.Element[] }) => {
  const { children } = props;
  return <SpotifyProvider>{children}</SpotifyProvider>;
};

export default AppProvider;
