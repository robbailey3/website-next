import { PhotoViewModel } from '../../viewModels/photoViewModel';
import Photo from '../Photo/Photo';

export interface PhotoListProps {
  photos: PhotoViewModel[];
}

const PhotoList = (props: PhotoListProps) => {
  const { photos } = props;

  if (!photos) {
    return null;
  }

  return (
    <div className="flex mt-8 flex-wrap justify-center md:justify-around">
      {photos.map((photo) => (
        <Photo photo={photo} key={photo._id} />
      ))}
    </div>
  );
};

export default PhotoList;
