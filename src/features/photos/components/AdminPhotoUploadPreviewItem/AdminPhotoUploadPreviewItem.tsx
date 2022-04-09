/* eslint-disable @next/next/no-img-element */
import Loader from '@/components/common/Loaders/Loader/Loader';
import React from 'react';

export interface AdminPhotoUploadPreviewItemProps {
  previewSrc: string | null;
  isLoading: boolean;
}

const AdminPhotoUploadPreviewItem = (
  props: AdminPhotoUploadPreviewItemProps
) => {
  const { previewSrc, isLoading } = props;

  return (
    <div className="w-32 h-32 rounded overflow-hidden">
      {isLoading && <Loader />}
      {!isLoading && previewSrc && (
        <img
          src={previewSrc}
          alt={'preview'}
          className="block w-full object-cover h-full"
        />
      )}
    </div>
  );
};

export default AdminPhotoUploadPreviewItem;
