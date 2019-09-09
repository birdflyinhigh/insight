import {createReducer} from 'redux-act';
import { manageDetailXhrAction} from '../action';
import {InitialState} from './constant';
const manageDetailReducer = createReducer({
  [manageDetailXhrAction["getTableData"]]: (state, payload) => {
    let temp = [];
    if(payload.hasAuthority){
      temp = payload.data;
    }
    return {...state, tableData: temp}
  }
}, InitialState);
export default manageDetailReducer;