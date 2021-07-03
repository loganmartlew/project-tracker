import styled from 'styled-components';

interface IProps {
  lightText?: boolean;
  block?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'success' | 'danger';
  contentWidth?: boolean;
}

export default styled.button<IProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  border: none;
  border-radius: 500px;
  color: ${props => props.theme.color_white};
  font-weight: ${props => (props.lightText ? '400' : '500')};
  font-family: inherit;
  cursor: pointer;
  transition: 150ms ease-in-out;

  ${({ contentWidth }) =>
    contentWidth &&
    `
    width: max-content;
  `}

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
      padding: 7px 13px;
      font-size: 1em;
      `;
    } else {
      return `
      padding: 10px 25px;
      font-size: 1.2em;
      `;
    }
  }}

  ${({ color, theme }) => {
    switch (color) {
      case 'success':
        return `
            background-color: ${theme.color_success};
          `;
      case 'danger':
        return `
            background-color: ${theme.color_danger};
          `;
      default:
        return `
            background-color: ${theme.color_primary};
          `;
    }
  }}

  &:hover {
    ${({ color, theme }) => {
      switch (color) {
        case 'success':
          return `
            background-color: ${theme.color_success_light};
          `;
        case 'danger':
          return `
            background-color: ${theme.color_danger_light};
          `;
        default:
          return `
            background-color: ${theme.color_primary_light};
          `;
      }
    }}
  }
`;
