export default class meituan {
    key: string;
    constructor(key: string);
    /**
     * 自助取链
     * @param actId 活动ID
     * @param appkey 媒体名称
     * @param sid 推广位ID
     * @param linkType 链接类型 1 h5链接 2deeplink链接 3 中间页链接 4 小程序路径 5 团口令 默认3
     * @param shortLink 0表示长链接 1表示段链接 默认1
     * @returns
     */
    link(actId: number, appkey: string, sid: string, linkType?: number, shortLink?: number): Promise<{
        status: number;
        des?: string;
        data?: string;
    }>;
    /**
     * 获取小程序二维码
     * @param actId 活动ID
     * @param appkey 媒体名称
     * @param sid 推广位ID
     * @returns
     */
    miniCode(actId: number, appkey: string, sid: string): Promise<{
        status: number;
        des?: string;
        data?: string;
    }>;
    /**
     * 单订单查询
     * @param actId 活动ID
     * @param appkey 媒体名称
     * @param orderId 订单ID
     * @param full 全量查询 0 非全量 1 全量 默认 0
     * @returns
     */
    order(actId: number, appkey: string, orderId: string, full?: number): Promise<{
        status: number;
        des: string;
        data: {
            actId: number;
            businessLine: number;
            subBusinessLine?: number;
            quantity: number;
            orderId: string;
            paytime: string;
            modTime: string;
            payprice: string;
            profit?: string;
            cpaProfit?: string;
            sid: string;
            appkey?: string;
            smstitle: string;
            status?: number;
            tradeTypeList?: [number | string];
            riskOrder?: number;
            refundProfit?: string;
            cpaRefundProfit?: string;
            refundInfoList?: [
                {
                    id: string;
                    refundPrice: string;
                    refundTime: string;
                    refundType: number;
                }
            ];
            refundProfitList?: [
                {
                    id: string;
                    refundProfit: string;
                    refundFinishTime: string;
                    type: number;
                }
            ];
        };
    }>;
    /**
     * 订单列表查询
     * @param appkey 媒体名称
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @param page 页数 默认1
     * @param limit 单页订单数量 默认100 最大100
     * @param actId 活动ID
     * @param businessLine 业务类型
     * @returns
     */
    orderList(appkey: string, startTime: number, endTime: number, page?: number, limit?: number, actId?: number, businessLine?: number): Promise<{
        dataList: [
            {
                actId: number;
                businessLine: number;
                subBusinessLine?: number;
                orderid: string;
                paytime: string;
                payprice: string;
                profit: string;
                cpaProfit?: string;
                sid: string;
                appkey?: string;
                smstitle: string;
                refundprice?: string;
                refundtime?: string;
                refundprofit?: string;
                cpaRefundProfit?: string;
                status: number;
                tradeTypeList?: [number | string];
                riskOrder?: number;
            }
        ];
    }>;
    /**
     * 美团优选商品列表查询
     * @param appkey 媒体名称
     * @param sid 推广位ID
     * @param longitude 经度
     * @param latitude 纬度
     * @param pageNO 页数 默认1
     * @param pageSize 单页商品数量 默认20 最大100
     * @param deviceType 设备类型 ios 或 android
     * @param deviceId 设备ID iOS传IDFA android 10以上传md5的OAID 以下传md5的IMEI
     * @returns
     */
    youxuan(appkey: string, sid: string, longitude: string, latitude: string, pageNO?: number, pageSize?: number, deviceType?: string, deviceId?: string): Promise<{
        code: number;
        msg: string;
        data: {
            total: number;
            skuList: [
                {
                    itemId: string;
                    title: string;
                    pictUrl?: string;
                    smallImages?: [string];
                    originPrice: string;
                    promotionPrice?: string;
                    itemDeepLinkUrl: string;
                    itemMiddlePageLinkUrl: string;
                    itemWXLinkUrl: string;
                    hotFlag: boolean;
                }
            ];
        };
    }>;
    genUrl(path: string, params: any): string;
    sign(params: any, key?: string): any;
}
