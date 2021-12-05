import clsx from 'clsx';
import { MouseEventHandler } from 'react';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  disabled?: boolean;
  children: JSX.Element | string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  round?: boolean;
  className?: string;
};

const Button = (props: ButtonProps) => {
  const {
    variant = 'primary',
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
        'p-4 shadow border-none',
        getClassNames(),
        {
          'rounded-full leading-none': round,
        },
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
