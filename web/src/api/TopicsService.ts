import {
  TopicDetailDtoListResponse,
  TopicDetailDto,
  PostDetailDto,
  Error,
  CreateTopicRequest,
  TopicGetDtoResponse,
  TopicGetDto,
  UpdateTopicRequest,
  Response,
  TopicGetDtoListResponse,
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

export class TopicsService {
  /** Generate by swagger-axios-codegen */
  // @ts-nocheck
  /* eslint-disable */

  /**
   *
   */
  static getAllTopics(options: IRequestOptions = {}): Promise<TopicDetailDtoListResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/topics';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static createTopic(
    params: {
      /** requestBody */
      body?: CreateTopicRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<TopicGetDtoResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/topics';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
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
  /**
   *
   */
  static updateTopic(
    params: {
      /**  */
      id: number;
      /** requestBody */
      body?: UpdateTopicRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<TopicGetDtoResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/topics/{id}';
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
  static deleteTopic(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<Response> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/topics/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getAllTopicsByUserId(
    params: {
      /**  */
      userId: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<TopicGetDtoListResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/topics/users/{userId}';
      url = url.replace('{userId}', params['userId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
}
