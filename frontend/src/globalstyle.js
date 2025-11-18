import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    min-height: 100vh;
    margin: 0;
    font-family: ${props => props.theme.fontFamily};
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
  }
`;
