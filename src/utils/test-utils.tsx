/* eslint-disable import/no-extraneous-dependencies */
import { render, RenderOptions } from '@testing-library/react';
import { FC, ReactElement, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';

const AllTheProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
// eslint-disable-next-line prettier/prettier
