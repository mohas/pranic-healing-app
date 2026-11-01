import React, { useEffect, useState } from 'react';
import { Container, Title, Text, Button, Group, Stack, Paper, List } from '@mantine/core';
import { Repositories } from '../shared/repositories';
import { Patient, Case } from '../shared/schemas';
import { useRouterStore } from '../shared/routing/useRouterStore';
import { ROUTES } from '../shared/routing/routes';

export const PatientDetailPage: React.FC<{ patientId: string }> = ({ patientId }) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [cases, setCases] = useState<Case[]>([]);
  const { push } = useRouterStore();

  useEffect(() => {
    Repositories.patients.getById(patientId).then(setPatient);
    Repositories.cases.getByPatientId(patientId).then(setCases);
  }, [patientId]);

  if (!patient) return <Text ta="center" py="xl">در حال بارگذاری...</Text>;

  return (
    <Container size="md">
      <Stack gap="lg">
        <Group justify="space-between">
          <Title order={2}>{patient.fullName}</Title>
          <Button onClick={() => push(ROUTES.RECORD_CREATE)}>ثبت جلسه جدید +</Button>
        </Group>

        <Paper withBorder p="md" radius="md">
          <Text fw={700} mb="sm">اطلاعات پایه</Text>
          <List spacing="xs">
            <List.Item>تلفن: {patient.phoneNumber}</List.Item>
            <List.Item>تاریخ تولد: {patient.dateOfBirth}</List.Item>
            <List.Item>جنسیت: {patient.gender === 'male' ? 'مرد' : 'زن'}</List.Item>
          </List>
        </Paper>

        <Text fw={700} size="lg" mt="md">پرونده‌های درمانی</Text>
        {cases.length === 0 ? (
          <Text c="dimmed">هیچ پرونده‌ای برای این بیمار ثبت نشده است.</Text>
        ) : (
          <Stack gap="sm">
            {cases.map(c => (
              <Paper key={c.id} withBorder p="md" radius="md" style={{ cursor: 'pointer' }} onClick={() => push(ROUTES.CASE_DETAIL)}>
                <Group justify="space-between">
                  <Text fw={500}>{c.title}</Text>
                  <Text size="xs" c="dimmed">{c.status}</Text>
                </Group>
              </Paper>
            ))}
          </Stack>
        )}
      </Stack>
    </Container>
  );
};
