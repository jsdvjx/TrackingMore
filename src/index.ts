// eslint-disable-next-line no-unused-vars
import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { Observable, from } from 'rxjs'
import { pluck, map, tap } from 'rxjs/operators'
import * as qs from 'querystring'
import {
  TmResponse,
  Carrier,
  CarriersMap,
  CreateTracingParameter,
  CreateTracingResult,
  SimpleParameter,
  TrackingInformation,
  UpdateTracingParameter,
  UpdateTrackingResult,
  DeleteTrackingResult,
  BatchParameter,
  BatchResult,
  UpdateCarrierParameter,
  TypeTotal,
  GetListResult,
  GetListParameter
} from './contract'
import * as fs from 'fs'

type METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE';

export class TrackingMoreApi {
  private axiosInstance: AxiosInstance;

  constructor (private apiKey: string, private baseURL: string = 'https://api.51tracking.com/v2') {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Tracking-Api-Key': apiKey,
        'Content-Type': 'application/json'
      }
    })
    this.initCarriers()
  }

  private replaceUrl = (url: string, data: Record<string, any>) =>
    data
      ? Object.entries(data).reduce(
        (result, [key, value]) =>
          result.replace(RegExp(`{${key}}`, 'g'), value),
        url,
      )
      : url;

  private qs = ({
    method,
    data,
    url
  }: {
    method: METHOD;
    data: any;
    url: string;
  }) => {
    if (method === 'GET' && data && typeof data === 'object') {
      return `${url}?${qs.stringify(data)}`
    }
    return url
  };

  private request = <O = any, I = void>(
    url: string,
    method: METHOD = 'GET',
    data: I,
  ): Observable<AxiosResponse<O>> =>
    from(
      this.axiosInstance.request({
        method,
        url: this.qs({ method, url, data }),
        data
      }),
    );

  private requestFactory = <O = any, I = void>(
    url: string,
    method: METHOD = 'GET',
  ) => (data: I) => this.request<TmResponse<O>, I>(url, method, data);

  private requestUrlFactory = <O = any, I = void>(
    url: string,
    method: METHOD = 'GET',
  ) => (select: SimpleParameter, data: I) =>
    this.request<TmResponse<O>, I>(
      this.replaceUrl(url, select),
      method,
      data,
    );

  /**
   * 查询单个物流
   *
   * @memberof TrackingMoreApi
   */
  carriers = this.requestFactory<Carrier[]>('/carriers', 'GET');
  /**
   * 创建单个物流
   *
   * @memberof TrackingMoreApi
   */
  createTracking = this.requestFactory<CreateTracingResult,
    CreateTracingParameter>('/trackings/post', 'POST');

  /**
   * 更新物流信息
   *
   * @memberof TrackingMoreApi
   */
  updateTracking = this.requestUrlFactory<UpdateTrackingResult,
    UpdateTracingParameter>('/trackings/{carrier_code}/{tracking_number}', 'PUT');

  /**
   * 删除订单
   *
   * @memberof TrackingMoreApi
   */
  deleteTracking = this.requestUrlFactory<DeleteTrackingResult, void>(
    '/trackings/{carrier_code}/{tracking_number}',
    'DELETE',
  );

  /**
   * 获取单条物流
   *
   * @memberof TrackingMoreApi
   */
  getTracking = this.requestUrlFactory<TrackingInformation, void>(
    '/trackings/{carrier_code}/{tracking_number}',
    'GET',
  );

  /**
   * 批量添加物流
   *
   * @memberof TrackingMoreApi
   */
  batch = this.requestFactory<BatchResult, BatchParameter>(
    '/trackings/batch',
    'POST',
  );

  /**
   * 实时查询，每秒3次
   *
   * @memberof TrackingMoreApi
   */
  realtime = this.requestFactory<{ items: TrackingInformation[] },
    CreateTracingParameter>('/trackings/realtime', 'POST');

  /**
   * 更新物流公司
   *
   * @memberof TrackingMoreApi
   */
  update = this.requestFactory<{ Usertag: string }, UpdateCarrierParameter>(
    '/trackings/update',
    'POST',
  );

  /**
   * 获取各状态物流总数
   *
   * @memberof TrackingMoreApi
   */
  getStatusTotal = this.requestFactory<TypeTotal>(
    '/trackings/getstatusnumber',
    'GET',
  );

  private static _toQueryString = (parameter: GetListParameter) => {
    const result: any = { ...parameter }
    if (parameter.orders) {
      result.orders = parameter.orders.join(',')
    }
    if (parameter.numbers) {
      result.numbers = parameter.numbers.join(',')
    }
    return result
  };

  getList = (parameter: GetListParameter) =>
    this.requestFactory<GetListResult, any>('/trackings/get', 'GET')(
      TrackingMoreApi._toQueryString(parameter),
    );

  private initCarriers = () =>
    this.carriers()
      .pipe(
        pluck('data', 'data'),
        map(items =>
          items.reduce(
            (prev, acc) => {
              prev[acc.code] = acc
              return prev
            },
            {} as CarriersMap,
          ),
        ),
        tap(cmap => {
          fs.writeFileSync(
            `${__dirname}/map.json`,
            JSON.stringify(cmap),
          )
        }),
      )
      .subscribe();
}
