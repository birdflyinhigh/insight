import { createReducer} from 'redux-act';
import {InitialState} from './constant';
import {XhrAct, UiAct} from './action';
const reducer = createReducer({
  [XhrAct["orderOverview"]]: (state, payload) => {
    const fixedDataKey = ["submit", "contract", "pay"]
    let newData = [];
    let tempArr = [0, 0, 0];
    let baseDiviser = 1;
    newData = fixedDataKey.map((item) => ({
      key: item,
      value: payload[item]
    }));
    baseDiviser = Math.max(payload.submit, payload.contract, payload.pay);
    if (baseDiviser) {
      tempArr = [ (newData[0].value / baseDiviser) * 0.8 .toFixed(2) * 100,
        (newData[1].value / baseDiviser) * 0.8 .toFixed(2) * 100,
        (newData[2].value / baseDiviser) * 0.8 .toFixed(2) * 100
      ]
    }
    payload.width = tempArr;
    payload.orderedData = newData;
    return {
      ...state,
      orderOverview: payload
    }
  },
  [XhrAct["orderDistribute"]]: (state, payload) => {
    let temp = {
      data: [],
      xLable: [],
      name: [],
      loading: true
    };
    temp.data = payload.list;
    return {
      ...state,
      orderDistribute: temp,
      distributeAll: payload.all
    }
  },
  [XhrAct["orderStatus"]]: (state, payload) => {
    let temp = {
      data: [],
      xLable: [],
      name: [],
      loading: true
    };
    temp.data = payload.list;
    return {
      ...state,
      orderStatus: temp,
      assignAll: payload.all
    }
  },
  [XhrAct["orderTrend"]]: (state, payload) => {
    payload.loading = true;
    return {
      ...state,
      orderTrend: payload
    }
  },
  [XhrAct["orderIndexRank"]]: (state, payload) => {
    payload.loading = true;
    return {
      ...state,
      orderIndexRank: payload
    }
  }
}, InitialState);
export default reducer;