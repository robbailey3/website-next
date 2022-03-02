import Modal from '@/components/common/Modal/Modal';
import axios from 'axios';
import React from 'react';
import { mutate } from 'swr';
import { PhotoAlbumViewModel } from '../../viewModels/photoAlbumViewModel';
import AdminPhotoAlbum from '../AdminPhotoAlbum/AdminPhotoAlbum';
import AdminPhotoAlbumForm from '../AdminPhotoAlbumForm/AdminPhotoAlbumForm';

export interface AdminPhotoAlbumListProps {
  albums: PhotoAlbumViewModel[];
}

const AdminPhotoAlbumList = (props: AdminPhotoAlbumListProps) => {
  const { albums } = props;

  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

  const toggleModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  const createAlbum = async (album: { name: string }) => {
    try {
      const response = await axios.post('/api/photo-albums', album);
      mutate('/api/photo-albums', [response.data.result, ...albums], false);
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleCreateFormSubmit = (value: { name: string }) => {
    createAlbum(value);
    toggleModal();
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="flex bg-gray-300 relative overflow-hidden w-48 h-48 mr-4 mb-4">
          <button
            className="w-full bg-transparent text-center h-full flex justify-center items-center"
            onClick={toggleModal}
          >
            Create Album
          </button>
        </div>
        {albums.map((album) => (
          <AdminPhotoAlbum key={album._id} album={album} />
        ))}
      </div>
      {isCreateModalOpen && (
        <Modal onClose={toggleModal}>
          <AdminPhotoAlbumForm onSubmit={handleCreateFormSubmit} />
        </Modal>
      )}
    </>
  );
};

export default AdminPhotoAlbumList;
