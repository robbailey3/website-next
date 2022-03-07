import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PhotoModel } from '../../models/photo';

export interface PhotoMetadataProps {
  photo: PhotoModel;
}

const PhotoMetadata = (props: PhotoMetadataProps) => {
  const { photo } = props;

  return (
    <div className="bg-white">
      <div>
        <div>
          {photo.metadata?.make && photo.metadata?.model && (
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCamera} />
              <span className="ml-2">{photo.metadata.make}</span>
              <span className="ml-2">{photo.metadata.model}</span>
            </div>
          )}
        </div>
      </div>
      <pre>{JSON.stringify(photo.location, null, 4)}</pre>
    </div>
  );
};

export default PhotoMetadata;
