"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
const url_1 = require("url");
class meituan {
    constructor(key) {
        this.key = key;
        this.key = key;
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
    link(actId, appkey, sid, linkType = 3, shortLink = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            let payload = {
                actId,
                appkey,
                sid,
                linkType,
                shortLink,
                sign: ''
            };
            payload = this.sign(payload);
            let url = this.genUrl('/api/generateLink', payload);
            try {
                const { data } = yield axios_1.default.get(url);
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * 获取小程序二维码
     * @param actId 活动ID
     * @param appkey 媒体名称
     * @param sid 推广位ID
     * @returns
     */
    miniCode(actId, appkey, sid) {
        return __awaiter(this, void 0, void 0, function* () {
            let payload = {
                actId,
                appkey,
                sid,
                sign: ''
            };
            payload = this.sign(payload);
            let url = this.genUrl('/api/miniCode', payload);
            try {
                const { data } = yield axios_1.default.get(url);
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * 单订单查询
     * @param actId 活动ID
     * @param appkey 媒体名称
     * @param orderId 订单ID
     * @param full 全量查询 0 非全量 1 全量 默认 0
     * @returns
     */
    order(actId, appkey, orderId, full = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            let payload = {
                actId,
                appkey,
                orderId,
                full,
                sign: ''
            };
            payload = this.sign(payload);
            let url = this.genUrl('/api/order', payload);
            try {
                const { data } = yield axios_1.default.get(url);
                return data;
            }
            catch (error) {
                throw error;
            }
        });
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
    orderList(appkey, startTime, endTime, page = 1, limit = 100, actId, businessLine) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!actId && !businessLine) {
                throw new Error("actId与businessLine至少传递一样");
            }
            if (startTime.toString().length === 13) {
                startTime = parseInt((startTime / 1000).toString());
            }
            if (endTime.toString().length === 13) {
                endTime = parseInt((endTime / 1000).toString());
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
            };
            payload = this.sign(payload);
            let url = this.genUrl('/api/orderList', payload);
            try {
                const { data } = yield axios_1.default.get(url);
                return data;
            }
            catch (error) {
                throw error;
            }
        });
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
    youxuan(appkey, sid, longitude, latitude, pageNO = 1, pageSize = 20, deviceType, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
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
            };
            payload = this.sign(payload);
            let url = this.genUrl('/sku/query', payload);
            try {
                const { data } = yield axios_1.default.get(url);
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    genUrl(path, params) {
        const url = new url_1.URL(path, 'https://openapi.meituan.com');
        for (const vo of Object.keys(params)) {
            url.searchParams.append(vo, params[vo]);
        }
        return url.href;
    }
    sign(params, key = this.key) {
        delete params.sign;
        let tmp = key;
        for (const vo of Object.keys(params).sort()) {
            tmp += vo + params[vo];
        }
        tmp += key;
        params.sign = crypto_1.default.createHash('md5').update(tmp).digest('hex');
        return params;
    }
}
exports.default = meituan;
