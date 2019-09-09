import {createReducer} from 'redux-act';
import {projectAction, projectUiAction} from '../action/action';
import {initial} from '../constants';
const projectReducer = createReducer({
  [projectAction["getFirstCom"]]: (state, payload) => {
    return {...state, firstComData: payload, loaded: true};
  },
  [projectAction["getSecondCom"]]: (state, payload) => {
    return {...state, secondComData: payload};
  },
  [projectAction["getThirdCom"]]: (state, payload) => {
    return {...state, thirdComData: payload};
  },
  [projectAction["getFirst"]]: (state, payload) => {
    return {...state, firstData: payload};
  },
  [projectAction["getSecond"]]: (state, payload) => {
    return {...state, secondData: payload};
  },
  [projectAction["getThird"]]: (state, payload) => {
    return {...state, thirdData: payload};
  },
  [projectAction["getForth"]]: (state, payload) => {
    return {...state, forthData: payload};
  },
  [projectAction["getFifth"]]: (state, payload) => {
    return {...state, fifthData: payload};
  },
  [projectAction["projectBar"]]: (state, payload) => {
    payload.loading = true;
    return {...state, projectBarData: payload};
  },
  [projectAction["projectTable"]]: (state, payload) => {
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
  [projectUiAction["prselectType"]]: (state, payload) => {
    return {...state, selectedTypeId: payload};
  },
  [projectUiAction["selectFirstCom"]]: (state, payload) => {
    return {...state, firstComId: payload};
  },
  [projectUiAction["selectSecondCom"]]: (state, payload) => {
    return {...state, secondComId: payload};
  },
  [projectUiAction["selectThirdCom"]]: (state, payload) => {
    return {...state, thirdComId: payload};
  },
  [projectUiAction["selectFirst"]]: (state, payload) => {
    return {...state, firstOrgId: payload};
  },
  [projectUiAction["selectSecond"]]: (state, payload) => {
    return {...state, secondOrgId: payload};
  },
  [projectUiAction["selectThird"]]: (state, payload) => {
    return {...state, thirdOrgId: payload};
  },
  [projectUiAction["selectForth"]]: (state, payload) => {
    return {...state, forthOrgId: payload};
  },
  [projectUiAction["selectFifth"]]: (state, payload) => {
    return {...state, fifthOrgId: payload};
  },
}, initial.project);
export default projectReducer;