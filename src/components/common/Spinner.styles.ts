import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-16) 0;
`;

export const Circle = styled.span`
  width: 32px;
  height: 32px;
  border: 3px solid var(--color-primary-ring);
  border-top-color: var(--color-primary);
  border-radius: var(--radius-full);
  animation: ${spin} 0.8s linear infinite;
`;

export const Label = styled.p`
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
`;
