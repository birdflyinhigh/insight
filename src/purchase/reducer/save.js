import {createReducer} from 'redux-act';
import {saveAction, saveUiAction} from '../action/action';
import {initial} from '../constants';
const saveReducer = createReducer({
  [saveAction["getFirstCom"]]: (state, payload) => {
    return {...state, firstComData: payload, loaded: true};
  },
  [saveAction["getSecondCom"]]: (state, payload) => {
    return {...state, secondComData: payload};
  },
  [saveAction["getThirdCom"]]: (state, payload) => {
    return {...state, thirdComData: payload};
  },
  [saveAction["getFirst"]]: (state, payload) => {
    return {...state, firstData: payload};
  },
  [saveAction["getSecond"]]: (state, payload) => {
    return {...state, secondData: payload};
  },
  [saveAction["getThird"]]: (state, payload) => {
    return {...state, thirdData: payload};
  },
  [saveAction["getForth"]]: (state, payload) => {
    return {...state, forthData: payload};
  },
  [saveAction["getFifth"]]: (state, payload) => {
    return {...state, fifthData: payload};
  },
  [saveAction["saveBar"]]: (state, payload) => {
   let temp = {
      data: [],
      loading: true
    };
    if(JSON.stringify(payload) != "{}"){
      temp.data = payload;
      return {...state, saveBarData: temp};
    }else{
      return {...state, saveBarData: temp};
    }  
  },
  [saveAction["saveFirstTable"]]: (state, payload) => {
    let temp = {
      data: [],
      loading: true
    };
    if(JSON.stringify(payload) != "{}"){
      temp.data = payload;
      return {...state, firstTableData: temp};
    }else{
      return {...state, firstTableData: temp};
    }  
  },
  [saveUiAction["sselectType"]]: (state, payload) => {
    return {...state, selectedTypeId: payload};
  },
  [saveUiAction["selectFirstCom"]]: (state, payload) => {
    return {...state, firstComId: payload};
  },
  [saveUiAction["selectSecondCom"]]: (state, payload) => {
    return {...state, secondComId: payload};
  },
  [saveUiAction["selectThirdCom"]]: (state, payload) => {
    return {...state, thirdComId: payload};
  },
  [saveUiAction["selectFirst"]]: (state, payload) => {
    return {...state, firstOrgId: payload};
  },
  [saveUiAction["selectSecond"]]: (state, payload) => {
    return {...state, secondOrgId: payload};
  },
  [saveUiAction["selectThird"]]: (state, payload) => {
    return {...state, thirdOrgId: payload};
  },
  [saveUiAction["selectForth"]]: (state, payload) => {
    return {...state, forthOrgId: payload};
  },
  [saveUiAction["selectFifth"]]: (state, payload) => {
    return {...state, fifthOrgId: payload};
  },
}, initial.save);
export default saveReducer;
