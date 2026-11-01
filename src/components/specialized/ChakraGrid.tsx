import React from 'react';
import { Table, Group, SegmentedControl, Text, Stack } from '@mantine/core';
import { ChakraStatus } from '../shared/schemas';

interface ChakraGridProps {
  value: ChakraStatus;
  onChange: (updated: ChakraStatus) => void;
}

const CHAKRAS = [
  { id: 'root', label: 'Root' },
  { id: 'sacral', label: 'Sacral' },
  { id: 'solar_plexus', label: 'Solar Plexus' },
  { id: 'heart', label: 'Heart' },
  { id: 'throat', label: 'Throat' },
  { id: 'third_eye', label: 'Third Eye' },
  { id: 'crown', label: 'Crown' },
] as const;

export const ChakraGrid: React.FC<ChakraGridProps> = ({ value, onChange }) => {
  const updateChakra = (id: keyof ChakraStatus, val: any) => {
    onChange({ ...value, [id]: val });
  };

  return (
    <Table striped withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>چاکرا</Table.Th>
          <Table.Th>وضعیت</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {CHAKRAS.map((chakra) => (
          <Table.Tr key={chakra.id}>
            <Table.Td fw={500}>{chakra.label}</Table.Td>
            <Table.Td>
              <SegmentedControl
                value={value[chakra.id as keyof ChakraStatus]}
                onChange={(val) => updateChakra(chakra.id as keyof ChakraStatus, val)}
                data={[
                  { value: 'UA', label: 'UA' },
                  { value: 'N', label: 'Normal' },
                  { value: 'OA', label: 'OA' },
                ]}
              />
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
