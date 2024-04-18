import {
  AppShell,
  Box,
  CSSObject,
  Center,
  Container,
  Loader,
  MantineTheme,
  ScrollArea,
} from '@mantine/core';
import { PrimaryNavigation } from './navigation/PrimaryNavigation';
import { AppRoutes } from './routes/AppRoutes';
import { useNavbarHeight } from './hooks/useNavbarHeight';
import { NavLink, useLocation } from 'react-router-dom';
import { CSSProperties, FC, useMemo } from 'react';
import { useAsync } from 'react-use';
import { UserProvider } from './users/UserContext';
import { TopicsProvider } from './topics/TopicsContext';

const App: FC = () => {
  const { navbarHeight, remainingHeight } = useNavbarHeight();
  const scrollAreaSx = useScrollAreaSx(navbarHeight);
  const location = useLocation().pathname;

  const hideFooter: boolean = useMemo(() => {
    return !(
      location === '/admin-portal' ||
      location === '/inventory' ||
      location === '/deck-builder'
    );
  }, [location]);

  const userState = useAsync(async () => {
    await new Promise((r) => setTimeout(r, 350));
  }, []);

  const sphealingGood = () => {
    window.open('https://youtu.be/AEM_J2G2urI?si=fn1mOFyi5ZxzY-GU', '_blank');
  };

  return (
    <UserProvider>
      <TopicsProvider>
        <AppShell layout="alt" padding={0} header={<PrimaryNavigation />}>
          {!userState.loading ? (
            <ScrollArea h={remainingHeight} sx={scrollAreaSx}>
              <Box sx={useContainerSx}>
                <AppRoutes />
              </Box>
              {hideFooter && (
                <NavLink style={navLinkStyle} onClick={() => sphealingGood()} to={location}>
                  <Center sx={footerSx}>(≖ᴗ≖✿)</Center>
                </NavLink>
              )}
            </ScrollArea>
          ) : (
            <Container h={remainingHeight}>
              <Loader sx={loaderStyle} size="150px" color="#9d65db" />
            </Container>
          )}
        </AppShell>
      </TopicsProvider>
    </UserProvider>
  );
};

export default App;

function footerSx(theme: MantineTheme): CSSObject {
  return {
    height: '3.5rem',
    background: theme.colors.primaryColors[1],
    position: 'sticky',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  };
}

function useContainerSx(theme: MantineTheme): CSSObject {
  const { remainingHeight } = useNavbarHeight();
  return {
    boxShadow: '0px 3px 8px black',
    position: 'relative',
    padding: 10,
    minHeight: remainingHeight,
    backgroundColor: theme.colors.backgroundColor[0],
  };
}

function useScrollAreaSx(navbarHeight: number): CSSObject {
  return {
    top: navbarHeight,
  };
}

const navLinkStyle: CSSProperties = {
  fontStyle: 'unset',
  color: 'white',
  textDecoration: 'none',
};

function loaderStyle(): CSSObject {
  return {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    margin: 'auto',
  };
}
