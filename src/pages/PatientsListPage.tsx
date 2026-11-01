import React, { useEffect, useState } from 'react';
import { Container, Title, Table, Button, Group, Text, TextInput } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Repositories } from '../shared/repositories';
import { Patient } from '../shared/schemas';
import { useRouterStore } from '../shared/routing/useRouterStore';
import { ROUTES } from '../shared/routing/routes';

export const PatientsListPage: React.FC = () => {
  const { t } = useTranslation();
  const { push } = useRouterStore();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    Repositories.patients.getAll().then(setPatients);
  }, []);

  const filteredPatients = patients.filter(p => 
    p.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container size="md">
      <Group justify="space-between" mb="md">
        <Title order={2}>{t('patients')}</Title>
        <Button onClick={() => {}}>افزودن بیمار +</Button>
      </Group>

      <TextInput 
        placeholder="جستجوی بیمار..." 
        value={search} 
        onChange={(e) => setSearch(e.currentTarget.value)} 
        mb="md"
      />

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>نام و نام خانوادگی</Table.Th>
            <Table.Th>تلفن</Table.Th>
            <Table.Th>عملیات</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {filteredPatients.map(p => (
            <Table.Tr key={p.id}>
              <Table.Td>{p.fullName}</Table.Td>
              <Table.Td>{p.phoneNumber}</Table.Td>
              <Table.Td>
                <Button size="xs" onClick={() => push(ROUTES.PATIENT_DETAIL)}>مشاهده</Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Container>
  );
};
