import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

const PhotoAdminPage = () => {
  const { data, error } = useSWR('/api/photo-albums', fetcher);

  return (
    <div>
      {error && <div>failed to load</div>}
      {data && <div>{data.length} photos</div>}
    </div>
  );
};

export default PhotoAdminPage;
