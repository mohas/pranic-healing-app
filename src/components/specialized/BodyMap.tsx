import React, { useState } from 'react';
import { Paper, Text, Group, Stack, Tooltip } from '@mantine/core';

interface Symptom {
  point: string;
  intensity: number;
}

interface BodyMapProps {
  symptoms: Symptom[];
  onMark: (point: string, intensity: number) => void;
}

export const BodyMap: React.FC<BodyMapProps> = ({ symptoms, onMark }) => {
  const [activePoint, setActivePoint] = useState<string | null>(null);

  // Simplified Body representation using a SVG coordinate system
  // In production, we would use a proper human silhouette SVG
  return (
    <Paper withBorder p="md" radius="md" style={{ textAlign: 'center' }}>
      <Text fw={500} mb="md">نقشه نقاط درد (کلیک کنید)</Text>
      <svg 
        viewBox="0 0 200 400" 
        style={{ width: '100%', maxHeight: '400px', cursor: 'crosshair', backgroundColor: '#f8f9fa', borderRadius: '8px' }}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 200;
          const y = ((e.clientY - rect.top) / rect.height) * 400;
          onMark(`${Math.round(x)},${Math.round(y)}`, 5); // Default intensity 5
        }}
      >
        {/* Very basic human silhouette placeholder */}
        <ellipse cx="100" cy="40" rx="20" ry="25" fill="#ddd" /> {/* Head */}
        <rect x="70" y="65" width="60" height="100" rx="10" fill="#ddd" /> {/* Torso */}
        <rect x="50" y="70" width="20" height="80" rx="10" fill="#ddd" /> {/* L Arm */}
        <rect x="130" y="70" width="20" height="80" rx="10" fill="#ddd" /> {/* R Arm */}
        <rect x="75" y="165" width="20" height="120" rx="10" fill="#ddd" /> {/* L Leg */}
        <rect x="105" y="165" width="20" height="120" rx="10" fill="#ddd" /> {/* R Leg */}

        {/* Render marked symptoms */}
        {symptoms.map((s, i) => {
          const [x, y] = s.point.split(',').map(Number);
          return (
            <Tooltip key={i} label={`شدت: ${s.intensity}`} position="top">
              <circle 
                cx={x} cy={y} r={s.intensity} 
                fill="red" fillOpacity="0.6" 
                stroke="darkred" strokeWidth="1"
              />
            </Tooltip>
          );
        })}
      </svg>
      <Text size="xs" c="dimmed" mt="sm">در نقاط مورد نظر کلیک کنید تا علامت زده شود</Text>
    </Paper>
  );
};
