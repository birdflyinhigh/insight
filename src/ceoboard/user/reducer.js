import moment from 'moment';
import * as actions from './action';
import * as constant from "./constant";


const startTime = moment().subtract(7, 'days');
const initialState = {
    startDate: constant.DISABLED_START_TIME>startTime?constant.DISABLED_START_TIME:startTime,
    endDate: moment().subtract(1, 'days'),
    areaId: -1,
    provinceId: -1,
    cityId: -1,
    type: 1,
    user: [],
    userLayer: {},
    serviceLayer: {},
    serviceIncomeLayer: {},
    sales: [],
    sales2: [],
    canSubmitChance: true,
    message: ''
};

const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case actions.PICK_START:
            let startDate = action.payload;

            if(action.payload < constant.DISABLED_START_TIME){
                startDate = constant.DISABLED_START_TIME
            }
            return {
                ...state,
                startDate: startDate
            };
        case actions.PICK_END:
            return {
                ...state,
                endDate: action.payload
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
        case actions.ON_CHANGE_SELECTBOX:
            return {
                ...state,
                type: action.payload,
            };
        case actions.USER:
            return {
                ...state,
                user: action.payload,
            };
        case actions.USER_LAYER:
            return {
                ...state,
                userLayer: action.payload,
            };
        case actions.SERVICE_LAYER:
            return {
                ...state,
                serviceLayer: action.payload,
            };
        case actions.SERVICE_INCOME_LAYER:
            return {
                ...state,
                serviceIncomeLayer: action.payload,
            };
        case actions.SALE:
            return {
                ...state,
                sales: action.payload,
            };
        case actions.SALE2:
            return {
                ...state,
                sales2: action.payload,
            };
        case actions.SUBMIT_CHANCE:
            return {
                ...state,
                message: action.payload.message,
            };
        default:
            return state
    }
};


export default reducer;
