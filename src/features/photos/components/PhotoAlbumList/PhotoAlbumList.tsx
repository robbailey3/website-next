import { PhotoAlbumModel } from '../../models/photoAlbum';
import PhotoAlbumItem from '../PhotoAlbumItem/PhotoAlbumItem';

export interface PhotoAlbumListProps {
  albums: PhotoAlbumModel[];
}

const PhotoAlbumList = (props: PhotoAlbumListProps) => {
  const { albums } = props;

  if (!albums || albums.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-wrap mt-8 justify-center md:justify-around">
      {albums.map((album) => (
        <PhotoAlbumItem key={album._id as string} album={album} />
      ))}
    </section>
  );
};

export default PhotoAlbumList;
