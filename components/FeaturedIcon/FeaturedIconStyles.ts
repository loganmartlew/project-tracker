import styled from 'styled-components';

export const IconWrapper = styled.div`
  display: inline-flex;
  position: relative;
  align-items: center;

  &::before {
    display: none;
    position: absolute;
    content: 'Featured Project';
    top: -1em;
    left: 1em;
    width: max-content;
    height: max-content;
    opacity: 0;
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    font-weight: 300;
    transition: 100ms;
  }

  &:hover {
    &::before {
      display: block;
      opacity: 1;
    }
  }

  & svg {
    position: relative;
    color: ${({ theme }) => theme.color_primary_light};
    transition: 100ms;
  }
`;
