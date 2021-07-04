import styled from 'styled-components';

export const FiltersWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem 2rem;
  margin-bottom: 3rem;
`;

interface ButtonWrapperProps {
  filtersOpen: boolean;
}

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  width: 100%;

  ${({ filtersOpen }) => {
    if (filtersOpen) {
      return `
        & button {
          max-width: 310px;
        }
      `;
    } else {
      return `
        max-width: 310px;
      `;
    }
  }}
`;

export const FilterSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
  padding: 1.3em;
  margin-top: 1em;
  width: max-content;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color_primary};

  @media only screen and (max-width: 660px) {
    flex-direction: column;
  }
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7em;
  width: max-content;
`;

export const SectionHeading = styled.h3``;

export const FilterFieldContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
`;

export const FiltersSelect = styled.select`
  padding: 0.1em 0.6em;
  min-width: 14ch;
  border: none;
  border-radius: 500px;
`;

export const SearchBox = styled.input`
  padding: 10px 25px;
  width: 100%;
  min-width: 225px;
  max-width: 500px;
  height: max-content;
  border: none;
  border-radius: 500px;
  outline: none;
  background-color: ${props => props.theme.color_primary};
  color: ${props => props.theme.color_white};
  font-size: 1.2em;
  letter-spacing: 0.5px;

  &::placeholder {
    color: inherit;
    opacity: 0.7;
  }
`;
