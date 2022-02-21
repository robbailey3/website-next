import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export interface ImageAnalysisFormProps {
  onFileChange: (file: File) => void;
}

const ImageAnalysisForm = (props: ImageAnalysisFormProps) => {
  const { onFileChange } = props;

  const MAX_FILE_SIZE = 1024 * 1024 * 4; // 4MB

  const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png'];

  const [isLoading, setIsLoading] = React.useState(false);

  const [validationError, setValidationError] = React.useState<string | null>(
    null
  );

  const fileIsValid = (file: File): boolean => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setValidationError('Only jpeg and png files are allowed');
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      setValidationError('File size must be less than 5MB');
      return false;
    }
    return true;
  };

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValidationError(null);
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (fileIsValid(file)) {
        onFileChange(file);
      }
    }
  };

  return (
    <>
      <form>
        <div>
          <label htmlFor="image-upload">
            <div className="w-3/4 mx-auto flex flex-wrap justify-center items-center text-3xl bg-slate-300 py-8 border-dashed border-2 border-slate-400 text-slate-700 hover:bg-blue-100 hover:border-blue-300 duration-200">
              <span className="basis-full my-2 text-center">Upload a file</span>
              <FontAwesomeIcon icon={faUpload} />
            </div>
          </label>
          <input
            type="file"
            onChange={handleInputChange}
            name="image-upload"
            id="image-upload"
            accept="image/*"
            className="hidden"
          />
        </div>
      </form>
      <div>{validationError ? <span>{validationError}</span> : null}</div>
    </>
  );
};

export default ImageAnalysisForm;
