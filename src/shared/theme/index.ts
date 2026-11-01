import { createTheme, MantineColorsTuple } from '@mantine/core';

const primaryColor: MantineColorsTuple = [
  '#eef3ff', '#dee4ff', '#c5d0ff', '#adc1ff', '#97aeff', '#819dff', '#6b8aff', '#557bff', '#3f6bff', '#295bff',
];

export const theme = createTheme({
  primaryColor: 'blue',
  colors: {
    blue: primaryColor,
  },
  fontFamily: 'Vazirmatn, system-ui, sans-serif',
});
