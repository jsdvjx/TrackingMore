import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Observable, from } from 'rxjs';
import { pluck, map, tap } from 'rxjs/operators';
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
} from './contract';
import * as fs from 'fs';
type METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE';
export class TrackingMoreApi {
    private axiosInstance: AxiosInstance;
    constructor(private apiKey: string) {
        this.axiosInstance = axios.create({
            baseURL: 'https://api.trackingmore.com/v2',
            headers: {
                'Trackingmore-Api-Key': apiKey,
                'Content-Type': 'application/json',
            },
        });
        this.initCarriers();
    }
    private replaceUrl = (url: string, data: Record<string, any>) =>
        data
            ? Object.entries(data).reduce(
                  (result, [key, value]) =>
                      result.replace(RegExp(`\{${key}\}`, 'g'), value),
                  url,
              )
            : url;
    private request = <O = any, I = void>(
        url: string,
        method: METHOD = 'GET',
        data: I,
    ): Observable<AxiosResponse<O>> =>
        from(this.axiosInstance.request({ method, url, data }));
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
    carriers = this.requestFactory<Carrier[]>('/carriers', 'GET');
    createTracking = this.requestFactory<
        CreateTracingResult,
        CreateTracingParameter
    >('/trackings/post', 'POST');
    updateTracking = this.requestUrlFactory<
        UpdateTrackingResult,
        UpdateTracingParameter
    >('/trackings/{carrier_code}/{tracking_number}', 'PUT');
    deleteTracking = this.requestUrlFactory<DeleteTrackingResult, void>(
        '/trackings/{carrier_code}/{tracking_number}',
        'DELETE',
    );
    getTracking = this.requestUrlFactory<TrackingInformation, void>(
        '/trackings/{carrier_code}/{tracking_number}',
        'GET',
    );
    batch = this.requestFactory<BatchResult, BatchParameter>(
        '/trackings/batch',
        'POST',
    );
    realtime = this.requestFactory<
        { items: TrackingInformation[] },
        CreateTracingParameter
    >('/trackings/realtime', 'POST');
    update = this.requestFactory<{ Usertag: string }, UpdateCarrierParameter>(
        '/trackings/update',
        'POST',
    );
    getStatusTotal = this.requestFactory<TypeTotal>(
        '/trackings/getstatusnumber',
        'GET',
    );
    private initCarriers = () =>
        this.carriers()
            .pipe(
                pluck('data', 'data'),
                map(items =>
                    items.reduce(
                        (prev, acc) => {
                            prev[acc.code] = acc;
                            return prev;
                        },
                        {} as CarriersMap,
                    ),
                ),
                tap(cmap => {
                    fs.writeFileSync(
                        __dirname + '/map.json',
                        JSON.stringify(cmap),
                    );
                }),
            )
            .subscribe();
}
