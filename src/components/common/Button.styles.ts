import styled, { css } from 'styled-components';
import type { ButtonSize, ButtonVariant } from './Button';

const sizeStyles = {
  sm: css`
    height: 32px;
    padding: 0 var(--space-3);
    font-size: var(--font-size-sm);
  `,
  md: css`
    height: 40px;
    padding: 0 var(--space-4);
    font-size: var(--font-size-sm);
  `,
  lg: css`
    height: 48px;
    padding: 0 var(--space-5);
    font-size: var(--font-size-md);
  `,
};

const variantStyles = {
  primary: css`
    background-color: var(--color-primary);
    color: var(--color-text-inverse);

    &:hover:not(:disabled) {
      background-color: var(--color-primary-hover);
    }
  `,
  secondary: css`
    background-color: var(--color-bg);
    border-color: var(--color-border-strong);
    color: var(--color-gray-700);

    &:hover:not(:disabled) {
      background-color: var(--color-bg-subtle);
    }
  `,
  ghost: css`
    background-color: transparent;
    color: var(--color-text-secondary);

    &:hover:not(:disabled) {
      background-color: var(--color-bg-muted);
      color: var(--color-text);
    }
  `,
  danger: css`
    background-color: var(--color-danger);
    color: var(--color-text-inverse);

    &:hover:not(:disabled) {
      background-color: var(--color-danger-hover);
    }
  `,
};

interface StyledButtonProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
}

export const Button = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-semibold);
  white-space: nowrap;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    color 0.2s;

  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant }) => variantStyles[$variant]}

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  &:disabled {
    background-color: var(--color-gray-200);
    border-color: transparent;
    color: var(--color-text-tertiary);
    cursor: not-allowed;
  }
`;
