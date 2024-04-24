import { FC, ReactNode } from 'react';
import { Button, Container, createStyles, Divider, Grid, Text } from '@mantine/core';
import { useUserContext } from './users/useUserContext';
import { useNavigate } from 'react-router-dom';
import { routes } from './routes';
import { IconMessagePlus } from '@tabler/icons-react';

export const BasicPage: FC<{ children: ReactNode; title: string; hideAddTopic?: boolean }> = ({
  children,
  title,
  hideAddTopic,
}) => {
  const { classes } = useStyles();
  const { user } = useUserContext();
  const navigate = useNavigate();

  return (
    <Container className={classes.pageContainer}>
      <Grid align="end" justify="flex-end">
        <Grid.Col span={10}>
          <h1>{title}</h1>
        </Grid.Col>
        <Grid.Col span={2} className={classes.addTopics}>
          {!hideAddTopic && user && (
            <Button onClick={() => navigate(routes.topicCreate)}>
              <IconMessagePlus className={classes.iconMargin} />
              Add Topic
            </Button>
          )}
        </Grid.Col>
      </Grid>
      {children}
      <Divider mt="1.25rem" />
      <Text c="dimmed" className={classes.theEnd}>
        - The End -
      </Text>
    </Container>
  );
};

const useStyles = createStyles(() => ({
  pageContainer: {
    color: '#e6e6e6',
    paddingBottom: 25,
  },

  iconMargin: {
    marginRight: 5,
  },

  addTopics: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },

  theEnd: {
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto',
    fontSize: 16,
    paddingTop: 25,
  },
}));
