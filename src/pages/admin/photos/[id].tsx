import Container from '@/components/common/Container/Container';
import LazyImage from '@/components/common/LazyImage/LazyImage';
import AdminPhotoUploadModal, {
  UploadFormResult,
} from '@/features/photos/components/AdminPhotoUploadModal/AdminPhotoUploadModal';
import usePhotoAlbum from '@/features/photos/hooks/usePhotoAlbum';
import usePhotos from '@/features/photos/hooks/usePhotos';
import { PhotoViewModel } from '@/features/photos/viewModels/photoViewModel';
import axios, { AxiosResponse } from 'axios';
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
    let promises: Promise<AxiosResponse>[] = [];
    uploadResults.forEach((uploadResult) => {
      const formdata = new FormData();
      formdata.append('photo', uploadResult.file);
      promises.push(axios.post(`/api/photo-albums/${id}/upload`, formdata));
    });
    await Promise.all(promises);
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
        {uploadFormResults && <div>{uploadFormResults.length}</div>}
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
