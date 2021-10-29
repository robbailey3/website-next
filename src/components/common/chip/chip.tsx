import clsx from 'clsx';
import styles from './chip.module.scss';

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
    return styles[`chip__${variant}`];
  };

  return <div className={clsx(styles.chip, getClassName())}>{children}</div>;
};

export default Chip;
