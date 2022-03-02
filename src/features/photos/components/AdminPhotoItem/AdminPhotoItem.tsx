import { IconButton } from '@/components/common/Buttons';
import LazyImage from '@/components/common/LazyImage/LazyImage';
import Toast from '@/components/common/Toast/Toast';
import { ToastContext } from '@/context/ToastContext/ToastContext';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import React, { useContext } from 'react';
import { PhotoViewModel } from '../../viewModels/photoViewModel';

export interface AdminPhotoItemProps {
  photo: PhotoViewModel;
}

const AdminPhotoItem = (props: AdminPhotoItemProps) => {
  const { photo } = props;

  const { addToast } = useContext(ToastContext);

  const [menuActive, setMenuActive] = React.useState(false);

  const [isDeleted, setIsDeleted] = React.useState(false);

  const toggleMenuActive = () => {
    setMenuActive(!menuActive);
  };

  const setImageAsAlbumCover = async (photo: PhotoViewModel) => {
    try {
      await axios.patch(`/api/photo-albums/${photo.albumId}`, {
        coverImageId: photo._id,
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
      <div className="absolute top-1 right-1 z-20">
        <IconButton
          className="absolute top-0 right-0 bg-transparent shadow-none hover:bg-black hover:bg-opacity-20"
          icon={faEllipsisVertical}
          onClick={toggleMenuActive}
          label={'Menu'}
        />
        {menuActive && (
          <div className="absolute top-10 right-1 bg-white z-20 py-2 rounded shadow-xl w-40">
            <ul>
              <li>
                <button
                  onClick={() => setImageAsAlbumCover(photo)}
                  className="border-none outline-none focus:outline-none text-left hover:bg-gray-100 block p-2 w-full"
                >
                  Set as album cover
                </button>
              </li>
              <li>
                <button
                  onClick={deletePhoto}
                  className="border-none outline-none focus:outline-none text-left hover:bg-gray-100 block p-2 w-full"
                >
                  Delete
                </button>
              </li>
            </ul>
          </div>
        )}
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
