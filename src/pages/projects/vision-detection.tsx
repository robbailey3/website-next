import Container from '@/components/common/Container/Container';
import ImageAnalysisForm from '@/features/vision-detection/components/ImageAnalysisForm/ImageAnalysisForm';
import ImagePreview from '@/features/vision-detection/components/ImagePreview/ImagePreview';
import visionDetection from '@/features/vision-detection/services/vision-detection';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import * as vision from '@google-cloud/vision';
import ImageAnalysisResult from '@/features/vision-detection/components/ImageAnalysisResult/ImageAnalysisResult';
import ImageResultSelector from '@/features/vision-detection/components/ImageResultSelector/ImageResultSelector';

const VisionDetectionPage = () => {
  const [currentFile, setCurrentFile] = React.useState<File | null>(null);

  const [analysisResult, setAnalysisResult] =
    React.useState<vision.protos.google.cloud.vision.v1.IAnnotateImageResponse | null>(
      null
    );

  const handleFileChange = (file: File) => {
    setCurrentFile(file);
    getAnalysis(file);
  };

  const getAnalysis = async (file: File) => {
    const result = await visionDetection.getAnalysis(file);
    console.log({ result });
    setAnalysisResult(result);
  };

  const reset = () => {
    setCurrentFile(null);
  };

  return (
    <Container>
      <section>
        <div className="flex">
          <div className="grow">
            <h1>Image Analysis</h1>
          </div>
          <div className="ml-auto">
            <button onClick={reset}>
              <span className="sr-only">Reset</span>
              <FontAwesomeIcon icon={faSync} />
            </button>
          </div>
        </div>

        <div>
          {!currentFile && (
            <ImageAnalysisForm onFileChange={handleFileChange} />
          )}
          {analysisResult && <ImageResultSelector results={analysisResult} />}
          {currentFile && (
            <ImagePreview file={currentFile} overlayVertices={[[]]} />
          )}

          {analysisResult && <ImageAnalysisResult result={analysisResult} />}
        </div>
      </section>
    </Container>
  );
};

export default VisionDetectionPage;
