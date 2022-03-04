import Breadcrumbs from '@/components/common/Breadcrumbs/Breadcrumbs';
import Container from '@/components/common/Container/Container';
import Loader from '@/components/common/Loaders/Loader/Loader';
import Pagination from '@/components/common/Pagination/Pagination';
import AdminPhotoItem from '@/features/photos/components/AdminPhotoItem/AdminPhotoItem';
import AdminPhotoUploadModal, {
  UploadFormResult,
} from '@/features/photos/components/AdminPhotoUploadModal/AdminPhotoUploadModal';
import AdminUploadingPhoto from '@/features/photos/components/AdminUploadingPhoto/AdminUploadingPhoto';
import usePhotoAlbum from '@/features/photos/hooks/usePhotoAlbum';
import usePhotos from '@/features/photos/hooks/usePhotos';
import { PhotoViewModel } from '@/features/photos/viewModels/photoViewModel';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const PhotoAlbumPage = () => {
  const PHOTOS_PER_PAGE = 20;

  const router = useRouter();

  const { albumId } = router.query;

  const albumsResponse = usePhotoAlbum(albumId as string);

  const [currentPage, setCurrentPage] = React.useState(1);

  const photosResponse = usePhotos(
    albumId as string,
    PHOTOS_PER_PAGE,
    (currentPage - 1) * PHOTOS_PER_PAGE
  );

  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);

  const [uploadFormResults, setUploadFormResults] = React.useState<
    UploadFormResult[]
  >([]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  React.useEffect(() => {
    setUploadFormResults([]);
  }, [albumsResponse.album, photosResponse.response]);

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
      <Head>
        <title>Admin / Rob Bailey</title>
      </Head>
      <Breadcrumbs />
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
          photosResponse.response.photos &&
          photosResponse.response.photos.map((photo: PhotoViewModel) => (
            <AdminPhotoItem
              photo={photo}
              key={photo._id}
              album={albumsResponse.album}
            />
          ))}
      </div>
      {photosResponse &&
        photosResponse.response &&
        photosResponse.response.count > PHOTOS_PER_PAGE && (
          <Pagination
            totalItems={photosResponse.response.count}
            itemsPerPage={20}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
    </Container>
  );
};

export default PhotoAlbumPage;
