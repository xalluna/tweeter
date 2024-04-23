import { FC, ReactNode } from 'react';
import { Container, createStyles, Divider, Text } from '@mantine/core';

export const BasicPage: FC<{ children: ReactNode; title: string }> = ({ children, title }) => {
  const { classes } = useStyles();

  return (
    <Container className={classes.pageContainer}>
      <h1>{title}</h1>
      {children}
      <Divider />
      <Text c="dimmed" className={classes.theEnd}>
        - The End -
      </Text>
    </Container>
  );
};

const useStyles = createStyles(() => ({
  pageContainer: {
    color: '#e6e6e6',
    paddingBottom: 50,
  },

  theEnd: {
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto',
    paddingTop: 10,
  },
}));
