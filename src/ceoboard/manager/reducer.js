import { createReducer } from 'redux-act';
import { InitialState } from './constant';
import { XhrAct } from './action';

const reducer = createReducer({
  [XhrAct["mtopCard"]]: (state, payload) => {
    return { ...state, mtopCard: payload }
  },
  [XhrAct["sales"]]: (state, payload) => {
    payload.loading = true;
    return { ...state, sales: payload ,salesAll: payload.sum.toFixed(2)}
  },
  [XhrAct["profit"]]: (state, payload) => {
    payload.loading = true;
    return { ...state, profit: payload ,profitAll: payload.sum.toFixed(2)}
  },
  [XhrAct["refound"]]: (state, payload) => {
    payload.loading = true;
    return { ...state, refound: payload ,refoundAll: payload.sum.toFixed(2)}
  },
  [XhrAct["salesTrend"]]: (state, payload) => {
    payload.loading = true;
    return { ...state, salesTrend: payload }
  },
  [XhrAct["profitTrend"]]: (state, payload) => {
    payload.loading = true;
    return { ...state, profitTrend: payload }
  },
  [XhrAct["refoundTrend"]]: (state, payload) => {
    payload.loading = true;
    return { ...state, refoundTrend: payload }
  },
}, InitialState);
export default reducer;