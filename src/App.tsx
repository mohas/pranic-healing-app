import { MantineProvider, DirectionProvider, createTheme, AppShell, Group, Button, Container } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import "@fontsource/vazirmatn";
import { useRouterStore } from "./shared/router";
import "./App.css";

function App() {
  const { i18n } = useTranslation();
  const { screens, replace } = useRouterStore();
  const currentScreen = screens[screens.length - 1];

  const isRtl = i18n.language === 'fa' || i18n.language === 'ar';

  const theme = createTheme({
    fontFamily: isRtl ? 'Vazirmatn, sans-serif' : 'system-ui, sans-serif',
  });

  const renderScreen = () => {
    switch (currentScreen.name) {
      case 'home':
        return <div>Home Screen</div>;
      case 'profile':
        return <div>Profile Screen</div>;
      case 'settings':
        return <div>Settings Screen</div>;
      default:
        return <div>Unknown Screen</div>;
    }
  };

  return (
    <DirectionProvider initialDirection={isRtl ? 'rtl' : 'ltr'}>
      <MantineProvider theme={theme}>
        <AppShell
          header={{ height: 60 }}
          padding="md"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          <AppShell.Header>
            <Group h="100%" px="md">
              <Button variant={currentScreen.name === 'home' ? 'filled' : 'light'} onClick={() => replace({ name: 'home' })}>Home</Button>
              <Button variant={currentScreen.name === 'profile' ? 'filled' : 'light'} onClick={() => replace({ name: 'profile' })}>Profile</Button>
              <Button variant={currentScreen.name === 'settings' ? 'filled' : 'light'} onClick={() => replace({ name: 'settings' })}>Settings</Button>
            </Group>
          </AppShell.Header>

          <AppShell.Main>
            <Container>
              {renderScreen()}
            </Container>
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </DirectionProvider>
  );
}

export default App;
