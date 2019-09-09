import { createReducer } from 'redux-act';
import { InitialState } from './constant';
import { ZworkXhrAct, ZworkUiAct } from './action';
const reducer = createReducer({
  [ZworkXhrAct["region"]]: (state, payload) => {
    return { ...state, region: payload };
  },
  [ZworkXhrAct["province"]]: (state, payload) => {
    return { ...state, province: payload };
  },
  [ZworkXhrAct["city"]]: (state, payload) => {
    return { ...state, city: payload };
  },
  [ZworkXhrAct["community"]]: (state, payload) => {
    return { ...state, community: payload };
  },
  [ZworkXhrAct["zworkSign"]]: (state, payload) => {
    let temp = {
      loading: true,
      data: [],
      name: ["area"]
    };
    temp.data = payload.list;
    return { ...state, zworkSign: temp, zworkSignAll: payload.amount }
  },
  [ZworkXhrAct["zworkCons"]]: (state, payload) => {
    let temp = {
      loading: true,
      data: [],
      name: ["area"]
    };
    temp.data = payload;
    const all = payload.reduce((total, current) => total + current.value, 0);
    return { ...state, zworkCons: temp, zworkConsAll: all }
  },
  [ZworkXhrAct["stationSign"]]: (state, payload) => {
    let temp = {
      loading: true,
      data: [],
      name: ["area"]
    };
    temp.data = payload.list;
    return {
      ...state, stationSign: temp,
      stationSignAll: payload.total,
      signRoaming: payload.roam
    }
  },
  [ZworkXhrAct["newSignStation"]]: (state, payload) => {
    let temp = {
      loading: true,
      data: [],
      name: ["area"]
    };
    temp.data = payload.list;
    return {
      ...state,
      newSignStation: temp,
      newSignStationAll: payload.number,
      newSignCount: payload.money,
      newSignCus: payload.customer
    }
  },
  [ZworkXhrAct["newSignAmount"]]: (state, payload) => { 
    let investment = {
      data: { name: '招商率', value: payload.investmentRate },
      loading: true,
    };
    let yearInvestment = {
      data: {name:'年化招商率',value:payload.yearInvestmentRate},
      loading: true
    };
    let continueInvestment = {
      data: {name:'续签率',value:payload.contractRate},
      loading: true
    };
    let stopInvestment = {
      data: {name:'退租率',value:payload.surrenderRate},
      loading: true
    };

    return {
      ...state,
      investAll: payload.investmentRate,
      stopInvestAll: payload.surrenderRate,
      continueInvestAll: payload.contractRate,
      yearInvestAll: payload.yearInvestmentRate,
      investment: investment,
      yearInvestment,yearInvestment,
      continueInvestment,continueInvestment,
      stopInvestment,stopInvestment
    }
  },
  [ZworkXhrAct["receiptSituation"]]: (state, payload) => {
    payload.loading = true;
    payload.data = payload.list;
    return {
      ...state,
      receiptSituation: payload,
      receiptSituationAll: payload.receivable
    }
  },
  [ZworkUiAct["selectRegion"]]: (state, payload) => {
    return { ...state, regionId: payload };
  },
  [ZworkUiAct["selectProvince"]]: (state, payload) => {
    return { ...state, provinceId: payload };
  },
  [ZworkUiAct["selectCity"]]: (state, payload) => {
    return { ...state, cityId: payload };
  },
  [ZworkUiAct["selectCommunity"]]: (state, payload) => {
    return { ...state, communityId: payload };
  },
}, InitialState);
export default reducer;