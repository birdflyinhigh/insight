import {createReducer} from 'redux-act';
import { chartDataXhrAction, chartDataUiAction} from './action';
import {InitialState} from './constant';
function dealPayload(payload){
  payload.loading = true;
  payload.name = [""];
  payload.xLabels = payload.xLabels.map((item) => item + "月");
  return payload;
}
// function getSingleId(data){
//   for(let i = 0; i < data.length; i++){
//     if(data[i].companyName.indexOf("合并报表") > -1){
//       return data[i].companyID + "";
//     }
//   }
// }
const rateReducer = createReducer({
  [chartDataXhrAction["org1"]]: (state, payload) => {
    return {...state};
  },
  [chartDataXhrAction["org2"]]: (state, payload) => {;
    return {...state, org2: payload, org2Id: payload[0]["companyID"]};
  },
  [chartDataXhrAction["org3"]]: (state, payload) => {
    return {...state, org3: payload, org3Id: payload[0]["companyID"]};
  },
  [chartDataXhrAction["pincome"]]: (state, payload) => {
    return {...state, pincome: payload};
  },
  [chartDataXhrAction["pcost"]]: (state, payload) => {
    return {...state, pcost: payload};
  },
  [chartDataXhrAction["pprofit"]]: (state, payload) => {
    return {...state, pprofit: payload};
  },
  [chartDataXhrAction["passets"]]: (state, payload) => {
    return {...state, passets: payload};
  },
  [chartDataXhrAction["pdebt"]]: (state, payload) => {
    return {...state, pdebt: payload};
  },
  [chartDataXhrAction["pnetAssets"]]: (state, payload) => {
    return {...state, pnetAssets: payload};
  },
  [chartDataXhrAction["income"]]: (state, payload) => {  
    return {...state, income: dealPayload(payload)};
  },
  [chartDataXhrAction["cost"]]: (state, payload) => {
    return {...state, cost: dealPayload(payload)};
  },
  [chartDataXhrAction["profit"]]: (state, payload) => {
    return {...state, netProfit: dealPayload(payload)};
  },
  [chartDataXhrAction["assets"]]: (state, payload) => {
    return {...state, assets: dealPayload(payload)};
  },
  [chartDataXhrAction["debt"]]: (state, payload) => {
    return {...state, debt: dealPayload(payload)};
  },
  [chartDataXhrAction["netAssets"]]: (state, payload) => {
    return {...state, netAssets: dealPayload(payload)};
  },
  [chartDataXhrAction["corporationCompare"]]: (state, payload) => {
    payload.loading = true;
    payload.xLabels.forEach((item, index, array) => {
      array[index] =  item.match(/.{1,5}/g).join('\n');
    });
    payload.name = [""];
    return {...state, corporationCompare: payload};
  },
  [chartDataUiAction["selectOrg1"]]: (state, payload) => {
    return {...state, org1Id: payload};
  },
  [chartDataUiAction["selectOrg2"]]: (state, payload) => {
    return {...state, org2Id: payload};
  },
  [chartDataUiAction["selectOrg3"]]: (state, payload) => {
    return {...state, org3Id: payload};
  },
}, InitialState);
export default rateReducer;