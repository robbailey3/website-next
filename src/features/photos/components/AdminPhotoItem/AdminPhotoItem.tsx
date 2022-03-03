import LazyImage from '@/components/common/LazyImage/LazyImage';
import OverflowMenu from '@/components/common/OverflowMenu/OverflowMenu';
import { ToastContext } from '@/context/ToastContext/ToastContext';
import axios from 'axios';
import React, { useContext } from 'react';
import { PhotoAlbumViewModel } from '../../viewModels/photoAlbumViewModel';
import { PhotoViewModel } from '../../viewModels/photoViewModel';

export interface AdminPhotoItemProps {
  photo: PhotoViewModel;
  album: PhotoAlbumViewModel;
}

const AdminPhotoItem = (props: AdminPhotoItemProps) => {
  const { photo, album } = props;

  const { addToast } = useContext(ToastContext);

  const [menuActive, setMenuActive] = React.useState(false);

  const [isDeleted, setIsDeleted] = React.useState(false);

  const toggleMenuActive = () => {
    setMenuActive(!menuActive);
  };

  const setImageAsAlbumCover = async () => {
    try {
      await axios.patch(`/api/photo-albums/${photo.albumId}`, {
        coverImageId: photo._id,
        name: album.name,
      });
      addToast({
        variant: 'success',
        message: 'Cover image updated',
        isActive: true,
        duration: 5000,
      });
      toggleMenuActive();
    } catch (error: any) {
      addToast({
        variant: 'error',
        message: `Failed to set image as album cover: ${error.message}`,
        isActive: true,
        duration: 5000,
      });
    }
  };

  const deletePhoto = async () => {
    try {
      await axios.delete(`/api/photo-albums/${photo.albumId}/${photo._id}`);
      setIsDeleted(true);
    } catch (error: any) {
      addToast({
        variant: 'error',
        message: `Failed to delete photo: ${error.message}`,
        duration: 5000,
        isActive: true,
      });
    }
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div className="w-48 h-48 mr-4 mb-4 rounded overflow-hidden flex relative">
      <div className="absolute top-4 right-4 z-20">
        <OverflowMenu
          actions={[
            {
              label: 'Set as album cover',
              clickHandler: setImageAsAlbumCover,
            },
            {
              label: 'Delete',
              clickHandler: deletePhoto,
            },
          ]}
        />
      </div>
      <LazyImage
        src={photo.url}
        thumbnailSrc={photo.thumbnailUrl}
        alt={photo.caption}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default AdminPhotoItem;
