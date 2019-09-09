import {createReducer} from 'redux-act';
import {InitialState} from './constant';
import {XhrAct} from './action';

const reducer = createReducer({
    [XhrAct["heatTable"]]: (state, payload) => {
        let temp = {
            data: payload.data,
            titles: payload.titles
        };
        return {...state, heatTable: temp};
    },
    [XhrAct["getProduct"]]: (state, payload) => {
        return {...state, heatCat: payload, };
    },
}, InitialState);
export default reducer;