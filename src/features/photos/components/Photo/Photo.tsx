import LazyImage from '@/components/common/LazyImage/LazyImage';
import { PhotoViewModel } from '../../viewModels/photoViewModel';

export interface PhotoProps {
  photo: PhotoViewModel;
}

const Photo = (props: PhotoProps) => {
  const { photo } = props;

  return (
    <div className="w-full mr-4 mb-4 rounded shadow bg-slate-500 overflow-hidden relative">
      <LazyImage
        src={photo.url}
        thumbnailSrc={photo.thumbnailUrl}
        alt={photo.caption}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Photo;
