import {createReducer} from 'redux-act';
import {overviewAction, overviewUiAction} from '../action/action';
import {initial} from '../constants';
const overviewReducer = createReducer({
  [overviewAction["getFirstCom"]]: (state, payload) => {
    return {...state, firstComData: payload, loaded: true};
  },
  [overviewAction["getSecondCom"]]: (state, payload) => {
    return {...state, secondComData: payload};
  },
  [overviewAction["getThirdCom"]]: (state, payload) => {
    return {...state, thirdComData: payload};
  },
  [overviewAction["getFirst"]]: (state, payload) => {
    return {...state, firstData: payload};
  },
  [overviewAction["getSecond"]]: (state, payload) => {
    return {...state, secondData: payload};
  },
  [overviewAction["getThird"]]: (state, payload) => {
    return {...state, thirdData: payload};
  },
  [overviewAction["getForth"]]: (state, payload) => {
    return {...state, forthData: payload};
  },
  [overviewAction["getFifth"]]: (state, payload) => {
    return {...state, fifthData: payload};
  },
  [overviewAction["overviewBar"]]: (state, payload) => {
    payload.loading = true;
    return {...state, monthBarData: payload};
  },
  [overviewAction["overviewTable"]]: (state, payload) => {
    let temp = {
        data: [],
        loading: true
    };
    if(JSON.stringify(payload) != '{}'){
      temp = {
        data: payload,
        loading: true
      };
    } 
    return {...state, detailTableData: temp};
  },
  [overviewUiAction["oselectType"]]: (state, payload) => {
    return {...state, selectedTypeId: payload};
  },
  [overviewUiAction["selectFirstCom"]]: (state, payload) => {
    return {...state, firstComId: payload};
  },
  [overviewUiAction["selectSecondCom"]]: (state, payload) => {
    return {...state, secondComId: payload};
  },
  [overviewUiAction["selectThirdCom"]]: (state, payload) => {
    return {...state, thirdComId: payload};
  },
  [overviewUiAction["selectFirst"]]: (state, payload) => {
    return {...state, firstOrgId: payload};
  },
  [overviewUiAction["selectSecond"]]: (state, payload) => {
    return {...state, secondOrgId: payload};
  },
  [overviewUiAction["selectThird"]]: (state, payload) => {
    return {...state, thirdOrgId: payload};
  },
  [overviewUiAction["selectForth"]]: (state, payload) => {
    return {...state, forthOrgId: payload};
  },
  [overviewUiAction["selectFifth"]]: (state, payload) => {
    return {...state, fifthOrgId: payload};
  },
}, initial.overview);
export default overviewReducer;