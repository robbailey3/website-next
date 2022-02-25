import usePhotoAlbum from '@/features/photos/hooks/usePhotoAlbum';
import usePhotos from '@/features/photos/hooks/usePhotos';
import { useRouter } from 'next/router';

const PhotoAlbumPage = () => {
  const router = useRouter();

  const { id } = router.query;

  const albumsResponse = usePhotoAlbum(id as string);

  const photosResponse = usePhotos(id as string);

  return (
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
  );
};

export default PhotoAlbumPage;
