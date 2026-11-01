import React, { useState } from 'react';
import { Container, Title, Button, Group, Stack, Text, Textarea } from '@mantine/core';
import { ChakraGrid } from '../components/specialized/ChakraGrid';
import { BodyMap } from '../components/specialized/BodyMap';
import { ChakraStatus, Record } from '../shared/schemas';
import { useRouterStore } from '../shared/routing/useRouterStore';
import { Repositories } from '../shared/repositories';

export const RecordCreatePage: React.FC = () => {
  const { pop } = useRouterStore();
  const [chakraStatus, setChakraStatus] = useState<ChakraStatus>({
    root: 'N', sacral: 'N', solar_plexus: 'N', heart: 'N', throat: 'N', third_eye: 'N', crown: 'N',
  });
  const [symptoms, setSymptoms] = useState<any[]>([]);
  const [notes, setNotes] = useState('');

  const handleSave = async () => {
    const newRecord: Omit<Record, 'id'> = {
      caseId: 'c1', 
      timestamp: new Date().toISOString(),
      type: 'session',
      chakraStatus,
      symptoms,
      notes,
      afterVisitInstructions: [],
    };

    await Repositories.records.create(newRecord);
    pop();
  };

  return (
    <Container size="md">
      <Stack gap="xl">
        <Title order={2}>ثبت جلسه درمانی</Title>
        
        <Stack gap="sm">
          <Text fw={500}>وضعیت چاکراها</Text>
          <ChakraGrid value={chakraStatus} onChange={setChakraStatus} />
        </Stack>

        <Stack gap="sm">
          <Text fw={500}>نقشه درد و علائم</Text>
          <BodyMap 
            symptoms={symptoms} 
            onMark={(point, intensity) => setSymptoms([...symptoms, { point, intensity, description: '' }])} 
          />
        </Stack>

        <Stack gap="sm">
          <Text fw={500}>یادداشت‌ها</Text>
          <Textarea 
            value={notes} 
            onChange={(e) => setNotes(e.currentTarget.value)} 
            placeholder="جزئیات جلسه را اینجا بنویسید..."
            minRows={4}
          />
        </Stack>

        <Group justify="flex-end" mt="xl">
          <Button variant="outline" onClick={() => pop()}>لغو</Button>
          <Button onClick={handleSave}>ذخیره رکورد</Button>
        </Group>
      </Stack>
    </Container>
  );
};
