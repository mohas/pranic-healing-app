import React, { useEffect, useState } from 'react';
import { Container, Title, Text, Stack, Paper, Group, Badge, Divider } from '@mantine/core';
import { Repositories } from '../shared/repositories';
import { Case, Record } from '../shared/schemas';
import { useRouterStore } from '../shared/routing/useRouterStore';

export const CaseDetailPage: React.FC<{ caseId: string }> = ({ caseId }) => {
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [records, setRecords] = useState<Record[]>([]);

  useEffect(() => {
    Repositories.cases.getById(caseId).then(setCaseData);
    Repositories.records.getByCaseId(caseId).then(setRecords);
  }, [caseId]);

  if (!caseData) return <Text ta="center" py="xl">در حال بارگذاری...</Text>;

  return (
    <Container size="md">
      <Stack gap="lg">
        <Group justify="space-between">
          <Title order={2}>{caseData.title}</Title>
          <Badge color="blue">{caseData.status}</Badge>
        </Group>
        
        <Paper withBorder p="md" radius="md">
          <Text size="sm" c="dimmed">{caseData.description || 'توضیحاتی برای این پرونده ثبت نشده است.'}</Text>
        </Paper>

        <Text fw={700} size="lg" mt="md">تاریخچه جلسات</Text>
        <Stack gap="md">
          {records.map(r => (
            <Paper key={r.id} withBorder p="md" radius="md">
              <Group justify="space-between" mb="sm">
                <Text size="xs" fw={500}>{new Date(r.timestamp).toLocaleDateString('fa-IR')}</Text>
                <Badge variant="outline">{r.type}</Badge>
              </Group>
              <Text size="sm" mb="sm">{r.notes}</Text>
              <Divider mb="sm" />
              <Text size="xs" c="dimmed">تعداد نقاط درد ثبت شده: {r.symptoms.length}</Text>
            </Paper>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};
