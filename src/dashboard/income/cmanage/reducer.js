import {
  createReducer
} from 'redux-act';
import {
  InitialState,
  RegionList
} from './constant';
import {
  CmanageUiAct,
  CmanageXhrAct
} from './action';
import TableUtil from './util';

const DashCManageReducer = createReducer({
  [CmanageUiAct["chooseDate"]]: (state, payload) => {
    return {
      ...state,
      monthDate: payload
    };
  },
  [CmanageUiAct["chooseProduct"]]: (state, payload) => {
    let chooseProductId = payload;
    if(payload instanceof Array) chooseProductId = payload[0];
    if(chooseProductId === -1) return {...state, productId: [-1]};
    let temp = state.productId.filter((item) => item !== -1);
    let itemIndex = state.productId.indexOf(chooseProductId);
    if(itemIndex > -1){
      temp.splice(itemIndex, 1);
    }else{
      temp.push(chooseProductId)
    }
    if(temp.length === 0){
      temp.push(-1);
    }
    return {
      ...state,
      productId: temp
    };
  },
  [CmanageUiAct["chooseType"]]: (state, payload) => {
    return {
      ...state,
      typeId: payload
    };
  },
  [CmanageUiAct["chooseProvince"]]: (state, payload) => {
    let tempArray = [];
    const chooseProvinceId = payload.provinceId + "";
    // 是否已经重复选择
    const repeatItem = state.areaInfo.find((item) => item.regionId === payload.regionId && item.provinceId === payload.provinceId);
    if (repeatItem) return {...state};
    // 选择全部大区/全部省份
    if (payload.regionId === -1 || payload.regionId === "all") {
      return {
        ...state,
        areaInfo: [payload]
      };
    }
    // 选择大区下全部省份/大区整体(经过上一步过滤)
    if (chooseProvinceId.indexOf("-province") > -1 || chooseProvinceId.indexOf("-all") > -1) {
      const regionId = payload.regionId + "";
      state.areaInfo.forEach((item) => {
        const isAllRegion = item.regionId === -1 || item.regionId === "all";
        // 不同大区全部不互斥
        if (item.regionId !== regionId) {
          if (!isAllRegion) tempArray.push(item);
        }
      });
      tempArray.push(payload);
      return {
        ...state,
        areaInfo: tempArray
      };
    }
    // 选择省份，选择之后除开regionId： -1, all/provinceId: -1, all
    for (let i = 0; i < state.areaInfo.length; i++) {
      const pregionId = state.areaInfo[i].regionId;
      const pprovinceId = state.areaInfo[i].provinceId + "";
      const isAllRegion = pregionId === -1 || pregionId === "all";
      const isAllProvince = pprovinceId.indexOf("-province") > -1 || pprovinceId.indexOf("-all") > -1;
      if (isAllRegion) break;
      if (pregionId === payload.regionId) {
        if (!isAllProvince) {
          tempArray.push(state.areaInfo[i]);
        }
      } else {
        tempArray.push(state.areaInfo[i]);
      }
    }
    tempArray.push(payload);
    return {
      ...state,
      areaInfo: tempArray
    };
  },
  [CmanageUiAct["deleteArea"]]: (state, payload) => {
    let deleteIndex = state.areaInfo.findIndex((item) => item.regionId === payload.regionId && item.provinceId === payload.provinceId);
    state.areaInfo.splice(deleteIndex, 1);
    if(state.areaInfo.length === 0){
      state.areaInfo.push({
        regionId: -1,
        regionName: "全部大区",
        provinceId: -1,
        provinceName: "",
      });
    }
    return {
      ...state,
      areaInfo: [...state.areaInfo]
    };
  },
  [CmanageUiAct["clearArea"]]: (state, payload) => {
    return {
      ...state,
      areaInfo: [payload]
    };
  },
  [CmanageUiAct["clearProduct"]]: (state, payload) => {
    return {
      ...state,
      productId: payload
    };
  },
  [CmanageUiAct["chooseTarget"]]: (state, payload) => {
    return {
      ...state,
      target: payload.key,
      targetName: payload.value
    };
  },
  [CmanageXhrAct["productList"]]: (state, payload) => {
    return {
      ...state,
      productList: payload
    };
  },
  [CmanageXhrAct["typeList"]]: (state, payload) => {
    return {
      ...state,
      typeList: payload
    };
  },
  [CmanageXhrAct["regionList"]]: (state, payload) => {
    let temp = [];
    let index = 0;
    payload.forEach((item) => {
      temp.push(item);
      let findRegion = RegionList.find((regionItem) => regionItem.name === item.name);
      if (findRegion) {
        temp[index].enName = findRegion.enName;
        temp[index].nosec = findRegion.nosec;
      }
      index++;
    });
    return {
      ...state,
      regionList: temp
    };
  },
  [CmanageXhrAct["hdList"]]: (state, payload) => {
    return {
      ...state,
      hdList: payload
    };
  },
  [CmanageXhrAct["hnList"]]: (state, payload) => {
    return {
      ...state,
      hnList: payload
    };
  },
  [CmanageXhrAct["hxList"]]: (state, payload) => {
    return {
      ...state,
      hxList: payload
    };
  },
  [CmanageXhrAct["hbList"]]: (state, payload) => {
    return {
      ...state,
      hbList: payload
    };
  },
  [CmanageXhrAct["hzList"]]: (state, payload) => {
    return {
      ...state,
      hzList: payload
    };
  },
  [CmanageXhrAct["cyList"]]: (state, payload) => {
    return {
      ...state,
      cyList: payload
    };
  },
  [CmanageXhrAct["bjList"]]: (state, payload) => {
    return {
      ...state,
      bjList: payload
    };
  },
  [CmanageXhrAct["titleNum"]]: (state, payload) => {
    return {
      ...state,
      titleNum: payload
    };
  },
  [CmanageXhrAct["monthTrend"]]: (state, payload) => {
    payload.loading = true;
    return {
      ...state,
      monthTrend: payload
    };
  },
  [CmanageXhrAct["productRank"]]: (state, payload) => {
    return {
      ...state,
      productRank: payload
    }
  },
  [CmanageXhrAct["regionChart"]]: (state, payload) => {
    payload.loading = true;
    return {
      ...state,
      regionChart: {
        data: payload,
        name: [""],
        loading: true
      }
    };
  },
  [CmanageXhrAct["typeChart"]]: (state, payload) => {
    payload.loading = true;
    return {
      ...state,
      typeChart: {
        data: payload,
        name: [""],
        loading: true
      }
    };
  },
  [CmanageXhrAct["tableData"]]: (state, payload) => {
    if(payload.data.length === 0){
      return {...state,
        tableData: {
          header: [],
          table: [],
          endCol: []
        }
      }
    }
    let temp = payload.data;
    temp.unshift(payload.title);
    return {
      ...state,
      tableData: TableUtil.getFlatData(temp, state.productId)
    }
  }
}, InitialState);
export default DashCManageReducer;