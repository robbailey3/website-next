import * as vision from '@google-cloud/vision';
import React from 'react';
import ImagePreview from '../../ImagePreview/ImagePreview';
import ColorAnnotation from '../ColorAnnotation/ColorAnnotation';

export interface ImagePropertiesAnnotationProps {
  imagePropertiesAnnotation: vision.protos.google.cloud.vision.v1.IImageProperties;
  file: File;
  isLoading: boolean;
}

const ImagePropertiesAnnotation = (props: ImagePropertiesAnnotationProps) => {
  const { imagePropertiesAnnotation, file, isLoading } = props;

  return (
    <section className="relative flex flex-wrap">
      <div className="sticky top-24 md:top-32 self-start z-30 w-full md:w-auto text-center bg-white">
        <ImagePreview file={file} isLoading={isLoading} />
      </div>
      <div className="grow p-4">
        {imagePropertiesAnnotation.dominantColors?.colors?.map(
          (color, index) => (
            <div key={index}>
              <ColorAnnotation colorAnnotation={color} />
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default ImagePropertiesAnnotation;
