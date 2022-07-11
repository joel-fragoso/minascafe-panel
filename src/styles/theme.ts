import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  common: {
    white: '#eeeede',
    black: '#121212',
  },
  pallete: {
    primary: {
      light: '#FFDFC7',
      main: '#e9c6af',
      dark: '#d7986f',
      contrastText: '#241f1c',
    },
    secondary: {
      main: '#a7a5a4',
      contrastText: '#241f1c',
    },
    info: {
      light: '#E3F2FD',
      main: '#90CAF9',
      dark: '#42A5F5',
      contrastText: '#241f1c',
    },
    success: {
      light: '#E8F5E9',
      main: '#A5D6A7',
      dark: '#66BB6A',
      contrastText: '#241f1c',
    },
    danger: {
      light: '#FFEBEE',
      main: '#EF9A9A',
      dark: '#EF5350',
      contrastText: '#241f1c',
    },
  },
  background: {
    default: '#241f1c',
    paper: '#35312e',
  },
};
