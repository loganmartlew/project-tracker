import styled from 'styled-components';

export const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0;

  & > * {
    display: block;
    width: max-content;
    height: max-content;
  }

  @media (min-width: 800px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const Heading = styled.h1`
  font-size: 9.5vw;
  cursor: pointer;

  @media (min-width: 506px) {
    font-size: 3rem;
  }
`;
