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
  Collapse,
  Tooltip,
  Modal,
  FocusTrap,
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
import { useDisclosure, useScrollIntoView } from '@mantine/hooks';
import { IconMessageCircle2Filled, IconX } from '@tabler/icons-react';
import { useAsyncFn } from 'react-use';
import { getFormErrors } from '../helpers/getFormErrors';

export const Topic: FC<{
  topic: TopicDetailDto;
  topicRetry: () => void;
}> = ({ topic, topicRetry }) => {
  const { colors } = useMantineTheme();
  const { classes } = useStyles();
  const { user } = useUserContext();
  const [isOpen, { toggle, close }] = useDisclosure();

  const hasComments = useMemo(() => topic.posts?.length !== 0, [topic.posts?.length]);

  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });

  const onCommentClick = () => {
    if (!isOpen) {
      scrollIntoView({
        alignment: 'center',
      });
    }

    toggle();
  };

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

          {topic.id && user?.id && (
            <Flex dir="row">
              <Tooltip label="Leave a Comment">
                <Button p={5} mr={10} onClick={onCommentClick}>
                  <IconMessageCircle2Filled />
                </Button>
              </Tooltip>

              <Subscription topicId={topic.id} createdByUserId={topic.createdByUserId ?? 0} />
            </Flex>
          )}
        </Group>

        {topic.posts && hasComments ? (
          <Stack pl={50}>
            {topic.posts.map((post, index) => {
              return <Post post={post} key={index} topicRetry={topicRetry} />;
            })}
          </Stack>
        ) : (
          <Collapse in={!isOpen} transitionDuration={250} transitionTimingFunction="ease-in">
            <Divider />
            <Text c="dimmed" className={classes.noComments}>
              - No Comments -
            </Text>
          </Collapse>
        )}
        <CreateComment topicId={topic.id} isOpen={isOpen} close={close} />
        <Text ref={targetRef}> </Text>
      </Stack>
    </Paper>
  );
};

const CreateComment: FC<{
  topicId?: number;
  isOpen: boolean;
  close: () => void;
}> = ({ topicId, isOpen, close }) => {
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
    close();
  };

  const [createPostState, handleCreatePost] = useAsyncFn(async (values: CreatePostRequest) => {
    const response = await PostsService.createPost({
      body: {
        ...values,
        userId: user?.id ?? 0,
      } as CreatePostRequest,
    });

    if (response.hasErrors && response.errors) {
      form.setErrors(getFormErrors(response.errors));
      return response.errors;
    }

    if (response.data && topicId) addPost(topicId, response.data);
    success('Comment posted!');
    handleCancel();
    return response.data;
  });

  const disabled = useMemo(
    () => form.values.content === '' && !!topicId,
    [form.values.content, topicId]
  );

  return (
    <>
      {user && (
        <>
          <Collapse transitionDuration={100} in={isOpen}>
            <Divider pb={15} />
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
                  <FocusTrap active={isOpen}>
                    <Textarea placeholder="Write a comment..." {...form.getInputProps('content')} />
                  </FocusTrap>
                </Grid.Col>
              </Grid>
              {form.isDirty() && (
                <Flex justify="flex-end">
                  <Button
                    type="button"
                    color="gray"
                    mt={10}
                    mr={5}
                    disabled={createPostState.loading}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    mt={10}
                    ml={5}
                    loading={createPostState.loading}
                    disabled={disabled}
                  >
                    Post
                  </Button>
                </Flex>
              )}
            </form>
          </Collapse>
        </>
      )}
    </>
  );
};

const Post: FC<{ post: PostDetailDto; topicRetry: () => void }> = ({ post, topicRetry }) => {
  const { colors } = useMantineTheme();
  const { classes } = useStyles();
  const { user } = useUserContext();
  const [isOpen, { open, close }] = useDisclosure(false);

  const [deleteState, handleDelete] = useAsyncFn(async (id: number) => {
    const response = await PostsService.deletePost({ id: id });

    if (response.hasErrors && response.errors) {
      error(response.errors?.[0].message);
      return response.errors;
    }

    success('Comment Deleted');
    topicRetry();
    close();
    return response.data;
  });

  return (
    <>
      <Paper
        bg={
          post.isDeleted ? colors.secondaryBackgroundColors[3] : colors.secondaryBackgroundColors[1]
        }
        withBorder
        radius="md"
        className={classes.comment}
        mih={100}
      >
        {post.isDeleted ? (
          <Text align="center" color="grey" pt={15}>
            Comment Removed
          </Text>
        ) : (
          <>
            <Group align="flex-start" className={classes.topicGroup}>
              <Group>
                <MessageAvatar createdByUserName={post.createdByUserName?.charAt(0)} />
                <MessageCreatedInfo
                  createdByUserName={post.createdByUserName}
                  createdDate={post.createdDate}
                />
              </Group>

              {post.userId === user?.id && (
                <Flex dir="row">
                  <Tooltip label="Delete Comment">
                    <Button compact variant="light" p={5} mr={10} onClick={open}>
                      <IconX size={15} />
                    </Button>
                  </Tooltip>
                </Flex>
              )}
            </Group>

            <TypographyStylesProvider className={classes.body}>
              <div className={classes.content}>{post.content}</div>
            </TypographyStylesProvider>
          </>
        )}
      </Paper>
      <Modal centered withCloseButton={false} opened={isOpen} onClose={close}>
        <Modal.Header>Are you sure you want to delete your comment?</Modal.Header>
        <Divider />
        <Flex justify="flex-end">
          <Button color="gray" mt={10} mr={5} onClick={close}>
            Cancel
          </Button>
          <Button
            mt={10}
            ml={5}
            onClick={() => handleDelete(post.id ?? 0)}
            loading={deleteState.loading}
          >
            Delete
          </Button>
        </Flex>
      </Modal>
    </>
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
