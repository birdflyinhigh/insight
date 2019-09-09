import {createReducer} from 'redux-act';
import {fundDataXhrAction} from '../action';
import {InitialState} from './constant';
const fundReducer = createReducer({
  [fundDataXhrAction["totalData"]]: (state, payload) => {
    console.log("totalData", payload)
    return {...state, totalData: payload};
  },
  [fundDataXhrAction["marketData"]]: (state, payload) => {
    console.log("marketData", payload)
    return {...state, marketData: payload};
  },
  [fundDataXhrAction["unmarketData"]]: (state, payload) => {
    console.log("unmarketData", payload)
    return {...state, unmarketData: payload};
  },
  [fundDataXhrAction["marketYearDetail"]]: (state, payload) => {
    let maxLength = state.maxMarketLength < payload.length ? payload.length : state.maxMarketLength;
    return {...state, marketYearDetail: payload, maxMarketLength: maxLength};
  },
  [fundDataXhrAction["marketIncomeDetail"]]: (state, payload) => {
    let maxLength = state.maxMarketLength < payload.length ? payload.length : state.maxMarketLength;
    return {...state, marketIncomeDetail: payload, maxMarketLength: maxLength};
  },
  [fundDataXhrAction["marketPayDetail"]]: (state, payload) => {
    let maxLength = state.maxMarketLength < payload.length ? payload.length : state.maxMarketLength;
    return {...state, marketPayDetail: payload, maxMarketLength: maxLength};
  },
  [fundDataXhrAction["marketMonthRestDetail"]]: (state, payload) => {
    let maxLength = state.maxMarketLength < payload.length ? payload.length : state.maxMarketLength;
    return {...state, marketMonthRestDetail: payload, maxMarketLength: maxLength};
  },
  [fundDataXhrAction["yearDetail"]]: (state, payload) => {
    let maxLength = state.maxUnmarketLength < payload.length ? payload.length : state.maxUnmarketLength;
    return {...state, yearDetail: payload, maxUnmarketLength: maxLength};
  },
  [fundDataXhrAction["incomeDetail"]]: (state, payload) => {
    let maxLength = state.maxUnmarketLength < payload.length ? payload.length : state.maxUnmarketLength;
    return {...state, incomeDetail: payload, maxUnmarketLength: maxLength};
  },
  [fundDataXhrAction["payDetail"]]: (state, payload) => {
    let maxLength = state.maxUnmarketLength < payload.length ? payload.length : state.maxUnmarketLength;
    return {...state, payDetail: payload, maxUnmarketLength: maxLength};
  },
  [fundDataXhrAction["monthRestDetail"]]: (state, payload) => {
    let maxLength = state.maxUnmarketLength < payload.length ? payload.length : state.maxUnmarketLength;
    return {...state, monthRestDetail: payload, maxUnmarketLength: maxLength};
  }
}, InitialState);
export default fundReducer;