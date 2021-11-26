import clsx from 'clsx';

type ChipProps = {
  children: JSX.Element | string;
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info';
};

const Chip = (props: ChipProps) => {
  const { children, variant = 'primary' } = props;

  const getClassName = () => {
    switch (variant) {
      case 'primary':
        return 'bg-accent text-font-dark';
      case 'secondary':
        return 'bg-secondary text-font-dark';
      case 'tertiary':
        return 'bg-tertiary text-font-dark';
      case 'success':
        return 'bg-success text-font-dark';
      case 'danger':
        return 'bg-danger text-font-dark';
      case 'warning':
        return 'bg-warning text-font-dark';
      case 'info':
        return 'bg-info text-font-dark';
    }
  };

  return (
    <div
      className={clsx(
        'px-2 mr-2 rounded-lg inline-block select-none',
        getClassName()
      )}
    >
      {children}
    </div>
  );
};

export default Chip;
