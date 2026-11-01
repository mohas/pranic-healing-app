import { MantineProvider } from '@mantine/core';
import { theme } from './shared/theme';
import { useGlobalStore } from './shared/store/useGlobalStore';
import { Router } from './shared/routing/Router';

function App() {
  const { darkMode, language } = useGlobalStore();

  return (
    <MantineProvider 
      theme={theme} 
      defaultColorScheme={darkMode ? 'dark' : 'light'}
      forceColorScheme={darkMode ? 'dark' : 'light'}
    >
      <div dir={language === 'fa' ? 'rtl' : 'ltr'}>
        <Router />
      </div>
    </MantineProvider>
  );
}

export default App;
