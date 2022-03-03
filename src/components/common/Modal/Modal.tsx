/* eslint-disable jsx-a11y/no-static-element-interactions */

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { fromEvent } from 'rxjs';
import { IconButton } from '../Buttons';

/* eslint-disable jsx-a11y/click-events-have-key-events */
export interface ModalProps {
  children: JSX.Element;
  onClose: () => void;
}

const Modal = (props: ModalProps) => {
  const { children, onClose } = props;

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  React.useEffect(() => {
    const $subscription = fromEvent<KeyboardEvent>(
      document,
      'keypress'
    ).subscribe({
      next: handleKeyPress,
    });

    return () => {
      if ($subscription) {
        $subscription.unsubscribe();
      }
    };
  });

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 z-50"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg z-50 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg w-full rounded-lg">
        <div className="flex p-4">
          <div className="ml-auto">
            <IconButton label={'Close'} icon={faTimes} onClick={onClose} />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Modal;
