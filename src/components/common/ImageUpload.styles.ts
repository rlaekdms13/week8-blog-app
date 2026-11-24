import styled from 'styled-components';

export { Field, Label, ErrorMessage } from './Input.styles';

interface DropZoneProps {
  $isDragging: boolean;
  $hasError: boolean;
}

export const DropZone = styled.label<DropZoneProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  height: 180px;
  border: 1px dashed
    ${({ $isDragging, $hasError }) =>
      $hasError
        ? 'var(--color-danger)'
        : $isDragging
          ? 'var(--color-primary)'
          : 'var(--color-border-strong)'};
  border-radius: var(--radius-lg);
  background-color: ${({ $isDragging }) =>
    $isDragging ? 'var(--color-primary-subtle)' : 'var(--color-bg-subtle)'};
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s;

  strong {
    font-weight: var(--font-weight-semibold);
    color: var(--color-primary);
  }

  &:hover {
    border-color: var(--color-primary);
  }
`;

export const Hint = styled.span`
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
`;

export const Preview = styled.div`
  position: relative;
  height: 240px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background-color: var(--color-bg-muted);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PreviewActions = styled.div`
  position: absolute;
  right: var(--space-3);
  bottom: var(--space-3);
  display: flex;
  gap: var(--space-2);
`;
