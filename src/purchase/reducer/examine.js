import {createReducer} from 'redux-act';
import {examineAction, examineUiAction} from '../action/action';
import {initial} from '../constants';
const examineReducer = createReducer({
  [examineAction["getFirstCom"]]: (state, payload) => {
    return {...state, firstComData: payload, loaded: true};
  },
  [examineAction["getSecondCom"]]: (state, payload) => {
    return {...state, secondComData: payload};
  },
  [examineAction["getThirdCom"]]: (state, payload) => {
    return {...state, thirdComData: payload};
  },
  [examineAction["getFirst"]]: (state, payload) => {
    return {...state, firstData: payload};
  },
  [examineAction["getSecond"]]: (state, payload) => {
    return {...state, secondData: payload};
  },
  [examineAction["getThird"]]: (state, payload) => {
    return {...state, thirdData: payload};
  },
  [examineAction["getForth"]]: (state, payload) => {
    return {...state, forthData: payload};
  },
  [examineAction["getFifth"]]: (state, payload) => {
    return {...state, fifthData: payload};
  },
  [examineAction["examineBar"]]: (state, payload) => {
    payload.loading = true;
    return {...state, monthBarData: payload};
  },
  [examineAction["examineTable"]]: (state, payload) => {
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
  [examineUiAction["eselectType"]]: (state, payload) => {
    return {...state, selectedTypeId: payload};
  },
  [examineUiAction["selectFirstCom"]]: (state, payload) => {
    return {...state, firstComId: payload};
  },
  [examineUiAction["selectSecondCom"]]: (state, payload) => {
    return {...state, secondComId: payload};
  },
  [examineUiAction["selectThirdCom"]]: (state, payload) => {
    return {...state, thirdComId: payload};
  },
  [examineUiAction["selectFirst"]]: (state, payload) => {
    return {...state, firstOrgId: payload};
  },
  [examineUiAction["selectSecond"]]: (state, payload) => {
    return {...state, secondOrgId: payload};
  },
  [examineUiAction["selectThird"]]: (state, payload) => {
    return {...state, thirdOrgId: payload};
  },
  [examineUiAction["selectForth"]]: (state, payload) => {
    return {...state, forthOrgId: payload};
  },
  [examineUiAction["selectFifth"]]: (state, payload) => {
    return {...state, fifthOrgId: payload};
  },
}, initial.examine);
export default examineReducer;