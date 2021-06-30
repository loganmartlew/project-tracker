import { createGlobalStyle } from 'styled-components';
import { Theme } from './theme';

export default createGlobalStyle<{ theme: Theme }>`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  padding: 0 13%;
  width: 100%;
  min-height: 100vh;
  background: rgb(33,24,39);
  background: linear-gradient(135deg, rgba(33,24,39,1) 0%, rgba(0,0,0,1) 100%);
  font-family: 'Rubik', sans-serif;
  color: ${({ theme }) => theme.color_white};
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

h1 {
  font-size: 3rem;
  color: ${({ theme }) => theme.color_primary};
}

h3 {
  font-size: 1.5rem;
  font-weight: 400;
}
`;
