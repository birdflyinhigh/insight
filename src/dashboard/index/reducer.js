import { createReducer } from 'redux-act';
import { InitialState } from './constant';
import {DashXhrAct, DashUiAct} from './action';
const reducer = createReducer({
  [DashXhrAct["region"]]: (state, payload) => {
    return {...state, region: payload}
  },
  [DashXhrAct["province"]]: (state, payload) => {
    return {...state, province: payload}
  },
  [DashXhrAct["industry"]]: (state, payload) => {
    return {...state, industry: payload}
  },
  [DashXhrAct["order"]]: (state, payload) => {
    return {...state, orderNumber: payload}
  },
  [DashXhrAct["gmv"]]: (state, payload) => {
    return {...state, gmv: payload}
  },
  [DashXhrAct["rate"]]: (state, payload) => {
    return {...state, consumeRate: payload}
  },
  [DashXhrAct["employNum"]]: (state, payload) => {
    return {...state, keyEmploy: payload}
  },
  [DashXhrAct["shopNum"]]: (state, payload) => {
    return {...state, keyService: payload}
  },
  [DashXhrAct["cusEmploy"]]: (state, payload) => {
    return {...state, 
      cusAnaEmploy: payload.all[0],
      cusBusManager: payload.busmananer[0],
      cusNoneBusManager: payload.nonebusmanager[0]
    };
  },
  [DashXhrAct["cusService"]]: (state, payload) => {
    return {...state, cusService: payload}
  },
  [DashXhrAct["employeTrend"]]: (state, payload) => {
    payload.loading = true;
    return {...state, employeTrend: payload}
  },
  [DashXhrAct["shopZwork"]]: (state, payload) => {
    payload.loading = true;
    return {...state, shopZwork: payload}
  },
  [DashXhrAct["shopBusniessContri"]]: (state, payload) => {
    payload.loading = true;
    return {...state, shopBusniessContri: payload}
  },
  [DashXhrAct["zworkCollect"]]: (state, payload) => {
    return {...state, zworkCollect: payload}
  },
  [DashXhrAct["zworkMap"]]: (state, payload) => {
    let temp = {
      loading: true,
      data: []
    };
    temp.data = payload.map((item, index) => {
      return payload[index] = {
        ...item,
        name: item.provinceName,
        value: item.communityCount
      };
    });
    return {...state, zworkMap: temp}
  },
  // [DashXhrAct["manageTab"]]: (state, payload) => {
  //   return {...state, icmManage: payload}
  // },
  // [DashXhrAct["financialTab"]]: (state, payload) => {
  //   return {...state, icmFinancial: payload}
  // },
  // [DashXhrAct["manageDetail"]]: (state, payload) => {
  //   if(JSON.stringify(payload) == "{}"){
  //     return {
  //       ...state,
  //       icmMPayIncome: 0,
  //       icmMPayIncomeArr: [],
  //       icmMPayCost: 0,
  //       icmMPayCostArr: [],
  //       icmMPayProfit: 0
  //     }
  //   }
  //   return {...state, 
  //     icmMPayIncome: payload.total.income,
  //     icmMPayIncomeArr: payload.category.income[0],
  //     icmMPayCost: payload.total.cost,
  //     icmMPayCostArr: payload.category.cost,
  //     icmMPayProfit: payload.total.profit
  //   }
  // },
  [DashXhrAct["manageAll"]]: (state, payload) => {
    return {...state, manageAll: payload}
  },
  [DashXhrAct["protop5"]]: (state, payload) => {
    const xLabels = payload.xLabels.map((item) => item.match(/.{1,4}/g).join("\n"));
    let temp = {
      data: [],
      name: payload.name,
      xLabels: xLabels,
      loading: true
    };
    payload.data.forEach((item, index) => {
      temp.data[index] = [];
      item.forEach((data, index1) => {
        temp.data[index].push({
          value: data,
          specifiedId:  payload.xLabelsID[index1]
        })
      })
    });
    return {...state, protop5: temp}
  },
  [DashXhrAct["areaChart"]]: (state, payload) => {
    const xLabels = payload.xLabels.map((item) => item.match(/.{1,2}/g).join("\n"));
    let temp = {
      data: [],
      name: payload.name,
      xLabels: xLabels,
      loading: true
    };
    payload.data.forEach((item, index) => {
      temp.data[index] = [];
      item.forEach((data, index1) => {
        temp.data[index].push({
          value: data,
          specifiedId: payload.xLabelsID[index1]
        })
      })
    });
    return {...state, areaChart: temp}
  },
  [DashXhrAct["staffCons"]]: (state, payload) => {
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
  // [DashXhrAct["manageprofit"]]: (state, payload) => {
  //   payload.loading = true;
  //   payload.xLabels = payload.xLabels.map((item, index) => item + "月");
  //   payload.name = ["利润"];
  //   return {...state, manageProfit: payload}
  // },
  // [DashXhrAct["financialTrend"]]: (state, payload) => {
  //   payload.loading = true;
  //   payload.name = ["利润"];
  //   payload.xLabels = payload.xLabels.map((item, index) => item + "月")
  //   return {...state, financialProfit: payload}
  // },
  [DashXhrAct["staffTrend"]]: (state, payload) => {
    payload.name = payload.name.slice(1, 3);
    payload.data = payload.data.slice(1, 3);
    payload.loading = true;
    return {...state, staffTrend: payload}
  },
  [DashUiAct["selectStart"]]: (state, payload) => {
    return {...state, startTime: payload}
  },
  [DashUiAct["selectEnd"]]: (state, payload) => {
    return {...state, endTime: payload}
  },
  [DashUiAct["selectRegion"]]: (state, payload) => {
    return {...state, regionId: payload}
  },
  [DashUiAct["selectProvince"]]: (state, payload) => {
    return {...state, provinceId: payload}
  },
  [DashUiAct["selectIndustry"]]: (state, payload) => {
    return {...state, industryId: payload}
  },
  [DashUiAct["selectManageDate"]]: (state, payload) => {
    return {...state, 
      yearId: payload.year(),
      monthId: payload.month() + 1,
      monthDate: payload
    }
  },

}, InitialState);
export default reducer;