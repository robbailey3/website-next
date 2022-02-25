import LazyImage from '@/components/common/LazyImage/LazyImage';
import usePhotoAlbum from '@/features/photos/hooks/usePhotoAlbum';
import usePhotos from '@/features/photos/hooks/usePhotos';
import { PhotoViewModel } from '@/features/photos/viewModels/photoViewModel';
import { useRouter } from 'next/router';

const PhotoAlbumPage = () => {
  const router = useRouter();

  const { id } = router.query;

  const albumsResponse = usePhotoAlbum(id as string);

  const photosResponse = usePhotos(id as string);

  return (
    <>
      {photosResponse &&
        photosResponse.photos &&
        photosResponse.photos.map((photo: PhotoViewModel) => (
          <div key={photo._id} className="w-full">
            <LazyImage
              src={photo.url}
              thumbnailSrc={photo.thumbnailUrl}
              alt={photo.caption}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
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
    </>
  );
};

export default PhotoAlbumPage;
