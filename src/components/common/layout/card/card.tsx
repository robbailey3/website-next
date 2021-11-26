import clsx from 'clsx';

type CardProps = {
  className?: string;
  children?: JSX.Element | JSX.Element[];
};

const Card = (props: CardProps) => {
  const { className, children } = props;

  return (
    <div className={clsx('rounded bg-background-400 shadow', className)}>
      {children}
    </div>
  );
};

export default Card;
