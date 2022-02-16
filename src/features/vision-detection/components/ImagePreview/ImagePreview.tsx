import React from 'react';

interface Vertex {
  x: number;
  y: number;
}

/* eslint-disable @next/next/no-img-element */
export interface ImagePreviewProps {
  file: File;
  overlayVertices: Vertex[][];
}

const ImagePreview = (props: ImagePreviewProps) => {
  const { file } = props;

  let imageRef = React.useRef<HTMLImageElement>(null);

  const [imageDimensions, setImageDimensions] = React.useState<{
    width: number;
    height: number;
  } | null>(null);

  const [imageSrc, setImageSrc] = React.useState<string | null>(null);

  const [hasError, setHasError] = React.useState(false);

  const getEncodedFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        setImageDimensions({
          width: img.width,
          height: img.height,
        });
      };
    };
    reader.onerror = () => {
      setHasError(true);
    };
    reader.readAsDataURL(file);
  };

  React.useEffect(() => {
    getEncodedFile(file);
  }, [file]);

  return (
    <div className="relative">
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Uploaded file"
          className="w-full rounded shadow"
          ref={imageRef}
          style={{ maxWidth: '450px', maxHeight: '450px' }}
        />
      )}
    </div>
  );
};

export default ImagePreview;
