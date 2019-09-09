import {createReducer} from 'redux-act';
import {InitialState} from './constant';
import {XhrAct} from './action';

const reducer = createReducer({
    [XhrAct["metrics"]]: (state, payload) => {
        return {...state, metrics: payload};
    },
    [XhrAct["flowFunnel"]]: (state, payload) => {
        let temp = {
            //zbj平台日均UV
            dailyUv: payload.zbjuv,
            // 到店率
            entryRate: payload.shopeduvrate,
            // 日均进店uv
            entryUv: payload.shopeduv,
            // 人均浏览店铺数
            avgShopVisits: payload.avgshop,
            // 日均店铺uv
            dailyShopUv: payload.shopuv,
            // 店铺uv损耗率
            shopScrapeRate: payload.expendrate,
            // 日均店铺有效uv
            dailyShopEffectUv: payload.shopvuv,
            // 工场会员占比
            zworkRatio: payload.memberrate,
            // 可支撑权限工位数
            supportWorks: payload.eqstation,
            //平均每个工位日均UV
            dailyZworkShopUv: payload.avgstation,
            // 日均工场会员店铺UV
            dailyWorkUv: payload.avgmemberuv,
            ...payload
        };
        return {...state, flowFunnel: temp};
    },
    [XhrAct["heatTable"]]: (state, payload) => {
        let temp = {
            data: payload.data,
        };
        return {...state, heatTable: temp};
    },
    [XhrAct["trendLine"]]: (state, payload) => {
        let temp = {
            data: payload.data,
            xLabels: payload.xLabels,
            name: payload.name,
            loading: true,
        };
        return {...state, trendLine: temp};
    },
    [XhrAct["trendLineMetrics"]]: (state, payload) => {
        let dv = [];
        for (let i = 0; i < payload.length; i++) {
            let item = payload[i];
            if (item.name === "可支撑权益工位数" || item.name === "商家工位数") {
                dv.push(item.id)
            }
        }
        let temp = {
            data: payload,
            defaultValue: dv.join(',')
        };

        return {...state, trendLineMetrics: temp};
    },
}, InitialState);
export default reducer;