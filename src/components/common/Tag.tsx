import type { ReactNode } from 'react';
import styled from 'styled-components';

interface TagProps {
  children: ReactNode;
  className?: string;
}

export default function Tag({ children, className }: TagProps) {
  return <StyledTag className={className}>{children}</StyledTag>;
}

const StyledTag = styled.span`
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  height: 24px;
  padding: 0 var(--space-2);
  border-radius: var(--radius-sm);
  background-color: var(--color-primary-subtle);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
`;
