import styled from 'styled-components';

export const Form = styled.form`
  position: relative;
  width: 100%;
  max-width: 480px;
`;

export const Icon = styled.img`
  position: absolute;
  top: 50%;
  left: var(--space-4);
  transform: translateY(-50%);
  pointer-events: none;
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 var(--space-4) 0 44px;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-full);
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
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-ring);
  }
`;
