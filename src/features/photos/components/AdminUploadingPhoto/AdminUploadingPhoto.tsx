import { UploadFormResult } from '../AdminPhotoUploadModal/AdminPhotoUploadModal';

export interface AdminUploadingPhotoProps {
  file: File;
  previewSrc: string;
  albumId: string;
}

const AdminUploadingPhotoProps = (props: AdminUploadingPhotoProps) => {
  const { uploadingPhotos, albumId } = props;

  const uploadPhoto = () => {
    const formdata = new FormData();

    formdata.append('photo', uploadResult.file);
    axios.post(`/api/photo-albums/${albumId}/upload`, formdata);
  };
};

export default AdminUploadingPhotoProps;
