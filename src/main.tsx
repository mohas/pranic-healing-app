import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { useGlobalStore } from './shared/store/useGlobalStore';
import { theme } from './shared/theme';
import './shared/i18n';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import '@mantine/core/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
