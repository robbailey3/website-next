import { Button } from '@/components/common/Buttons';
import Modal from '@/components/common/Modal/Modal';
import { ToastContext } from '@/context/ToastContext/ToastContext';
import React from 'react';
import AdminPhotoUploadPreviewItem from '../AdminPhotoUploadPreviewItem/AdminPhotoUploadPreviewItem';

export interface UploadFormResult {
  file: File;
  previewSrc: string | null;
  isLoading: boolean;
  isPreviewLoading: boolean;
}

export interface AdminPhotoUploadModalProps {
  onClose: () => void;
  onSubmit: (result: UploadFormResult[]) => void;
}

const AdminPhotoUploadModal = (props: AdminPhotoUploadModalProps) => {
  const { onClose, onSubmit } = props;

  const { addToast } = React.useContext(ToastContext);

  const VALID_FILE_EXTENSIONS = ['jpg', 'jpeg', 'png'];

  const [uploadResults, setUploadResults] = React.useState<UploadFormResult[]>(
    []
  );

  const updateFiles = async (files: FileList) => {
    Array.from(files).forEach(async (file, index) => {
      const previewSrc = await readFile(file);
      setUploadResults((prevState) => [
        ...prevState.map((u, i) => {
          if (i === index) {
            return {
              file,
              previewSrc: previewSrc,
              isLoading: true,
              isPreviewLoading: false,
            };
          }
          return u;
        }),
      ]);
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadResults([]);
    const { files } = event.target;
    if (!files || files.length === 0) {
      return;
    }
    if (filesAreValid(files)) {
      Array.from(files).forEach((file, index) => {
        const uploadResult = {
          file,
          previewSrc: null,
          isLoading: true,
          isPreviewLoading: true,
        };
        setUploadResults((prevUploadResults) => [
          ...prevUploadResults,
          uploadResult,
        ]);
      });
      updateFiles(files);
    } else {
      addToast({
        variant: 'error',
        message: 'Invalid file',
        isActive: true,
        duration: 10000,
      });
    }
  };

  const filesAreValid = (files: FileList | null): boolean => {
    if (!files) {
      return false;
    }
    let isValid = true;
    Array.from(files).forEach((file) => {
      if (!fileIsValid(file)) {
        isValid = false;
      }
    });
    return isValid;
  };

  const fileIsValid = (file: File): boolean => {
    if (!file) {
      return false;
    }
    if (file.size > 5 * 1000000) {
      return false;
    }
    if (!file.type.startsWith('image/')) {
      return false;
    }
    if (
      !VALID_FILE_EXTENSIONS.includes(file.name.split('.').pop()!.toLowerCase())
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    onSubmit(uploadResults);
    onClose();
  };

  const readFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
    });
  };

  return (
    <Modal onClose={onClose}>
      <div className="p-4">
        <form className="mb-4">
          <div className="py-4">
            <label htmlFor="photos" className="block mb-4">
              Upload Photos
            </label>
            <input
              type="file"
              id="photos"
              name="photos"
              multiple
              onChange={handleFileChange}
              pattern="image/*"
              className="block w-full border-2 border-gray-400 focus:outline-none focus:border-blue-500 rounded p-2"
            />
          </div>
          <Button onClick={handleSubmit}>Upload</Button>
        </form>
        <div className="flex flex-wrap justify-start">
          {uploadResults.map((result: UploadFormResult, i: number) => (
            <AdminPhotoUploadPreviewItem
              previewSrc={result.previewSrc}
              key={`preview_${i}`}
              isLoading={result.isPreviewLoading}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default AdminPhotoUploadModal;
