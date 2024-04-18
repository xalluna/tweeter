import { useContext } from 'react';
import { TopicsContext } from './TopicsContext';

export const useTopicsContext = () => {
  const context = useContext(TopicsContext);

  if (!context) {
    throw new Error('useUserContext must be used within UserProvider');
  }
  return context;
};
