import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

const usePhotoAlbum = (albumId: string) => {
  const { data, error } = useSWR(
    albumId ? `/api/photo-albums/${albumId}` : null,
    fetcher
  );

  return {
    album: data,
    error,
    isLoading: !data && !error,
  };
};

export default usePhotoAlbum;
