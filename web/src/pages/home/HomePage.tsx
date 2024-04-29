import { FC, useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { Text, createStyles } from '@mantine/core';
import { TopicsService } from '../../api/TopicsService';
import { useUserContext } from '../../users/useUserContext';
import { error } from '../../services/helpers/notification';
import { BasicPage } from '../../BasicPage';
import { TopicsDisplay } from '../topics/TopicsListingPage';
import { useTopicsContext } from '../../topics/useTopicsContext';
import { useDocumentTitle } from '@mantine/hooks';

export const HomePage: FC = () => {
  useDocumentTitle('Home');
  const { topics, setTopics } = useTopicsContext();
  const { user } = useUserContext();

  const [topicsState, fetchTopics] = useAsyncFn(async (userId?: number) => {
    const response = await TopicsService.getHomePageTopics({ userId: userId ?? user?.id ?? 0 });
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
    <BasicPage title="Home Page" isHomePage loading={topicsState.loading}>
      {user ? <TopicsDisplay topicRetry={fetchTopics} topics={topics} /> : <SignInWarning />}
    </BasicPage>
  );
};

export const SignInWarning: FC = () => {
  const { classes } = useStyles();

  return (
    <Text className={classes.signedInView} align="center" size="xl">
      Sign in to view.
    </Text>
  );
};

const useStyles = createStyles(() => ({
  signedInView: {
    backgroundColor: 'rgba(15, 44, 64, 0.5)',
    color: 'rgba(255,255,255,0.75)',
    borderRadius: 5,
    fontWeight: 600,
    paddingTop: 5,
    paddingBottom: 15,
  },
}));
