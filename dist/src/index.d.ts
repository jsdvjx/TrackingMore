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
    carriers: (data: void) => Observable<TmResponse<Carrier[]>>;
    createTracking: (data: CreateTracingParameter) => Observable<TmResponse<CreateTracingResult>>;
    updateTracking: (select: SimpleParameter, data: UpdateTracingParameter) => Observable<TmResponse<UpdateTrackingResult>>;
    deleteTracking: (select: SimpleParameter, data: void) => Observable<TmResponse<[]>>;
    getTracking: (select: SimpleParameter, data: void) => Observable<TmResponse<TrackingInfomation>>;
    batch: (data: CreateTracingParameter[]) => Observable<TmResponse<BatchResult>>;
    realtime: (data: CreateTracingParameter) => Observable<TmResponse<{
        items: TrackingInfomation[];
    }>>;
    update: (data: UpdateCarrierParameter) => Observable<TmResponse<{
        Usertag: string;
    }>>;
    private initCarriers;
}
