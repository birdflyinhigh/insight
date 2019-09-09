import moment from 'moment';
import * as actions from './action';
import * as constant from './constant';

const startTime = moment().subtract(7, 'days');
const initialState = {
    startDate: constant.DISABLED_START_TIME>startTime?constant.DISABLED_START_TIME:startTime,
    endDate: moment().subtract(1, 'days'),
    areaId: -1,
    provinceId: -1,
    cityId: -1,
    titles: {},
    outSources: [],
    innerSources: [],
    service: [],
    type: 9999,
};

const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case actions.UPDATE_DATE:
            let startDate = action.payload[0];

            if(action.payload[0] < constant.DISABLED_START_TIME){
                startDate = constant.DISABLED_START_TIME
            }

            return {
                ...state,
                startDate: startDate,
                endDate: action.payload[1],
            };
        case actions.UPDATE_AREA:
            return {
                ...state,
                areaId: action.payload,
                provinceId: -1,
                cityId: -1
            };
        case actions.UPDATE_PROVINCE:

            return {
                ...state,
                provinceId: action.payload,
                cityId: -1
            };
        case actions.UPDATE_CITY:
            return {
                ...state,
                cityId: action.payload,
            };
        case actions.GET_TITLE:
            return {
                ...state,
                titles: action.payload,
            };
        case actions.GET_OUT_SOURCE:
            return {
                ...state,
                outSources: action.payload,
            };
        case actions.GET_INNER_SOURCE:
            return {
                ...state,
                innerSources: action.payload,
            };
        case actions.SERVICE:
            return {
                ...state,
                service: action.payload,
            };
        case actions.ON_CHANGE_SELECTBOX:
            return {
                ...state,
                type: action.payload,
            };
        default:
            return state
    }
};


export default reducer;
