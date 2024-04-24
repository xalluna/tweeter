import React, { FC, ReactNode, useState } from 'react';
import { UserDetailDto } from '../api/index.defs';
import { UsersService } from '../api/UsersService';
import { error } from '../services/helpers/notification';
import { useAsyncFn } from 'react-use';

type UserProviderProps = {
  children: ReactNode;
};

export const UserContext = React.createContext<UserContextProps | undefined>(undefined);
type UserContextProps = {
  user?: UserDetailDto;
  setUser: (user?: UserDetailDto) => void;
  userSubscriptionTopicIds?: number[];
  subscribe: (topicId: number) => void;
  unsubscribe: (topicId: number) => void;
  addTopicId: (topicId: number) => void;
};

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserDetailDto>();
  const [topicIds, setTopicIds] = useState<number[]>();

  const setUserAndTopicIds = (user?: UserDetailDto) => {
    setUser(user);
    setTopicIds(user?.topicIds);
  };

  const [, addTopicId] = useAsyncFn(
    async (topicId: number) => {
      if (!topicIds) return;

      const newTopicIds = [...topicIds, topicId];
      setTopicIds(newTopicIds);
    },
    [topicIds]
  );

  const [, removeTopicId] = useAsyncFn(
    async (topicId: number) => {
      if (!topicIds) return;

      const newTopicIds = [...topicIds.filter((x) => x != topicId)];
      setTopicIds(newTopicIds);
    },
    [topicIds]
  );

  const subscribe = async (topicId: number) => {
    if (!topicIds) return;
    const response = await UsersService.subscribe({ topicId: topicId, userId: user?.id });

    if (response.hasErrors) {
      error(response.errors?.[0].message);
      return;
    }

    await addTopicId(topicId);
  };

  const unsubscribe = async (topicId: number) => {
    if (!topicIds) return;
    const response = await UsersService.unsubscribe({ topicId: topicId, userId: user?.id });

    if (response.hasErrors) {
      error(response.errors?.[0].message);
      return;
    }

    await removeTopicId(topicId);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: setUserAndTopicIds,
        addTopicId,
        subscribe,
        unsubscribe,
        userSubscriptionTopicIds: topicIds,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
