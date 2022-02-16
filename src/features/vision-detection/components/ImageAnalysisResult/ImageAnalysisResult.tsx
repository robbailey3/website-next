import * as vision from '@google-cloud/vision';

export interface ImageAnalysisResultProps {
  result: vision.protos.google.cloud.vision.v1.IAnnotateImageResponse;
  activeCategory:
    | keyof vision.protos.google.cloud.vision.v1.IAnnotateImageResponse
    | null;
}

const ImageAnalysisResult = (props: ImageAnalysisResultProps) => {
  const { result, activeCategory } = props;

  console.log({ result, activeCategory });

  return activeCategory ? (
    <div>
      <pre>{JSON.stringify(result[activeCategory], null, 4)}</pre>
    </div>
  ) : null;
};

export default ImageAnalysisResult;
