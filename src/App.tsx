import { FC } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider } from 'styled-components';
import Dashboard from './pages/Dashboard';
import GlobalStyle from './styles/global';
import { theme } from './styles/theme';

library.add(fas);

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
