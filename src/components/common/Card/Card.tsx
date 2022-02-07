import clsx from 'clsx';
import React from 'react';

export interface CardProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Card = (props: CardProps) => {
  const { header, className, children } = props;
  return (
    <div className={clsx(className, 'rounded shadow')}>
      {header && <header>{header}</header>}
      <div>{children}</div>
    </div>
  );
};

export default Card;
