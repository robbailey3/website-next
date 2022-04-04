import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';
import { GetActivityResponse } from '../responses/GetActivityResponse';

const useRun = (
  id: string
): { run: GetActivityResponse; error: Error; isLoading: boolean } => {
  const runResponse = useSWR(`/api/strava/${id}`, fetcher);

  return {
    run: runResponse.data,
    error: runResponse.error,
    isLoading: !runResponse.data && !runResponse.error,
  };
};

export default useRun;
