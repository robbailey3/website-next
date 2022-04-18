import * as vision from '@google-cloud/vision';

export interface ColorAnnotationProps {
  colorAnnotation: vision.protos.google.cloud.vision.v1.IColorInfo | undefined;
}

const ColorAnnotation = (props: ColorAnnotationProps) => {
  const { colorAnnotation } = props;

  if (!colorAnnotation) {
    return null;
  }

  return (
    <div className="relative my-4">
      <div
        className="w-full h-16 rounded shadow"
        style={{
          backgroundColor: `rgb(${colorAnnotation.color?.red}, ${colorAnnotation.color?.green}, ${colorAnnotation.color?.blue})`,
        }}
      ></div>
      <div>
        <div className="text-gray-500 text-sm mt-2 mb-4 flex flex-wrap gap-4">
          <div>
            <strong>R: </strong>
            {colorAnnotation.color?.red}
          </div>
          <div>
            <strong>G: </strong>
            {colorAnnotation.color?.green}
          </div>
          <div>
            <strong>B: </strong>
            {colorAnnotation.color?.blue}
          </div>
          <div>
            <strong>Score: </strong>
            {colorAnnotation.score?.toPrecision(2)}
          </div>
          <div>
            <strong>Pixel Fraction: </strong>
            {colorAnnotation.pixelFraction?.toPrecision(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorAnnotation;
