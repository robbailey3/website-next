import * as vision from '@google-cloud/vision';

export interface ImageAnalysisResultProps {
  result: vision.protos.google.cloud.vision.v1.IAnnotateImageResponse;
}

const ImageAnalysisResult = (props: ImageAnalysisResultProps) => {
  const { result } = props;

  return <pre>{JSON.stringify(result, null, 4)}</pre>;
};

export default ImageAnalysisResult;
