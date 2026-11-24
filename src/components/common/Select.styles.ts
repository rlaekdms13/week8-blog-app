import styled from 'styled-components';

export { Field, Label, ErrorMessage } from './Input.styles';

export const SelectWrapper = styled.div`
  position: relative;
`;

interface StyledSelectProps {
  $hasError: boolean;
  $isPlaceholder: boolean;
}

export const Select = styled.select<StyledSelectProps>`
  width: 100%;
  height: 44px;
  padding: 0 44px 0 var(--space-4);
  border: 1px solid
    ${({ $hasError }) =>
      $hasError ? 'var(--color-danger)' : 'var(--color-border-strong)'};
  border-radius: var(--radius-md);
  background-color: var(--color-bg);
  font-size: var(--font-size-md);
  color: ${({ $isPlaceholder }) =>
    $isPlaceholder ? 'var(--color-text-tertiary)' : 'var(--color-text)'};
  /* 브라우저 기본 화살표를 숨기고 직접 만든 아이콘을 쓴다 */
  appearance: none;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ $hasError }) =>
      $hasError ? 'var(--color-danger)' : 'var(--color-primary)'};
    box-shadow: 0 0 0 3px
      ${({ $hasError }) =>
        $hasError ? 'var(--color-danger-ring)' : 'var(--color-primary-ring)'};
  }

  option {
    color: var(--color-text);
  }
`;

export const Arrow = styled.img`
  position: absolute;
  top: 50%;
  right: var(--space-4);
  transform: translateY(-50%);
  pointer-events: none;
`;
