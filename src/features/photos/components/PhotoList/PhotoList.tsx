import React from 'react';
import { PhotoModel } from '../../models/photo';
import FullScreenPhoto from '../FullScreenPhoto/FullScreenPhoto';
import Photo from '../Photo/Photo';

export interface PhotoListProps {
  photos: PhotoModel[];
}

export interface PhotoGroup {
  title: string;
  photos: PhotoModel[];
}

const PhotoList = (props: PhotoListProps) => {
  const { photos } = props;

  const [activePhoto, setActivePhoto] = React.useState<PhotoModel | undefined>(
    undefined
  );

  const [photoGroups, setPhotoGroups] = React.useState<PhotoGroup[]>([]);

  const getPhotoMonthGroups = React.useCallback((): PhotoGroup[] => {
    return photos.reduce((acc, photo) => {
      const title = new Date(photo.updatedAt!).toLocaleDateString('en-GB', {
        month: 'long',
        year: 'numeric',
      });
      const existingGroup = acc.find((group: any) => group.title === title);
      if (existingGroup) {
        existingGroup.photos.push(photo);
      } else {
        acc.push({
          title,
          photos: [photo],
        });
      }
      return acc;
    }, [] as PhotoGroup[]);
  }, [photos]);

  React.useEffect(() => {
    setPhotoGroups(getPhotoMonthGroups());
  }, [photos, getPhotoMonthGroups]);

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
    <div className="mt-8">
      {photoGroups.map((photoGroup) => (
        <>
          <h3 className="my-4 border-b border-b-gray-100">
            {photoGroup.title}
          </h3>
          <div className="flex flex-wrap">
            {photoGroup.photos.map((photo) => (
              <div
                key={photo._id as string}
                className="w-full md:w-1/2 xl:w-1/3 p-4"
              >
                <Photo photo={photo} onClick={() => handlePhotoClick(photo)} />
              </div>
            ))}
          </div>
        </>
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
