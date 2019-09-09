import {createReducer} from 'redux-act';
import { manageXhrAction, manageUiAction} from '../action';
import {InitialState} from './constant';
function dealDrillDownData(payload){
  if(payload.hasAuthority){
    payload.data.forEach((item, index) => {
      item.forEach((data, index1) => {
        payload.data[index][index1] = {
          value: data,
          barKey: payload["xLabelsID"][index1]
        }
      });
    })
    payload.loading = true;
  }
  return payload;
}
const rateReducer = createReducer({
  [manageXhrAction["org1"]]: (state, payload) => {
    return {...state, org1: payload};
  },
  [manageXhrAction["org2"]]: (state, payload) => {
    return {...state, org2: payload};
  },
  [manageXhrAction["org3"]]: (state, payload) => {
    return {...state, org3: payload};
  },
  [manageXhrAction["org4"]]: (state, payload) => {
    return {...state, org4: payload};
  },
  [manageXhrAction["orgold"]]: (state, payload) => {
    return {...state, orgold: payload.slice(0, 60), originOld: payload};
  },
  [manageXhrAction["incomeTab"]]: (state, payload) => {
    let temp = {}
    if(payload.hasAuthority){
      temp = payload;
    }
    return {...state, incomeTab: temp};
  },
  [manageXhrAction["costTab"]]: (state, payload) => {
    let temp = {}
    if(payload.hasAuthority){
      temp = payload;
    }
    return {...state, costTab: temp};
  },
  [manageXhrAction["profitTab"]]: (state, payload) => {
    let temp = {}
    if(payload.hasAuthority){
      temp = payload;
    }
    return {...state, profitTab: temp};
  },
  [manageXhrAction["ratioTab"]]: (state, payload) => {
    let temp = {}
    if(payload.hasAuthority){
      temp = payload;
    }
    return {...state, ratioTab: temp};
  },
  [manageXhrAction["incomeRate"]]: (state, payload) => {
    if(payload.hasAuthority){
      payload.loading = true;
    }
    return {...state, incomeRate: payload};
  },
  [manageXhrAction["costRate"]]: (state, payload) => {
    if(payload.hasAuthority){
      payload.loading = true;
    }
    return {...state, costRate: payload};
  },
  [manageXhrAction["profitRate"]]: (state, payload) => {
    if(payload.hasAuthority){
      payload.loading = true;
    }
    return {...state, profitRate: payload};
  },
  [manageXhrAction["empoyeRate"]]: (state, payload) => {
    if(payload.hasAuthority){
      payload.loading = true;
    }
    return {...state, empoyeRate: payload};
  },
  [manageXhrAction["categoryRate"]]: (state, payload) => {
    if(payload.hasAuthority){
      payload.loading = true;
    }
    return {...state, categoryRate: payload};
  },
  [manageXhrAction["keyworkerRate"]]: (state, payload) => {
    if(payload.hasAuthority){
      payload.loading = true;
    }
    return {...state, keyworkerRate: payload};
  },
  [manageXhrAction["icpIndexOrgData"]]: (state, payload) => {
    if(payload.hasAuthority){
      payload.xLabels = payload.xLabels.map((label) => label.match(/.{1,2}/g).join("\n"));
    }
    return {...state, icpClickableData: dealDrillDownData(payload)};
  },
  [manageXhrAction["icpSecondOrgData"]]: (state, payload) => {
    if(payload.hasAuthority){
      payload.loading = true;
      payload.xLabels = payload.xLabels.map((label) => label.match(/.{1,2}/g).join("\n"));
    }
    
    return {...state, icpUnclickableData: payload};
  },
  [manageXhrAction["icpCostSubject"]]: (state, payload) => {
    return {...state, icpClickableData: dealDrillDownData(payload)};
  },
  [manageXhrAction["icpCostSecondSubject"]]: (state, payload) => {
    if(payload.hasAuthority){
      payload.loading = true;
      payload.xLabels = payload.xLabels.map((label) => label.match(/.{1,2}/g).join("\n"));
    }
    return {...state, icpUnclickableData: payload};
  },
  [manageXhrAction["icpIndexOtherData"]]: (state, payload) => {
    if(payload.hasAuthority){
      payload.loading = true;
      payload.xLabels = payload.xLabels.map((label) => label.match(/.{1,2}/g).join("\n"));
    }
    return {...state, icpUnclickableData: payload};
  },
  [manageXhrAction["regionData1"]]: (state, payload) => {
    return {...state, regionLevel1: dealDrillDownData(payload)};
  },
  [manageXhrAction["regionData2"]]: (state, payload) => {
    if(payload.hasAuthority && payload.xLabels.length > 10){
      payload.xLabels = payload.xLabels.map((label) => label.match(/.{1}/g).join("\n"))
    }
    return {...state, regionLevel2: dealDrillDownData(payload)};
  },
  [manageXhrAction["regionData3"]]: (state, payload) => {
    if(payload.hasAuthority){
      payload.loading = true;
      if(payload.xLabels.length > 10){
        payload.xLabels = payload.xLabels.map((label) => label.match(/.{1}/g).join("\n"))
      }  
    }
    return {...state, regionLevel3: payload};
  },
  [manageUiAction["searchOld"]]: (state, payload) => {
		let searchList = state.originOld.filter((item, index) => {
      return item.deptName.indexOf(payload) > -1
    });
    return {...state, orgold: searchList}
  },
  [manageUiAction["clearList"]]: (state, payload) => {
    let temp = 0;
    let start = 0;
    let end = 60;
    for(let i = 0; i < state.originOld.length; i ++){
      if(state.originOld[i]["deptId"] == payload){
        temp = i;
        break;
      }
    }
    console.log(temp);
    start = temp > 60 ? temp - 30 : start;
    end = temp > 60 ? temp + 30 : end;
    return {...state, orgold: state.originOld.slice(start, end)}
  },
  // [manageXhrAction["countryData1"]]: (state, payload) => {
  //   return {...state, regionLevel1: dealDrillDownData(payload)};
  // },
  // [manageXhrAction["countryData2"]]: (state, payload) => {
  //   debugger
  //   if(payload.hasAuthority && payload.xLabels.length > 10){
  //     debugger
  //     payload.xLabels = payload.xLabels.map((label) => label.match(/.{1}/g).join("\n"));
  //   }
  //   return {...state, regionLevel2: dealDrillDownData(payload)};
  // },
  // [manageXhrAction["countryData3"]]: (state, payload) => {
  //   if(payload.hasAuthority && payload.xLabels.length > 10){
  //     payload.loading = true;
  //     payload.xLabels = payload.xLabels.map((label) => label.match(/.{1}/g).join("\n"));
  //   }

  //   return {...state, regionLevel3: payload};
  // },
}, InitialState);
export default rateReducer;