import React from 'react';
import { AppShell, Group, Text, Button } from '@mantine/core';
import { useGlobalStore } from '../shared/store/useGlobalStore';
import { useRouterStore } from '../shared/routing/useRouterStore';
import { useTranslation } from 'react-i18next';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
  const { language, setLanguage } = useGlobalStore();
  const { pop } = useRouterStore();

  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header p="md">
        <Group justify="space-between" h="100%">
          <Group>
            <Button variant="subtle" onClick={() => pop()}>←</Button>
            <Text fw={700} size="lg">Pranic Healing</Text>
          </Group>
          <Button 
            variant="outline" 
            size="xs" 
            onClick={() => setLanguage(language === 'fa' ? 'en' : 'fa')}
          >
            {language === 'fa' ? 'English' : 'فارسی'}
          </Button>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};
