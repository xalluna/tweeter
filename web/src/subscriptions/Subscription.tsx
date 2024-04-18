import { FC, useMemo } from 'react';
import { Tooltip, Button } from '@mantine/core';
import { IconStarFilled, IconStar } from '@tabler/icons-react';
import { success } from '../services/helpers/notification';
import { useUserContext } from '../users/useUserContext';

export const Subscription: FC<{ topicId: number }> = ({ topicId }) => {
  const { user, userSubscriptionTopicIds, subscribe, unsubscribe } = useUserContext();

  const isSubscribed = useMemo(
    () => userSubscriptionTopicIds?.includes(topicId ?? 0) ?? false,
    [topicId, userSubscriptionTopicIds]
  );

  const handleSubscription = async () => {
    if (isSubscribed) {
      unsubscribe(topicId);
      success('Unsubscribed');
      return;
    }

    subscribe(topicId);
    success('Subscribed');
  };
  return (
    <>
      {user && (
        <Tooltip label={isSubscribed ? 'Unsubscribe' : 'Subscribe'}>
          <Button p={5} onClick={handleSubscription}>
            {isSubscribed ? <IconStarFilled /> : <IconStar />}
          </Button>
        </Tooltip>
      )}
    </>
  );
};
