import clsx from 'clsx';
import { motion } from 'framer-motion';

export interface LoaderProps {
  className?: string;
}

const Loader = (props: LoaderProps) => {
  const { className } = props;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className={clsx(
          'spinner-border animate-spin inline-block w-12 h-12 border-4 border-blue-600 border-r-transparent rounded-full',
          className
        )}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </motion.div>
  );
};

export default Loader;
