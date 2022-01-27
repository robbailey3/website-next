import clsx from 'clsx';

export interface ContainerProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
}

const Container = (props: ContainerProps) => {
  const { children, className } = props;
  return (
    <div
      className={clsx(
        'mx-auto max-w-xs sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-4 w-full',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
