import React from 'react';
import { PhotoModel } from '../../models/photo';
import FullScreenPhoto from '../FullScreenPhoto/FullScreenPhoto';
import Photo from '../Photo/Photo';

export interface PhotoListProps {
  photos: PhotoModel[];
}

const PhotoList = (props: PhotoListProps) => {
  const { photos } = props;

  const [activePhoto, setActivePhoto] = React.useState<PhotoModel | undefined>(
    undefined
  );

  if (!photos) {
    return null;
  }

  const handlePhotoClick = (photo: PhotoModel) => {
    setActivePhoto(photo);
  };

  const handleFullscreenClose = () => {
    setActivePhoto(undefined);
  };

  const handleFullscreenNext = () => {
    if (!activePhoto) {
      return;
    }
    const index = photos.indexOf(activePhoto);

    setActivePhoto(
      index + 1 > photos.length - 1 ? photos[0] : photos[index + 1]
    );
  };

  const handleFullscreenPrevious = () => {
    if (!activePhoto) {
      return;
    }
    const index = photos.indexOf(activePhoto);

    setActivePhoto(
      index - 1 < 0 ? photos[photos.length - 1] : photos[index - 1]
    );
  };

  return (
    <div className="flex mt-8 flex-wrap justify-between">
      {photos.map((photo) => (
        <Photo
          photo={photo}
          key={photo._id as string}
          onClick={() => handlePhotoClick(photo)}
        />
      ))}
      {activePhoto && (
        <FullScreenPhoto
          photo={activePhoto}
          onClose={handleFullscreenClose}
          onNext={handleFullscreenNext}
          onPrevious={handleFullscreenPrevious}
        />
      )}
    </div>
  );
};

export default PhotoList;
