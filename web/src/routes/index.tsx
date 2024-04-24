import { Env } from '../constants/env';

export const routes = {
  home: '/',
  topics: '/topics',
  topicCreate: '/topic-create',
  subscriptions: '/subscriptions',
};

export const apiRoutes = {
  users: {
    base: `${Env.viteApiBaseUrl}/api/users`,
    updatePassword: `${Env.viteApiBaseUrl}/api/users/password-update`,
    signIn: `${Env.viteApiBaseUrl}/api/users/sign-in`,
    signOut: `${Env.viteApiBaseUrl}/api/users/sign-out`,
    signedInUser: `${Env.viteApiBaseUrl}/api/users/signed-in-user`,
  },
};
