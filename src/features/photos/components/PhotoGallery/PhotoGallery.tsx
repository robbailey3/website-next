import { PhotoModel } from '../../models/photo';
import { PhotoAlbumModel } from '../../models/photoAlbum';
import PhotoList from '../PhotoList/PhotoList';

export interface PhotoGalleryProps {
  album: PhotoAlbumModel;
  photos: PhotoModel[];
}

const PhotoGallery = (props: PhotoGalleryProps) => {
  const { album, photos } = props;

  if (!album || !photos || photos.length === 0) {
    return null;
  }

  return (
    <section>
      <PhotoList photos={photos} />
    </section>
  );
};

export default PhotoGallery;
