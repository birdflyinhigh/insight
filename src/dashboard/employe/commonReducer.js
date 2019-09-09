import {createReducer} from 'redux-act';
import {InitialState} from './commonConstant';
import {commonEmployXhrAct, commonEmployUiAct} from './commonAction';
const reducer = createReducer({
  [commonEmployXhrAct["region"]]: (state, payload) => {
    return {...state, region: payload};
  },
  [commonEmployXhrAct["province"]]: (state, payload) => {
    return {...state, province: payload};
  },
  [commonEmployXhrAct["industry"]]: (state, payload) => {
    return {...state, industry: payload};
  },
  [commonEmployXhrAct["panelData"]]: (state, payload) => {
    return {...state, panelData: payload};
  },
  [commonEmployUiAct["selectStart"]]: (state, payload) => {
    return {...state, startTime: payload};
  },
  [commonEmployUiAct["selectEnd"]]: (state, payload) => {
    return {...state, endTime: payload};
  },
  [commonEmployUiAct["selectRegion"]]: (state, payload) => {
    return {...state, regionId: payload};
  },
  [commonEmployUiAct["selectProvince"]]: (state, payload) => {
    return {...state, provinceId: payload};
  },
  [commonEmployUiAct["selectProduct"]]: (state, payload) => {
    return {...state, productId: payload};
  },
  [commonEmployUiAct["selectIndustry"]]: (state, payload) => {
    return {...state, industryId: payload};
  },
  [commonEmployUiAct["getComData"]]: (state) => {
    return {...state, panelData: {}};
  },
}, InitialState);
export default reducer;