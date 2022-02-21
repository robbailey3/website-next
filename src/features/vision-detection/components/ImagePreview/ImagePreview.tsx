import React from 'react';
import * as vision from '@google-cloud/vision';

export interface Box
  extends vision.protos.google.cloud.vision.v1.IBoundingPoly {}

export interface Dot {
  x: number;
  y: number;
}

/* eslint-disable @next/next/no-img-element */
export interface ImagePreviewProps {
  file: File;
  isLoading: boolean;
  boxes?: vision.protos.google.cloud.vision.v1.IBoundingPoly[];
  dots?: Dot[];
}

const ImagePreview = (props: ImagePreviewProps) => {
  const { file, isLoading, boxes, dots } = props;

  let imageRef = React.useRef<HTMLImageElement>(null);

  const [imageDimensions, setImageDimensions] = React.useState<{
    width: number;
    height: number;
  } | null>(null);

  const [imageSrc, setImageSrc] = React.useState<string | null>(null);

  const [hasError, setHasError] = React.useState(false);

  const canvas = React.useRef<HTMLCanvasElement>(null);

  const getEncodedFile = (file: File): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          setImageSrc(reader.result as string);

          setImageDimensions({
            width: img.naturalWidth,
            height: img.naturalHeight,
          });
          resolve();
        };
      };
      reader.onerror = () => {
        setHasError(true);
        reject();
      };
      reader.readAsDataURL(file);
    });
  };

  const drawDots = React.useCallback(() => {
    if (canvas.current && imageRef.current && imageDimensions) {
      const scaleFactor = {
        x: imageRef.current!.width / imageDimensions!.width,
        y: imageRef.current!.height / imageDimensions!.height,
      };
      const ctx = canvas.current.getContext('2d');
      if (ctx) {
        if (dots) {
          dots.forEach((dot) => {
            ctx.beginPath();
            ctx.arc(
              dot.x * scaleFactor.x,
              dot.y * scaleFactor.y,
              3 * scaleFactor.x,
              0,
              2 * Math.PI
            );
            ctx.fillStyle = 'lime';
            ctx.fill();
          });
        }
      }
    }
  }, [canvas, imageRef, dots, imageDimensions]);

  const drawBoxes = React.useCallback(() => {
    if (canvas.current && imageRef.current && imageDimensions) {
      const scaleFactor = {
        x: imageRef.current!.width / imageDimensions!.width,
        y: imageRef.current!.height / imageDimensions!.height,
      };
      const ctx = canvas.current.getContext('2d');
      if (ctx) {
        if (boxes) {
          boxes.forEach((box) => {
            if (box.vertices) {
              ctx.moveTo(
                box.vertices[0].x! * scaleFactor.x,
                box.vertices[0]!.y! * scaleFactor.y
              );
              ctx.beginPath();
              box.vertices.forEach((vertex) => {
                ctx.lineTo(
                  vertex.x! * scaleFactor.x,
                  vertex.y! * scaleFactor.y
                );
              });
              ctx.closePath();
              ctx.strokeStyle = 'lime';
              ctx.stroke();
            }
          });
        }
      }
    }
  }, [canvas, imageRef, boxes, imageDimensions]);

  React.useEffect(() => {
    const init = async () => {
      if (file) {
        await getEncodedFile(file);
      }
      drawBoxes();
      drawDots();
    };
    init();
  }, [file, drawDots, drawBoxes]);

  return (
    <div className="relative inline-block">
      {isLoading && (
        <div className="absolute w-full h-full backdrop-filter backdrop-blur-sm bg-slate-900 bg-opacity-10 flex justify-center items-center">
          <span className="text-white text-2xl">Loading...</span>
        </div>
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Uploaded file"
          className="w-full rounded shadow"
          ref={imageRef}
          style={{ maxWidth: '450px', maxHeight: '450px' }}
        />
      )}
      {imageRef.current && (
        <canvas
          className="absolute w-full h-full top-0 left-0 block z-30"
          width={imageRef.current.width}
          height={imageRef.current.height}
          ref={canvas}
        />
      )}
    </div>
  );
};

export default ImagePreview;
