/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type ModalProps = {
  children?: JSX.Element | JSX.Element[];
  title: string;
  state: 'open' | 'closed';
  className?: string;
  onClose: () => void;
};

const Modal = (props: ModalProps) => {
  const { children, title, state, onClose, className } = props;

  if (state !== 'open') {
    return null;
  }
  return (
    <>
      <div className={className}>
        <div
          data-test="modal-backdrop"
          className="bg-background-100 bg-opacity-20 fixed top-0 left-0 w-full h-full backdrop-filter backdrop-blur-sm backdrop-grayscale z-30"
          onClick={onClose}
        ></div>
        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 bg-background p-4 rounded shadow-lg"
          role="dialog"
        >
          <header className="flex items-center">
            <h2 className="text-lg m-0">{title}</h2>
            <button
              className="p-2 rounded-full leading-none ml-4 hover:bg-accent-300 hover:bg-opacity-10"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
            </button>
          </header>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
