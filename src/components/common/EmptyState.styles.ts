import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-16) var(--space-6);
  border: 1px dashed var(--color-border-strong);
  border-radius: var(--radius-lg);
  text-align: center;
`;

export const Title = styled.p`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
`;

export const Description = styled.p`
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
`;

export const Action = styled.div`
  margin-top: var(--space-2);
`;
