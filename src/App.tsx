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
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <Routes />
        </AppProvider>
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
