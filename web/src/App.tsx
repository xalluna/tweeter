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
import { CSSProperties, DetailedHTMLProps, FC, HTMLAttributes, PropsWithChildren } from 'react';
import { useAsync } from 'react-use';
import { TopicsProvider } from './topics/TopicsContext';

const App: FC = () => {
  const { navbarHeight } = useNavbarHeight();
  const scrollAreaSx = useScrollAreaSx(navbarHeight);

  const userState = useAsync(async () => {
    await new Promise((r) => setTimeout(r, 350));
  }, []);

  const sphealingGood = () => {
    window.open('https://youtu.be/AEM_J2G2urI?si=fn1mOFyi5ZxzY-GU', '_blank');
  };

  return (
    <TopicsProvider>
      <AppShell layout="alt" padding={0} header={<PrimaryNavigation />}>
        {!userState.loading ? (
          <ScrollArea sx={scrollAreaSx}>
            <Box sx={useContainerSx}>
              <AppRoutes />
            </Box>
            <TotallyNotALinkToSpheal style={navLinkStyle} onClick={() => sphealingGood()}>
              <Center sx={footerSx}>(≖ᴗ≖✿)</Center>
            </TotallyNotALinkToSpheal>
          </ScrollArea>
        ) : (
          <Container>
            <Loader sx={loaderStyle} size="150px" color="#9d65db" />
          </Container>
        )}
      </AppShell>
    </TopicsProvider>
  );
};

export default App;

const TotallyNotALinkToSpheal: FC<
  PropsWithChildren<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>
> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

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
  cursor: 'pointer',
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
