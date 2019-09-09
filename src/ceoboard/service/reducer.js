import {createReducer} from 'redux-act';
import { InitialState } from './constant';
import {XhrAct} from './action';
const reducer = createReducer({
  [XhrAct["basicInfo"]]: (state, payload) => {
    return {...state, basicInfo: payload};
  },
  [XhrAct["incomeService"]]: (state, payload) => {
    return {...state, incomeService: payload};
  },
  [XhrAct["newShop"]]: (state, payload) => {
    let temp = {
      data: [],
      xLable: [],
      name: [],
      loading: true
    };
    temp.data = payload.list;
    return {...state, newShop: temp, newShopAll: payload.all};
  },
  [XhrAct["keyService"]]: (state, payload) => {
    let temp = {
      data: [],
      xLable: [],
      name: [],
      loading: true
    };
    temp.data = payload.list;
    return {...state, keyService: temp, keyServiceAll: payload.all};
  },
  [XhrAct["serviceVIP"]]: (state, payload) => {
    let temp = {
      data: [],
      xLable: [],
      name: [],
      loading: true
    };
    temp.data = payload.list;
    return {...state, serviceVIP: temp, serviceVIPAll: payload.all};
  },
  [XhrAct["serviceAmountTop"]]: (state, payload) => {
    return {...state, serviceAmountTop: payload};
  },
}, InitialState);
export default reducer;