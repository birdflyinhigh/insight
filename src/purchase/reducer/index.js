import {createReducer} from 'redux-act';
import {indexAction, indexUiAction} from '../action/action';
import {initial} from '../constants';
//index, overview, rate, save, manage, provider, urgent
const indexReducer = createReducer({
  [indexAction["getFirstCom"]]: (state, payload) => {
    return {...state, firstComData: payload, loaded: true};
  },
  [indexAction["getSecondCom"]]: (state, payload) => {
    return {...state, secondComData: payload};
  },
  [indexAction["getThirdCom"]]: (state, payload) => {
    return {...state, thirdComData: payload};
  },
  [indexAction["getFirst"]]: (state, payload) => {
    return {...state, firstData: payload};
  },
  [indexAction["getSecond"]]: (state, payload) => {
    return {...state, secondData: payload};
  },
  [indexAction["getThird"]]: (state, payload) => {
    return {...state, thirdData: payload};
  },
  [indexAction["getForth"]]: (state, payload) => {
    return {...state, forthData: payload};
  },
  [indexAction["getFifth"]]: (state, payload) => {
    return {...state, fifthData: payload};
  },
  [indexAction["allProviderDetail"]]: (state, payload) => {
    let temp = {
      data: [],
      loading: true
    };
    if (JSON.stringify(payload) != '{}') {
      payload.rank = [];
      for (let i = 0; i < payload.providerID.length; i++) {
        payload.rank.push(i + 1);
      }
      temp.data = payload;
      return { ...state, allProData: temp };
    }else{
      return { ...state, allProData: payload };
    } 
  },
  [indexAction["overview"]]: (state, payload) => {
    payload.loading = true;
    return {...state, overviewData: payload};
  },
  [indexAction["rate"]]: (state, payload) => {
    let temp = {
      data: payload, 
      loading: true
    }
    return {...state, rateData: temp};
  },
  [indexAction["save"]]: (state, payload) => {
    if(JSON.stringify(payload)  != "[]"){
      payload.loading = true;
      return {...state, saveData: payload};
    }else{
      let temp = {
        data: payload,
        loading: true
      }
      return {...state, saveData: temp};
    }
  },
  [indexAction["manage"]]: (state, payload) => {
    let temp = {
        data: payload,
        loading: true
    }
    temp.data = payload;
    return {...state, manageData: temp};
  },
  [indexAction["allprovider"]]: (state, payload) => {
    return {...state, totalProvider: payload.total};
  },
  [indexAction["provider"]]: (state, payload) => {
    payload.loading = true;
    return {...state, providerData: payload};
  },
  [indexAction["urgent"]]: (state, payload) => {
    let temp = {
        data: payload,
        loading: true
    };
    temp.data = payload;
    return {...state, urgentData: temp};
  },
  [indexAction["project"]]: (state, payload) => {
    payload.loading = true;
    return {...state, projectData: payload};
  },
  [indexAction["examine"]]: (state, payload) => {
    payload.loading = true;
    return {...state, examineData: payload};
  },
  [indexUiAction["iselectType"]]: (state, payload) => {
    return {...state, selectedTypeId: payload};
  },
  [indexUiAction["selectFirstCom"]]: (state, payload) => {
    return {...state, firstComId: payload};
  },
  [indexUiAction["selectSecondCom"]]: (state, payload) => {
    return {...state, secondComId: payload};
  },
  [indexUiAction["selectThirdCom"]]: (state, payload) => {
    return {...state, thirdComId: payload};
  },
  [indexUiAction["selectFirst"]]: (state, payload) => {
    return {...state, firstOrgId: payload};
  },
  [indexUiAction["selectSecond"]]: (state, payload) => {
    return {...state, secondOrgId: payload};
  },
  [indexUiAction["selectThird"]]: (state, payload) => {
    return {...state, thirdOrgId: payload};
  },
  [indexUiAction["selectForth"]]: (state, payload) => {
    return {...state, forthOrgId: payload};
  },
  [indexUiAction["selectFifth"]]: (state, payload) => {
    return {...state, fifthOrgId: payload};
  },
  [indexUiAction["chooseLevel"]]: (state, payload) => {
    return {...state, choosedLevel: payload};
  },
}, initial.index);
export default indexReducer;
