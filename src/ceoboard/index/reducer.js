import {
    InitialState,
    QuickBtn,
    publicModule,
    extraModule,
    heatSearchSecondModule,
    flowAnalysisModule,
    userModule
} from './constant';
import {createReducer} from 'redux-act';
import {HeaderXhrAct, HeaderUiAct, TopXhrAct} from './action';
import {TabLink} from './config';

export const reducer = createReducer({
    [HeaderXhrAct["region"]]: (state, payload) => {
        return {
            ...state,
            region: payload
        }
    },
    [HeaderXhrAct["city"]]: (state, payload) => {
        return {
            ...state,
            city: payload
        }
    },
    [HeaderXhrAct["province"]]: (state, payload) => {
        let province = payload;
        return {
            ...state,
            province: province,
        }
    },
    [HeaderXhrAct["product"]]: (state, payload) => {
        return {
            ...state,
            product: payload,
            loadedProduct: true,
        }
    },
    [HeaderUiAct["selectStart"]]: (state, payload) => {
        return {
            ...state,
            startTime: payload.date,
            curBtn: payload.curBtn
        }
    },
    [HeaderUiAct["selectEnd"]]: (state, payload) => {
        return {
            ...state,
            endTime: payload.date,
            curBtn: payload.curBtn
        }
    },
    [HeaderUiAct["selectRegion"]]: (state, payload) => {
        return {
            ...state,
            regionId: payload,
            provinceId: -1,
            cityId: -1,
        }
    },
    [HeaderUiAct["selectChannel"]]: (state, payload) => {
        return {
            ...state,
            channelId: payload
        }
    },
    [HeaderUiAct["selectCity"]]: (state, payload) => {
        return {
            ...state,
            cityId: payload
        }
    },
    [HeaderUiAct["selectProvince"]]: (state, payload) => {
        return {
            ...state,
            provinceId: payload,
            cityId: -1,
        }
    },
    [HeaderUiAct["selectProduct"]]: (state, payload) => {
        return {
            ...state,
            productId: payload
        }
    },
    [TopXhrAct["smallBNumber"]]: (state, payload) => {
        return {
            ...state,
            smallBNumber: payload
        };
    },
    [TopXhrAct["authority"]]: (state, payload) => {
        let filterTab = [];
        let userRole = "";
        let roleList = payload.data.role;
        roleList.push(publicModule);
        roleList.push(extraModule);
        // roleList.push(heatSearchModule);
        roleList.push(heatSearchSecondModule);
        // roleList.push(flowAnalysisModule);
        // roleList.push(userModule);
        console.log(roleList);
        if (roleList.length) {
            const authArr = roleList.map((item) => item.module);
            filterTab = TabLink.filter((item) => authArr.indexOf(item.key) > -1);
            userRole = roleList[0].role;
        }
        return {
            ...state,
            authorityList: filterTab,
            userRole: userRole,
            loginStatus: payload.status
        };
    },
    [TopXhrAct["finishRequest"]]: (state, payload) => {
        return {
            ...state,
            loadingAthority: true
        };
    },
    [TopXhrAct["changeTab"]]: (state, payload) => {
        return {
            ...state,
            loadedProduct: false,
            regionId: -1,
            provinceId: -1
        };
    },
}, InitialState);
export default reducer;