import { useEffect } from 'react';
import { useToastStore, type Toast } from '../../stores/useToastStore';
import * as S from './Toast.styles';

const TOAST_DURATION = 3000;

function ToastItem({ id, message, type }: Toast) {
  const removeToast = useToastStore((state) => state.removeToast);

  useEffect(() => {
    const timer = setTimeout(() => removeToast(id), TOAST_DURATION);
    return () => clearTimeout(timer);
  }, [id, removeToast]);

  return (
    <S.Item role="status">
      <S.Dot $type={type} />
      <S.Message>{message}</S.Message>
    </S.Item>
  );
}

export default function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <S.Container>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </S.Container>
  );
}
