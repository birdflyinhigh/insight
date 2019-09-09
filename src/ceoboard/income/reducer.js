import {XhrAct} from './action';
import {createReducer} from 'redux-act';
import {InitialState} from './constant';
const reducer = createReducer({
  [XhrAct["incomeTab"]]: (state, payload) => {
    console.log(payload)
    return {
      ...state,
      incomeTab: payload
    };
  },
  [XhrAct["incomeTrend"]]: (state, payload) => {
    payload.loading = true;
    return {
      ...state,
      incomeTrend: payload
    };
  },
  [XhrAct["incomeType"]]: (state, payload) => {
    let temp = {
      loading: true,
      data: [],
      name: ["area"]
    };
    temp.data = payload.map((item) => ({
      name: item.type1_name,
      value: item.value
    }));
    return {
      ...state,
      incomeType: temp
    };
  },
  [XhrAct["areaStatus"]]: (state, payload) => {
    payload.loading = true;
    return {
      ...state,
      areaStatus: payload
    };
  },
  [XhrAct["incomeRank"]]: (state, payload) => {
    return {
      ...state,
      incomeRank:payload
    };
  }
}, InitialState);
export default reducer;