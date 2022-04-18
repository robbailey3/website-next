import Loader from '@/components/common/Loaders/Loader/Loader';
import * as vision from '@google-cloud/vision';
import FaceAnnotation from '../AnalysisResult/FaceAnnotation/FaceAnnotation';
import ImagePropertiesAnnotation from '../AnalysisResult/ImagePropertiesAnnotation/ImagePropertiesAnnotation';
import LabelAnnotation from '../AnalysisResult/LabelAnnotation/LabelAnnotation';

export interface ImageAnalysisResultProps {
  result: vision.protos.google.cloud.vision.v1.IAnnotateImageResponse | null;
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
      case 'labelAnnotations':
        return (
          <LabelAnnotation
            file={file}
            labelAnnotations={result['labelAnnotations']!}
            isLoading={isLoading}
          />
        );
      case 'imagePropertiesAnnotation':
        return (
          <ImagePropertiesAnnotation
            imagePropertiesAnnotation={result['imagePropertiesAnnotation']!}
            file={file}
            isLoading={isLoading}
          />
        );
      default:
        return <p>Not yet created</p>;
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 m-4 text-center text-xl">
        <div className="text-center my-16">
          <Loader />
        </div>
      </div>
    );
  }
  return activeCategory ? <div>{getResultUi()}</div> : null;
};

export default ImageAnalysisResult;
