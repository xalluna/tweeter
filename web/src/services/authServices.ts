import {
  SignInUserDto,
  UserCreateDto,
  UserDeleteDto,
  UserGetDto,
  UserPasswordUpdateDto,
} from '../types/users';
import { apiCall } from './helpers/apiCall';
import { apiRoutes } from '../routes/index';

export type AuthServices = typeof AuthServices;

export const AuthServices = {
  registerUser: async (values: UserCreateDto) => {
    return await apiCall<UserGetDto>({
      method: 'POST',
      endpoint: apiRoutes.users.base,
      data: values,
    });
  },

  signInUser: async (values: SignInUserDto) => {
    return await apiCall({
      method: 'POST',
      endpoint: apiRoutes.users.signIn,
      data: values,
    });
  },

  getSignedInUser: async () => {
    return await apiCall({
      method: 'GET',
      endpoint: apiRoutes.users.signedInUser,
    });
  },

  signOutUser: async () => {
    return await apiCall({ method: 'POST', endpoint: apiRoutes.users.signOut });
  },

  updateUserInformation: async (values: UserGetDto) => {
    return await apiCall<UserGetDto>({
      method: 'PUT',
      endpoint: `${apiRoutes.users.base}/${values.id}`,
      data: values,
    });
  },

  updateUserPassword: async (values: UserPasswordUpdateDto) => {
    return await apiCall({
      method: 'PUT',
      endpoint: `${apiRoutes.users.updatePassword}`,
      data: values,
    });
  },

  deleteUser: async (values: UserDeleteDto) => {
    return await apiCall({
      method: 'DELETE',
      endpoint: `${apiRoutes.users.base}`,
      data: values,
    });
  },
};
