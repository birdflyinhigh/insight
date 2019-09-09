import {createReducer} from 'redux-act';
import {XhrAct, BaseUiAct} from './action';
import { InitialState } from './constant';
function getOrgName(id, data){
  let name = "全部";
  for(let i = 0; i < data.length; i++){
    if(data[i].orgID == id){
      name = data[i].orgName;
      break;
    }
  }
  return name;
}
const reducer =  createReducer({
  [XhrAct["org1"]]: (state, payload) => {
    return {...state, org1: payload};
  },
  [XhrAct["org2"]]: (state, payload) => {
    return {...state, org2: payload};
  },
  [XhrAct["org3"]]: (state, payload) => {
    return {...state, org3: payload};
  },
  [XhrAct["org4"]]: (state, payload) => {
    return {...state, org4: payload};
  },
  [XhrAct["staffCons"]]: (state, payload) => {
    if(JSON.stringify(payload) == "{}"){
      return {
        ...state,
        staffAge: [], 
        staffLevel: [],
        allStaff: 0,
        staffKind: []
      }
    }
    return {...state, 
      staffAge: payload.companyAge, 
      staffLevel: payload.position,
      allStaff: payload.staffNum,
      staffKind: payload.jobFunction
    }
  },
  [XhrAct["staffTrend"]]: (state, payload) => {
    payload.name = payload.name.slice(1, 3);
    payload.data = payload.data.slice(1, 3);
    payload.loading = true;
    return {...state, staffTrend: payload}
  },
  [XhrAct["perProductCost"]]: (state, payload) => {
    payload.loading = true;
    return {...state, perProductCost: payload}
  },
  [XhrAct["leaveRate"]]: (state, payload) => {
    payload.loading = true;
    payload.name = ["离职率"];
    return {...state, leaveRate: payload}
  },
  [BaseUiAct["selectOrg1"]]: (state, payload) => {
    return {
      ...state, 
      org1Id: payload,
      org2Id: "-1",
      org3Id: "-1",
      org4Id: "-1",
      org1Name: getOrgName(state.org1, payload),
      org2Name: "全部",
      org3Name: "全部",
      org4Name: "全部"
    }
  },
  [BaseUiAct["selectOrg2"]]: (state, payload) => {
    return {
      ...state,
      org2Id: payload,
      org3Id: "-1",
      org4Id: "-1",
      org2Name: getOrgName(payload, state.org2),
      org3Name: "全部",
      org4Name: "全部"
    }
  },
  [BaseUiAct["selectOrg3"]]: (state, payload) => {
    return {
      ...state, 
      org3Id: payload,
      org4Id: "-1",
      org3Name: getOrgName(payload, state.org3),
      org4Name: "全部"
    }
  },
  [BaseUiAct["selectOrg4"]]: (state, payload) => {
    return {
      ...state,
      org4Id: payload, 
      org4Name: getOrgName(payload, state.org4)}
  },
  [BaseUiAct["selectMonth"]]: (state, payload) => {
    return {...state, monthId: payload}
  },
  [BaseUiAct["selectYear"]]: (state, payload) => {
    return {...state, yearId: payload}
  },
  [BaseUiAct["selectLevel"]]: (state, payload) => {
    return {...state, orgId: payload.orgId, orgLevel: payload.orgLevel}
  }
}, InitialState);
export default reducer;