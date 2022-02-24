/* eslint-disable @next/next/no-img-element */
import { PhotoAlbumViewModel } from '../../viewModels/photoAlbumViewModel';

export interface AdminPhotoAlbumProps {
  album: PhotoAlbumViewModel;
}

const AdminPhotoAlbum = (props: AdminPhotoAlbumProps) => {
  const { album } = props;

  return (
    <div className="flex bg-gray-300">
      {album.coverImage && (
        <div>
          <img
            src={album.coverImage!.url}
            alt={album.coverImage!.caption}
            className="w-full"
          />
        </div>
      )}
      <span>{album._id}</span>
      <div>{album.name}</div>
    </div>
  );
};

export default AdminPhotoAlbum;
