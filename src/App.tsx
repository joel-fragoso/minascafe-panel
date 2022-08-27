import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import AppProvider from './hooks';
import Routes from './routes';
import GlobalStyle from './styles/global';
import { theme } from './styles/theme';

library.add(fas);

const App: FC = () => {
  function reloadPage() {
    window.location.reload();
  }

  const socketProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  const socketHost = `${window.location.hostname}:${window.location.port}`;
  const socket = new WebSocket(`${socketProtocol}://${socketHost}`, 'vite-hmr');

  socket.addEventListener('close', reloadPage);

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
