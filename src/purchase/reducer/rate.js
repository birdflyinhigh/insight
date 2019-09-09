import {createReducer} from 'redux-act';
import { rateAction, rateUiAction} from '../action/action';
import {initial} from '../constants';
const rateReducer = createReducer({
  [rateAction["getFirstCom"]]: (state, payload) => {
    return {...state, firstComData: payload, loaded: true};
  },
  [rateAction["getSecondCom"]]: (state, payload) => {
    return {...state, secondComData: payload};
  },
  [rateAction["getThirdCom"]]: (state, payload) => {
    return {...state, thirdComData: payload};
  },
  [rateAction["getFirst"]]: (state, payload) => {
    return {...state, firstData: payload};
  },
  [rateAction["getSecond"]]: (state, payload) => {
    return {...state, secondData: payload};
  },
  [rateAction["getThird"]]: (state, payload) => {
    return {...state, thirdData: payload};
  },
  [rateAction["getForth"]]: (state, payload) => {
    return {...state, forthData: payload};
  },
  [rateAction["getFifth"]]: (state, payload) => {
    return {...state, fifthData: payload};
  },
  [rateAction["category"]]: (state, payload) => {
    return {...state, categoryData: payload};
  },
  [rateAction["rateSecondTable"]]: (state, payload) => {
     let temp = {
      data: [],
      loading: true
    };
    if(JSON.stringify(payload) != "{}"){
      temp.data = payload;
      return {...state, secondTableData: temp};
    }else{
      return {...state, secondTableData: temp};
    }  
  },
  [rateAction["rateThirdTable"]]: (state, payload) => {
     let temp = {
      data: [],
      loading: true
    };
    if(JSON.stringify(payload) != "{}"){
      temp.data = payload;
      return {...state, thirdTableData: temp};
    }else{
      return {...state, thirdTableData: temp};
    }  
  },
  [rateUiAction["rselectType"]]: (state, payload) => {
    return {...state, selectedTypeId: payload};
  },
  [rateUiAction["selectFirstCom"]]: (state, payload) => {
    return {...state, firstComId: payload};
  },
  [rateUiAction["selectSecondCom"]]: (state, payload) => {
    return {...state, secondComId: payload};
  },
  [rateUiAction["selectThirdCom"]]: (state, payload) => {
    return {...state, thirdComId: payload};
  },
  [rateUiAction["selectFirst"]]: (state, payload) => {
    return {...state, firstOrgId: payload};
  },
  [rateUiAction["selectSecond"]]: (state, payload) => {
    return {...state, secondOrgId: payload};
  },
  [rateUiAction["selectThird"]]: (state, payload) => {
    return {...state, thirdOrgId: payload};
  },
  [rateUiAction["selectForth"]]: (state, payload) => {
    return {...state, forthOrgId: payload};
  },
  [rateUiAction["selectFifth"]]: (state, payload) => {
    return {...state, fifthOrgId: payload};
  },
  [rateUiAction["rselectCategory"]]: (state, payload) => {
    // console.log('payload', payload)
    return {...state, selectCategoryId: payload};
  }
}, initial.rate);
export default rateReducer;