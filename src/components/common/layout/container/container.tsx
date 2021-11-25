import clsx from 'clsx';
import styles from './container.module.scss';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container = (props: ContainerProps) => {
  const { children, className } = props;
  return (
    <div
      className={clsx(
        'mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
