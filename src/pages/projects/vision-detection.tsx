import Container from '@/components/common/Container/Container';
import Head from 'next/head';
import ImageAnalysisForm from '@/features/vision-detection/components/ImageAnalysisForm/ImageAnalysisForm';

import visionDetection from '@/features/vision-detection/services/vision-detection';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import * as vision from '@google-cloud/vision';
import ImageAnalysisResult from '@/features/vision-detection/components/ImageAnalysisResult/ImageAnalysisResult';
import ImageResultSelector from '@/features/vision-detection/components/ImageResultSelector/ImageResultSelector';
import * as Sentry from '@sentry/browser';
import { ToastContext } from '@/context/ToastContext/ToastContext';
import { ToastModel } from '@/models/ToastModel';
import { IconButton } from '@/components/common/Buttons';

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

  const { addToast } = useContext(ToastContext);

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
      handleActiveCategoryChange(getResultCategories(result)[0]);
    } catch (e: any) {
      Sentry.captureException(e);
      addToast(
        new ToastModel(
          'error',
          `An error occurred while analyzing the image: ${
            e.response.status === 400 ? 'Invalid image' : e.message
          }`,
          5000
        )
      );
      reset();
    } finally {
      setIsLoading(false);
    }
  };

  const getResultCategories = (
    results?: vision.protos.google.cloud.vision.v1.IAnnotateImageResponse
  ): string[] => {
    if (!analysisResult && !results) {
      return [];
    }
    const analysis = results || analysisResult;
    const cats: string[] = [];

    Object.entries(analysis!).forEach(([key, value]) => {
      if (
        value != null &&
        (value.length > 0 || Object.keys(value).length > 0)
      ) {
        cats.push(key);
      }
    });
    return cats;
  };

  const handleActiveCategoryChange = (category: string) => {
    setActiveCategory(
      category as keyof vision.protos.google.cloud.vision.v1.IAnnotateImageResponse
    );
  };

  const reset = () => {
    setCurrentFile(null);
    setAnalysisResult(null);
    setActiveCategory(null);
  };

  return (
    <>
      <Head>
        <title>Image Analysis / Projects / Rob Bailey</title>
        <meta
          name="description"
          content="Using Google Cloud Vision API to analyse images and do cool
                stuff like detect faces, labels, and more."
        />
      </Head>
      <Container>
        <section>
          <div className="flex py-4 items-center">
            <div className="grow">
              <h1 className="text-2xl">Image Analysis</h1>
              <p>
                Using Google Cloud Vision API to analyse images and do cool
                stuff like detect faces, labels, and more.
              </p>
            </div>
            <div className="ml-auto">
              <IconButton label="reset" icon={faSync} />
            </div>
          </div>

          <div>
            {!currentFile && (
              <ImageAnalysisForm onFileChange={handleFileChange} />
            )}
            <div className="flex justify-end my-2">
              {analysisResult && (
                <ImageResultSelector
                  categories={getResultCategories()}
                  onActiveCategoryChange={handleActiveCategoryChange}
                />
              )}
            </div>
            {currentFile && (
              <ImageAnalysisResult
                result={analysisResult}
                file={currentFile}
                activeCategory={activeCategory}
                isLoading={isLoading}
              />
            )}
          </div>
        </section>
      </Container>
    </>
  );
};

export default VisionDetectionPage;
