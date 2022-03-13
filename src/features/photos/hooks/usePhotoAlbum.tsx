import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

const usePhotoAlbum = (albumId: string) => {
  const { data, error } = useSWR(
    albumId ? `/api/photos/${albumId}` : null,
    fetcher
  );

  return {
    album: data,
    error,
    isLoading: !data && !error,
  };
};

export default usePhotoAlbum;
