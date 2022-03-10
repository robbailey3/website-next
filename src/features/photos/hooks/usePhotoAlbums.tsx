import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

const usePhotoAlbums = () => {
  const { data, error } = useSWR('/api/photos', fetcher);

  return {
    albums: data,
    isLoading: !error && !data,
    error,
  };
};

export default usePhotoAlbums;
