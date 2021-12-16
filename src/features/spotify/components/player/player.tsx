import Image from 'next/image';
import FlexContainer from '@/components/common/layout/flex-container/flex-container';
import Button from '@/components/common/button/button';
import {
  faPause,
  faPlay,
  faStepBackward,
  faStepForward,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSpotify } from '../../context/spotify.context';
import { Device } from '../../interfaces/Device';
import { Subscription } from 'rxjs';

const Player = () => {
  const { player, spotify } = useSpotify();

  const [playbackState, setPlaybackState] = useState<Spotify.PlaybackState>();

  const [playerReady, setPlayerReady] = useState<boolean>(false);

  const [deviceList, setDeviceList] = useState<Device[]>();

  const togglePlay = () => {
    player.togglePlay();
  };

  const nextTrack = () => {
    player.nextTrack();
  };

  const previousTrack = () => {
    player.previousTrack();
  };

  useEffect(() => {
    let $stateSubscription: Subscription;
    let $readySubscription: Subscription;
    if (typeof window !== 'undefined') {
      $stateSubscription = player.$playerState.subscribe((state) => {
        console.log({ state });
        setPlaybackState(state);
      });
      $readySubscription = player.$playerReady.subscribe((ready) => {
        console.log({ ready });
        setPlayerReady(ready);
      });
    }

    return () => {
      if ($stateSubscription) {
        $stateSubscription.unsubscribe();
      }
      if ($readySubscription) {
        $readySubscription.unsubscribe();
      }
    };
  }, [player, spotify]);

  if (!playerReady || !playbackState) {
    return null;
  }

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 bg-background-500 shadow-xl max-w-md rounded w-full m-4">
      <FlexContainer className="flex-wrap">
        <div className="w-full flex mb-4 items-center">
          <div>
            <Image
              src={playbackState.track_window.current_track.album.images[0].url}
              width={100}
              height={100}
              className="rounded block"
              alt={`${playbackState.track_window.current_track.name} album art`}
            />
          </div>
          <div className="ml-4">
            <span className="block text-accent-300 text-sm">
              {playbackState.track_window.current_track.name}
            </span>
            <span className="block text-accent-300 text-xs">
              {playbackState.track_window.current_track.artists
                .map((artist) => artist.name)
                .join(', ')}
            </span>
          </div>
        </div>
        <div className="flex justify-around w-full">
          <Button onClick={previousTrack} variant="secondary" round>
            <FontAwesomeIcon icon={faStepBackward} />
          </Button>
          <Button onClick={togglePlay} variant="primary" round>
            <FontAwesomeIcon icon={playbackState.paused ? faPlay : faPause} />
          </Button>
          <Button onClick={nextTrack} variant="secondary" round>
            <FontAwesomeIcon icon={faStepForward} />
          </Button>
        </div>
      </FlexContainer>
    </div>
  );
};

export default Player;
