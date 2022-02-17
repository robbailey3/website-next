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
import * as Sentry from '@sentry/nextjs';

const VisionDetectionPage = () => {
  const [currentFile, setCurrentFile] = React.useState<File | null>(null);

  const [analysisResult, setAnalysisResult] =
    React.useState<vision.protos.google.cloud.vision.v1.IAnnotateImageResponse | null>(
      null
    );

  const [activeCategory, setActiveCategory] = React.useState<
    keyof vision.protos.google.cloud.vision.v1.IAnnotateImageResponse | null
  >(null);

  const [isLoading, setIsLoading] = React.useState(false);

  const handleFileChange = (file: File) => {
    setCurrentFile(file);
    getAnalysis(file);
  };

  const getAnalysis = async (file: File) => {
    setIsLoading(true);
    try {
      const result = await visionDetection.getAnalysis(file);
      setAnalysisResult(result);
      setIsLoading(false);
    } catch (e) {
      Sentry.captureException(e);
      reset();
    } finally {
      setIsLoading(false);
    }
  };

  const handleActiveCategoryChange = (
    category: keyof vision.protos.google.cloud.vision.v1.IAnnotateImageResponse
  ) => {
    setActiveCategory(category);
  };

  const reset = () => {
    setCurrentFile(null);
    setAnalysisResult(null);
    setActiveCategory(null);
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
          {analysisResult && (
            <ImageResultSelector
              results={analysisResult}
              onActiveCategoryChange={handleActiveCategoryChange}
            />
          )}
          {currentFile && (
            <ImagePreview
              file={currentFile}
              isLoading={isLoading}
              overlayVertices={[[]]}
            />
          )}

          {analysisResult && (
            <ImageAnalysisResult
              result={analysisResult}
              activeCategory={activeCategory}
            />
          )}
        </div>
      </section>
    </Container>
  );
};

export default VisionDetectionPage;
