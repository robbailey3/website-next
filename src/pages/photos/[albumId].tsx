import Container from '@/components/common/Container/Container';
import PhotoGallery from '@/features/photos/components/PhotoGallery/PhotoGallery';
import photoService from '@/features/photos/services/photo.service';
import photoAlbumService from '@/features/photos/services/photoAlbum.service';
import { PhotoAlbumViewModel } from '@/features/photos/viewModels/photoAlbumViewModel';
import { PhotoModel } from '@/features/photos/viewModels/PhotoModel';
import databaseService from '@/services/database/database.service';
import { NextPageContext } from 'next';

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
  album: PhotoAlbumViewModel;
  photos: PhotoModel[];
}) => {
  const { album, photos } = props;

  return (
    <Container>
      <PhotoGallery photos={photos} album={album} />
    </Container>
  );
};
export default PhotoAlbumPage;
