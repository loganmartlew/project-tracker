import styled from 'styled-components';

export const FiltersWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem 2rem;
  margin-bottom: 3rem;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 310px;
`;

export const SearchBox = styled.input`
  padding: 10px 25px;
  width: 100%;
  min-width: 225px;
  max-width: 500px;
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
