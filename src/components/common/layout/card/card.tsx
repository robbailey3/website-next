import clsx from 'clsx';
import styles from './card.module.scss';

type CardProps = {
  className?: string;
  children?: JSX.Element | JSX.Element[];
};

const Card = (props: CardProps) => {
  const { className, children } = props;

  return <div className={clsx(styles.card, className)}>{children}</div>;
};

export default Card;
