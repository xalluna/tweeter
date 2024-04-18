import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { appTheme } from './constants/theme.tsx';
import { Notifications } from '@mantine/notifications';
import { UserProvider } from './users/UserContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={appTheme}>
        <UserProvider>
          <Notifications />
          <App />
        </UserProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
