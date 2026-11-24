import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
  background-color: rgba(17, 24, 39, 0.5);
  animation: ${fadeIn} 0.2s ease-out;
`;

export const Panel = styled.div`
  width: 100%;
  max-width: 400px;
  padding: var(--space-6);
  border-radius: var(--radius-xl);
  background-color: var(--color-bg);
  box-shadow: var(--shadow-lg);
  animation: ${slideUp} 0.2s ease-out;
`;

export const Title = styled.h2`
  margin-bottom: var(--space-2);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);
`;

export const Body = styled.div`
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
  margin-top: var(--space-6);
`;
