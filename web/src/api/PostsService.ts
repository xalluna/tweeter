import {
  PostDtoListResponse,
  PostDto,
  Error,
  CreatePostRequest,
  PostDetailDtoResponse,
  PostDetailDto,
  PostGetDtoResponse,
  PostGetDto,
  UpdatePostRequest,
  Response,
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

export class PostsService {
  /** Generate by swagger-axios-codegen */
  // @ts-nocheck
  /* eslint-disable */

  /**
   *
   */
  static getAllPosts(options: IRequestOptions = {}): Promise<PostDtoListResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/posts';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static createPost(
    params: {
      /** requestBody */
      body?: CreatePostRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PostDetailDtoResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/posts';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getPostById(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PostGetDtoResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/posts/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static updatePost(
    params: {
      /**  */
      id: number;
      /** requestBody */
      body?: UpdatePostRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PostGetDtoResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/posts/{id}';
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
  static deletePost(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<Response> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/posts/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
}
