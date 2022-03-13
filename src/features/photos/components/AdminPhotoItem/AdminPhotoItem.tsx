import Card from '@/components/common/Card/Card';
import LazyImage from '@/components/common/LazyImage/LazyImage';
import OverflowMenu from '@/components/common/OverflowMenu/OverflowMenu';
import { ToastContext } from '@/context/ToastContext/ToastContext';
import axios from 'axios';
import React, { useContext } from 'react';
import { PhotoAlbumModel } from '../../models/photoAlbum';
import { PhotoModel } from '../../models/photo';
import AdminPhotoCaptionEditor from '../AdminPhotoCaptionEditor/AdminPhotoCaptionEditor';

export interface AdminPhotoItemProps {
  photo: PhotoModel;
  album: PhotoAlbumModel;
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
      await axios.patch(`/api/photos/${photo.albumId}`, {
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
      await axios.delete(`/api/photos/${photo.albumId}/${photo._id}`);
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
    <Card className="w-48 mr-4 mb-4 rounded overflow-hidden relative">
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
      <div className="w-48 h-48">
        <LazyImage
          src={photo.url}
          thumbnailSrc={photo.thumbnailUrl}
          alt={photo.caption}
          className="w-full h-full object-cover"
        />
      </div>
      <AdminPhotoCaptionEditor photo={photo} />
    </Card>
  );
};

export default AdminPhotoItem;
