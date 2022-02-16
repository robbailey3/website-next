import * as vision from '@google-cloud/vision';
import React from 'react';

export interface ImageResultSelectorProps {
  results: vision.protos.google.cloud.vision.v1.IAnnotateImageResponse;
}

const ImageResultSelector = (props: ImageResultSelectorProps) => {
  const { results } = props;

  const [categories, setCategories] = React.useState<string[]>([]);

  React.useEffect(() => {
    const getResultCategories = () => {
      const cats: string[] = [];

      Object.entries(results).forEach(([key, value]) => {
        console.log({ key, value });
        if (
          value != null &&
          (value.length > 0 || Object.keys(value).length > 0)
        ) {
          cats.push(key);
        }
      });
      setCategories(cats);
    };
    getResultCategories();
  }, [results]);

  return categories.length > 0 ? (
    <div>
      {categories.map((cat) => (
        <span key={cat}>{cat} </span>
      ))}
    </div>
  ) : (
    <div>No categories found</div>
  );
};

export default ImageResultSelector;
