import LazyImage from '@/components/common/LazyImage/LazyImage';
import Link from 'next/link';
import { PhotoAlbumViewModel } from '../../viewModels/photoAlbumViewModel';

export interface PhotoAlbumItemProps {
  album: PhotoAlbumViewModel;
}

const PhotoAlbumItem = (props: PhotoAlbumItemProps) => {
  const { album } = props;
  return (
    <div className="w-56 lg:w-96 h-56 lg:h-96 mr-4 mb-4 rounded shadow bg-slate-500 overflow-hidden relative">
      <Link href={`/photos/${album._id}`}>
        <a href={`/photos/${album._id}`}>
          {album.coverImage &&
          album.coverImage.url &&
          album.coverImage.thumbnailUrl ? (
            <LazyImage
              className="w-full h-full object-cover"
              src={album.coverImage.url}
              thumbnailSrc={album.coverImage.thumbnailUrl}
              alt={album.coverImage.caption}
            />
          ) : null}
          <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center bg-black bg-opacity-0 hover:bg-opacity-40 duration-200">
            <span className="text-4xl text-white text-shadow">
              {album.name ?? 'Unknown'}
            </span>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default PhotoAlbumItem;
