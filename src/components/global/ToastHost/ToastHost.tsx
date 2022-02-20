import Toast from '@/components/common/Toast/Toast';
import { ToastModel } from '@/models/ToastModel';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

export interface ToastHostProps {
  toasts: ToastModel[];
}

const TostHost = (props: ToastHostProps) => {
  const { toasts } = props;

  const [displayToasts, setDisplayToasts] = React.useState<ToastModel[]>([]);

  const handleToastClose = (toast: ToastModel) => {
    toast.isActive = false;
    const t = displayToasts;
    t.splice(t.indexOf(toast), 1);
    setDisplayToasts([...t]);
  };

  React.useEffect(() => {
    setDisplayToasts([...toasts.filter((t) => t.isActive)]);
  }, [toasts]);

  return toasts.length > 0 ? (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <AnimatePresence>
        {displayToasts.map((t, i) => (
          <motion.div
            key={`toast_${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Toast toast={t} onClose={handleToastClose} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  ) : null;
};

export default TostHost;
