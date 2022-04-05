import { PhotoModel } from '../../models/photo';
import PhotoList from '../PhotoList/PhotoList';

export interface PhotoGalleryProps {
  photos: PhotoModel[];
}

const PhotoGallery = (props: PhotoGalleryProps) => {
  const { photos } = props;

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
