import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 240px;
  gap: var(--space-4);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-border);
`;
