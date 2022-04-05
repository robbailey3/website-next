import Container from '@/components/common/Container/Container';
import PhotoInfiniteLoad from '@/features/photos/components/PhotoInfiniteLoad/PhotoInfiniteLoad';
import PhotosNotFound from '@/features/photos/components/PhotosNoneFound/PhotosNoneFound';
import { PhotoModel } from '@/features/photos/models/photo';
import photoService from '@/features/photos/services/photo.service';
import databaseService from '@/services/database/database.service';
import Head from 'next/head';

export async function getServerSideProps() {
  try {
    await databaseService.connect();
    const photos = await photoService.getPhotos(25, 0);
    const totalCount = await photoService.getCount();
    return {
      props: {
        photos: JSON.parse(JSON.stringify(photos)),
        totalCount,
      },
    };
  } catch (error: any) {
    return {
      props: {
        photos: [],
        totalCount: 0,
      },
    };
  }
}

const PhotosPage = (props: { photos: PhotoModel[]; totalCount: number }) => {
  const { photos, totalCount } = props;

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
        {photos.length > 0 ? (
          <PhotoInfiniteLoad
            initialPhotos={photos}
            pageSize={25}
            total={totalCount}
          ></PhotoInfiniteLoad>
        ) : (
          <PhotosNotFound type="photos" />
        )}
      </Container>
    </>
  );
};

export default PhotosPage;
