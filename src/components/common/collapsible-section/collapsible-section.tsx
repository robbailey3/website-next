import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React, { KeyboardEvent } from 'react';

type CollapsibleSectionProps = {
  title: string;
  className?: string;
  titleClassName?: string;
  children: JSX.Element | JSX.Element[];
};

const CollapsibleSection = (props: CollapsibleSectionProps) => {
  const { title, children, className, titleClassName } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleKeypress = ($event: KeyboardEvent<HTMLDivElement>) => {
    if ($event.key === 'Enter') {
      toggleOpen();
    }
  };

  return (
    <div className={clsx('p-4', className)}>
      <div
        className="flex justify-between items-center"
        onClick={toggleOpen}
        role="button"
        tabIndex={0}
        onKeyPress={handleKeypress}
      >
        <div className={clsx('text-lg', titleClassName)}>{title}</div>
        <FontAwesomeIcon
          icon={faAngleDown}
          className={clsx('transform duration-300', {
            'rotate-180': isOpen,
          })}
        />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.5 }}
            className="origin-top overflow-hidden"
          >
            <div>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollapsibleSection;
