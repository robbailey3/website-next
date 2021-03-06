import Breadcrumbs from '@/components/common/Breadcrumbs/Breadcrumbs';
import Container from '@/components/common/Container/Container';
import Loader from '@/components/common/Loaders/Loader/Loader';
import Pagination from '@/components/common/Pagination/Pagination';
import AdminPhotoItem from '@/features/photos/components/AdminPhotoItem/AdminPhotoItem';
import AdminPhotoUploadModal, {
  UploadFormResult,
} from '@/features/photos/components/AdminPhotoUploadModal/AdminPhotoUploadModal';
import AdminUploadingPhoto from '@/features/photos/components/AdminUploadingPhoto/AdminUploadingPhoto';
import usePhotos from '@/features/photos/hooks/usePhotos';
import { PhotoModel } from '@/features/photos/models/photo';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const PhotoAlbumPage = () => {
  const PHOTOS_PER_PAGE = 20;

  const router = useRouter();

  const [currentPage, setCurrentPage] = React.useState(1);

  const photosResponse = usePhotos(
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
  }, [photosResponse.response]);

  const handleUploadModalClose = () => {
    setIsUploadModalOpen(false);
  };

  const openModal = () => {
    setIsUploadModalOpen(true);
  };

  const handlePhotoSubmit = async (uploadResults: UploadFormResult[]) => {
    setUploadFormResults(uploadResults);
  };

  if (photosResponse.isLoading) {
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
      <div className="flex flex-wrap items-stretch">
        <button
          className="w-48 mr-4 mb-4 relative flex justify-center items-center bg-gray-100 border-2 border-gray-500 rounded"
          onClick={openModal}
        >
          Add Photos
        </button>
        {uploadFormResults &&
          uploadFormResults.map((upload, i) => (
            <AdminUploadingPhoto
              previewSrc={upload.previewSrc!}
              key={`upload_${i}`}
              file={upload.file}
            />
          ))}
        {photosResponse &&
          photosResponse.response.photos &&
          photosResponse.response.photos.map((photo: PhotoModel) => (
            <AdminPhotoItem photo={photo} key={photo._id as string} />
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

export default withPageAuthRequired(PhotoAlbumPage);
