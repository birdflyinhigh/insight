import {createReducer} from 'redux-act';
import {InitialState} from './constant';
import {NOIXhrAct} from './action';
const reducer = createReducer({
  [NOIXhrAct["proEtrend"]]: (state, payload) => {
    payload.loading = true;
    return {...state, proEtrend: payload};
  },
  [NOIXhrAct["proErate"]]: (state, payload) => {
    let temp = {
      loading: true,
      name: ["erate"],
      data: []
    }
    temp.data = payload;
    return {...state, proErate: temp};
  },
  [NOIXhrAct["areaEtrend"]]: (state, payload) => {
    payload.loading = true;
    return {...state, areaEtrend: payload};
  },
  [NOIXhrAct["areaErate"]]: (state, payload) => {
    let temp = {
      loading: true,
      name: ["erate"],
      data: []
    }
    temp.data = payload;
    return {...state, areaErate: temp};
  },
  [NOIXhrAct["areaETop"]]: (state, payload) => {
    let temp = {
      loading: true,
      name: [""],
      data: [],
      xLabels: [],
      percent: []
    };
    if(payload.length == 0) return {...state, areaETop: temp};
    temp.data[0] = [];
    payload.forEach((item, index) => {
      temp["data"][0].push(item.value);
      temp["xLabels"].push(item.name);
      temp["percent"].push(`${item.rate}%`);
    });
    return {...state, areaETop: temp};
  },
  [NOIXhrAct["industryEtrend"]]: (state, payload) => {
    payload.loading = true;
    return {...state, industryEtrend: payload};
  },
  [NOIXhrAct["industryEtop"]]: (state, payload) => {
    let temp = {
      loading: true,
      name: [""],
      data: []
    }
    temp.data = payload;
    return {...state, industryEtop: temp};
  }
}, InitialState);
export default reducer;