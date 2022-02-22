import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

export interface IconButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'link';
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon: IconDefinition;
}

const IconButton = (props: IconButtonProps) => {
  const {
    type = 'button',
    variant = 'primary',
    size = 'medium',
    label,
    onClick,
    disabled,
    className,
    icon,
  } = props;

  const getSizeClassName = () => {
    switch (size) {
      case 'small':
        return 'p-1 text-sm';
      case 'medium':
        return 'p-2 text-base';
      case 'large':
        return 'p-4 text-lg';
      default:
        return 'p-2 text-base';
    }
  };

  const getVariantClassName = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600';
      case 'secondary':
        return 'bg-emerald-600 text-white hover:bg-emerald-700 focus:bg-emerald-700';
      case 'tertiary':
        return 'bg-teal-700 text-white hover:bg-teal-800 focus:bg-teal-800';
      case 'danger':
        return 'bg-red-900 text-white hover:bg-red-800 focus:bg-red-800';
      case 'link':
        return 'text-blue-500 hover:text-blue-600 hover:bg-gray-50 focus:text-blue-600 focus:bg-gray-50';
      default:
        return 'bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600';
    }
  };

  return (
    <button
      type={type}
      className={clsx(
        'rounded-full shadow flex cursor-pointer justify-center items-center leading-none duration-100 hover:shadow-lg active:shadow-none focus:shadow-lg disabled:bg-gray-100 disabled:text-gray-200',
        getSizeClassName(),
        getVariantClassName(),
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <FontAwesomeIcon icon={icon} />
      <span className="sr-only">{label}</span>
    </button>
  );
};

export default IconButton;
