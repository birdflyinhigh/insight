import {createReducer} from 'redux-act';
import {InitialState} from './constant';
import {CusRateXhrAct, CusRateUiAct} from './action';
const creducer = createReducer({
  [CusRateXhrAct["getCusRateTrend"]]: (state, payload) => {
    payload.hasLoaded = true;
    return {...state, flowData: payload}
  },
  [CusRateUiAct["getData"]]: (state, payload) => {
    return {...state, flowData: {hasLoaded: false}}
  },
  [CusRateUiAct["selectUserType"]]: (state, payload) => {
    return {...state, userTypeId: payload}
  }
 }, InitialState);
 export default creducer;