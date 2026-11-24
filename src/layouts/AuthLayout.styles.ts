import { NavLink } from 'react-router';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: var(--space-8) 0;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const Card = styled.div`
  width: 100%;
  max-width: 420px;
  padding: var(--space-10);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background-color: var(--color-bg);
  box-shadow: var(--shadow-sm);

  @media (max-width: 768px) {
    padding: var(--space-8) var(--space-6);
  }
`;

export const Tabs = styled.nav`
  display: flex;
  gap: var(--space-1);
  margin-bottom: var(--space-8);
  padding: var(--space-1);
  border-radius: var(--radius-md);
  background-color: var(--color-bg-muted);
`;

export const Tab = styled(NavLink)`
  flex: 1;
  padding: var(--space-2) 0;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  text-align: center;
  color: var(--color-text-secondary);
  transition:
    background-color 0.2s,
    color 0.2s;

  &:hover {
    color: var(--color-text);
  }

  &.active {
    background-color: var(--color-bg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    box-shadow: var(--shadow-sm);
  }
`;
