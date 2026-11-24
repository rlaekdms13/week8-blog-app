import styled from 'styled-components';

export const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: var(--space-12) var(--space-6);

  @media (max-width: 768px) {
    padding: var(--space-8) var(--space-4);
  }
`;
