import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Paper, Text } from '@mantine/core';

const DATA_MAP: Record<string, number> = { 'UA': 1, 'N': 2, 'OA': 3 };

interface ProgressChartProps {
  data: any[]; // Array of records
  chakraId: keyof any;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ data, chakraId }) => {
  const chartData = data.map(r => ({
    date: new Date(r.timestamp).toLocaleDateString('fa-IR'),
    value: DATA_MAP[r.chakraStatus[chakraId]] || 2,
  }));

  return (
    <Paper withBorder p="md" radius="md">
      <Text fw={500} mb="md">نمودار تغییرات وضعیت {chakraId}</Text>
      <div style={{ width: '100%', height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis domain={[1, 3]} ticks={[1, 2, 3]} tickFormatter={(val) => {
              if (val === 1) return 'UA';
              if (val === 2) return 'N';
              if (val === 3) return 'OA';
              return '';
            }} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#228be6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};
