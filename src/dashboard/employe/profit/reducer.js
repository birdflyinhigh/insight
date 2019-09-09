import {createReducer} from 'redux-act';
import {InitialState} from './constant';
import {ProfitXhrAct} from './action';
const reducer = createReducer({
  [ProfitXhrAct["proTrend"]]: (state, payload) => {
    payload.loading = true;
    return {...state, proTrend: payload};
  },
  // [ProfitXhrAct["proKind"]]: (state, payload) => {
  //   payload.loading = true;
  //   return {...state, proKind: payload};
  // },
  [ProfitXhrAct["proRate"]]: (state, payload) => {
    let temp = {
      loading: true,
      name: ["erate"],
      data: []
    }
    temp.data = payload;
    return {...state, proRate: temp};
  },
  [ProfitXhrAct["areaTrend"]]: (state, payload) => {
    payload.loading = true;
    return {...state, areaTrend: payload};
  },
  [ProfitXhrAct["areaRate"]]: (state, payload) => {
    let temp = {
      loading: true,
      name: [""],
      data: [],
      xLabels: []
    };
    if(payload.length == 0) return {...state, areaRate: temp};
    temp.data[0] = [];
    payload.forEach((item, index) => {
      temp.data[0].push(item.value);
      temp.xLabels.push(item.name);
    })
    return {...state, areaRate: temp};
  },
  [ProfitXhrAct["areaTop"]]: (state, payload) => {
    let temp = {
      loading: true,
      name: [""],
      data: [],
      xLabels: []
    };
    if(payload.length == 0) return {...state, areaTop: temp};
    temp.data[0] = [];
    payload.forEach((item, index) => {
      temp["data"][0].push(item.value);
      temp["xLabels"].push(item.name);
    });
    return {...state, areaTop: temp};
  },
  [ProfitXhrAct["industryTrend"]]: (state, payload) => {
    payload.loading = true;
    return {...state, industryTrend: payload};
  },
  [ProfitXhrAct["industryTop"]]: (state, payload) => {
    let temp = {
      loading: true,
      name: [""],
      data: [],
      xLabels: []
    };
    if(payload.length == 0) return {...state, industryTop: temp};
    temp.data[0] = [];
    payload.forEach((item, index) => {
      temp.data[0].push(item.value);
      temp.xLabels.push(item.name);
    })
    return {...state, industryTop: temp};
  },
 }, InitialState);
 export default reducer;