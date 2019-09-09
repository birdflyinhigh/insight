import {createReducer} from 'redux-act';
import {InitialState} from './constant';
import {ManageXhrAct, ManageUiAct} from '../action';
function getItemName(id, data){
  for(let i = 0; i < data.length; i++){
    if(data[i].id == id){
      return data[i].name;
    }
  }
}
const manageReducer = createReducer({
  [ManageXhrAct["department"]]: (state, payload) => {
    return {...state, departList: payload};
  },
  [ManageXhrAct["rankPanel"]]: (state, payload) => {
    payload.forEach((item, index) =>
    payload[index].index = index + 1
  );
    return {...state,
      totalPanelData: payload,
      rankPannel1: payload.slice(0, 5),
      rankPannel2: payload.slice(5, 10),
      curPage: 0
    }
  },
  [ManageXhrAct["costRate"]]: (state, payload) => {
    payload.loading = true;
    return {...state, costIncrease: payload};
  },
  [ManageXhrAct["bugetRate"]]: (state, payload) => {
    payload.loading = true;
    return {...state, bugetRate: payload};
  },
  [ManageXhrAct["avgProduction"]]: (state, payload) => {
    payload.loading = true;
    return {...state, avgProduct: payload};
  },
  [ManageXhrAct["perCost"]]: (state, payload) => {
    payload.loading = true;
    payload.data = payload.data.length == 0 ? [] : [payload.data];
    payload.markPoint = [{
      name: "预警",
      xAxis: payload.warnData[0] ? +payload.warnData[0] : ""
    }];
    return {...state, perCost: payload};
  },
  [ManageXhrAct["perWorktime"]]: (state, payload) => {
    payload.loading = true;
    let temp = payload.data.map((item, index) => ({value: item,specifedId: payload.orgID[index]}));
    payload.data = payload.data.length == 0 ? [] : [temp];
    payload.markPoint = [{
      name: "预警",
      xAxis: payload.warnData[0] ? +payload.warnData[0] : ""
    }];
    return {...state, perWorktime: payload};
  },
  [ManageXhrAct["structure"]]: (state, payload) => {
    payload.loading = true;
    payload.data = [payload.data];
    return {...state, structure: payload};
  },
  [ManageUiAct["selectCurdepart"]]: (state, payload) => {
    return {...state, selectDepartId: payload, departName: getItemName(payload, state.departList)};
  },
  [ManageUiAct["prevPage"]]: (state, payload) => {
    let curPage = state.curPage - 2;
    return {...state,
      rankPannel1: state.totalPanelData.slice(curPage * 5, curPage * 5 + 5),
      rankPannel2: state.totalPanelData.slice((curPage + 1) * 5, (curPage + 1) * 5 + 5),
      curPage: curPage
    }
  },
  [ManageUiAct["nextPage"]]: (state, payload) => {
    let curPage = state.curPage + 2;
    return {...state,
      rankPannel1: state.totalPanelData.slice(curPage * 5, curPage * 5 + 5),
      rankPannel2: state.totalPanelData.slice((curPage + 1) * 5, (curPage + 1) * 5 + 5),
      curPage: curPage
    }
  },
  [ManageUiAct["selectIndex"]]: (state, payload) => {
    return {...state, indexId: payload, indexName: state.indexList[+payload - 1]["value"]};
  },
  [ManageUiAct["selectLevel"]]: (state, payload) => {
    return {...state, levelId: payload, levelName: payload == 3 ? "一级组织" : "二级组织"};
  },
  [ManageUiAct["selectYear"]]: (state, payload) => {
    return {...state, year: payload};
  },
  [ManageUiAct["selectMonth"]]: (state, payload) => {
    return {...state, month: payload};
  }
}, InitialState);
export default manageReducer;
