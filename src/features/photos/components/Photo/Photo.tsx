/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import LazyImage from '@/components/common/LazyImage/LazyImage';
import { PhotoModel } from '../../models/photo';

export interface PhotoProps {
  photo: PhotoModel;
  onClick: () => void;
}

const Photo = (props: PhotoProps) => {
  const { photo, onClick } = props;

  return (
    <div className="rounded shadow bg-slate-500 overflow-hidden relative w-full h-full object-cover">
      <span onClick={onClick} className="cursor-pointer">
        <LazyImage
          src={photo.url}
          thumbnailSrc={photo.thumbnailUrl}
          alt={photo.caption}
          className="w-full h-full object-cover"
        />
      </span>
    </div>
  );
};

export default Photo;
