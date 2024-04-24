import React, { FC, ReactNode, useState } from 'react';
import { PostDetailDto, TopicDetailDto } from '../api/index.defs';

type TopicsProviderProps = {
  children: ReactNode;
};

export const TopicsContext = React.createContext<TopicsContextProps | undefined>(undefined);
type TopicsContextProps = {
  topics?: TopicDetailDto[];
  setTopics: (topics?: TopicDetailDto[]) => void;
  addPost: (topicId: number, post: PostDetailDto) => void;
};

export const TopicsProvider: FC<TopicsProviderProps> = ({ children }) => {
  const [topics, setTopics] = useState<TopicDetailDto[]>();

  const addPost = (topicId: number, post: PostDetailDto) => {
    if (!topics) return;

    const newTopics = [...topics];
    const index = newTopics.findIndex((x) => x.id === topicId);
    const topicPosts = newTopics[index].posts;

    if (topicPosts) {
      newTopics[index].posts = [...topicPosts, post];
      setTopics(newTopics);
    }
  };

  return (
    <TopicsContext.Provider value={{ topics, setTopics, addPost }}>
      {children}
    </TopicsContext.Provider>
  );
};
