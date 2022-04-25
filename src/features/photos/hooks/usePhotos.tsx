import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

const usePhotos = (limit = 20, skip = 0, searchQuery?: string) => {
  const url = `/api/photos?limit=${limit}&skip=${skip}${
    searchQuery ? `&search=${searchQuery}` : ''
  }`;
  const { data, error } = useSWR(url, fetcher);
  return {
    response: data,
    error,
    isLoading: !data && !error,
  };
};

export default usePhotos;
