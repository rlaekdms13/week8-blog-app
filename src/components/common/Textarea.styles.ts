import styled from 'styled-components';

// 라벨, 에러 메시지는 Input과 같은 스타일을 쓴다
export { Field, Label, ErrorMessage } from './Input.styles';

export const Textarea = styled.textarea<{ $hasError: boolean }>`
  width: 100%;
  min-height: 240px;
  padding: var(--space-3) var(--space-4);
  border: 1px solid
    ${({ $hasError }) =>
      $hasError ? 'var(--color-danger)' : 'var(--color-border-strong)'};
  border-radius: var(--radius-md);
  background-color: var(--color-bg);
  font-size: var(--font-size-md);
  line-height: var(--line-height-relaxed);
  resize: vertical;
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
`;
