import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

const PhotoAdminPage = () => {
  const { data, error } = useSWR(
    '/api/photos?albumId=61d207792a080295201b7896',
    fetcher
  );

  return (
    <div>
      {error && <div>failed to load</div>}
      {data && <div>{data.length} photos</div>}
    </div>
  );
};

export default PhotoAdminPage;
