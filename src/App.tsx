import { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import MainLayout from './layouts/MainLayout';
import GlobalStyle from './styles/global';
import { theme } from './styles/theme';

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <h1>Olá, Mundo!</h1>
        <GlobalStyle />
      </MainLayout>
    </ThemeProvider>
  );
};

export default App;
