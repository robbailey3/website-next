import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

const useRuns = (limit: number = 25, skip: number = 0) => {
  const runResponse = useSWR(
    `/api/strava?limit=${limit}&skip=${skip}`,
    fetcher
  );

  return {
    runs: runResponse.data,
    error: runResponse.error,
    isLoading: !runResponse.data && !runResponse.error,
  };
};

export default useRuns;
