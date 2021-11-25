import clsx from 'clsx';

type ChipProps = {
  children: JSX.Element | string;
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
};

const Chip = (props: ChipProps) => {
  const { children, variant = 'primary' } = props;

  const getClassName = () => {
    return `chip__${variant}`;
  };

  return <div className={clsx(getClassName())}>{children}</div>;
};

export default Chip;
