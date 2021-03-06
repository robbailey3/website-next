import * as vision from '@google-cloud/vision';
import React from 'react';
import FaceAttribute from '../../FaceAttribute/FaceAttribute';
import ImagePreview, { Box, Dot } from '../../ImagePreview/ImagePreview';

export interface FaceAnnotationProps {
  faceAnnotations: vision.protos.google.cloud.vision.v1.IFaceAnnotation[];
  file: File;
  isLoading: boolean;
}

const FaceAnnotation = (props: FaceAnnotationProps) => {
  const { faceAnnotations, file, isLoading } = props;

  const [dots, setDots] = React.useState<Dot[]>([]);

  const [boxes, setBoxes] = React.useState<Box[]>([]);

  React.useEffect(() => {
    const getDots = () => {
      const dots = faceAnnotations
        .filter(
          (face) => face.landmarks !== undefined && face.landmarks !== null
        )
        .map((face) => {
          return face
            .landmarks!.filter(
              (landmark) =>
                landmark.position !== undefined && landmark.position !== null
            )
            .filter((landmark) => landmark.position!.x && landmark.position!.y)
            .map((landmark) => {
              return {
                x: landmark.position!.x!,
                y: landmark.position!.y!,
              };
            });
        })
        .flat();
      setDots(dots);
    };

    const getBoxes = () => {
      const boxes = faceAnnotations
        .filter(
          (face) =>
            face.boundingPoly !== undefined && face.boundingPoly !== null
        )
        .map((face, index) => {
          let box1: Box | null = null;
          let box2: Box | null = null;
          if (face.boundingPoly?.vertices) {
            box1 = {
              vertices: face.boundingPoly.vertices.map((vertex) => ({
                x: vertex.x!,
                y: vertex.y!,
              })),
            };
          }
          if (face.fdBoundingPoly?.vertices) {
            box2 = {
              label: `Face ${index + 1}`,
              vertices: face.fdBoundingPoly.vertices.map((vertex) => ({
                x: vertex.x!,
                y: vertex.y!,
              })),
            };
          }
          return [box1, box2];
        })
        .flat();
      setBoxes([...(boxes.filter((b) => b !== null) as Box[])]);
    };
    getDots();
    getBoxes();
  }, [faceAnnotations, file]);

  return (
    <section className="relative flex flex-wrap">
      <div className="sticky top-24 md:top-32 self-start z-30 w-full md:w-auto bg-white text-center">
        <ImagePreview
          file={file}
          isLoading={isLoading}
          boxes={boxes}
          dots={dots}
        />
      </div>
      <div className="grow p-4">
        {faceAnnotations.map((face, index) => {
          return (
            <div key={`face_${index}`} className="mb-4">
              <h3>Face {index + 1}</h3>
              <div>
                <FaceAttribute
                  attribute="Joy"
                  likelihood={face.joyLikelihood as any}
                />
                <FaceAttribute
                  attribute="Sorrow"
                  likelihood={face.sorrowLikelihood as any}
                />
                <FaceAttribute
                  attribute="Anger"
                  likelihood={face.angerLikelihood as any}
                />
                <FaceAttribute
                  attribute="Surprise"
                  likelihood={face.surpriseLikelihood as any}
                />
                <FaceAttribute
                  attribute="Under Exposed"
                  likelihood={face.underExposedLikelihood as any}
                />
                <FaceAttribute
                  attribute="Blurred"
                  likelihood={face.blurredLikelihood as any}
                />
                <FaceAttribute
                  attribute="Headwear"
                  likelihood={face.headwearLikelihood as any}
                />
              </div>
              <div className="flex space-x-2 justify-center text-slate-700 italic text-xs">
                <div>
                  <span>Roll: </span>
                  <span>{face.rollAngle?.toPrecision(2)}&deg;</span>
                </div>
                <div>
                  <span>Tilt: </span>
                  <span>{face.tiltAngle?.toPrecision(2)}&deg;</span>
                </div>
                <div>
                  <span>Pan: </span>
                  <span>{face.panAngle?.toPrecision(2)}&deg;</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FaceAnnotation;
