import React, { useEffect, useState } from 'react';
import { Container, Title, Code, Stack, Button, Group } from '@mantine/core';
import { Repositories } from '../shared/repositories';
import { useRouterStore } from '../shared/routing/useRouterStore';
import { ROUTES } from '../shared/routing/routes';

export const DataDebugPage: React.FC = () => {
  const { pop } = useRouterStore();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function loadAllData() {
      const [patients, cases, records] = await Promise.all([
        Repositories.patients.getAll(),
        Repositories.cases.getAll(),
        Repositories.records.getAll(),
      ]);
      setData({ patients, cases, records });
    }
    loadAllData();
  }, []);

  return (
    <Container size="lg">
      <Stack gap="md">
        <Group justify="space-between">
          <Title order={2}>مشاهده داده‌های سیستم (JSON)</Title>
          <Button onClick={() => pop()}>بازگشت</Button>
        </Group>
        
        <Code block p="md" style={{ fontSize: '12px', textAlign: 'left', direction: 'ltr' }}>
          {data ? JSON.stringify(data, null, 2) : 'در حال بارگذاری داده‌ها...'}
        </Code>
      </Stack>
    </Container>
  );
};
