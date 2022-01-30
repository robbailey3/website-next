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
    <section className={clsx(className)}>
      {header && <header>{header}</header>}
      <div>{children}</div>
    </section>
  );
};

export default Card;
