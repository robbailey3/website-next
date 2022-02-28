import LazyImage from '@/components/common/LazyImage/LazyImage';
import { PhotoViewModel } from '../../viewModels/photoViewModel';

export interface AdminPhotoItemProps {
  photo: PhotoViewModel;
}

const AdminPhotoItem = (props: AdminPhotoItemProps) => {
  const { photo } = props;

  return (
    <div className="w-48 h-48 mr-4 mb-4 rounded overflow-hidden">
      <LazyImage
        src={photo.url}
        thumbnailSrc={photo.thumbnailUrl}
        alt={photo.caption}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default AdminPhotoItem;
