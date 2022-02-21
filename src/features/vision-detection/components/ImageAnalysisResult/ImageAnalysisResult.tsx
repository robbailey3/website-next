import * as vision from '@google-cloud/vision';
import FaceAnnotation from '../AnalysisResult/FaceAnnotation/FaceAnnotation';

export interface ImageAnalysisResultProps {
  result: vision.protos.google.cloud.vision.v1.IAnnotateImageResponse;
  activeCategory:
    | keyof vision.protos.google.cloud.vision.v1.IAnnotateImageResponse
    | null;
  file: File;
  isLoading: boolean;
}

const ImageAnalysisResult = (props: ImageAnalysisResultProps) => {
  const { result, activeCategory, file, isLoading } = props;

  const getResultUi = () => {
    if (!result || !activeCategory) {
      return null;
    }
    switch (activeCategory) {
      case 'faceAnnotations':
        return (
          <FaceAnnotation
            faceAnnotations={result['faceAnnotations']!}
            file={file}
            isLoading={isLoading}
          />
        );
      default:
        return <pre>{JSON.stringify(result[activeCategory], null, 4)}</pre>;
    }
  };

  return activeCategory ? <div>{getResultUi()}</div> : null;
};

export default ImageAnalysisResult;
