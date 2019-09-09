import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { TmResponse, Carrier, CreateTracingParameter, CreateTracingResult, SimpleParameter, TrackingInfomation, UpdateTracingParameter, UpdateTrackingResult, BatchResult, UpdateCarrierParameter } from './contract';
export declare class TrackingMoreApi {
    private apiKey;
    private axiosInstance;
    constructor(apiKey: string);
    private replaceUrl;
    private request;
    private requestFactory;
    private requestUrlFactory;
    carriers: (data: void) => Observable<AxiosResponse<TmResponse<Carrier[]>>>;
    createTracking: (data: CreateTracingParameter) => Observable<AxiosResponse<TmResponse<CreateTracingResult>>>;
    updateTracking: (select: SimpleParameter, data: UpdateTracingParameter) => Observable<AxiosResponse<TmResponse<UpdateTrackingResult>>>;
    deleteTracking: (select: SimpleParameter, data: void) => Observable<AxiosResponse<TmResponse<[]>>>;
    getTracking: (select: SimpleParameter, data: void) => Observable<AxiosResponse<TmResponse<TrackingInfomation>>>;
    batch: (data: CreateTracingParameter[]) => Observable<AxiosResponse<TmResponse<BatchResult>>>;
    realtime: (data: CreateTracingParameter) => Observable<AxiosResponse<TmResponse<{
        items: TrackingInfomation[];
    }>>>;
    update: (data: UpdateCarrierParameter) => Observable<AxiosResponse<TmResponse<{
        Usertag: string;
    }>>>;
    private initCarriers;
}
