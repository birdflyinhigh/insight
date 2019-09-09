import {createReducer} from 'redux-act';
import {manageAction, manageUiAction} from '../action/action';
import {initial} from '../constants';
const manageReducer = createReducer({
  [manageAction["getFirstCom"]]: (state, payload) => {
    return {...state, firstComData: payload, loaded: true};
  },
  [manageAction["getSecondCom"]]: (state, payload) => {
    return {...state, secondComData: payload};
  },
  [manageAction["getThirdCom"]]: (state, payload) => {
    return {...state, thirdComData: payload};
  },
  [manageAction["getFirst"]]: (state, payload) => {
    return {...state, firstData: payload};
  },
  [manageAction["getSecond"]]: (state, payload) => {
    return {...state, secondData: payload};
  },
  [manageAction["getThird"]]: (state, payload) => {
    return {...state, thirdData: payload};
  },
  [manageAction["getForth"]]: (state, payload) => {
    return {...state, forthData: payload};
  },
  [manageAction["getFifth"]]: (state, payload) => {
    return {...state, fifthData: payload};
  },
  [manageAction["manageway"]]: (state, payload) => {
    return {...state, managewayData: payload};
  },
  [manageAction["manageBar"]]: (state, payload) => {
    if(JSON.stringify(payload)  != "{}"){
      payload.loading = true;
      return {...state, manageBarData: payload};
    }else{
      let temp = {
        data: [],
        loading: true
      }
      return {...state, manageBarData: temp};
    }
  },
  [manageAction["manageTable"]]: (state, payload) => {
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
  [manageUiAction["mselectType"]]: (state, payload) => {
    return {...state, selectedTypeId: payload};
  },
  [manageUiAction["selectFirstCom"]]: (state, payload) => {
    return {...state, firstComId: payload};
  },
  [manageUiAction["selectSecondCom"]]: (state, payload) => {
    return {...state, secondComId: payload};
  },
  [manageUiAction["selectThirdCom"]]: (state, payload) => {
    return {...state, thirdComId: payload};
  },
  [manageUiAction["selectFirst"]]: (state, payload) => {
    return {...state, firstOrgId: payload};
  },
  [manageUiAction["selectSecond"]]: (state, payload) => {
    return {...state, secondOrgId: payload};
  },
  [manageUiAction["selectThird"]]: (state, payload) => {
    return {...state, thirdOrgId: payload};
  },
  [manageUiAction["selectForth"]]: (state, payload) => {
    return {...state, forthOrgId: payload};
  },
  [manageUiAction["selectFifth"]]: (state, payload) => {
    return {...state, fifthOrgId: payload};
  },
  [manageUiAction["mselectManage"]]: (state, payload) => {
    return {...state, selectManageId: payload};
  }
}, initial.manage);
export default manageReducer;
