import CMAP from '../map.json';
export declare type TmStatus = 'pending' | 'notfound' | 'transit' | 'pickup' | 'delivered' | 'undelivered' | 'exception' | 'expired';
export interface TmResponseMeta {
    /**
     * 状态码
     *
     * @type {number}
     * @memberof TmResponseMeta
     */
    code: number;
    type?: string;
    message?: string;
}
export interface Carrier {
    name: string;
    code: string;
    phone: string;
    homepage: string;
    type: string;
    picture: string;
}
export interface CarriersMap {
    [k: string]: Carrier;
}
export interface TmResponse<T = any> {
    meta: TmResponseMeta;
    data: T;
}
export declare type CarrierCode = keyof typeof CMAP;
export interface CreateTracingParameter {
    /**
     *	运单号
     *
     * @type {string}
     * @memberof CreateTracingParameter
     */
    tracking_number: string;
    /**
     * 运输商简码. 检查 运输商简码
     *
     * @type {CarrierCode}
     * @memberof CreateTracingParameter
     */
    carrier_code: CarrierCode;
    /**
     *(optional)	目标国家/地区代码 (两个字符).查看国际国家二字代码
     *
     * @type {string}
     * @memberof CreateTracingParameter
     */
    destination_code?: string;
    /**
     * (optional)	商品标题
     *
     * @type {string}
     * @memberof CreateTracingParameter
     */
    title?: string;
    /**
     *(optional)	物流渠道
     *
     * @type {string}
     * @memberof CreateTracingParameter
     */
    logistics_channel?: string;
    /**
     *  (optional)	客户名称.
     *
     * @type {string}
     * @memberof CreateTracingParameter
     */
    customer_name?: string;
    /**
     * 客户邮箱
     *
     * @type {string}
     * @memberof CreateTracingParameter
     */
    customer_email?: string;
    /**
     * 客户电话号码
     *
     * @type {string}
     * @memberof CreateTracingParameter
     */
    customer_phone?: string;
    /**
     * 订单号
     *
     * @type {string}
     * @memberof CreateTracingParameter
     */
    order_id?: string;
    /**
     * 下单时间
     *
     * @type {string}
     * @memberof CreateTracingParameter
     */
    order_create_time?: string;
    tracking_ship_date?: string;
    tracking_postal_code?: string;
    tracking_account_number?: string;
    tracking_destination_country?: string;
    lang?: string;
    /**
     * 自动矫正
     *
     * @type {number}
     * @memberof CreateTracingParameter
     */
    auto_correct?: number;
    /**
     * 备注
     *
     * @type {string}
     * @memberof CreateTracingParameter
     */
    comment?: string;
}
export interface UpdateTracingParameter {
    title?: string;
    logistics_channel?: string;
    customer_name?: string;
    customer_email?: string;
    customer_phone?: string;
    order_id?: string;
    destination_code?: string;
    archived?: boolean;
    status?: number;
}
export declare type TrackingStatus = 'pendding';
export interface CreateTracingResult {
    id: string;
    tracking_number: string;
    carrier_code: CarrierCode;
    order_create_time: number;
    status: TrackingStatus;
    created_at: string;
    customer_email: string;
    customer_name: string;
    order_id: string;
    comment: string;
    title: string;
    logistics_channel: string;
    destination: string;
}
export declare type DeleteTrackingResult = [];
export interface UpdateTrackingResult {
    id: string;
    tracking_number: string;
    carrier_code: CarrierCode;
    order_create_time: number;
    status: TrackingStatus;
    created_at: string;
    customer_email: string;
    customer_name: string;
    order_id: string;
    comment: string;
    title: string;
    logistics_channel: string;
    destination: string;
    updated_at: string;
    destination_code: string;
    customer_phone: string;
    archived: boolean;
}
export interface SimpleParameter {
    /**
     * 快递单号
     *
     * @type {string}
     * @memberof SimpleParameter
     */
    tracking_number: string;
    /**
     * 快递公司编码
     *
     * @type {CarrierCode}
     * @memberof SimpleParameter
     */
    carrier_code: CarrierCode;
}
export interface TrackingStep {
    Date: string;
    StatusDescription: string;
    Details: string;
    checkpoint_status: TmStatus;
}
export interface TrackingInfomationDetail {
    ItemReceived: string;
    ItemDispatched: string;
    DepartfromAirport: string;
    ArrivalfromAbroad: string;
    CustomsClearance: string;
    DestinationArrived: string;
    weblink: string;
    phone: string;
    carrier_code: CarrierCode;
    trackinfo: TrackingStep[];
}
export interface TrackingInfomation {
    id: string;
    tracking_number: string;
    carrier_code: CarrierCode;
    status: TmStatus;
    created_at: string;
    updated_at: string;
    order_create_time: string;
    customer_email: string[];
    title: string;
    order_id: string;
    comment: string;
    customer_name: string;
    archived: boolean;
    original_country: string;
    destination_country: string;
    itemTimeLength: number;
    stayTimeLength: number;
    origin_info: TrackingInfomationDetail;
    service_code: string;
    lastEvent: string;
    lastUpdateTime: string;
}
export declare type BatchParameter = CreateTracingParameter[];
export interface BatchResult {
    /**
     * 提交数量
     *
     * @type {number}
     * @memberof BatchResult
     */
    submitted: number;
    /**
     * 修改数量
     *
     * @type {number}
     * @memberof BatchResult
     */
    added: number;
    /**
     * 成功列表
     *
     * @type {CreateTracingResult[]}
     * @memberof BatchResult
     */
    trackings: CreateTracingResult[];
    /**
     * 错误列表
     *
     * @type {{
     *         tracking_number: string;
     *         code: number;
     *         carrier_code: CarrierCode;
     *         message: string;
     *     }[]}
     * @memberof BatchResult
     */
    errors: {
        /**
         * 快递单号
         *
         * @type {string}
         */
        tracking_number: string;
        /**
         * 错误码
         *
         * @type {number}
         */
        code: number;
        /**
         * 快递公司编码
         *
         * @type {CarrierCode}
         */
        carrier_code: CarrierCode;
        /**
         * 错误信息
         *
         * @type {string}
         */
        message: string;
    }[];
}
export declare type UpdateCarrierParameter = SimpleParameter & {
    /**
     * 修改为新得快递公司编码
     *
     * @type {CarrierCode}
     */
    update_carrier_code: CarrierCode;
};
