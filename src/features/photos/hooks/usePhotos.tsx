import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

const usePhotos = (albumId: string, limit = 20, skip = 0) => {
  const { data, error } = useSWR(
    albumId
      ? `/api/photo-albums/${albumId}/photos?limit=${limit}&skip=${skip}`
      : null,
    fetcher
  );

  return {
    response: data,
    error,
    isLoading: !data && !error,
  };
};

export default usePhotos;
