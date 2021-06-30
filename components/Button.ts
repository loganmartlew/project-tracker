import styled from 'styled-components';

interface IProps {
  lightText?: Boolean;
  block?: Boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default styled.a<IProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  border-radius: 500px;
  background-color: ${props => props.theme.color_primary};
  color: ${props => props.theme.color_white};
  font-weight: ${props => (props.lightText ? '400' : '500')};
  cursor: pointer;
  transition: 150ms ease-in-out;

  ${({ block }) =>
    block &&
    `
    width: 100%;
    min-width: 225px;
    max-width: 500px;
  `}

  ${({ size }) => {
    if (size === 'lg') {
      return `
      padding: 12px 32px;
      font-size: 1.5em;
      `;
    } else if (size === 'sm') {
      return `
      padding: 5px 8px;
      font-size: 0.7em;
      `;
    } else {
      return `
      padding: 10px 25px;
      font-size: 1.2em;
      `;
    }
  }}

  &:hover {
    background-color: ${props => props.theme.color_primary_light};
  }
`;
