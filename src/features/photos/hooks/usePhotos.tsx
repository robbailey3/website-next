import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

const usePhotos = (limit = 20, skip = 0) => {
  const { data, error } = useSWR(
    `/api/photos?limit=${limit}&skip=${skip}`,
    fetcher
  );
  return {
    response: data,
    error,
    isLoading: !data && !error,
  };
};

export default usePhotos;
