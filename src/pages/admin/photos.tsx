import Container from '@/components/common/Container/Container';
import AdminPhotoAlbumList from '@/features/photos/components/AdminPhotoAlbumList/AdminPhotoAlbumList';
import usePhotoAlbums from '@/features/photos/hooks/usePhotoAlbums';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const PhotoAdminPage = () => {
  const { albums, isLoading, error } = usePhotoAlbums();

  console.log({ albums });

  return (
    <Container>
      {isLoading && <div>Loading...</div>}
      {error && <div>failed to load</div>}
      {albums && <AdminPhotoAlbumList albums={albums} />}
    </Container>
  );
};

export default withPageAuthRequired(PhotoAdminPage);
