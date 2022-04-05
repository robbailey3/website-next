import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

const usePhotos = (limit = 20, skip = 0) => {
  const { data, error } = useSWR(`/api/photos`, fetcher);
  console.log({ data });
  return {
    response: data,
    error,
    isLoading: !data && !error,
  };
};

export default usePhotos;
