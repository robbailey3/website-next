import Container from '@/components/common/Container/Container';
import LazyImage from '@/components/common/LazyImage/LazyImage';
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

  const { id } = router.query;

  const albumsResponse = usePhotoAlbum(id as string);

  const photosResponse = usePhotos(id as string);

  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(true);

  const [uploadFormResults, setUploadFormResults] = React.useState<
    UploadFormResult[]
  >([]);

  const handleUploadModalClose = () => {
    console.log('Upload modal closed');
    setIsUploadModalOpen(false);
  };

  const handlePhotoSubmit = async (uploadResults: UploadFormResult[]) => {
    setUploadFormResults(uploadResults);
  };

  return (
    <Container>
      <div className="flex flex-wrap">
        {isUploadModalOpen && (
          <AdminPhotoUploadModal
            onClose={handleUploadModalClose}
            onSubmit={handlePhotoSubmit}
          />
        )}
        {photosResponse &&
          photosResponse.photos &&
          photosResponse.photos.map((photo: PhotoViewModel) => (
            <div key={photo._id} className="w-1/2">
              <LazyImage
                src={photo.url}
                thumbnailSrc={photo.thumbnailUrl}
                alt={photo.caption}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        {uploadFormResults &&
          uploadFormResults.map((upload, i) => (
            <AdminUploadingPhoto
              previewSrc={upload.previewSrc!}
              key={`upload_${i}`}
              albumId={id as string}
              file={upload.file}
            />
          ))}
      </div>
      <pre>
        {JSON.stringify(
          {
            album: albumsResponse.album,
            photos: photosResponse.photos,
            error: albumsResponse.error || photosResponse.error,
            isLoading: albumsResponse.isLoading || photosResponse.isLoading,
          },
          null,
          4
        )}
      </pre>
    </Container>
  );
};

export default PhotoAlbumPage;
