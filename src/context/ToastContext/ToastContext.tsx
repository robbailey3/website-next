import ToastHost from '@/components/global/ToastHost/ToastHost';
import React from 'react';
import { ToastModel } from 'src/models/Toast';

export interface ToastState {
  toasts: ToastModel[];
  addToast: (t: ToastModel) => void;
}

const ToastContext = React.createContext<ToastState>({} as ToastState);

export interface ToastProviderProps {
  children: JSX.Element;
}

const ToastProvider = (props: ToastProviderProps) => {
  const { children } = props;

  const addToast = (t: ToastModel) => {
    setToasts((toasts) => [...toasts, t]);
  };

  const [toasts, setToasts] = React.useState<ToastModel[]>([]);

  console.log({ toasts });

  return (
    <ToastContext.Provider value={{ toasts, addToast }}>
      {children}
      <ToastHost toasts={toasts} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;

export { ToastContext };
