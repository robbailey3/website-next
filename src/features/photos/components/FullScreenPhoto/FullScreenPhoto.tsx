import { IconButton } from '@/components/common/Buttons';
import LazyImage from '@/components/common/LazyImage/LazyImage';
import { faInfo, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion';
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
    <div className="fixed w-full h-full bg-black bg-opacity-75 top-0 left-0 z-40 max-h-screen">
      <div className="flex h-full relative">
        <LayoutGroup>
          <motion.div
            className="flex p-4 justify-center items-center duration-500 md:relative grow"
            layout
          >
            <div className="absolute top-0 right-0 flex justify-end p-4 w-full bg-gradient-to-b from-black to-transparent space-x-2 z-30">
              <IconButton
                onClick={handleInfoClick}
                variant="ghost"
                icon={faInfo}
                label={'Toggle Info'}
                size={'large'}
              />
              <IconButton
                onClick={handleCloseClick}
                variant="ghost"
                icon={faTimes}
                label={'Close'}
                size={'large'}
                className="text-white"
              />
            </div>
            <LazyImage
              src={photo.url}
              thumbnailSrc={photo.thumbnailUrl}
              alt={photo.caption}
              className="max-w-full max-h-full object-cover"
            />
          </motion.div>
          <AnimatePresence>
            {metadataActive && (
              <motion.div
                className="h-full fixed md:relative top-0 right-0 md:top-auto md:right-auto"
                initial={{ opacity: 0, width: 0, originX: 0 }}
                animate={{ opacity: 1, width: 340, originX: 0 }}
                exit={{ opacity: 0, width: 0, originX: 0 }}
              >
                <PhotoMetadata photo={photo} />
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </div>
  );
};

export default FullScreenPhoto;
