import {
  useMantineTheme,
  Paper,
  Stack,
  Group,
  Text,
  TypographyStylesProvider,
  Divider,
  createStyles,
  Avatar,
  Button,
  Flex,
  Grid,
  Textarea,
  rem,
} from '@mantine/core';
import { FC, useMemo } from 'react';
import { CreatePostRequest, PostDetailDto, TopicDetailDto } from '../api/index.defs';
import { Subscription } from '../subscriptions/Subscription';
import { useForm } from '@mantine/form';
import { PostsService } from '../api/PostsService';
import { formatDate } from '../helpers/dateFormatter';
import { error, success } from '../services/helpers/notification';
import { useUserContext } from '../users/useUserContext';
import { useTopicsContext } from './useTopicsContext';

export const Topic: FC<{
  topic: TopicDetailDto;
}> = ({ topic }) => {
  const { colors } = useMantineTheme();
  const { classes } = useStyles();

  return (
    <Paper
      bg={colors.secondaryBackgroundColors[2]}
      withBorder
      radius="md"
      className={classes.comment}
    >
      <Stack>
        <Group align="flex-start" className={classes.topicGroup}>
          <Group align="flex-start">
            <MessageAvatar createdByUserName={topic.createdByUserName?.charAt(0)} />
            <div>
              <MessageCreatedInfo
                createdByUserName={topic.createdByUserName}
                createdDate={topic.createdDate}
              />
              <TypographyStylesProvider className={classes.topicBody}>
                <div className={classes.content}>{topic.name}</div>
              </TypographyStylesProvider>
            </div>
          </Group>

          {topic.id && <Subscription topicId={topic.id} />}
        </Group>

        {topic.posts && topic.posts?.length > 0 ? (
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
        <CreateComment topicId={topic.id} />
      </Stack>
    </Paper>
  );
};

const CreateComment: FC<{
  topicId?: number;
}> = ({ topicId }) => {
  const { addPost } = useTopicsContext();
  const { user } = useUserContext();

  const initialValues: CreatePostRequest = {
    content: '',
    topicId: topicId,
  } as const;

  const form = useForm({
    initialValues: initialValues,
  });

  const handleCancel = () => {
    form.reset();
  };

  const handleCreatePost = async (values: CreatePostRequest) => {
    const response = await PostsService.createPost({
      body: {
        ...values,
        userId: user?.id,
      } as CreatePostRequest,
    });

    if (response.hasErrors) {
      error(response.errors?.[0].message);
      handleCancel();
    }

    if (response.data && topicId) addPost(topicId, response.data);

    success('Comment posted!');
    handleCancel();
    return response.data;
  };

  const disabled = useMemo(
    () => form.values.content === '' && !!topicId,
    [form.values.content, topicId]
  );

  return (
    <>
      {user && (
        <>
          <Divider />

          <form onSubmit={form.onSubmit(handleCreatePost)}>
            <Grid>
              <Grid.Col
                style={{
                  alignContent: 'center',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  margin: 'auto',
                }}
                span={1}
              >
                <MessageAvatar createdByUserName={user.userName?.charAt(0)} />
              </Grid.Col>
              <Grid.Col span={11}>
                <Textarea placeholder="Write a comment..." {...form.getInputProps('content')} />
              </Grid.Col>
            </Grid>
            {form.isDirty() && (
              <Flex justify="flex-end">
                <Button type="button" color="gray" mt={10} mr={5} onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit" mt={10} ml={5} disabled={disabled}>
                  Post
                </Button>
              </Flex>
            )}
          </form>
        </>
      )}
    </>
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
        <MessageAvatar createdByUserName={post.createdByUserName?.charAt(0)} />
        <MessageCreatedInfo
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

const MessageAvatar: FC<{ createdByUserName?: string }> = ({ createdByUserName }) => (
  <Avatar color="blue" radius="xl" variant="filled">
    {createdByUserName?.charAt(0)}
  </Avatar>
);

const MessageCreatedInfo: FC<{
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
  noComments: {
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto',
    paddingTop: 10,
  },

  comment: {
    padding: '20px',
    color: '#e6e6e6',
  },

  topicGroup: {
    color: '#e6e6e6',
    justifyContent: 'space-between',
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
}));
