import Card from '@/components/common/layout/card/card';
import Image from 'next/image';
import Link from 'next/link';

type UserPlaylistItemProps = {
  playlist: any;
};

const UserPlaylistItem = (props: UserPlaylistItemProps) => {
  const { playlist } = props;

  return (
    <div className="w-full md:w-1/2 xl:w-1/4">
      <Card className="relative rounded mt-4 mr-4">
        <Link href={`/projects/spotify/playlists/${playlist.id}`}>
          <a className="block h-full hover:transform hover:scale-100">
            <div className="w-full flex items-center h-full">
              {playlist.images.length > 0 && playlist.images[0].url && (
                <div>
                  <Image
                    src={playlist.images[0].url}
                    alt={`${playlist.name} cover image`}
                    height={185}
                    width={185}
                  />
                </div>
              )}
              <div className="text-center flex items-center justify-center h-full grow p-4">
                <div>{playlist.name}</div>
              </div>
            </div>
          </a>
        </Link>
      </Card>
    </div>
  );
};

export default UserPlaylistItem;
