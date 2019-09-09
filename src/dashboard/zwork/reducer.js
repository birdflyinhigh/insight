import {createReducer} from 'redux-act';
import {InitialState} from './constant';
import {ZworkXhrAct, ZworkUiAct} from './action';
const ZworkReducer = createReducer({
  [ZworkXhrAct["cityType"]]: (state, payload) => {
    return {...state, cityType: payload};
  },
  [ZworkXhrAct["region"]]: (state, payload) => {
    return {...state, region: payload};
  },
  [ZworkXhrAct["province"]]: (state, payload) => {
    return {...state, province: payload};
  },
  [ZworkXhrAct["city"]]: (state, payload) => {
    return {...state, city: payload};
  },
  [ZworkXhrAct["community"]]: (state, payload) => {
    return {...state, community: payload};
  },
  [ZworkXhrAct["panelData"]]: (state, payload) => {
    return {...state, panelData: payload};
  },
  [ZworkXhrAct["communityArea"]]: (state, payload) => {
    return {...state, communityArea: {
        data: payload,
        loading: true,
        name: [""],
      }
    };
  },
  [ZworkXhrAct["proCons"]]: (state, payload) => {
    return {...state, proCons:  {
        data: payload,
        loading: true,
        name: [""],
      },
      stationRent: payload
    };
  },
  [ZworkXhrAct["incomeTrend"]]: (state, payload) => {
    payload.loading = true;
    return {...state, incomeTrend: payload};
  },
  [ZworkXhrAct["incomeCons"]]: (state, payload) => {
    return {...state, incomeCons:  {
        data: payload,
        loading: true,
        name: [""],
      }
    };
  },
  [ZworkXhrAct["incomeArea"]]: (state, payload) => {
    payload.loading = true;
    return {...state, incomeArea: payload};
  },
  [ZworkUiAct["selectEnd"]]: (state, payload) => {
    return {...state, endTime: payload};
  },
  [ZworkUiAct["selectCityType"]]: (state, payload) => {
    return {...state, cityTypeId: payload};
  },
  [ZworkUiAct["selectRegion"]]: (state, payload) => {
    return {...state, regionId: payload};
  },
  [ZworkUiAct["selectProvince"]]: (state, payload) => {
    return {...state, provinceId: payload};
  },
  [ZworkUiAct["selectCity"]]: (state, payload) => {
    return {...state, cityId: payload};
  },
  [ZworkUiAct["selectCommunity"]]: (state, payload) => {
    return {...state, communityId: payload};
  },
}, InitialState);
export default ZworkReducer;