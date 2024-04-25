import {
  ActionIcon,
  CSSObject,
  Flex,
  MantineTheme,
  Menu,
  Navbar,
  Image,
  Text,
} from '@mantine/core';
import {
  IconBookmarksFilled,
  IconBrandTwitterFilled,
  IconLogin,
  IconLogout,
  IconRegistered,
  IconUser,
} from '@tabler/icons-react';
import React, { FC } from 'react';
import { NavButton } from './NavButton';
import { useNavbarHeight } from '../hooks/useNavbarHeight';
import { routes } from '../routes';
import { success } from '../services/helpers/notification';
import { useUserContext } from '../users/useUserContext';
import { SignInModal } from '../users/SignInModal';
import { RegisterModal } from '../users/RegisterModal';
import { useDisclosure } from '@mantine/hooks';

export function PrimaryNavigation(): React.ReactElement {
  const { navbarHeight } = useNavbarHeight();
  const [loginIsOpen, login] = useDisclosure();
  const [registerIsOpen, register] = useDisclosure();
  const { user, setUser } = useUserContext();

  return (
    <>
      <Navbar height={navbarHeight} sx={navbarSx}>
        <NavButton route={routes.home} sx={logoIconSx}>
          <Image maw={navbarHeight - 16} src="./BirdClipartLogo.png" />
        </NavButton>
        <Flex align={'center'} gap={25}>
          {user && (
            <Flex gap={10}>
              <NavButton route={routes.subscriptions}>
                <Flex align="center">
                  <IconBookmarksFilled />
                  <Text ml={5}>Subscriptions</Text>
                </Flex>
              </NavButton>
            </Flex>
          )}
          <Flex gap={10}>
            <NavButton route={routes.topics}>
              <Flex align="center">
                <IconBrandTwitterFilled />
                <Text ml={5}>All Topics</Text>
              </Flex>
            </NavButton>
          </Flex>

          <Menu>
            <Menu.Target>
              <ActionIcon size={40} aria-label="Account" sx={profileIconSx}>
                <IconUser size={30} />
              </ActionIcon>
            </Menu.Target>

            {!user ? (
              <Menu.Dropdown>
                <Menu.Item icon={<IconLogin size={14} />} onClick={login.open}>
                  Sign In
                </Menu.Item>
                <Menu.Item icon={<IconRegistered size={14} />} onClick={register.open}>
                  Register
                </Menu.Item>
              </Menu.Dropdown>
            ) : (
              <Menu.Dropdown>
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
      </Navbar>
      <RegisterModal open={registerIsOpen} close={register.close} />
      <SignInModal open={loginIsOpen} close={login.close} />
    </>
  );
}

const SignOutMenuItem: FC<{ onSignOut: () => void }> = ({ onSignOut }) => (
  <Menu.Item icon={<IconLogout size={14} />} onClick={onSignOut}>
    Sign Out
  </Menu.Item>
);

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
