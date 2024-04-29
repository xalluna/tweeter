import { Modal, TextInput, PasswordInput, Button, Flex } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FC, useMemo } from 'react';
import { UsersService } from '../api/UsersService';
import { success } from '../services/helpers/notification';
import { SignInUserDto } from '../types/users';
import { useUserContext } from './useUserContext';
import { getFormErrors } from '../helpers/getFormErrors';

type SignInModalProps = {
  open: boolean;
  close: () => void;
};

const initialValues: SignInUserDto = {
  userName: '',
  password: '',
} as const;

export const SignInModal: FC<SignInModalProps> = ({ open, close }) => {
  const { setUser } = useUserContext();
  const form = useForm({
    initialValues: initialValues,
  });

  const handleClose = () => {
    close();
    form.reset();
  };

  const handleSignIn = async (values: SignInUserDto) => {
    const response = await UsersService.signInUser({ body: values });

    if (response.hasErrors && response.errors) {
      form.setErrors(getFormErrors(response.errors));
      return response.errors;
    }

    setUser(response.data);
    success('Signed in!');
    handleClose();
    return response.data;
  };

  const disableLogin = useMemo(
    () => form.values.password === '' || form.values.userName === '',
    [form]
  );

  return (
    <Modal opened={open} onClose={handleClose} title="Login">
      <form onSubmit={form.onSubmit(handleSignIn)}>
        <div>
          <TextInput withAsterisk label="Username" {...form.getInputProps('userName')} />
          <PasswordInput withAsterisk label="Password" {...form.getInputProps('password')} />
          <Flex justify="flex-end">
            <Button type="button" color="gray" mt={10} mr={5} onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" mt={10} ml={5} disabled={disableLogin}>
              Login
            </Button>
          </Flex>
        </div>
      </form>
    </Modal>
  );
};
