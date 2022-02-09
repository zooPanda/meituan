import axios from "axios"
import crypto from "crypto"
import { URL } from "url"
export default class meituan {
    constructor(public key: string) {
        this.key = key
    }

    /**
     * 自助取链
     * @param actId 活动ID
     * @param appkey 媒体名称
     * @param sid 推广位ID
     * @param linkType 链接类型 1 h5链接 2deeplink链接 3 中间页链接 4 小程序路径 5 团口令 默认3
     * @param shortLink 0表示长链接 1表示段链接 默认1
     * @returns 
     */
    public async link(actId: number, appkey: string, sid: string, linkType: number = 3, shortLink: number = 1) {
        let payload = {
            actId,
            appkey,
            sid,
            linkType,
            shortLink,
            sign: ''
        }
        payload = this.sign(payload)
        let url = this.genUrl('/api/generateLink', payload)
        try {
            const { data }: {
                data: {
                    status: number,
                    des?: string,
                    data?: string
                }
            } = await axios.get(url)
            return data
        } catch (error) {
            throw error
        }
    }

    /**
     * 获取小程序二维码 
     * @param actId 活动ID
     * @param appkey 媒体名称
     * @param sid 推广位ID
     * @returns 
     */
    public async miniCode(actId: number, appkey: string, sid: string) {
        let payload = {
            actId,
            appkey,
            sid,
            sign: ''
        }
        payload = this.sign(payload)
        let url = this.genUrl('/api/miniCode', payload)
        try {
            const { data }: {
                data: {
                    status: number,
                    des?: string,
                    data?: string
                }
            } = await axios.get(url)
            return data
        } catch (error) {
            throw error
        }
    }


    /**
     * 单订单查询
     * @param actId 活动ID
     * @param appkey 媒体名称
     * @param orderId 订单ID
     * @param full 全量查询 0 非全量 1 全量 默认 0
     * @returns 
     */
    public async order(actId: number, appkey: string, orderId: string, full: number = 0) {
        let payload = {
            actId,
            appkey,
            orderId,
            full,
            sign: ''
        }
        payload = this.sign(payload)
        let url = this.genUrl('/api/order', payload)
        try {
            const { data }: {
                data: {
                    status: number,
                    des: string,
                    data: {
                        actId: number,
                        businessLine: number,
                        subBusinessLine?: number,
                        quantity: number,
                        orderId: string,
                        paytime: string,
                        modTime: string,
                        payprice: string,
                        profit?: string,
                        cpaProfit?: string,
                        sid: string,
                        appkey?: string,
                        smstitle: string,
                        status?: number,
                        tradeTypeList?: [number | string],
                        riskOrder?: number,
                        refundProfit?: string,
                        cpaRefundProfit?: string,
                        refundInfoList?: [{
                            id: string,
                            refundPrice: string,
                            refundTime: string,
                            refundType: number,

                        }],
                        refundProfitList?: [{
                            id: string,
                            refundProfit: string,
                            refundFinishTime: string,
                            type: number
                        }]
                    }
                }
            } = await axios.get(url)
            return data
        } catch (error) {
            throw error
        }
    }

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
    public async orderList(appkey: string, startTime: number, endTime: number, page: number = 1, limit: number = 100, actId?: number, businessLine?: number) {
        if (!actId && !businessLine) {
            throw new Error("actId与businessLine至少传递一样")
        }
        if (startTime.toString().length === 13) {
            startTime = parseInt((startTime / 1000).toString())
        }
        if (endTime.toString().length === 13) {
            endTime = parseInt((endTime / 1000).toString())
        }
        let payload = {
            appkey,
            startTime,
            endTime,
            page,
            limit,
            actId,
            businessLine,
            ts: parseInt((Date.now() / 1000).toString()),
            sign: ''
        }
        payload = this.sign(payload)
        let url = this.genUrl('/api/orderList', payload)
        try {
            const { data }: {
                data: {
                    dataList: [
                        {
                            actId: number,
                            businessLine: number,
                            subBusinessLine?: number,
                            orderid: string,
                            paytime: string,
                            payprice: string,
                            profit: string,
                            cpaProfit?: string,
                            sid: string,
                            appkey?: string,
                            smstitle: string,
                            refundprice?: string,
                            refundtime?: string,
                            refundprofit?: string,
                            cpaRefundProfit?: string,
                            status: number,
                            tradeTypeList?: [number | string],
                            riskOrder?: number
                        }
                    ]
                }
            } = await axios.get(url)
            return data
        } catch (error) {
            throw error
        }
    }

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
    public async youxuan(appkey: string, sid: string, longitude: string, latitude: string, pageNO: number = 1, pageSize: number = 20, deviceType?: string, deviceId?: string) {
        let payload = {
            appkey,
            sid,
            longitude,
            latitude,
            deviceType,
            deviceId,
            pageNO,
            pageSize,
            businessType: 6,
            ts: parseInt((Date.now() / 1000).toString()),
            sign: ''
        }
        payload = this.sign(payload)
        let url = this.genUrl('/sku/query', payload)
        try {
            const { data }: {
                data: {
                    code: number,
                    msg: string,
                    data: {
                        total: number,
                        skuList: [
                            {
                                itemId: string,
                                title: string,
                                pictUrl?: string,
                                smallImages?: [string],
                                originPrice: string,
                                promotionPrice?: string,
                                itemDeepLinkUrl: string,
                                itemMiddlePageLinkUrl: string,
                                itemWXLinkUrl: string,
                                hotFlag: boolean

                            }
                        ]
                    }
                }
            } = await axios.get(url)
            return data
        } catch (error) {
            throw error
        }
    }

    public genUrl(path: string, params) {
        const url = new URL(path, 'https://openapi.meituan.com')
        for (const vo of Object.keys(params)) {
            url.searchParams.append(vo, params[vo])
        }
        return url.href
    }

    public sign(params, key: string = this.key) {
        delete params.sign
        let tmp = key
        for (const vo of Object.keys(params).sort()) {
            tmp += vo + params[vo]
        }
        tmp += key
        params.sign = crypto.createHash('md5').update(tmp).digest('hex')
        return params
    }

}