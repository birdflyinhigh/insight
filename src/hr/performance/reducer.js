import {createReducer} from 'redux-act';
import {InitialState} from './constant';
import {perManageXhrAct, perManageUiAct} from '../action';

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
function generateCirleArray(totalNum){
  let tempArray = (new Array(totalNum)).fill({
    x: 0,
    y: 0
  });
  return tempArray.map((item, index) => ({
    x: `${Math.floor(Math.random() * 100)}%`,
    y: `${Math.floor(Math.random() * 100)}%`
  })
  );
}
const hrperManageReducer = createReducer({
  [perManageXhrAct["org1"]]: (state, payload) => {
    return {...state, org1: payload};
  },
  [perManageXhrAct["org2"]]: (state, payload) => {
    return {...state, org2: payload};
  },
  [perManageXhrAct["org3"]]: (state, payload) => {
    return {...state, org3: payload};
  },
  [perManageXhrAct["org4"]]: (state, payload) => {
    return {...state, org4: payload};
  },
  [perManageXhrAct["exameTab"]]: (state, payload) => {
    let temp = {
      month: 0,
      season: 0
    };
    if(JSON.stringify(payload) != '{}'){
      temp = {
        month: payload.monthAssess,
        season: payload.quarterAssess
      }
    }
    return {...state, exameTab: temp};
  },
  [perManageXhrAct["joinExameTab"]]: (state, payload) => {
    let temp = {
      month: 0,
      season: 0
    };
    if(JSON.stringify(payload) != '{}'){
      temp = {
        month: payload.monthRate,
        season: payload.quarterRate
      }
    }
    return {...state, joinExameTab: temp};
  },
  [perManageXhrAct["indexCompleteTab"]]: (state, payload) => {
    let temp = payload.departmentRate + "" === 'undefined' ? 0 : payload.departmentRate;
    return {...state, indexCompleteTab: temp};
  },
  [perManageXhrAct["indexAvgCompleteTab"]]: (state, payload) => {
    let temp = payload.staffRate + "" === 'undefined' ? 0 : payload.staffRate;
    return {...state, indexAvgCompleteTab: temp};
  },
  [perManageXhrAct["staff"]]: (state, payload) => {
    payload.loading = true;
    return {...state, staff: payload};
  },
  [perManageXhrAct["quitStaff"]]: (state, payload) => {
    payload.loading = true;
    return {...state, quitStaff: payload};
  },
  [perManageXhrAct["nineBox"]]: (state, payload) => {
    for(let key in payload){
      payload[key] = generateCirleArray(payload[key]);
    }
    return {...state, nineBox: payload};
  },
  [perManageXhrAct["orgCompare"]]: (state, payload) => {
    let pageSize = 6;
    payload.loading = true;
    payload.data = payload.data.map((data1, index1) => 
      data1.map((item, index) => 
      ({
        specifiedId: payload.orgID[index],
        value: item
      })
      )
    );
    if(payload.data[0].length){
      let totalPage = Math.ceil(payload.data[0].length / pageSize);
      payload.totalArrPage = (new Array(totalPage)).fill("nonsense");
    }
    return {...state, orgCompare: dealChartPage(0, pageSize, payload), originCompare: JSON.parse(JSON.stringify(payload))};
  },
  [perManageXhrAct["orgQuitStaffCompare"]]: (state, payload) => {
    // let payload = {
    // "data": [[10,10,10,10,10,10],[10,10,10,10,10,10]],
    // "xLabels": ["区域线","集团线","行业线","中台线","非上市体系组织","市场线"],
    // "name": ["绩差离职人数","绩优离职人数"],
    // "orgID": ["100002","104001","104002","104004","104459","104866"],
    // };
    let pageSize = 6;
    payload.loading = true;
    payload.data = payload.data.map((data1, index1) => 
      data1.map((item, index) => 
      ({
        specifiedId: payload.orgID[index],
        value: item
      })
      )
    );
    if(payload.data[0].length){
      let totalPage = Math.ceil(payload.data[0].length / pageSize);
      payload.totalArrPage = (new Array(totalPage)).fill("nonsense");
    } 
    return {...state, orgQuitStaffCompare: dealChartPage(0, pageSize, payload), originQuiteStaffCompare: JSON.parse(JSON.stringify(payload))};
  },
  [perManageXhrAct["indexCompleteRate"]]: (state, payload) => {
    payload.loading = true;
    payload.xLabels = payload.xLabels.map((item) =>  {
      let temp = item.split('_');
      let tempString = temp[temp.length - 1] ? temp[temp.length - 1] : temp[0];
      return tempString.match(/.{1,2}/g).join('\n');
    });
    return {...state, indexCompleteRate: payload};
  },
  [perManageUiAct["selectOrg1"]]: (state, payload) => {
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
  [perManageUiAct["selectOrg2"]]: (state, payload) => {
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
  [perManageUiAct["selectOrg3"]]: (state, payload) => {
    return {
      ...state, 
      org3Id: payload,
      org4Id: "-1",
      org3Name: getOrgName(payload, state.org3),
      org4Name: "全部"
    }
  },
  [perManageUiAct["selectOrg4"]]: (state, payload) => {
    return {
      ...state,
      org4Id: payload, 
      org4Name: getOrgName(payload, state.org4)}
  },
  [perManageUiAct["selectMonth"]]: (state, payload) => {
    return {...state, monthId: payload}
  },
  [perManageUiAct["selectYear"]]: (state, payload) => {
    return {...state, yearId: payload}
  },
  [perManageUiAct["selectLevel"]]: (state, payload) => {
    return {...state, orgId: payload.orgId, orgLevel: payload.orgLevel}
  },
  [perManageUiAct["selectYTD"]]: (state, payload) => {
    return {...state, ytd: payload}
  },
  [perManageUiAct["nextStaffCompare"]]: (state, payload) => {
    let pageSize = 6;
    return {...state, orgCompare: dealChartPage(payload, pageSize, state.originCompare)};
  },
  [perManageUiAct["nextQuitStaffCompare"]]: (state, payload) => {
    let pageSize = 6;
    return {...state, orgQuitStaffCompare: dealChartPage(payload, pageSize, state.originQuiteStaffCompare)}
  }
}, InitialState);
export default hrperManageReducer;

function dealChartPage(startPage, pageSize, data){
  let startIndex = startPage * pageSize;
  let temp = {
    loading: true,
    data: [],
    name: data.name,
    xLabels: [],
    curPage: startPage,
    totalArrPage: data.totalArrPage
  };
  data.data.forEach((item, index) => {
    temp.data[index] = item.slice(startIndex, startIndex + pageSize); 
  });
  temp.xLabels = data.xLabels.slice(startIndex, startIndex + pageSize);
  return temp;
}