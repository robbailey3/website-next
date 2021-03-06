import { PhotoModel } from '../../models/photo';
import PhotoLocation from '../PhotoLocation/PhotoLocation';
import PhotoMetaItem from '../PhotoMetaItem/PhotoMetaItem';

export interface PhotoMetadataProps {
  photo: PhotoModel;
}

const PhotoMetadata = (props: PhotoMetadataProps) => {
  const { photo } = props;

  return (
    <div className="bg-white shadow-xl h-full flex flex-col justify-between">
      <div className="pr-4 pl-2 pt-12 md:pt-32">
        <div>
          {photo.caption && <p className="p-4">{photo.caption}</p>}
          <div>
            <PhotoMetaItem
              icon={<span className="material-icons">photo_camera</span>}
              values={{
                'Camera Make': photo.metadata?.make,
                'Camera Model': photo.metadata?.model,
                'Lens Make': photo.metadata?.lensMake,
                'Lens Model': photo.metadata?.lensModel,
              }}
            />
            <PhotoMetaItem
              icon={<span className="material-icons">camera</span>}
              values={{
                'Focal Length': photo.metadata?.focalLength
                  ? `${photo.metadata.focalLength}mm`
                  : undefined,
                Aperture: photo.metadata?.fNumber
                  ? `f/${photo.metadata.fNumber}`
                  : undefined,
                ISO: photo.metadata?.iso?.toString(),
                'Exposure Time': photo.metadata?.exposureTime
                  ? `1/${(1 / photo.metadata.exposureTime).toPrecision(3)}s`
                  : undefined,
              }}
            />
          </div>
        </div>
      </div>
      <div>
        {photo.location && (
          <PhotoLocation
            location={{
              lat: photo.location.coordinates[0],
              lng: photo.location.coordinates[1],
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PhotoMetadata;
