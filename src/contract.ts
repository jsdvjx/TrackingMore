import * as CMAP from '../map.json';
export type TmStatus =
    | 'pending' //查询中
    | 'notfound' //未查询到
    | 'transit' //发送中
    | 'pickup' //待收件
    | 'delivered' //妥投
    | 'undelivered' //未妥投
    | 'exception' //异常件
    | 'expired'; //超时
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
export type CarrierCode = keyof typeof CMAP;
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
    carrier_code: CarrierCode; //
    /**
     *(optional)	目标国家/地区代码 (两个字符).查看国际国家二字代码
     *
     * @type {string}
     * @memberof CreateTracingParameter
     */
    destination_code?: string; //
    /**
     * (optional)	商品标题
     *
     * @type {string}
     * @memberof CreateTracingParameter
     */
    title?: string; //
    /**
     *(optional)	物流渠道
     *
     * @type {string}
     * @memberof CreateTracingParameter
     */
    logistics_channel?: string; //
    /**
     *  (optional)	客户名称.
     *
     * @type {string}
     * @memberof CreateTracingParameter
     */
    customer_name?: string; //
    /**
     * 客户邮箱
     *
     * @type {string}
     * @memberof CreateTracingParameter
     */
    customer_email?: string; // (optional)	客户邮箱.
    /**
     * 客户电话号码
     *
     * @type {string}
     * @memberof CreateTracingParameter
     */
    customer_phone?: string; // (optional)	客户电话号码.
    /**
     * 订单号
     *
     * @type {string}
     * @memberof CreateTracingParameter
     */
    order_id?: string; // (optional)	订单号.
    /**
     * 下单时间
     *
     * @type {string}
     * @memberof CreateTracingParameter
     */
    order_create_time?: string; // (optional)	下单时间(eg:2017/8/27 16:51).
    tracking_ship_date?: string; //(optional)	寄件日期，格式为20181001（年月日），部分运输商（如德国邮政）要求填写发件日期才可以查询物流信息，故查询此类运输商时需要传此参数。.
    tracking_postal_code?: string; //(optional)	收件地邮编，部分运输商（如Mondial Relay法国快递）要求填写邮编才可以查询物流信息，故查询此类运输商时需要传该参数。.
    tracking_account_number?: string; //(optional)	账户号，部分快递要求填写账户号才可以查询物流，故查询此类快递时需要传该参数.
    tracking_destination_country?: string; //(optional)	目的国参数，部分运输商要求填写目的国家才可以查询物流，故查询此类快递时需要传该参数.
    lang?: string; // (optional)	返回语言类型 (仅当运输商官网支持时有用)。.了解更多信息
    /**
     * 自动矫正
     *
     * @type {number}
     * @memberof CreateTracingParameter
     */
    auto_correct?: number; // (optional)	如果将值设置为 1, 系统将不会自动根据单号矫正快递商。.
    /**
     * 备注
     *
     * @type {string}
     * @memberof CreateTracingParameter
     */
    comment?: string; // (optional)	备注.
}
export interface UpdateTracingParameter {
    title?: string; // (optional)	商品标题
    logistics_channel?: string; // (optional)	物流渠道
    customer_name?: string; // (optional)	客户名称.
    customer_email?: string; // (optional)	客户邮箱.
    customer_phone?: string; // (optional)	客户电话号码.
    order_id?: string; // (optional)	订单号.
    destination_code?: string; // (optional)	目标国家/地区代码 (两个字符).查看国际国家二字代码
    archived?: boolean; // (optional)	Modify whether a single number is archived by passing a true/false string.
    status?: number; // (optional)	Change status.You can only change the state value to 4, 7 or 8. 4 means delivered, 7 means exception, 8 means return to the original status.
}
export type TrackingStatus = 'pendding';
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
export type DeleteTrackingResult = [];
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
    tracking_number: string; //快递单号
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
export interface TrackingInformationDetail {
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
export interface TrackingInformation {
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
    origin_info: TrackingInformationDetail;
    service_code: string;
    lastEvent: string;
    lastUpdateTime: string;
}
export type BatchParameter = CreateTracingParameter[];
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
export type UpdateCarrierParameter = SimpleParameter & {
    /**
     * 修改为新得快递公司编码
     *
     * @type {CarrierCode}
     */
    update_carrier_code: CarrierCode;
};
