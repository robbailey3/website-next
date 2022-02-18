import { ToastModel } from '@/models/Toast';

export interface ToastProps {
  toast: ToastModel;
}

const Toast = (props: ToastProps) => {
  const { toast } = props;

  return (
    <div>
      <div>{toast.message}</div>
    </div>
  );
};

export default Toast;
