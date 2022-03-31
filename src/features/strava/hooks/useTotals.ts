import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

const useTotals = () => {
  const { data, error } = useSWR('/api/strava/totals', fetcher);

  return {
    totals: data,
    error,
    isLoading: !data && !error,
  };
};

export default useTotals;
