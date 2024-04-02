import { CSSObject, MantineTheme, UnstyledButton } from '@mantine/core';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../routes/index';

export type NavButtonProps = {
  children?: JSX.Element | string;
  route: string;
  sx?: (theme: MantineTheme) => CSSObject;
};

export function NavButton({
  route,
  children,
  sx,
}: NavButtonProps): React.ReactElement {
  const navigate = useNavigate();
  const navButtonSx = useNavButtonSx(route);

  return (
    <UnstyledButton sx={sx ?? navButtonSx} onClick={() => navigate(route)}>
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
      padding: '10px 20px',
      borderRadius: '4px',
      transition: 'ease-in .2s',
      color: 'white',
      backgroundColor: `${
        isActivePath
          ? theme.colors.secondaryBlueColors[3]
          : theme.colors.secondaryBlueColors[1]
      }`,
      ':hover': {
        backgroundColor: theme.colors.secondaryBlueColors[2],
      },
    };
  };
}
