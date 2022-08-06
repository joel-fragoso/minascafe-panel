import { createGlobalStyle } from 'styled-components';
import { lighten } from 'polished';

const GlobalStyle = createGlobalStyle`
  *,
  ::before,
  ::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  html {
    font-family: "Nunito", sans-serif;
    font-size: 62.5%;
    text-rendering: optimizeLegibility;
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    font-size: 1.6rem;
    line-height: 1.5;
    background-color: ${({ theme }) => lighten(0.04, theme.background.default)};
    color: ${({ theme }) => theme.common.white};
  }

  ::-webkit-scrollbar {
    width: 0.8rem;
    height: 0.8rem;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.background.paper};
    border-radius: 1rem;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.background.default};
    border-radius: 1rem;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => lighten(0.1, theme.background.default)};
  }

  input,
  select,
  textarea,
  button {
    font-family: inherit;
    font-size: inherit;
    border: 0;
    outline: 0;
    background-color: unset;
  }

  button {
    cursor: pointer;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
