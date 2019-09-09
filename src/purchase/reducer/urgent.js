import {createReducer} from 'redux-act';
import {urgentAction, urgentUiAction} from '../action/action';
import {initial} from '../constants';
const urgentReducer = createReducer({
  [urgentAction["getFirstCom"]]: (state, payload) => {
    return {...state, firstComData: payload, loaded: true};
  },
  [urgentAction["getSecondCom"]]: (state, payload) => {
    return {...state, secondComData: payload};
  },
  [urgentAction["getThirdCom"]]: (state, payload) => {
    return {...state, thirdComData: payload};
  },
  [urgentAction["getFirst"]]: (state, payload) => {
    return {...state, firstData: payload};
  },
  [urgentAction["getSecond"]]: (state, payload) => {
    return {...state, secondData: payload};
  },
  [urgentAction["getThird"]]: (state, payload) => {
    return {...state, thirdData: payload};
  },
  [urgentAction["getForth"]]: (state, payload) => {
    return {...state, forthData: payload};
  },
  [urgentAction["getFifth"]]: (state, payload) => {
    return {...state, fifthData: payload};
  },
  [urgentAction["urgentBar"]]: (state, payload) => {
    payload.loading = true;
    return {...state, urgentBarData: payload};
  },
  [urgentAction["urgentTable"]]: (state, payload) => {
    let temp = {
      data: [],
      loading: true
    };
    if(JSON.stringify(payload) != "{}"){
      temp.data = payload;
      return {...state, detailTableData: temp};
    }else{
      return {...state, detailTableData: temp};
    }  
  },
  [urgentUiAction["uselectType"]]: (state, payload) => {
    return {...state, selectedTypeId: payload};
  },
  [urgentUiAction["selectFirstCom"]]: (state, payload) => {
    return {...state, firstComId: payload};
  },
  [urgentUiAction["selectSecondCom"]]: (state, payload) => {
    return {...state, secondComId: payload};
  },
  [urgentUiAction["selectThirdCom"]]: (state, payload) => {
    return {...state, thirdComId: payload};
  },
  [urgentUiAction["selectFirst"]]: (state, payload) => {
    return {...state, firstOrgId: payload};
  },
  [urgentUiAction["selectSecond"]]: (state, payload) => {
    return {...state, secondOrgId: payload};
  },
  [urgentUiAction["selectThird"]]: (state, payload) => {
    return {...state, thirdOrgId: payload};
  },
  [urgentUiAction["selectForth"]]: (state, payload) => {
    return {...state, forthOrgId: payload};
  },
  [urgentUiAction["selectFifth"]]: (state, payload) => {
    return {...state, fifthOrgId: payload};
  },
}, initial.urgent);
export default urgentReducer;