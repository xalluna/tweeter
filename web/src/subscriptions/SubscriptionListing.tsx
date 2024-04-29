import { FC, useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { BasicPage } from '../BasicPage';
import { TopicsService } from '../api/TopicsService';
import { TopicsDisplay } from '../pages/topics/TopicsListingPage';
import { error } from '../services/helpers/notification';
import { useTopicsContext } from '../topics/useTopicsContext';
import { useUserContext } from '../users/useUserContext';
import { SignInWarning } from '../pages/home/HomePage';

export const SubscriptionListing: FC = () => {
  const { topics, setTopics } = useTopicsContext();
  const { user } = useUserContext();

  const [topicsState, fetchTopics] = useAsyncFn(async (userId?: number) => {
    const response = await TopicsService.getAllSubscribedTopics({ userId: userId ?? 0 });
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
    <BasicPage title="Subscriptions" loading={topicsState.loading}>
      {user ? <TopicsDisplay topics={topics} topicRetry={fetchTopics} /> : <SignInWarning />}
    </BasicPage>
  );
};
