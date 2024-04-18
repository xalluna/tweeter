import { FC, useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { Container, Stack, createStyles, Text, Divider } from '@mantine/core';
import { TopicsService } from '../../api/TopicsService';
import { error } from '../../services/helpers/notification';
import { useTopicsContext } from '../../topics/useTopicsContext';
import { Topic } from '../../topics/Topic';

export const TopicsListingPage: FC = () => {
  const { classes } = useStyles();
  const { topics, setTopics } = useTopicsContext();

  const [, fetchTopics] = useAsyncFn(async () => {
    const response = await TopicsService.getAllTopics();
    if (response.hasErrors) {
      error(response.errors?.[0].message);
    }

    setTopics(response.data);
    return response.data;
  });

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  return (
    <Container className={classes.pageContainer}>
      <h1>Latest Tweets</h1>
      <Stack spacing="lg">
        {topics && topics.map((topic, index) => <Topic topic={topic} key={index} />)}
        <Divider />
        <Text c="dimmed" className={classes.theEnd}>
          - The End -
        </Text>
      </Stack>
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
