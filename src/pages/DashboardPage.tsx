import React from 'react';
import { Container, Title, SimpleGrid, Paper, Text, Button, Group } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useRouterStore } from '../shared/routing/useRouterStore';
import { ROUTES } from '../shared/routing/routes';

export const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const { push } = useRouterStore();

  return (
    <Container size="md">
      <Title order={2} mb="xl">داشبورد درمانگر</Title>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <Paper withBorder p="md" radius="md" style={{ cursor: 'pointer' }} onClick={() => push(ROUTES.PATIENTS_LIST)}>
          <Text fw={700} size="lg">{t('patients')}</Text>
          <Text size="sm" c="dimmed">مدیریت و مشاهده لیست بیماران</Text>
          <Button variant="light" fullWidth mt="md">مشاهده لیست</Button>
        </Paper>
        <Paper withBorder p="md" radius="md">
          <Text fw={700} size="lg">آمارهای سریع</Text>
          <Text size="sm" c="dimmed">تعداد جلسات امروز: ۳</Text>
          <Text size="sm" c="dimmed">بیماران فعال: ۱۲</Text>
          <Button 
            variant="outline" 
            size="xs" 
            mt="sm" 
            fullWidth 
            onClick={() => push(ROUTES.DEBUG_DATA)}
          >
            مشاهده دیتای JSON
          </Button>
        </Paper>
      </SimpleGrid>
    </Container>
  );
};
