import Container from '@/components/common/Container/Container';
import PhotoAlbumList from '@/features/photos/components/PhotoAlbumList/PhotoAlbumList';
import { PhotoAlbumModel } from '@/features/photos/models/photoAlbum';
import photoAlbumService from '@/features/photos/services/photoAlbum.service';
import { PhotoAlbumViewModel } from '@/features/photos/viewModels/photoAlbumViewModel';
import databaseService from '@/services/database/database.service';
import Head from 'next/head';

export async function getServerSideProps() {
  try {
    await databaseService.connect();
    const response = await photoAlbumService.getPhotoAlbums(100, 0);
    console.log({ response });
    return {
      props: {
        albums: JSON.parse(JSON.stringify(response)),
      },
    };
  } catch (error: any) {
    return {
      props: {
        albums: [],
      },
    };
  }
}

const PhotosPage = (props: { albums: PhotoAlbumViewModel[] }) => {
  const { albums } = props;
  return (
    <>
      <Head>
        <title>Photos / Rob Bailey</title>
        <meta
          name="description"
          content="Photos of all sorts of things taken by Rob Bailey"
        />
      </Head>
      <Container>
        <PhotoAlbumList albums={albums} />
      </Container>
    </>
  );
};

export default PhotosPage;
