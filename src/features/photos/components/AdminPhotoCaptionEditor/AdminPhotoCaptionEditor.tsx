import { ToastContext } from '@/context/ToastContext/ToastContext';
import axios from 'axios';
import React, { useContext } from 'react';
import { PhotoModel } from '../../models/photo';

export interface AdminPhotoCaptionEditorProps {
  photo: PhotoModel;
}

const AdminPhotoCaptionEditor = (props: AdminPhotoCaptionEditorProps) => {
  const { photo } = props;

  const { addToast } = useContext(ToastContext);

  const [caption, setCaption] = React.useState(photo.caption);

  const inputId = `photo-caption-${photo._id}`;

  const submitChange = async () => {
    try {
      await axios.patch(`/api/photos/${photo.albumId}/${photo._id}`, {
        caption,
      });

      setCaption(caption);

      addToast({
        variant: 'success',
        message: 'Caption updated',
        isActive: true,
        duration: 5000,
      });
    } catch (error: any) {
      addToast({
        variant: 'error',
        message: `Failed to update caption: ${error.message}`,
        isActive: true,
        duration: 5000,
      });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(event.currentTarget.value);
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      submitChange();
    }
  };

  return (
    <div>
      <label htmlFor={inputId} className="sr-only">
        Edit caption
      </label>
      <input
        type="text"
        className="p-1 rounded-b w-full border border-transparent focus:outline-none focus:shadow-inner focus:border-blue-500"
        name={inputId}
        id={inputId}
        value={caption}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
        onBlur={submitChange}
      />
    </div>
  );
};

export default AdminPhotoCaptionEditor;
