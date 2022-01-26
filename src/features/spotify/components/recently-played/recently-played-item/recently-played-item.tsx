import Card from '@/components/common/layout/card/card';
import { useSpotify } from '@/features/spotify/context/spotify.context';
import {
  Item,
  Track,
} from '@/features/spotify/interfaces/RecentlyPlayedResponse';

type RecentlyPlayedItemProps = {
  track: Track;
};

const RecentlyPlayedItem = (props: RecentlyPlayedItemProps) => {
  const { spotify } = useSpotify();

  const playTrack = () => {
    spotify.playTrack([props.track.uri]);
  };

  return (
    <div className="lg:w-1/4 md:w-1/2 w-full">
      <Card className="relative rounded mt-4 mr-4">
        <a onClick={playTrack} className="cursor-pointer">
          <div className="flex">
            <img
              className="w-1/2"
              src={props.track.album.images[0].url}
              alt={`${props.track.album.name} artwork`}
            />
            <div className="flex flex-col justify-center items-center flex-grow p-4">
              <div className="text-white text-center">
                <span className="block">{props.track.name}</span>
                <span className="text-xs block">
                  {props.track.artists[0].name}
                </span>
              </div>
            </div>
          </div>
        </a>
      </Card>
    </div>
  );
};

export default RecentlyPlayedItem;