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
    <div>
      {isLoading && <div>Loading...</div>}
      {previewSrc && <img src={previewSrc} alt="" />}
    </div>
  );
};

export default AdminUploadingPhoto;
