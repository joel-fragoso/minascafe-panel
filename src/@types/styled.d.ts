import 'styled-components';

type Mode = 'light' | 'dark';

interface ICommonColor {
  white: string;
  black: string;
}
interface IPalleteColor {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
}

interface IBackgroundColor {
  default: string;
  paper?: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    mode?: Mode;
    common: ICommonColor;
    pallete: {
      primary: IPalleteColor;
      secondary: IPalleteColor;
    };
    background: IBackgroundColor;
  }
}
