import styled from 'styled-components';

export const IconWrapper = styled.div`
  &::before {
    display: none;
    position: absolute;
    content: 'Featured Project';
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    background-color: blue;
  }

  &:hover {
    &::before {
      display: block;
    }
  }

  & svg {
    position: relative;
    color: ${({ theme }) => theme.color_primary_light};
    transition: 100ms;
  }
`;
