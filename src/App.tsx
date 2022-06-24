import { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import Dashboard from './pages/Dashboard';
import GlobalStyle from './styles/global';
import { theme } from './styles/theme';

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
