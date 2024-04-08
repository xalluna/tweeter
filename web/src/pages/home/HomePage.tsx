import { FC } from 'react';
import { useAsync } from 'react-use';
import { Env } from '../../constants/env';
import { Container, Stack } from '@mantine/core';
import { UsersService } from '../../api/UsersService';

export const HomePage: FC = () => {
  const users = useAsync(async () => {
    console.log(Env.viteApiBaseUrl);
    const response = await UsersService.getAllUsers();

    return response.data;
  });

  return (
    <Stack>
      {users.value && users.value.map((user) => <Container>{user.userName}</Container>)}
    </Stack>
  );
};
