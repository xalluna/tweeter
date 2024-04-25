/** Generate by swagger-axios-codegen */
/* eslint-disable */
// @ts-nocheck
import axiosStatic, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { Env } from '../constants/env';

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
export const serviceOptions: ServiceOptions = {
  axios: axiosStatic,
  loading: true,
};

// Instance selector
export function axios(
  configs: IRequestConfig,
  resolve: (p: any) => void,
  reject: (p: any) => void
): Promise<any> {
  if (serviceOptions.axios) {
    const instance = serviceOptions.axios;

    return instance
      .request(configs)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          const errorResponse = err.response.data;
          resolve(errorResponse);
        } else {
          reject(err);
        }
      });
  } else {
    throw new Error('please inject yourself instance like axios  ');
  }
}

export function getConfigs(
  method: string,
  contentType: string,
  url: string,
  options: any
): IRequestConfig {
  const configs: IRequestConfig = {
    loading: serviceOptions.loading,
    showError: serviceOptions.showError,
    ...options,
    method,
    url,
  };
  configs.headers = {
    ...options.headers,
    'Content-Type': contentType,
  };
  return configs;
}

export const basePath = Env.viteApiBaseUrl;

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

export class CreatePostRequest {
  /**  */
  'userId'?: number;

  /**  */
  'topicId'?: number;

  /**  */
  'content'?: string;

  constructor(data: CreatePostRequest = {}) {
    Object.assign(this, data);
  }
}

export class CreateTopicRequest {
  /**  */
  'name'?: string;

  /**  */
  'userId'?: number;

  constructor(data: CreateTopicRequest = {}) {
    Object.assign(this, data);
  }
}

export class CreateUserRequest {
  /**  */
  'userName'?: string;

  /**  */
  'email'?: string;

  /**  */
  'phoneNumber'?: string;

  /**  */
  'password'?: string;

  /**  */
  'confirmPassword'?: string;

  constructor(data: CreateUserRequest = {}) {
    Object.assign(this, data);
  }
}

export class DeleteUserRequest {
  /**  */
  'password'?: string;

  /**  */
  'confirmPassword'?: string;

  constructor(data: DeleteUserRequest = {}) {
    Object.assign(this, data);
  }
}

export class Error {
  /**  */
  'property'?: string;

  /**  */
  'message'?: string;

  constructor(data: Error = {}) {
    Object.assign(this, data);
  }
}

export class PostDetailDto {
  /**  */
  'userId'?: number;

  /**  */
  'topicId'?: number;

  /**  */
  'content'?: string;

  /**  */
  'id'?: number;

  /**  */
  'createdDate'?: Date;

  /**  */
  'isDeleted'?: boolean;

  /**  */
  'createdByUserName'?: string;

  constructor(data: PostDetailDto = {}) {
    Object.assign(this, data);
  }
}

export class PostDetailDtoResponse {
  /**  */
  'data'?: PostDetailDto;

  /**  */
  'errors'?: Error[];

  /**  */
  'hasErrors'?: boolean;

  constructor(data: PostDetailDtoResponse = {}) {
    Object.assign(this, data);
  }
}

export class PostDto {
  /**  */
  'userId'?: number;

  /**  */
  'topicId'?: number;

  /**  */
  'content'?: string;

  constructor(data: PostDto = {}) {
    Object.assign(this, data);
  }
}

export class PostDtoListResponse {
  /**  */
  'data'?: PostDto[];

  /**  */
  'errors'?: Error[];

  /**  */
  'hasErrors'?: boolean;

  constructor(data: PostDtoListResponse = {}) {
    Object.assign(this, data);
  }
}

export class PostGetDto {
  /**  */
  'userId'?: number;

  /**  */
  'topicId'?: number;

  /**  */
  'content'?: string;

  /**  */
  'id'?: number;

  /**  */
  'createdDate'?: Date;

  /**  */
  'isDeleted'?: boolean;

  constructor(data: PostGetDto = {}) {
    Object.assign(this, data);
  }
}

export class PostGetDtoResponse {
  /**  */
  'data'?: PostGetDto;

  /**  */
  'errors'?: Error[];

  /**  */
  'hasErrors'?: boolean;

  constructor(data: PostGetDtoResponse = {}) {
    Object.assign(this, data);
  }
}

export class Response {
  /**  */
  'data'?: any | null;

  /**  */
  'errors'?: Error[];

  /**  */
  'hasErrors'?: boolean;

  constructor(data: Response = {}) {
    Object.assign(this, data);
  }
}

export class SignInUserRequest {
  /**  */
  'userName'?: string;

  /**  */
  'password'?: string;

  constructor(data: SignInUserRequest = {}) {
    Object.assign(this, data);
  }
}

export class TopicDetailDto {
  /**  */
  'name'?: string;

  /**  */
  'createdByUserId'?: number;

  /**  */
  'createdDate'?: Date;

  /**  */
  'posts'?: PostDetailDto[];

  /**  */
  'id'?: number;

  /**  */
  'createdByUserName'?: string;

  constructor(data: TopicDetailDto = {}) {
    Object.assign(this, data);
  }
}

export class TopicDetailDtoListResponse {
  /**  */
  'data'?: TopicDetailDto[];

  /**  */
  'errors'?: Error[];

  /**  */
  'hasErrors'?: boolean;

  constructor(data: TopicDetailDtoListResponse = {}) {
    Object.assign(this, data);
  }
}

export class TopicGetDto {
  /**  */
  'name'?: string;

  /**  */
  'createdByUserId'?: number;

  /**  */
  'createdDate'?: Date;

  /**  */
  'posts'?: PostDetailDto[];

  /**  */
  'id'?: number;

  constructor(data: TopicGetDto = {}) {
    Object.assign(this, data);
  }
}

export class TopicGetDtoListResponse {
  /**  */
  'data'?: TopicGetDto[];

  /**  */
  'errors'?: Error[];

  /**  */
  'hasErrors'?: boolean;

  constructor(data: TopicGetDtoListResponse = {}) {
    Object.assign(this, data);
  }
}

export class TopicGetDtoResponse {
  /**  */
  'data'?: TopicGetDto;

  /**  */
  'errors'?: Error[];

  /**  */
  'hasErrors'?: boolean;

  constructor(data: TopicGetDtoResponse = {}) {
    Object.assign(this, data);
  }
}

export class UpdatePasswordRequest {
  /**  */
  'userName'?: string;

  /**  */
  'currentPassword'?: string;

  /**  */
  'newPassword'?: string;

  /**  */
  'newPasswordConfirmation'?: string;

  constructor(data: UpdatePasswordRequest = {}) {
    Object.assign(this, data);
  }
}

export class UpdatePostRequest {
  /**  */
  'content'?: string;

  constructor(data: UpdatePostRequest = {}) {
    Object.assign(this, data);
  }
}

export class UpdateTopicRequest {
  /**  */
  'name'?: string;

  constructor(data: UpdateTopicRequest = {}) {
    Object.assign(this, data);
  }
}

export class UpdateUserRequest {
  /**  */
  'userName'?: string;

  /**  */
  'email'?: string;

  /**  */
  'phoneNumber'?: string;

  constructor(data: UpdateUserRequest = {}) {
    Object.assign(this, data);
  }
}

export class UserDetailDto {
  /**  */
  'userName'?: string;

  /**  */
  'email'?: string;

  /**  */
  'phoneNumber'?: string;

  /**  */
  'id'?: number;

  /**  */
  'topicIds'?: number[];

  constructor(data: UserDetailDto = {}) {
    Object.assign(this, data);
  }
}

export class UserDetailDtoResponse {
  /**  */
  'data'?: UserDetailDto;

  /**  */
  'errors'?: Error[];

  /**  */
  'hasErrors'?: boolean;

  constructor(data: UserDetailDtoResponse = {}) {
    Object.assign(this, data);
  }
}

export class UserDto {
  /**  */
  'userName'?: string;

  /**  */
  'email'?: string;

  /**  */
  'phoneNumber'?: string;

  constructor(data: UserDto = {}) {
    Object.assign(this, data);
  }
}

export class UserDtoListResponse {
  /**  */
  'data'?: UserDto[];

  /**  */
  'errors'?: Error[];

  /**  */
  'hasErrors'?: boolean;

  constructor(data: UserDtoListResponse = {}) {
    Object.assign(this, data);
  }
}

export class UserGetDto {
  /**  */
  'userName'?: string;

  /**  */
  'email'?: string;

  /**  */
  'phoneNumber'?: string;

  /**  */
  'id'?: number;

  constructor(data: UserGetDto = {}) {
    Object.assign(this, data);
  }
}

export class UserGetDtoResponse {
  /**  */
  'data'?: UserGetDto;

  /**  */
  'errors'?: Error[];

  /**  */
  'hasErrors'?: boolean;

  constructor(data: UserGetDtoResponse = {}) {
    Object.assign(this, data);
  }
}

export class UserTopicDto {
  /**  */
  'userId'?: number;

  /**  */
  'topicId'?: number;

  constructor(data: UserTopicDto = {}) {
    Object.assign(this, data);
  }
}

export class UserTopicDtoResponse {
  /**  */
  'data'?: UserTopicDto;

  /**  */
  'errors'?: Error[];

  /**  */
  'hasErrors'?: boolean;

  constructor(data: UserTopicDtoResponse = {}) {
    Object.assign(this, data);
  }
}
