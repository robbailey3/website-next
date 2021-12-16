import { useEffect, useState } from 'react';
import { useSpotify } from '../../context/spotify.context';

const Player = () => {
  const { player } = useSpotify();

  const [playbackState, setPlaybackState] = useState<Spotify.PlaybackState>();

  useEffect(() => {
    const $subscription = player.$playbackState.subscribe((state) => {
      setPlaybackState(state);
    });
    return () => {
      if ($subscription) {
        $subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <div className="fixed bottom-0 right-0 z-50 p-12">
      <h1>Player</h1>
      <pre>{JSON.stringify(playbackState, null, 2)}</pre>
    </div>
  );
};

export default Player;
