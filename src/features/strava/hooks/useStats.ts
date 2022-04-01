import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

const useStats = () => {
  const { data, error } = useSWR('/api/strava/stats', fetcher);

  return {
    stats: data,
    error,
    isLoading: !data && !error,
  };
};

export default useStats;
