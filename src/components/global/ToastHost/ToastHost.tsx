import Toast from '@/components/common/Toast/Toast';
import { ToastModel } from '@/models/Toast';
import React from 'react';

export interface ToastHostProps {
  toasts: ToastModel[];
}

const TostHost = (props: ToastHostProps) => {
  const { toasts } = props;

  return toasts.length > 0 ? (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      {toasts.map((t, i) => (
        <Toast key={`toast_${i}`} toast={t} />
      ))}
    </div>
  ) : null;
};

export default TostHost;
