/** Generate by swagger-axios-codegen */
// @ts-nocheck
/* eslint-disable */

/** Generate by swagger-axios-codegen */
/* eslint-disable */
// @ts-nocheck
import axiosStatic, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

export interface IRequestOptions extends AxiosRequestConfig {
  /**
   * show loading status
   */
  loading?: boolean;
  /**
   * display error message
   */
  showError?: boolean;
  /**
   * data security, extended fields are encrypted using the specified algorithm
   */
  security?: Record<string, 'md5' | 'sha1' | 'aes' | 'des'>;
  /**
   * indicates whether Authorization credentials are required for the request
   * @default true
   */
  withAuthorization?: boolean;
}

export interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

// Add options interface
export interface ServiceOptions {
  axios?: AxiosInstance;
  /** only in axios interceptor config*/
  loading: boolean;
  showError: boolean;
}

// Add default options
export const serviceOptions: ServiceOptions = {};

// Instance selector
export function axios(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void): Promise<any> {
  if (serviceOptions.axios) {
    return serviceOptions.axios
      .request(configs)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  } else {
    throw new Error('please inject yourself instance like axios  ');
  }
}

export function getConfigs(method: string, contentType: string, url: string, options: any): IRequestConfig {
  const configs: IRequestConfig = {
    loading: serviceOptions.loading,
    showError: serviceOptions.showError,
    ...options,
    method,
    url
  };
  configs.headers = {
    ...options.headers,
    'Content-Type': contentType
  };
  return configs;
}

export const basePath = '';

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T = any> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
// empty

export class TopicsService {
  /**
   *
   */
  static getTopicById(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<TopicGetDtoResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/topics/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
}

export class UsersService {
  /**
   *
   */
  static getUserById(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<UserGetDtoResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/users/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static updatePassword(
    params: {
      /** requestBody */
      body?: UpdatePasswordRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<UserGetDtoResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/users/password-update';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static subscribe(
    params: {
      /**  */
      topicId: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<UserTopicDtoResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/users/subscribe/{topicId}';
      url = url.replace('{topicId}', params['topicId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
}

export interface CreatePostRequest {
  /**  */
  content?: string;
}

export interface CreateTopicRequest {
  /**  */
  name?: string;
}

export interface CreateUserRequest {
  /**  */
  userName?: string;

  /**  */
  email?: string;

  /**  */
  phoneNumber?: string;

  /**  */
  password?: string;

  /**  */
  confirmPassword?: string;
}

export interface DeleteUserRequest {
  /**  */
  password?: string;

  /**  */
  confirmPassword?: string;
}

export interface Error {
  /**  */
  property?: string;

  /**  */
  message?: string;
}

export interface PostDto {
  /**  */
  content?: string;
}

export interface PostDtoListResponse {
  /**  */
  data?: PostDto[];

  /**  */
  errors?: Error[];

  /**  */
  hasErrors?: boolean;
}

export interface PostGetDto {
  /**  */
  content?: string;

  /**  */
  id?: number;

  /**  */
  userId?: number;

  /**  */
  createdDate?: Date;

  /**  */
  isDeleted?: boolean;
}

export interface PostGetDtoResponse {
  /**  */
  data?: PostGetDto;

  /**  */
  errors?: Error[];

  /**  */
  hasErrors?: boolean;
}

export interface Response {
  /**  */
  data?: any | null;

  /**  */
  errors?: Error[];

  /**  */
  hasErrors?: boolean;
}

export interface SignInUserRequest {
  /**  */
  userName?: string;

  /**  */
  password?: string;
}

export interface TopicGetDto {
  /**  */
  name?: string;

  /**  */
  createdByUserId?: number;

  /**  */
  createdDate?: Date;

  /**  */
  id?: number;
}

export interface TopicGetDtoListResponse {
  /**  */
  data?: TopicGetDto[];

  /**  */
  errors?: Error[];

  /**  */
  hasErrors?: boolean;
}

export interface TopicGetDtoResponse {
  /**  */
  data?: TopicGetDto;

  /**  */
  errors?: Error[];

  /**  */
  hasErrors?: boolean;
}

export interface UpdatePasswordRequest {
  /**  */
  userName?: string;

  /**  */
  currentPassword?: string;

  /**  */
  newPassword?: string;

  /**  */
  newPasswordConfirmation?: string;
}

export interface UpdatePostRequest {
  /**  */
  content?: string;
}

export interface UpdateTopicRequest {
  /**  */
  name?: string;
}

export interface UpdateUserRequest {
  /**  */
  userName?: string;

  /**  */
  email?: string;

  /**  */
  phoneNumber?: string;

  /**  */
  id?: number;
}

export interface UserDto {
  /**  */
  userName?: string;

  /**  */
  email?: string;

  /**  */
  phoneNumber?: string;
}

export interface UserDtoListResponse {
  /**  */
  data?: UserDto[];

  /**  */
  errors?: Error[];

  /**  */
  hasErrors?: boolean;
}

export interface UserGetDto {
  /**  */
  userName?: string;

  /**  */
  email?: string;

  /**  */
  phoneNumber?: string;

  /**  */
  id?: number;
}

export interface UserGetDtoResponse {
  /**  */
  data?: UserGetDto;

  /**  */
  errors?: Error[];

  /**  */
  hasErrors?: boolean;
}

export interface UserTopicDto {
  /**  */
  userId?: number;

  /**  */
  topicId?: number;
}

export interface UserTopicDtoResponse {
  /**  */
  data?: UserTopicDto;

  /**  */
  errors?: Error[];

  /**  */
  hasErrors?: boolean;
}
