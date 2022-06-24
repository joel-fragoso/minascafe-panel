import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryVariant: string;
      secondary: string;
      background: string;
      surface: string;
      white: string;
    };
  }
}
