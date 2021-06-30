import styled from 'styled-components';

export const List = styled.section`
  display: grid;
  place-items: top center;
  grid-template-rows: max-content;
  gap: 3rem 2rem;

  @media (min-width: 730px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1120px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1600px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
