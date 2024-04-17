import { FC } from 'react';
import { useAsync } from 'react-use';
import {
  Avatar,
  Container,
  Group,
  Paper,
  Stack,
  createStyles,
  rem,
  useMantineTheme,
  Text,
  TypographyStylesProvider,
  Divider,
} from '@mantine/core';
import { TopicsService } from '../../api/TopicsService';
import { formatDate } from '../../helpers/dateFormatter';
import { PostDetailDto, TopicDetailDto } from '../../api/index.defs';

export const HomePage: FC = () => {
  const topics = useAsync(async () => {
    const response = await TopicsService.getAllTopics();
    return response.data;
  });
  const { classes } = useStyles();

  return (
    <Container className={classes.tweetContainer}>
      <h1>Latest Tweets</h1>
      <Stack>
        {topics.value && topics.value.map((topic, index) => <Topic topic={topic} key={index} />)}
      </Stack>
    </Container>
  );
};

const Topic: FC<{ topic: TopicDetailDto }> = ({ topic }) => {
  const { colors } = useMantineTheme();
  const { classes } = useStyles();

  return (
    <Paper
      bg={colors.secondaryBackgroundColors[2]}
      withBorder
      radius="md"
      className={classes.comment}
    >
      <Group className={classes.topicGroup}>
        <TweetAvatar createdByUserName={topic.createdByUserName?.charAt(0)} />
        <div>
          <TweetCreatedInfo
            createdByUserName={topic.createdByUserName}
            createdDate={topic.createdDate}
          />
          <TypographyStylesProvider className={classes.topicBody}>
            <div className={classes.content}>{topic.name}</div>
          </TypographyStylesProvider>
        </div>
      </Group>

      {topic.posts ? (
        <Stack pl={50}>
          {topic.posts.map((post, index) => {
            return <Post post={post} key={index} />;
          })}
        </Stack>
      ) : (
        <>
          <Divider />
          <Text c="dimmed" className={classes.noComments}>
            - No Comments -
          </Text>
        </>
      )}
    </Paper>
  );
};

const Post: FC<{ post: PostDetailDto }> = ({ post }) => {
  const { colors } = useMantineTheme();
  const { classes } = useStyles();

  return (
    <Paper
      bg={colors.secondaryBackgroundColors[1]}
      withBorder
      radius="md"
      className={classes.comment}
    >
      <Group>
        <TweetAvatar createdByUserName={post.createdByUserName?.charAt(0)} />
        <TweetCreatedInfo
          createdByUserName={post.createdByUserName}
          createdDate={post.createdDate}
        />
      </Group>

      <TypographyStylesProvider className={classes.body}>
        <div className={classes.content}>{post.content}</div>
      </TypographyStylesProvider>
    </Paper>
  );
};

const TweetAvatar: FC<{ createdByUserName?: string }> = ({ createdByUserName }) => (
  <Avatar color="blue" radius="xl" variant="filled">
    {createdByUserName?.charAt(0)}
  </Avatar>
);

const TweetCreatedInfo: FC<{
  createdByUserName?: string;
  createdDate?: Date;
}> = ({ createdByUserName, createdDate }) => {
  return (
    <div>
      <Text fz="sm">{createdByUserName}</Text>
      <Text fz="xs" c="dimmed">
        {createdDate && formatDate(createdDate)}
      </Text>
    </div>
  );
};

const useStyles = createStyles(() => ({
  tweetContainer: {
    color: '#e6e6e6',
  },

  comment: {
    padding: '20px',
    color: '#e6e6e6',
  },

  topicGroup: {
    color: '#e6e6e6',
    alignItems: 'flex-start',
  },

  topicBody: {
    color: '#e6e6e6',
    paddingBottom: 25,
    fontSize: 24,
  },

  body: {
    color: '#e6e6e6',
    paddingLeft: rem('54px'),
    padding: 10,
  },

  content: {
    color: '#e6e6e6',
    '& > p:last-child': { marginBottom: 0 },
  },

  noComments: {
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto',
    paddingTop: 10,
  },
}));
