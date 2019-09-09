import {createReducer} from 'redux-act';
import {InitialState} from './constant';
import {OverviewXhrAct} from '../action';
const overviewReducer = createReducer({
  [OverviewXhrAct["org1"]]: (state, payload) => {
    return {...state, org1: payload};
  },
  [OverviewXhrAct["org2"]]: (state, payload) => {
    return {...state, org2: payload};
  },
  [OverviewXhrAct["org3"]]: (state, payload) => {
    return {...state, org3: payload};
  },
  [OverviewXhrAct["pstaffNum"]]: (state, payload) => {
    return {...state, pstaffNum: payload};
  },
  [OverviewXhrAct["pincome"]]: (state, payload) => {
    return {...state, pincome: payload};
  },
  [OverviewXhrAct["pcost"]]: (state, payload) => {
    return {...state, pcost: payload};
  },
  [OverviewXhrAct["proi"]]: (state, payload) => {
    return {...state, proi: payload};
  },
  [OverviewXhrAct["costRate"]]: (state, payload) => {
    payload.loading = true;
    return {...state, costIncrease: payload};
  },
  [OverviewXhrAct["costStructure"]]: (state, payload) => {
    payload.loading = true;
    return {...state, costStructure: payload};
  },
  [OverviewXhrAct["budgetRate"]]: (state, payload) => {
    payload.loading = true;
    return {...state, budgetRate: payload};
  },
  [OverviewXhrAct["avgProductivity"]]: (state, payload) => {
    payload.loading = true;
    return {...state, avgProductivity: payload};
  },
  [OverviewXhrAct["rank"]]: (state, payload) => {
    return {...state, rank: payload};
  }
}, InitialState);
export default overviewReducer;