import Breadcrumbs from '@/components/common/Breadcrumbs/Breadcrumbs';
import Container from '@/components/common/Container/Container';
import AdminPhotoAlbumList from '@/features/photos/components/AdminPhotoAlbumList/AdminPhotoAlbumList';
import usePhotoAlbums from '@/features/photos/hooks/usePhotoAlbums';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from 'next/head';

const PhotoAdminPage = () => {
  const { albums, isLoading, error } = usePhotoAlbums();

  return (
    <Container>
      <Head>
        <title>Admin / Rob Bailey</title>
      </Head>
      <Breadcrumbs />
      {isLoading && <div>Loading...</div>}
      {error && <div>failed to load</div>}
      {albums && <AdminPhotoAlbumList albums={albums} />}
    </Container>
  );
};

export default withPageAuthRequired(PhotoAdminPage);
