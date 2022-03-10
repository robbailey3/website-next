/* eslint-disable @next/next/no-img-element */
import OverflowMenu from '@/components/common/OverflowMenu/OverflowMenu';
import axios from 'axios';
import Link from 'next/link';
import { mutate } from 'swr';
import { PhotoAlbumModel } from '../../models/photoAlbum';

export interface AdminPhotoAlbumProps {
  album: PhotoAlbumModel;
}

const AdminPhotoAlbum = (props: AdminPhotoAlbumProps) => {
  const { album } = props;

  const deleteAlbum = async () => {
    try {
      await axios.delete(`/api/photos/${album._id}`);
      mutate(`/api/photos`);
    } catch (error: any) {}
  };

  return (
    <div className="flex bg-gray-300 relative overflow-hidden w-48 h-48 mr-4 mb-4 rounded-md shadow-md">
      {album.coverImage && (
        <div className="absolute top-0 left-0 w-full h-full object-cover flex items-center justify-center">
          <img
            src={album.coverImage!.url}
            alt={album.coverImage!.caption}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="flex w-full h-full items-center justify-center bg-black bg-opacity-20  relative z-10">
        <div className="absolute top-4 right-4">
          <OverflowMenu
            actions={[
              {
                label: 'Delete',
                clickHandler: () => deleteAlbum(),
              },
            ]}
          />
        </div>
        <Link href={`/admin/photos/${album._id}`}>
          <a href={`/admin/photos/${album._id}`} className="text-white text-xl">
            <span>{album.name || 'Unknown'}</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default AdminPhotoAlbum;
