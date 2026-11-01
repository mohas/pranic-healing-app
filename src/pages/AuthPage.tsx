import React from 'react';
import { Container, Title, TextInput, Button, Paper, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { useRouterStore } from '../shared/routing/useRouterStore';
import { ROUTES } from '../shared/routing/routes';
import { useGlobalStore } from '../shared/store/useGlobalStore';

export const AuthPage: React.FC = () => {
  const { t } = useTranslation();
  const { push } = useRouterStore();
  const { setUser } = useGlobalStore();

  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleLogin = (values: typeof form.values) => {
    // Mock login: Always succeed for now
    setUser({ id: 'h1', name: 'درمانگر نمونه' });
    push(ROUTES.DASHBOARD);
  };

  return (
    <Container size={400} py="xl">
      <Paper withBorder shadow="md" p="xl" radius="md">
        <Stack align="center" gap="md">
          <Title order={2}>{t('welcome')}</Title>
          <Text c="dimmed" ta="center">لطفاً برای ورود به سیستم اطلاعات خود را وارد کنید</Text>
          
          <form onSubmit={form.onSubmit(handleLogin)} style={{ width: '100%' }}>
            <Stack gap="sm">
              <TextInput 
                label="ایمیل" 
                placeholder="email@example.com" 
                {...form.getInputProps('email')} 
              />
              <TextInput 
                label="رمز عبور" 
                type="password" 
                placeholder="********" 
                {...form.getInputProps('password')} 
              />
              <Button type="submit" fullWidth mt="md">ورود</Button>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </Container>
  );
};
