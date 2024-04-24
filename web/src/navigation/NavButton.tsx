import { CSSObject, MantineTheme, UnstyledButton } from '@mantine/core';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../routes/index';
import { useWindowScroll } from '@mantine/hooks';

export type NavButtonProps = {
  children?: JSX.Element | string;
  route: string;
  sx?: (theme: MantineTheme) => CSSObject;
};

export function NavButton({ route, children, sx }: NavButtonProps): React.ReactElement {
  const navigate = useNavigate();
  const navButtonSx = useNavButtonSx(route);
  const [, scrollTo] = useWindowScroll();

  const onClick = () => {
    navigate(route);
    scrollTo({ y: 0 });
  };

  return (
    <UnstyledButton sx={sx ?? navButtonSx} onClick={onClick}>
      {children}
    </UnstyledButton>
  );
}

function useNavButtonSx(route: string) {
  const { pathname } = useLocation();

  const isActivePath = useMemo(() => {
    const [pathSegment] = pathname.split('/[^/]*', 1);

    return pathSegment === route && route !== routes.home;
  }, [pathname, route]);

  return (theme: MantineTheme): CSSObject => {
    return {
      padding: '10px 15px',
      borderRadius: '4px',
      transition: 'ease-in .2s',
      fontWeight: 600,
      fontSize: 18,
      color: `${isActivePath ? theme.colors.primaryColors[4] : 'white'}`,
      backgroundColor: 'transparent',
      ':hover': {
        color: 'white',
        backgroundColor: theme.colors.primaryColors[0],
      },
    };
  };
}
