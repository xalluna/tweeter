import React, { FC, ReactNode, useState } from 'react';
import { UserGetDto } from '../api/index.defs';

type UserProviderProps = {
  children: ReactNode;
};

export const UserContext = React.createContext<UserContextProps | undefined>(undefined);
type UserContextProps = {
  user?: UserGetDto;
  setUser: (user?: UserGetDto) => void;
};

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserGetDto>();

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
