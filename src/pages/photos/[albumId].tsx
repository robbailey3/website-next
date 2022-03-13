import Container from '@/components/common/Container/Container';
import PhotoGallery from '@/features/photos/components/PhotoGallery/PhotoGallery';
import { PhotoModel } from '@/features/photos/models/photo';
import { PhotoAlbumModel } from '@/features/photos/models/photoAlbum';
import photoService from '@/features/photos/services/photo.service';
import photoAlbumService from '@/features/photos/services/photoAlbum.service';
import databaseService from '@/services/database/database.service';
import { NextPageContext } from 'next';
import Head from 'next/head';

export async function getServerSideProps(context: NextPageContext) {
  const { albumId, limit, skip } = context.query;
  await databaseService.connect();
  const query = {
    albumId,
    limit: parseInt(limit as string, 10),
    skip: parseInt(skip as string, 10),
  };
  const album = JSON.parse(
    JSON.stringify(
      await photoAlbumService.getPhotoAlbum(query.albumId as string)
    )
  );
  const photos = JSON.parse(
    JSON.stringify(
      await photoService.getPhotos(
        query.albumId as string,
        query.limit,
        query.skip
      )
    )
  );
  return {
    props: {
      album,
      photos,
    },
  };
}

const PhotoAlbumPage = (props: {
  album: PhotoAlbumModel;
  photos: PhotoModel[];
}) => {
  const { album, photos } = props;

  return (
    <Container>
      <Head>
        <title>{`${album.name} / Photos / Rob Bailey`}</title>
        <meta
          name="description"
          content="Photos of all sorts of things taken by Rob Bailey"
        />
      </Head>
      <PhotoGallery photos={photos} album={album} />
    </Container>
  );
};
export default PhotoAlbumPage;
