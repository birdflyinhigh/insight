import {createReducer} from 'redux-act';
import {InitialState} from './constant';
import {ServiceXhrAct, ServiceCommonXhrAct, ServiceUiAct} from './action';

const serviceReducer = createReducer({
  [ServiceCommonXhrAct["region"]]: (state, payload) => {
    return {...state, region: payload}
  },
  [ServiceCommonXhrAct["province"]]: (state, payload) => {
    return {...state, province: payload}
  },
  [ServiceCommonXhrAct["industry"]]: (state, payload) => {
    return {...state, industry: payload}
  },
  [ServiceCommonXhrAct["panelData"]]: (state, payload) => {
    return {...state, panelData: payload}
  },
  [ServiceXhrAct["areaServiceTrend"]]: (state, payload) => {
    payload.loading = true;
    payload.hasLoaded = true;
    return {...state, areaServiceTrend: payload}
  },
  [ServiceXhrAct["areaServiceRate"]]: (state, payload) => {
    let temp = {
      loading: true,
      data: [],
      name: ["area"]
    };
    temp.data = payload;
    return {...state, areaServiceRate: temp}
  },
  [ServiceXhrAct["areaServiceTop"]]: (state, payload) => {
    let temp = {
      loading: true,
      name: ["数量"],
      data: [],
      xLabels: [],
      percent: []
    };
    if(JSON.stringify(payload) == "[]"){
      return {...state, areaServiceTop: temp}
    }
    temp.data[0] = [];
    payload.forEach((item, index) => {
      temp["data"][0].push(item.value);
      temp.xLabels.push(item.name);
      temp.percent.push(`${item.rate}%`);
    });
    return {...state, areaServiceTop: temp}
  },
  [ServiceXhrAct["industryServiceTrend"]]: (state, payload) => {
    payload.loading = true;
    payload.hasLoaded = true;
    return {...state, industryServiceTrend: payload}
  },
  [ServiceXhrAct["industryerviceTop"]]: (state, payload) => {
    let temp = {
      loading: true,
      data: [],
      name: ["area"]
    };
    temp.data = payload;
    return {...state, industryerviceTop: temp}
  },
  [ServiceUiAct["clickPanelItem"]]: (state, payload) => {
    return {...state, defaultTab: payload}
  },
  [ServiceUiAct["getData"]]: (state, payload) => {
    let temp = {
      panelData: {},
      areaServiceTrend: {...state.areaServiceTrend, hasLoaded: false, loading: false},
      areaServiceRate: {...state.areaServiceRate, hasLoaded: false, loading: false},
      areaServiceTop: {...state.areaServiceTop, hasLoaded: false,loading: false},
      industryServiceTrend: {...state.industryServiceTrend, hasLoaded: false, loading: false},
      industryerviceTop: {...state.industryerviceTop, hasLoaded: false, loading: false}
    };
    return {...state, ...temp}
  },
  [ServiceUiAct["selectStart"]]: (state, payload) => {
    return {...state, startTime: payload};
  },
  [ServiceUiAct["selectEnd"]]: (state, payload) => {
    return {...state, endTime: payload};
  },
  [ServiceUiAct["selectRegion"]]: (state, payload) => {
    return {...state, regionId: payload};
  },
  [ServiceUiAct["selectProvince"]]: (state, payload) => {
    return {...state, provinceId: payload};
  },
  [ServiceUiAct["selectIndustry"]]: (state, payload) => {
    return {...state, industryId: payload};
  }
}, InitialState);
export default serviceReducer;