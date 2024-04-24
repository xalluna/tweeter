import { FC, useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { Stack } from '@mantine/core';
import { TopicsService } from '../../api/TopicsService';
import { error } from '../../services/helpers/notification';
import { useTopicsContext } from '../../topics/useTopicsContext';
import { Topic } from '../../topics/Topic';
import { BasicPage } from '../../BasicPage';
import { TopicDetailDto } from '../../api/index.defs';

export const TopicsListingPage: FC = () => {
  const { topics, setTopics } = useTopicsContext();

  const [topicsState, fetchTopics] = useAsyncFn(async () => {
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
    <BasicPage title="Latest Topics" loading={topicsState.loading}>
      <TopicsDisplay topics={topics} />
    </BasicPage>
  );
};

export const TopicsDisplay: FC<{ topics?: TopicDetailDto[] }> = ({ topics }) => {
  return (
    <Stack spacing="lg">
      {topics ? (
        topics.map((topic, index) => <Topic topic={topic} key={index} />)
      ) : (
        <>No Topics to show</>
      )}
    </Stack>
  );
};
