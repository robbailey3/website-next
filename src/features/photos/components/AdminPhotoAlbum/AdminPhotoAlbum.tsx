/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { PhotoAlbumViewModel } from '../../viewModels/photoAlbumViewModel';

export interface AdminPhotoAlbumProps {
  album: PhotoAlbumViewModel;
}

const AdminPhotoAlbum = (props: AdminPhotoAlbumProps) => {
  const { album } = props;

  return (
    <div className="flex bg-gray-300 relative overflow-hidden w-48 h-48 mr-4 mb-4">
      {album.coverImage && (
        <div className="absolute top-0 left-0 w-full h-full object-cover flex items-center justify-center">
          <img
            src={album.coverImage!.url}
            alt={album.coverImage!.caption}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="flex w-full h-full items-center justify-center bg-black bg-opacity-5 text-white relative z-10">
        <Link href={`/admin/photos/${album._id}`}>
          <a href={`/admin/photos/${album._id}`}>
            <div>{album.name}</div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default AdminPhotoAlbum;
