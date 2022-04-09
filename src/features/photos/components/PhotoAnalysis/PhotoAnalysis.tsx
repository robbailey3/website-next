import Modal from '@/components/common/Modal/Modal';
import { PhotoModel } from '../../models/photo';

export interface PhotoAnalysisProps {
  photo: PhotoModel;
  openState: 'open' | 'closed';
  onOpenStateChange: (openState: 'open' | 'closed') => void;
}

const PhotoAnalysis = (props: PhotoAnalysisProps) => {
  const { photo, openState, onOpenStateChange } = props;

  const onClose = () => {
    onOpenStateChange('closed');
  };

  if (openState === 'closed') {
    return null;
  }

  return (
    <Modal onClose={onClose}>
      <div className="max-h-96 overflow-auto p-4">
        {photo.object && photo.object.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold">Objects</h2>
            <p>Detected these objects in the photo:</p>
            {photo.object?.map((object) => (
              <div key={object.name} className="my-2">
                <p>{object.name}</p>
                <p className="text-xs text-gray-500">
                  Certainty: {object.score?.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
        {photo.labels && photo.labels.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold">Labels</h2>
            <p>Detected these labels in the photo:</p>
            {photo.labels?.map((label) => (
              <div key={label.mid} className="my-2">
                <p>{label.description}</p>
                <p className="text-xs text-gray-500">
                  Certainty: {label.score?.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PhotoAnalysis;
