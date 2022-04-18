import React from 'react';

export interface ImageResultSelectorProps {
  categories: string[];
  onActiveCategoryChange: (category: string) => void;
}

const ImageResultSelector = (props: ImageResultSelectorProps) => {
  const { categories, onActiveCategoryChange } = props;

  // Temporary variable so I can slowly add the different UIs for each category
  const allowedCategories = [
    'faceAnnotations',
    'labelAnnotations',
    'imagePropertiesAnnotation',
  ];

  return categories.length > 0 ? (
    <div className="bg-white z-30">
      <div>
        <label htmlFor="category-selector" className="block text-xs">
          Select a Category
        </label>
        <select
          name="category-selector"
          id="category-selector"
          className="p-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm"
          onChange={(e) => onActiveCategoryChange(e.target.value)}
          onBlur={(e) => onActiveCategoryChange(e.target.value)}
        >
          {categories
            .filter((cat) => allowedCategories.includes(cat))
            .map((cat) => (
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
