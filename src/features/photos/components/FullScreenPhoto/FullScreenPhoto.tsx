import { IconButton } from '@/components/common/Buttons';
import { faInfo, faTimes } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { fromEvent } from 'rxjs';
import { PhotoModel } from '../../models/photo';
import PhotoMetadata from '../PhotoMetadata/PhotoMetadata';

export interface FullScreenPhotoProps {
  photo: PhotoModel;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
}

const FullScreenPhoto = (props: FullScreenPhotoProps) => {
  const { photo, onNext, onPrevious, onClose } = props;

  const [metadataActive, setMetadataActive] = React.useState(false);

  const handleCloseClick = () => {
    onClose();
  };

  const handleInfoClick = () => {
    setMetadataActive(!metadataActive);
  };

  React.useEffect(() => {
    const $keyupSubscription = fromEvent<KeyboardEvent>(
      window,
      'keyup'
    ).subscribe({
      next: (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        } else if (event.key === 'ArrowRight') {
          onNext();
        } else if (event.key === 'ArrowLeft') {
          onPrevious();
        }
      },
    });

    return () => {
      $keyupSubscription && $keyupSubscription.unsubscribe();
    };
  });

  return (
    <div className="fixed w-full h-full bg-black bg-opacity-75 top-0 left-0 z-40">
      <div className="flex justify-end p-4">
        <IconButton
          onClick={handleInfoClick}
          variant="link"
          icon={faInfo}
          label={'Toggle Info'}
          size={'large'}
          className="text-white"
        />
        <IconButton
          onClick={handleCloseClick}
          variant="link"
          icon={faTimes}
          label={'Close'}
          size={'large'}
          className="text-white"
        />
      </div>
      <div className="flex">
        {metadataActive && (
          <div>
            <PhotoMetadata photo={photo} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FullScreenPhoto;
