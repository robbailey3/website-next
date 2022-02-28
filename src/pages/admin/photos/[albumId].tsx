import Container from '@/components/common/Container/Container';
import LazyImage from '@/components/common/LazyImage/LazyImage';
import Loader from '@/components/common/Loaders/Loader/Loader';
import AdminPhotoItem from '@/features/photos/components/AdminPhotoItem/AdminPhotoItem';
import AdminPhotoUploadModal, {
  UploadFormResult,
} from '@/features/photos/components/AdminPhotoUploadModal/AdminPhotoUploadModal';
import AdminUploadingPhoto from '@/features/photos/components/AdminUploadingPhoto/AdminUploadingPhoto';
import usePhotoAlbum from '@/features/photos/hooks/usePhotoAlbum';
import usePhotos from '@/features/photos/hooks/usePhotos';
import { PhotoViewModel } from '@/features/photos/viewModels/photoViewModel';
import { useRouter } from 'next/router';
import React from 'react';

const PhotoAlbumPage = () => {
  const router = useRouter();

  const { albumId } = router.query;

  const albumsResponse = usePhotoAlbum(albumId as string);

  const photosResponse = usePhotos(albumId as string);

  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);

  const [uploadFormResults, setUploadFormResults] = React.useState<
    UploadFormResult[]
  >([]);

  React.useEffect(() => {
    setUploadFormResults([]);
  }, [albumsResponse.album, photosResponse.photos]);

  const handleUploadModalClose = () => {
    setIsUploadModalOpen(false);
  };

  const openModal = () => {
    setIsUploadModalOpen(true);
  };

  const handlePhotoSubmit = async (uploadResults: UploadFormResult[]) => {
    setUploadFormResults(uploadResults);
  };

  if (albumsResponse.isLoading || photosResponse.isLoading) {
    return (
      <Container>
        <div className="flex items-center justify-center p-16">
          <Loader />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div>
        {isUploadModalOpen && (
          <AdminPhotoUploadModal
            onClose={handleUploadModalClose}
            onSubmit={handlePhotoSubmit}
          />
        )}
      </div>
      <div className="flex flex-wrap">
        <button
          className="w-48 h-48 mr-4 mb-4 relative flex justify-center items-center bg-gray-100 border-2 border-gray-500 rounded"
          onClick={openModal}
        >
          Add Photos
        </button>
        {uploadFormResults &&
          uploadFormResults.map((upload, i) => (
            <AdminUploadingPhoto
              previewSrc={upload.previewSrc!}
              key={`upload_${i}`}
              albumId={albumId as string}
              file={upload.file}
            />
          ))}
        {photosResponse &&
          photosResponse.photos &&
          photosResponse.photos.map((photo: PhotoViewModel) => (
            <AdminPhotoItem photo={photo} key={photo._id} />
          ))}
      </div>
    </Container>
  );
};

export default PhotoAlbumPage;
