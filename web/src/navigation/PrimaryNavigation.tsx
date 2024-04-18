import {
  ActionIcon,
  CSSObject,
  Flex,
  MantineTheme,
  Menu,
  Navbar,
  Image,
  Modal,
  TextInput,
  PasswordInput,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconLogin, IconLogout, IconRegistered, IconSettings, IconUser } from '@tabler/icons-react';
import React, { FC, useMemo, useState } from 'react';
import { NavButton } from './NavButton';
import { useNavbarHeight } from '../hooks/useNavbarHeight';
import { useNavigate } from 'react-router-dom';
import { routes } from '../routes';
import { UsersService } from '../api/UsersService';
import { SignInUserDto } from '../types/users';
import { error, success } from '../services/helpers/notification';
import { UserGetDto } from '../api/index.defs';
import { useUserContext } from '../App';

export function PrimaryNavigation(): React.ReactElement {
  const navigate = useNavigate();
  const { navbarHeight } = useNavbarHeight();
  const [isOpen, setOpen] = useState(false);
  const { user, setUser } = useUserContext();

  return (
    <>
      <Navbar height={navbarHeight} sx={navbarSx}>
        <NavButton route={routes.home} sx={logoIconSx}>
          <Image maw={navbarHeight - 16} src="./BirdClipartLogo.png" />
        </NavButton>
        <Flex align={'center'} gap={25}>
          <Flex gap={10}>
            <NavButton route={routes.allTopics}>All Topics</NavButton>
          </Flex>

          <Menu>
            <Menu.Target>
              <ActionIcon size={40} aria-label="Account" sx={profileIconSx}>
                <IconUser size={30} />
              </ActionIcon>
            </Menu.Target>

            {!user ? (
              <Menu.Dropdown>
                <Menu.Item icon={<IconLogin size={14} />} onClick={() => setOpen(true)}>
                  Sign In
                </Menu.Item>
                <Menu.Item icon={<IconRegistered size={14} />} onClick={() => {}}>
                  Register
                </Menu.Item>
              </Menu.Dropdown>
            ) : (
              <Menu.Dropdown>
                <Menu.Item
                  icon={<IconSettings size={14} />}
                  onClick={() => navigate(routes.settings)}
                >
                  Settings
                </Menu.Item>
                <SignOutMenuItem
                  onSignOut={() => {
                    setUser(undefined);
                    success('Signed out');
                  }}
                />
              </Menu.Dropdown>
            )}
          </Menu>
        </Flex>
        <SignInModal open={isOpen} close={() => setOpen(false)} />
      </Navbar>
    </>
  );
}

const SignOutMenuItem: FC<{ onSignOut: () => void }> = ({ onSignOut }) => (
  <Menu.Item icon={<IconLogout size={14} />} onClick={onSignOut}>
    Sign Out
  </Menu.Item>
);

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

    if (response.hasErrors) {
      error(response.errors?.[0].message);
      handleClose();
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
          <div>
            <Button type="button" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" disabled={disableLogin}>
              Login
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

function navbarSx(theme: MantineTheme): CSSObject {
  return {
    borderBottom: `1px solid ${theme.colors.primaryColors[0]}`,
    boxShadow: `0px 0px 4px ${theme.colors.primaryColors[1]}`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0rem 2rem 0rem 1rem',
    background: theme.colors.secondaryBackgroundColors[0],
  };
}

function profileIconSx(theme: MantineTheme): CSSObject {
  return {
    backgroundColor: theme.colors.primaryColors[0],
    color: 'white',
    borderRadius: '5em',
    ':hover': {
      backgroundColor: theme.fn.lighten(theme.colors.primaryColors[0], 0.15),
    },
  };
}

function logoIconSx(theme: MantineTheme): CSSObject {
  return {
    padding: '4px 4px',
    borderRadius: '10px',
    transition: 'ease-in .2s',
    ':hover': {
      backgroundColor: theme.fn.rgba(theme.colors.primaryColors[2], 0.5),
    },
  };
}
