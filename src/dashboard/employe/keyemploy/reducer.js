import {createReducer} from 'redux-act';
import {InitialState} from './constant';
import {KeyemployXhrAct, KeyemployUiAct} from './action';
const employReducer = createReducer({
  [KeyemployXhrAct["trend"]]: (state, payload) => {
    if(JSON.stringify(payload) == "{}"){
      return {
        ...state, trend: {
          hasLoaded: true,
          loading: true,
          data: []
        }
      }
    }
    payload.loading = true;
    payload.hasLoaded = true;
    return {...state, trend: payload};
  },
  [KeyemployUiAct["getData"]]: (state, payload) => {
    return {...state, trend: {hasLoaded: false}}
  }
 }, InitialState);
 export default employReducer;