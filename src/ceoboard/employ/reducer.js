import {createReducer} from 'redux-act';
import { InitialState } from './constant';
import {XhrAct} from './action';

const reducer = createReducer({
  [XhrAct["basisInfo"]]: (state, payload) => {
    return {...state, basisInfo: payload};
  },
  [XhrAct["employNumTrend"]]: (state, payload) => {
    payload.loading = true;
    return {...state, employNumTrend: payload};
  },
  [XhrAct["employArea"]]: (state, payload) => {
    let temp = {
      data: [],
      xLable: [],
      name: [],
      loading: true
    };
    temp.data = payload.list;
    return {...state, 
      employArea: temp,
      employAreaAll: payload.all
    };
  },
  [XhrAct["employProduct"]]: (state, payload) => {
    let temp = {
      data: [],
      xLable: [],
      name: [],
      loading: true
    };
    temp.data = payload.list;
    return {...state, 
      employProduct: temp,
      employProductAll: payload.all
    };
  },
  [XhrAct["employTop"]]: (state, payload) => {
    return {...state, employTop: payload};
  },
}, InitialState);
export default reducer;