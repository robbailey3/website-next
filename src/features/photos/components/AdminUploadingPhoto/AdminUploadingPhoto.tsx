import Loader from '@/components/common/Loaders/Loader/Loader';
import TaskQueue, { TaskItem, TaskItemStatus } from '@/utils/TaskQueue';
import axios from 'axios';
import clsx from 'clsx';
import React from 'react';

export interface AdminUploadingPhotoProps {
  file: File;
  previewSrc: string;
  albumId: string;
}

const AdminUploadingPhoto = (props: AdminUploadingPhotoProps) => {
  const { file, previewSrc, albumId } = props;

  const [isLoading, setIsLoading] = React.useState(false);

  const [taskStatus, setTaskStatus] = React.useState<TaskItemStatus | null>(
    null
  );

  const [uploadProgress, setUploadProgress] = React.useState(0);

  const uploadPhoto = React.useCallback(async () => {
    const taskItem = new TaskItem(async () => {
      const formdata = new FormData();

      formdata.append('photo', file);

      await axios.post(`/api/photos/${albumId}/upload`, formdata, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.min(
            95,
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );

          setUploadProgress(percentCompleted);
        },
      });
      setUploadProgress(100);
    });
    taskItem.status.subscribe((status) => {
      setTaskStatus(status);
    });
    TaskQueue.addTask(taskItem);
  }, [file, albumId]);

  React.useEffect(() => {
    setIsLoading(true);
    uploadPhoto();
  }, [uploadPhoto]);

  return (
    <div className="w-48 h-48 mr-4 mb-4 relative">
      {isLoading && (
        <div
          className={clsx(
            'absolute top-0 left-0 h-full w-full flex justify-center items-center bg-black',
            {
              'bg-opacity-75': taskStatus === 'pending',
              'bg-opacity-40': taskStatus !== 'pending',
            }
          )}
        >
          <Loader />
        </div>
      )}
      {previewSrc && (
        <img src={previewSrc} alt="" className="w-full h-full object-cover" />
      )}
      <div className="absolute bottom-0 left-0 h-1 w-full">
        <div
          className="h-1 bg-green-500 rounded-full duration-1000"
          style={{ width: `${uploadProgress}%` }}
        />
      </div>
    </div>
  );
};

export default AdminUploadingPhoto;
