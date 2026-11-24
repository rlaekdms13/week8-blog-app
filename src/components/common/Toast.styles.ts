import styled, { keyframes } from 'styled-components';
import type { ToastType } from '../../stores/useToastStore';

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const dotColors = {
  success: 'var(--color-success)',
  error: 'var(--color-danger)',
  info: 'var(--color-primary)',
};

export const Container = styled.div`
  position: fixed;
  bottom: var(--space-6);
  left: 50%;
  z-index: var(--z-toast);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  transform: translateX(-50%);
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-width: 280px;
  max-width: calc(100vw - var(--space-8));
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  background-color: var(--color-gray-900);
  box-shadow: var(--shadow-md);
  animation: ${slideUp} 0.25s ease-out;
`;

export const Dot = styled.span<{ $type: ToastType }>`
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background-color: ${({ $type }) => dotColors[$type]};
`;

export const Message = styled.p`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-inverse);
`;
