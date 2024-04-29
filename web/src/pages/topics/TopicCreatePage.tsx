import { FC } from 'react';
import { Button, Flex, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useUserContext } from '../../users/useUserContext';
import { useAsyncFn } from 'react-use';
import { TopicsService } from '../../api/TopicsService';
import { success } from '../../services/helpers/notification';
import { CreateTopicRequest } from '../../api/index.defs';
import { BasicPage } from '../../BasicPage';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes';
import { SignInWarning } from '../home/HomePage';
import { getFormErrors } from '../../helpers/getFormErrors';
import { useDocumentTitle } from '@mantine/hooks';

const initialValues: CreateTopicRequest = {
  name: '',
} as const;

export const TopicCreatePage: FC = () => {
  useDocumentTitle('Topics | Create');
  const { user, addTopicId } = useUserContext();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: initialValues,
  });

  const [createState, onSubmit] = useAsyncFn(async (values: CreateTopicRequest) => {
    const response = await TopicsService.createTopic({
      body: { userId: user?.id, name: values.name },
    });

    if (response.hasErrors && response.errors) {
      form.setErrors(getFormErrors(response.errors));
      return response.errors;
    }

    response.data?.id && addTopicId(response.data.id);
    success('Topic Created!');
    navigate(routes.topics);
    return response.data;
  });

  return (
    <BasicPage title="Create Topic" hideAddTopic>
      {user ? (
        <form onSubmit={form.onSubmit(onSubmit)}>
          <div>
            <Textarea withAsterisk label="Topic Content:" {...form.getInputProps('name')} />
            <Flex justify="flex-end">
              <Button type="submit" mt={10} ml={5} disabled={createState.loading}>
                Submit
              </Button>
            </Flex>
          </div>
        </form>
      ) : (
        <SignInWarning />
      )}
    </BasicPage>
  );
};
