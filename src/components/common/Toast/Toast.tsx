import { ToastModel } from '@/models/ToastModel';
import {
  faCheck,
  faInfo,
  faTimes,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React from 'react';
import { timer } from 'rxjs';

export interface ToastProps {
  toast: ToastModel;
  onClose: (t: ToastModel) => void;
}

const Toast = (props: ToastProps) => {
  const { toast, onClose } = props;

  const getToastIcon = (): IconDefinition => {
    switch (toast.variant) {
      case 'success':
        return faCheck;
      case 'error':
      case 'warning':
      case 'info':
        return faInfo;
      default:
        return faInfo;
    }
  };

  React.useEffect(() => {
    const $timer = timer(toast.duration).subscribe(() => {
      onClose(toast);
    });

    return () => {
      if ($timer) $timer.unsubscribe();
    };
  });

  return (
    <div
      className={clsx('relative flex rounded shadow-xl mt-4', {
        'bg-green-300': toast.variant === 'success',
        'bg-red-300': toast.variant === 'error',
        'bg-yellow-300': toast.variant === 'warning',
        'bg-gray-300': toast.variant === 'info',
      })}
    >
      <div className="p-2 bg-white bg-opacity-50 ">
        <FontAwesomeIcon icon={getToastIcon()} />
      </div>
      <div className="p-2 grow">{toast.message}</div>
      <div className="p-2 flex justify-center items-center">
        <button className="p-1 leading-none rounded-full bg-gray-400 bg-opacity-40 text-xs hover:bg-gray-600 duration-200">
          <span className="sr-only">Close</span>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
