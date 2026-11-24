import { Link, NavLink as RouterNavLink } from 'react-router';
import styled from 'styled-components';

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-bg);
`;

export const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--content-max-width);
  height: var(--header-height);
  margin: 0 auto;
  padding: 0 var(--space-6);

  @media (max-width: 768px) {
    padding: 0 var(--space-4);
  }
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: var(--space-2);
`;

/* NavLink는 현재 경로와 일치하면 자동으로 active 클래스가 붙는다 */
export const NavLink = styled(RouterNavLink)`
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  transition:
    background-color 0.2s,
    color 0.2s;

  &:hover {
    background-color: var(--color-bg-muted);
    color: var(--color-text);
  }

  &.active {
    color: var(--color-primary);
  }
`;

export const LoginLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 var(--space-3);
  border-radius: var(--radius-md);
  background-color: var(--color-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-inverse);
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-primary-hover);
  }
`;

export const UserName = styled.span`
  padding: 0 var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);

  strong {
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
  }

  @media (max-width: 480px) {
    display: none;
  }
`;
