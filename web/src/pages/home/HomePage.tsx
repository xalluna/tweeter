import { FC, useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { Text, createStyles } from '@mantine/core';
import { TopicsService } from '../../api/TopicsService';
import { useUserContext } from '../../users/useUserContext';
import { error } from '../../services/helpers/notification';
import { BasicPage } from '../../BasicPage';
import { TopicsDisplay } from '../allTopics/TopicsListingPage';
import { useTopicsContext } from '../../topics/useTopicsContext';

export const HomePage: FC = () => {
  const { classes } = useStyles();

  const { topics, setTopics } = useTopicsContext();
  const { user } = useUserContext();

  const [, fetchTopics] = useAsyncFn(async (userId?: number) => {
    const response = await TopicsService.getHomePageTopics({ userId: userId ?? 0 });
    if (response.hasErrors) {
      error(response.errors?.[0].message);
    }

    setTopics(response.data);
    return response.data;
  });

  useEffect(() => {
    fetchTopics(user?.id);
  }, [fetchTopics, user?.id]);

  return (
    <BasicPage title="Home Page">
      {user ? (
        <TopicsDisplay topics={topics} />
      ) : (
        <Text className={classes.signedInView} align="center" size="xl">
          Must be signed in to view
        </Text>
      )}
    </BasicPage>
  );
};

const useStyles = createStyles(() => ({
  signedInView: {
    backgroundColor: '#3098dd',
    color: 'black',
    borderRadius: 10,
    fontWeight: 600,
    paddingTop: 5,
    paddingBottom: 15,
  },
}));
