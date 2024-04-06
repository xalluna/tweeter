import {
  UserDtoListResponse,
  UserDto,
  Error,
  CreateUserRequest,
  UserGetDtoResponse,
  UserGetDto,
  DeleteUserRequest,
  Response,
  UpdateUserRequest,
  UpdatePasswordRequest,
  SignInUserRequest,
  UserTopicDtoResponse,
  UserTopicDto,
  IList,
  List,
  IListResult,
  ListResultDto,
  IPagedResult,
  PagedResultDto,
  Dictionary,
  IDictionary,
  IRequestOptions,
  IRequestConfig,
  getConfigs,
  axios,
  basePath
} from './index.defs';

export class UsersService {
  /** Generate by swagger-axios-codegen */
  // @ts-nocheck
  /* eslint-disable */

  /**
   *
   */
  static getAllUsers(options: IRequestOptions = {}): Promise<UserDtoListResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/users';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static createUser(
    params: {
      /** requestBody */
      body?: CreateUserRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<UserGetDtoResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/users';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static deleteUser(
    params: {
      /** requestBody */
      body?: DeleteUserRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<Response> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/users';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      /** 适配移动开发（iOS13 等版本），只有 POST、PUT 等请求允许带body */

      console.warn('适配移动开发（iOS13 等版本），只有 POST、PUT 等请求允许带body');

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
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
  static updateUser(
    params: {
      /**  */
      id: number;
      /** requestBody */
      body?: UpdateUserRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<UserGetDtoResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/users/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

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
  static signInUser(
    params: {
      /** requestBody */
      body?: SignInUserRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<UserGetDtoResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/users/sign-in';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static signOutUser(options: IRequestOptions = {}): Promise<Response> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/users/sign-out';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getSignedInUser(options: IRequestOptions = {}): Promise<UserDtoListResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/users/signed-in-user';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

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
      let url = basePath + '/api/users/subscribe/{topicId}, ';
      url = url.replace('{topicId}', params['topicId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static unsubscribe(
    params: {
      /**  */
      topicId: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<Response> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/users/unsubscribe/{topicId}';
      url = url.replace('{topicId}', params['topicId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
}
