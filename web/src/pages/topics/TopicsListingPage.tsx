import { FC } from 'react';
import { useAsyncRetry } from 'react-use';
import { Divider, Stack, Text } from '@mantine/core';
import { TopicsService } from '../../api/TopicsService';
import { error } from '../../services/helpers/notification';
import { useTopicsContext } from '../../topics/useTopicsContext';
import { Topic } from '../../topics/Topic';
import { BasicPage } from '../../BasicPage';
import { TopicDetailDto } from '../../api/index.defs';
import { useDocumentTitle } from '@mantine/hooks';

export const TopicsListingPage: FC = () => {
  useDocumentTitle('Topics');
  const { topics, setTopics } = useTopicsContext();

  const fetchTopics = useAsyncRetry(async () => {
    const response = await TopicsService.getAllTopics();
    if (response.hasErrors) {
      error(response.errors?.[0].message);
    }

    setTopics(response.data);
    return response.data;
  });

  return (
    <BasicPage title="Latest Topics" loading={fetchTopics.loading}>
      <TopicsDisplay topics={topics} topicRetry={fetchTopics.retry} />
    </BasicPage>
  );
};

export const TopicsDisplay: FC<{
  topics?: TopicDetailDto[];
  topicRetry: (userId?: number) => void;
}> = ({ topics, topicRetry }) => {
  return (
    <Stack spacing="lg">
      {(topics?.length ?? 0) > 0 ? (
        topics?.map((topic, index) => <Topic topic={topic} key={index} topicRetry={topicRetry} />)
      ) : (
        <Text align="center" size="xl">
          <Divider pb={15} />
          No Topics to Show ☹
        </Text>
      )}
    </Stack>
  );
};
