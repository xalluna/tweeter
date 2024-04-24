import { FC, useMemo } from 'react';
import { Tooltip, Button } from '@mantine/core';
import { IconStarFilled, IconStar } from '@tabler/icons-react';
import { success } from '../services/helpers/notification';
import { useUserContext } from '../users/useUserContext';

type SubscriptionProps = { topicId: number; createdByUserId: number };

export const Subscription: FC<SubscriptionProps> = ({ topicId, createdByUserId }) => {
  const { user, userSubscriptionTopicIds, subscribe, unsubscribe } = useUserContext();
  const isCurrentUserTopic = createdByUserId == user?.id;

  const isSubscribed = useMemo(
    () => userSubscriptionTopicIds?.includes(topicId ?? 0) ?? false,
    [topicId, userSubscriptionTopicIds]
  );

  const label = isSubscribed
    ? isCurrentUserTopic
      ? "Unsubscribing is disabled for topics you've created."
      : 'Unsubscribe'
    : 'Subscribe';

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
        <Tooltip label={label}>
          <div>
            <Button p={5} disabled={isCurrentUserTopic} onClick={handleSubscription}>
              {isSubscribed ? <IconStarFilled /> : <IconStar />}
            </Button>
          </div>
        </Tooltip>
      )}
    </>
  );
};
