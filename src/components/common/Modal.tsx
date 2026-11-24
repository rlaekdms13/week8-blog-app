import { useEffect, useId, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import * as S from './Modal.styles';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: ModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <S.Backdrop onClick={onClose}>
      <S.Panel
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <S.Title id={titleId}>{title}</S.Title>
        <S.Body>{children}</S.Body>
        {footer && <S.Footer>{footer}</S.Footer>}
      </S.Panel>
    </S.Backdrop>,
    document.body,
  );
}
