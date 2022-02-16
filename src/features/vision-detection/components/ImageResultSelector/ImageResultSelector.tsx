import * as vision from '@google-cloud/vision';
import React from 'react';

export interface ImageResultSelectorProps {
  results: vision.protos.google.cloud.vision.v1.IAnnotateImageResponse;
  onActiveCategoryChange: (
    category: keyof vision.protos.google.cloud.vision.v1.IAnnotateImageResponse
  ) => void;
}

const ImageResultSelector = (props: ImageResultSelectorProps) => {
  const { results, onActiveCategoryChange } = props;

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
      <div>
        <label htmlFor="category-selector">Select a Category</label>
        <select
          name="category-selector"
          id="category-selector"
          onChange={(e) =>
            onActiveCategoryChange(
              e.target
                .value as keyof vision.protos.google.cloud.vision.v1.IAnnotateImageResponse
            )
          }
          onBlur={(e) =>
            onActiveCategoryChange(
              e.target
                .value as keyof vision.protos.google.cloud.vision.v1.IAnnotateImageResponse
            )
          }
        >
          {categories.map((cat) => (
            <option value={cat} key={cat}>
              {cat
                .match(/^[a-z]+|[A-Z][a-z]*/g)
                ?.map((x) => x[0].toUpperCase() + x.substr(1).toLowerCase())
                .join(' ')}
            </option>
          ))}
        </select>
      </div>
    </div>
  ) : (
    <div>No categories found</div>
  );
};

export default ImageResultSelector;
