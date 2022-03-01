import Loader from '@/components/common/Loaders/Loader/Loader';
import axios from 'axios';
import React from 'react';

export interface AdminUploadingPhotoProps {
  file: File;
  previewSrc: string;
  albumId: string;
}

const AdminUploadingPhoto = (props: AdminUploadingPhotoProps) => {
  const { file, previewSrc, albumId } = props;

  const [isLoading, setIsLoading] = React.useState(false);

  const uploadPhoto = React.useCallback(async () => {
    const formdata = new FormData();

    formdata.append('photo', file);
    await axios.post(`/api/photo-albums/${albumId}/upload`, formdata);

    setIsLoading(false);
  }, [file, albumId]);

  React.useEffect(() => {
    setIsLoading(true);
    uploadPhoto();
  }, [uploadPhoto]);

  return (
    <div className="w-48 h-48 mr-4 mb-4 relative">
      {isLoading && (
        <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center bg-black bg-opacity-40">
          <Loader />
        </div>
      )}
      {previewSrc && (
        <img src={previewSrc} alt="" className="w-full h-full object-cover" />
      )}
    </div>
  );
};

export default AdminUploadingPhoto;