import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

const usePhotos = (albumId: string) => {
  const { data, error } = useSWR(
    albumId ? `/api/photo-albums/${albumId}/photos` : null,
    fetcher
  );

  return {
    photos: data,
    error,
    isLoading: !data && !error,
  };
};

export default usePhotos;
