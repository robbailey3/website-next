import { PhotoAlbumViewModel } from '../../viewModels/photoAlbumViewModel';
import AdminPhotoAlbum from '../AdminPhotoAlbum/AdminPhotoAlbum';

export interface AdminPhotoAlbumListProps {
  albums: PhotoAlbumViewModel[];
}

const AdminPhotoAlbumList = (props: AdminPhotoAlbumListProps) => {
  const { albums } = props;

  return (
    <div className="flex">
      {albums.map((album) => (
        <AdminPhotoAlbum key={album._id} album={album} />
      ))}
    </div>
  );
};

export default AdminPhotoAlbumList;
