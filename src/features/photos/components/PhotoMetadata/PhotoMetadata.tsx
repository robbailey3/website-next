import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PhotoModel } from '../../models/photo';

export interface PhotoMetadataProps {
  photo: PhotoModel;
}

const PhotoMetadata = (props: PhotoMetadataProps) => {
  const { photo } = props;

  return (
    <div className="pt-20 px-4">
      <div>
        <div>
          {photo.metadata?.make && photo.metadata?.model && (
            <div className="flex items-center text-white">
              <div>
                <span className="material-icons">photo_camera</span>
              </div>
              <div>
                <span className="ml-2 block">{photo.metadata.make}</span>
                <span className="ml-2 block">{photo.metadata.model}</span>
              </div>
            </div>
          )}
          {photo.metadata?.focalLength &&
            photo.metadata?.fNumber &&
            photo.metadata?.iso && (
              <div className="flex items-center text-white">
                <div>
                  <span className="material-icons">camera</span>
                </div>
                <div>
                  <span className="ml-2 block">
                    {photo.metadata.focalLength}mm
                  </span>
                  <span className="ml-2 block">f{photo.metadata.fNumber}</span>
                  <span className="ml-2 block">f{photo.metadata.iso}</span>
                </div>
              </div>
            )}
        </div>
      </div>
      <pre>{JSON.stringify(photo.location, null, 4)}</pre>
    </div>
  );
};

export default PhotoMetadata;
