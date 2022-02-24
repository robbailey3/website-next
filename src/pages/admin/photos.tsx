import Container from '@/components/common/Container/Container';
import AdminPhotoAlbumList from '@/features/photos/components/AdminPhotoAlbumList/AdminPhotoAlbumList';
import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

const PhotoAdminPage = () => {
  const { data, error } = useSWR('/api/photo-albums', fetcher);

  return (
    <Container>
      {error && <div>failed to load</div>}
      {data && <AdminPhotoAlbumList albums={data} />}
    </Container>
  );
};

export default PhotoAdminPage;
