import {createReducer} from 'redux-act';
import {CommonDetailXhrAct} from '../../action';
const reducer = createReducer({
  [CommonDetailXhrAct["tableData"]]: (state, payload) => {
    return {...state, tableData: payload.data};
  }
}, {
  tableData: []
});
export default reducer;