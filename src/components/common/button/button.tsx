import clsx from 'clsx';
import { MouseEventHandler } from 'react';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  children: JSX.Element | string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  round?: boolean;
  className?: string;
};

const Button = (props: ButtonProps) => {
  const {
    variant = 'primary',
    size = 'medium',
    onClick,
    children,
    disabled,
    round,
    className,
  } = props;

  const getClassNames = () => {
    switch (variant) {
      case 'primary':
        return 'bg-accent text-font-dark hover:bg-primary-700';
      case 'secondary':
        return 'bg-secondary text-font-light hover:bg-secondary-700';
      case 'tertiary':
        return 'bg-tertiary text-font-light hover:bg-tertiary-700';
      case 'ghost':
        return 'bg-transparent hover:bg-light hover:bg-opacity-10';
      default:
        return 'bg-accent text-font-dark hover:bg-primary-700';
    }
  };

  return (
    <button
      onClick={onClick}
      className={clsx(
        'shadow border-none',
        {
          'py-3 px-6': !round && size === 'large',
          'py-2 px-4': !round && size === 'medium',
          'py-1 px-2': !round && size === 'small',
          'rounded-full p-4 leading-none': round,
          'p-2': round && size === 'small',
          'p-3': round && size === 'medium',
          'p-4': round && size === 'large',
        },
        getClassNames(),
        {},
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
