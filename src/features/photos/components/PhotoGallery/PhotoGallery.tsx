import { PhotoAlbumViewModel } from '../../viewModels/photoAlbumViewModel';
import { PhotoViewModel } from '../../viewModels/photoViewModel';
import PhotoList from '../PhotoList/PhotoList';

export interface PhotoGalleryProps {
  album: PhotoAlbumViewModel;
  photos: PhotoViewModel[];
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
