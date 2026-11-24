import styled from 'styled-components';

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
`;

export const Label = styled.label`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-700);
`;

export const InputWrapper = styled.div`
  position: relative;
`;

interface StyledInputProps {
  $hasError: boolean;
  $hasIcon: boolean;
}

export const Input = styled.input<StyledInputProps>`
  width: 100%;
  height: 44px;
  padding: 0 ${({ $hasIcon }) => ($hasIcon ? '44px' : 'var(--space-4)')} 0
    var(--space-4);
  border: 1px solid
    ${({ $hasError }) =>
      $hasError ? 'var(--color-danger)' : 'var(--color-border-strong)'};
  border-radius: var(--radius-md);
  background-color: var(--color-bg);
  font-size: var(--font-size-md);
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &::placeholder {
    color: var(--color-text-tertiary);
  }

  &:focus {
    outline: none;
    border-color: ${({ $hasError }) =>
      $hasError ? 'var(--color-danger)' : 'var(--color-primary)'};
    box-shadow: 0 0 0 3px
      ${({ $hasError }) =>
        $hasError ? 'var(--color-danger-ring)' : 'var(--color-primary-ring)'};
  }

  &:disabled {
    background-color: var(--color-bg-muted);
    color: var(--color-text-tertiary);
    cursor: not-allowed;
  }
`;

export const IconButton = styled.button`
  position: absolute;
  top: 50%;
  right: var(--space-3);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
  transform: translateY(-50%);

  &:hover {
    background-color: var(--color-bg-muted);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
  }
`;

export const ErrorMessage = styled.p`
  font-size: var(--font-size-sm);
  color: var(--color-danger);
`;
