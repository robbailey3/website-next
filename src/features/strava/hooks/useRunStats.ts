import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

const useRunStats = () => {
  const statsResponse = useSWR('/api/strava/stats', fetcher);
  const totalsResponse = useSWR('/api/strava/totals', fetcher);

  return {
    data: {
      stats: statsResponse.data,
      totals: totalsResponse.data,
    },
    error: statsResponse.error || totalsResponse.error,
    isLoading:
      (!statsResponse.data && !statsResponse.error) ||
      (!totalsResponse.data && !totalsResponse.error),
  };
};

export default useRunStats;
