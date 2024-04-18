import { Modal, TextInput, PasswordInput, Button, Flex } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FC } from 'react';
import { UsersService } from '../api/UsersService';
import { error, success } from '../services/helpers/notification';
import { useUserContext } from './useUserContext';
import { UserCreateDto } from '../types/users';
import { useAsyncFn } from 'react-use';

type RegisterModalProps = {
  open: boolean;
  close: () => void;
};

const initialValues: UserCreateDto = {
  password: '',
  confirmPassword: '',
  email: '',
  userName: '',
  phoneNumber: '',
} as const;

export const RegisterModal: FC<RegisterModalProps> = ({ open, close }) => {
  const { setUser } = useUserContext();
  const form = useForm({
    initialValues: initialValues,
  });

  const handleClose = () => {
    close();
    form.reset();
  };

  const [registerState, handleRegister] = useAsyncFn(async (values: UserCreateDto) => {
    const response = await UsersService.createUser({ body: values });

    if (response.hasErrors) {
      error(response.errors?.[0].message);
      handleClose();
    }

    setUser(response.data);
    success('Register Successful!');
    handleClose();
    return response.data;
  });

  return (
    <Modal opened={open} onClose={handleClose} title="Register">
      <form onSubmit={form.onSubmit(handleRegister)}>
        <div>
          <TextInput withAsterisk label="Email" {...form.getInputProps('email')} />
          <TextInput withAsterisk label="Phone Number" {...form.getInputProps('phoneNumber')} />
          <TextInput withAsterisk label="Username" {...form.getInputProps('userName')} />
          <PasswordInput withAsterisk label="Password" {...form.getInputProps('password')} />
          <PasswordInput
            withAsterisk
            label="Confirm Password"
            {...form.getInputProps('confirmPassword')}
          />
          <Flex justify="flex-end">
            <Button type="button" color="gray" mt={10} mr={5} onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" mt={10} ml={5} disabled={registerState.loading}>
              Submit
            </Button>
          </Flex>
        </div>
      </form>
    </Modal>
  );
};
