import {createReducer} from 'redux-act';
import {providerAction, providerUiAction} from '../action/action';
import {initial} from '../constants';
const providerReducer = createReducer({
  [providerAction["getFirstCom"]]: (state, payload) => {
    return {...state, firstComData: payload, loaded: true};
  },
  [providerAction["getSecondCom"]]: (state, payload) => {
    return {...state, secondComData: payload};
  },
  [providerAction["getThirdCom"]]: (state, payload) => {
    return {...state, thirdComData: payload};
  },
  [providerAction["getThirdCom"]]: (state, payload) => {
    return {...state, thirdComData: payload};
  },
  [providerAction["getFirst"]]: (state, payload) => {
    return {...state, firstData: payload};
  },
  [providerAction["getSecond"]]: (state, payload) => {
    return {...state, secondData: payload};
  },
  [providerAction["getThird"]]: (state, payload) => {
    return {...state, thirdData: payload};
  },
  [providerAction["getForth"]]: (state, payload) => {
    return {...state, forthData: payload};
  },
  [providerAction["getFifth"]]: (state, payload) => {
    return {...state, fifthData: payload};
  },
  [providerAction["providers"]]: (state, payload) => {
    return {...state, providersData: payload};
  },
  [providerAction["allproTrade"]]: (state, payload) => {
    let temp = {
      data: [],
      loading: true
    };
    if (JSON.stringify(payload) != "{}") {
      payload.rank = [];
      for (let i = 0; i < payload.providerID.length; i++) {
        payload.rank.push(i + 1);
      }
      temp.data = payload;
      return { ...state, allOrderProData: temp };
    } else {
      return { ...state, allOrderProData: temp };
    }
  },
  [providerAction["oneProvider"]]: (state, payload) => {
    let temp = {
      data: [],
      loading: true
    };
    if(JSON.stringify(payload) != "{}"){
      temp.data = payload;
      return {...state, providerTableData: temp};
    }else{
      return {...state, providerTableData: temp};
    }  
  },
  [providerUiAction["pselectType"]]: (state, payload) => {
    return {...state, selectedTypeId: payload};
  },
  [providerUiAction["selectFirstCom"]]: (state, payload) => {
    return {...state, firstComId: payload};
  },
  [providerUiAction["selectSecondCom"]]: (state, payload) => {
    return {...state, secondComId: payload};
  },
  [providerUiAction["selectThirdCom"]]: (state, payload) => {
    return {...state, thirdComId: payload};
  },
  [providerUiAction["selectFirst"]]: (state, payload) => {
    return {...state, firstOrgId: payload};
  },
  [providerUiAction["selectSecond"]]: (state, payload) => {
    return {...state, secondOrgId: payload};
  },
  [providerUiAction["selectThird"]]: (state, payload) => {
    return {...state, thirdOrgId: payload};
  },
  [providerUiAction["selectForth"]]: (state, payload) => {
    return {...state, forthOrgId: payload};
  },
  [providerUiAction["selectFifth"]]: (state, payload) => {
    return {...state, fifthOrgId: payload};
  },
  [providerUiAction["pselectProvider"]]: (state, payload) => {
    return {...state, selectedProviderId: payload};
  },
}, initial.provider);
export default providerReducer;