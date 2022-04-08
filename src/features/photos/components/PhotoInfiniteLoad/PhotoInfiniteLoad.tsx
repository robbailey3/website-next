import Loader from '@/components/common/Loaders/Loader/Loader';
import axios from 'axios';
import React from 'react';
import { PhotoModel } from '../../models/photo';
import PhotoList from '../PhotoList/PhotoList';

export interface PhotoInfiniteLoadProps {
  initialPhotos: PhotoModel[];
  pageSize: number;
  total: number;
}

const PhotoInfiniteLoad = (props: PhotoInfiniteLoadProps) => {
  const { initialPhotos, pageSize, total } = props;

  const [currentOffset, setCurrentOffset] = React.useState(0);

  const [photos, setPhotos] = React.useState(initialPhotos);

  const [isLoading, setIsLoading] = React.useState(false);

  const loadTrigger = React.useRef<HTMLDivElement>(null);

  const loadMore = React.useCallback(async () => {
    setIsLoading(true);
    const newOffset = currentOffset + pageSize;
    if (newOffset >= total) {
      setIsLoading(false);
      return;
    }
    const newPhotos = await axios.get('/api/photos', {
      params: {
        limit: pageSize,
        skip: newOffset,
      },
    });
    setPhotos([...photos, ...newPhotos.data.result.photos]);
    setCurrentOffset(newOffset);
    setIsLoading(false);
  }, [currentOffset, photos, pageSize, total]);

  const displayTrigger = (): boolean => {
    return currentOffset < total && !isLoading;
  };

  React.useEffect(() => {
    if (loadTrigger.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (isLoading) {
              return;
            }
            loadMore();
          }
        });
      });
      observer.observe(loadTrigger.current);
    }
  }, [loadTrigger, loadMore, isLoading]);

  return (
    <div>
      <PhotoList photos={photos}></PhotoList>
      {displayTrigger() && <div id="load-more-trigger" ref={loadTrigger}></div>}
      {isLoading && (
        <div className="text-center m-12">
          <Loader className="mx-auto" />
        </div>
      )}
    </div>
  );
};

export default PhotoInfiniteLoad;
