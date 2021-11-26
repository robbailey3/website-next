import clsx from 'clsx';
import { CSSProperties } from 'react';

type FlexContainerProps = {
  children: JSX.Element | JSX.Element[];
  className?: string;
};

const FlexContainer = (props: FlexContainerProps) => {
  const { children, className } = props;

  return (
    <>
      <div className={clsx('flex', className)}>{children}</div>
    </>
  );
};

export default FlexContainer;
