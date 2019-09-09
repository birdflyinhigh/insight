import {createReducer} from 'redux-act';
import {InitialState} from './constant';
import {XhrAct, HeaderXhrAct} from './action';

const reducer = createReducer({
    [XhrAct["channel"]]: (state, payload) => {
        return {
            ...state,
            channel: payload,
        }
    },
    [XhrAct["city"]]: (state, payload) => {
        return {
            ...state,
            city: payload,
        }
    },
    [XhrAct["province"]]: (state, payload) => {
        return {
            ...state,
            province: payload,
        }
    },
    [XhrAct["region"]]: (state, payload) => {
        return {
            ...state,
            region: payload,
        }
    },
    [XhrAct["bigNumbers"]]: (state, payload) => {
        return {
            ...state,
            bigNumbers: payload
        }
    },
    [XhrAct["convertFlow"]]: (state, payload) => {
        return {
            ...state,
            convertFlow: payload
        }
    },
    [XhrAct["metricsAnalyze"]]: (state, payload) => {
        let temp = {
            ...payload,
            loading: true,
        };
        return {...state, metricsAnalyze: {...temp}};
    },
    [XhrAct["channelAnalyze"]]: (state, payload) => {
        let channelDonut = [
            ...payload.other
        ];
        let channelTrend = {
            ...payload.trend,
            loading: true
        };
        return {
            ...state,
            channelDonut: channelDonut,
            channelTrend: channelTrend,
            title: payload.name
        }
    }, [XhrAct["convertMetrics"]]: (state, payload) => {
        return {
            ...state,
            convertMetrics: payload
        }
    },
}, InitialState);
export default reducer;