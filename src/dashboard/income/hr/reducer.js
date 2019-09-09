import {createReducer} from 'redux-act';
import {InitialState} from './constant';
import {BaseXhrAct, BaseUiAct} from './action';
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
const baseReducer = createReducer({
  [BaseXhrAct["org1"]]: (state, payload) => {
    return {...state, org1: payload};
  },
  [BaseXhrAct["org2"]]: (state, payload) => {
    return {...state, org2: payload};
  },
  [BaseXhrAct["org3"]]: (state, payload) => {
    return {...state, org3: payload};
  },
  [BaseXhrAct["org4"]]: (state, payload) => {
    return {...state, org4: payload};
  },
  [BaseXhrAct["staffNumber"]]: (state, payload) => {
    return {...state, allPerson: payload.staffNum};
  },
  [BaseXhrAct["keyPositionRate"]]: (state, payload) => {
    return {...state, workRate: payload.keyJobRate};
  },
  [BaseXhrAct["leaveRate"]]: (state, payload) => {
    return {...state, leaveRate: payload.quitRate};
  },
  [BaseXhrAct["avgAge"]]: (state, payload) => {
    return {...state, avgAge: payload.avgAge};
  },
  [BaseXhrAct["mF"]]: (state, payload) => {
    return {...state, mF: payload.sexRatio};
  },
  [BaseXhrAct["btrend"]]: (state, payload) => {
    let temp = {...payload};
    temp.loading = true;
    temp.name = payload.name.slice(1);
    temp.data = payload.data.slice(1);
    temp.total = payload.data[0];
    temp.markPoint = [];
    // payload.name = ["人员规模"];
    // payload.markPoint = payload.warnValue ? [{
    //   name: "警告",
    //   yAxis: payload.warnValue 
    // }] : [];
    return {...state, monthPerson: temp};
  },
  [BaseXhrAct["staffAge"]]: (state, payload) => {
    let temp = {};
    temp.loading = true;
    temp.name = ["人数"];
    temp.data = payload;
    return {...state, staffAge: temp};
  },
  [BaseXhrAct["level"]]: (state, payload) => {
    payload.loading = true;
    payload.name = ["人数"];
    payload.markLabel = [payload.label.po0to4, payload.label.po5to10, payload.label.po11to19];
    return {...state, level: payload};
  },
  [BaseXhrAct["kind"]]: (state, payload) => {
    payload.loading = true;
    if(JSON.stringify(payload.data) == "[[]]"){
      let temp = {
        data: [],
        loading: true
      }
      return {...state, kind: temp}
    }
    payload.name = ["人数"];
    return {...state, kind: payload};
  },
  [BaseXhrAct["leaveReason"]]: (state, payload) => {
    payload.loading = true;
    payload.data = [payload.data];
    payload.xLabels = payload.name;
    return {...state, leaveReason: payload};
  },
  [BaseXhrAct["leaveRateChart"]]: (state, payload) => {
    payload.loading = true;
    payload.name = ["离职率"];
    return {...state, leaveRateChart: payload};
  },
  [BaseXhrAct["leaveRate90Z9"]]: (state, payload) => {
    payload.loading = true;
    payload.markPoint = payload.warnValue ? [{
      name: "警告",
      yAxis: payload.warnValue 
    }] : [];
    return {...state, leaveRate90Z9: payload};
  },
  [BaseXhrAct["perProCost"]]: (state, payload) => {
    payload.loading = true;
    return {...state, leaveAge: payload};
  },
  [BaseXhrAct["secKind"]]: (state, payload) => {
    payload.loading = true;
    if(JSON.stringify(payload.data) == "[[]]"){
      let temp = {
        data: [],
        loading: true
      }
      return {...state, secKind: temp}
    }
    payload.data = [payload.data];
    payload.name = ["人数"];
    return {...state, secKind: payload};
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
export default baseReducer;