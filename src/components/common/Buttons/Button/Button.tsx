import clsx from 'clsx';

export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'link';
  size?: 'small' | 'medium' | 'large';
  children: JSX.Element | string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button = (props: ButtonProps) => {
  const {
    type = 'button',
    variant = 'primary',
    size = 'medium',
    children,
    onClick,
    disabled,
    className,
  } = props;

  const getSizeClassName = () => {
    switch (size) {
      case 'small':
        return 'px-2 py-1 text-sm';
      case 'medium':
        return 'px-4 py-2 text-base';
      case 'large':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-base';
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
        'rounded shadow cursor-pointer disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none disabled:cursor-not-allowed',
        getSizeClassName(),
        getVariantClassName(),
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
