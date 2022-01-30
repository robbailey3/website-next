import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import React from 'react';

export interface TagProps {
  children: JSX.Element | JSX.Element[] | string;
  variant: 'primary' | 'secondary';
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Tag = (props: TagProps) => {
  const { children, variant, dismissible, onDismiss } = props;

  const getTagColours = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-100 text-black';
      case 'secondary':
        return 'bg-gray-100 text-black';
      default:
        return 'bg-gray-100 text-black';
    }
  };

  const handleDismissClick = () => {
    if (onDismiss) {
      onDismiss();
    }
  };

  return (
    <span
      className={clsx(
        'px-2 py-1 text-xs rounded inline-flex gap-2 justify-between items-center',
        getTagColours()
      )}
    >
      {children}
      {dismissible && (
        <button
          className="hover:bg-dark-gray-500 hover:bg-opacity-10 flex justify-center items-center rounded-full p-1 leading-none"
          onClick={handleDismissClick}
        >
          <span className="sr-only">Dismiss</span>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}
    </span>
  );
};

export default Tag;
