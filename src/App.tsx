import { FC } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/global';
import { theme } from './styles/theme';
import Routes from './routes';
import AppProvider from './hooks';

library.add(fas);

const App: FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes />
          <GlobalStyle />
        </ThemeProvider>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
