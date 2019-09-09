import {createReducer} from 'redux-act';
import {InitialState} from './constant';
import {DashManageUiAct,
	DashMIncomeXhrAct, 
	DashMCostXhrAct,
	DashMProfitXhrAct, 
	CommonManageAct
} from './action';
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
const DashManageReducer = createReducer({
  [CommonManageAct["org1"]]: (state, payload) => {
    return {...state, org1: payload};
  },
  [CommonManageAct["org2"]]: (state, payload) => {
    return {...state, org2: payload};
  },
  [CommonManageAct["org3"]]: (state, payload) => {
    return {...state, org3: payload};
  },
  [CommonManageAct["org4"]]: (state, payload) => {
    return {...state, org4: payload};
  },
  [CommonManageAct["incomePanel"]]: (state, payload) => {
    return {...state, incomePanel: payload};
  },
  [CommonManageAct["costPanel"]]: (state, payload) => {
    return {...state, costPanel: payload};
  },
  [CommonManageAct["profitPanel"]]: (state, payload) => {
    return {...state, profitPanel: payload};
  },
  [DashMIncomeXhrAct["incomeTrend"]]: (state, payload) => {
    payload.loading = true;
    payload.name = ["收入"];
    payload.xLabels = payload.xLabels.map((item, index) => item + "月")
    return {...state, incomeTrend: payload};
  },
  [DashMIncomeXhrAct["incomeConstruct"]]: (state, payload) => {
    let temp = {};
    temp.loading = true;
    temp.name = ["cons"];
    temp.data = payload.map((item, index) => {
      return {
        name: item.name,
        value: item.value
      }
    });
    return {...state, incomeConstruct: temp};
  },
  [DashMIncomeXhrAct["incomeSubjectCons"]]: (state, payload) => {
    let temp = {
      name: ["金额"],
      loading: true,
      xLabels: [],
      data: [],
      percent: []
    };
    if(payload.data.length == 0){
      return {...state, incomeSubjectCons: temp};
    }
    temp.data[0] = [];
    payload.data.forEach((item, index) => {
      temp.xLabels.push(item.xName);
      temp.data[0].push(item.accNum);
      temp.percent.push(`${item.rate}%`);
    })
    return {...state, incomeSubjectCons: temp};
  },
  [DashMIncomeXhrAct["incomeSubjectTrend"]]: (state, payload) => {
    payload.loading = true;
    payload.name = payload.name.map((item, index) => item.name);
    return {...state, incomeSubjectTrend: payload};
  },
  [DashMCostXhrAct["costTrend"]]: (state, payload) => {
    payload.loading = true;
    payload.name = ["成本"];
    payload.xLabels = payload.xLabels.map((item, index) => item + "月")
    return {...state, costTrend: payload};
  },
  [DashMCostXhrAct["costConstruct"]]: (state, payload) => {
    let temp = {};
    temp.loading = true;
    temp.name = ["利润"];
    temp.data = payload.map((item, index) => {
      return {
        name: item.name,
        value: item.value
      }
    });
    return {...state, costConstruct: temp};
  },
  [DashMCostXhrAct["costSubjectCons"]]: (state, payload) => {
    let temp = {
      name: ["金额"],
      loading: true,
      data: [],
      xLabels: [],
      percent: []
    };
    if(payload.data.length === 0){
      return {...state, costSubjectCons: temp};
    }
    temp.data[0] = [];
    payload.data.forEach((item, index) => {
      temp.xLabels.push(item.xName);
      temp.data[0].push(item.accNum);
      temp.percent.push(`${item.rate}%`);
    })
    return {...state, costSubjectCons: temp};
  },
  [DashMCostXhrAct["costSubjectTrend"]]: (state, payload) => {
    payload.loading = true;
    payload.name = payload.name.map((item, index) => item.name);
    return {...state, costSubjectTrend: payload};
  },
  [DashMProfitXhrAct["profitTrend"]]: (state, payload) => {
    payload.loading = true;
    payload.name = ["利润"];
    payload.xLabels = payload.xLabels.map((item, index) => item + "月")
    return {...state, profitTrend: payload};
  },
  [DashMProfitXhrAct["profitConstruct"]]: (state, payload) => {
    let temp = {
      loading: true,
      name: ["金额"],
      data: [],
      xLabels: []
    };
    if(payload.length === 0){
      return {...state, profitConstruct: temp};
    }
    temp.data[0] = [];
    payload.map((item, index) => {
      temp.data[0].push(item.value);
      temp.xLabels.push(item.name);
    });
    return {...state, profitConstruct: temp};
  },
  [DashMProfitXhrAct["profitRatio"]]: (state, payload) => {
    payload.loading = true;
    payload.name = ["投入产出比"];
    payload.data = [payload.data];
    return {...state, profitRatio: payload};
  },
  [DashManageUiAct["selectOrg1"]]: (state, payload) => {
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
  [DashManageUiAct["selectOrg2"]]: (state, payload) => {
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
  [DashManageUiAct["selectOrg3"]]: (state, payload) => {
    return {
      ...state, 
      org3Id: payload,
      org4Id: "-1",
      org3Name: getOrgName(payload, state.org3),
      org4Name: "全部"
    }
  },
  [DashManageUiAct["selectOrg4"]]: (state, payload) => {
    return {
      ...state,
      org4Id: payload, 
      org4Name: getOrgName(payload, state.org4)}
  },
  [DashManageUiAct["selectMonth"]]: (state, payload) => {
    return {...state, monthId: payload}
  },
  [DashManageUiAct["selectYear"]]: (state, payload) => {
    return {...state, yearId: payload}
  },
  [DashManageUiAct["selectLevel"]]: (state, payload) => {
    return {...state, orgId: payload.orgId, orgLevel: payload.orgLevel}
  }
}, InitialState);
export default DashManageReducer;