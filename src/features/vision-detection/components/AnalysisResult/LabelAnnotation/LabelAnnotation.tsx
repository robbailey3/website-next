import * as vision from '@google-cloud/vision';
import ImagePreview from '../../ImagePreview/ImagePreview';

export interface LabelAnnotationProps {
  file: File;
  labelAnnotations: vision.protos.google.cloud.vision.v1.IEntityAnnotation[];
  isLoading: boolean;
}

const LabelAnnotation = (props: LabelAnnotationProps) => {
  const { file, labelAnnotations, isLoading } = props;
  return (
    <section className="relative flex flex-wrap">
      <div className="sticky top-24 md:top-32 self-start z-30 w-full md:w-auto text-center bg-white">
        <ImagePreview file={file} isLoading={isLoading} boxes={[]} dots={[]} />
      </div>
      <div className="grow p-4">
        {labelAnnotations.map((labelAnnotation) => (
          <div key={labelAnnotation.mid}>
            <h3>{labelAnnotation.description}</h3>
            <div className="flex">
              <div className="relative overflow-hidden bg-gray-50 w-full h-4 rounded">
                <div
                  style={{ width: `${labelAnnotation.score! * 100}%` }}
                  className="bg-blue-500 h-full absolute top-0 left-0"
                ></div>
              </div>
              <div className="w-8">
                <div className="text-xs text-gray-500 ml-2">
                  {(labelAnnotation.score! * 100).toPrecision(2)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LabelAnnotation;
