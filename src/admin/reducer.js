import {createReducer} from 'redux-act';
import {InitialState} from './constant';
import {adminXhrAction, adminUiAction} from './action';

const reducer = createReducer({
  [adminXhrAction["org1"]]: (state, payload) => {
    return {...state, org1: payload};
  },
  [adminXhrAction["org2"]]: (state, payload) => {
    return {...state, org2: payload};
  },
  [adminXhrAction["org3"]]: (state, payload) => {
    return {...state, org3: payload};
  },
  [adminXhrAction["org4"]]: (state, payload) => {
    return {...state, org4: payload};
  },
  [adminXhrAction["tripTotal"]]: (state, payload) => {
    payload.loading = true;
    return {...state, tripTotal: payload };
  },
  [adminXhrAction["ticketPrice"]]: (state, payload) => {
    payload.loading = true;
    return {...state, ticketPrice: payload };
  },
  [adminXhrAction["ticketAvgPrice"]]: (state, payload) => {
    payload.loading = true;
    return {...state, ticketAvgPrice: payload };
  },
  [adminXhrAction["hotelPrice"]]: (state, payload) => {
    payload.loading = true;
    return {...state, hotelPrice: payload };
  },
  [adminXhrAction["hotelAvgPrice"]]: (state, payload) => {
    payload.loading = true;
    return {...state, hotelAvgPrice: payload };
  },
  [adminXhrAction["xcTicketDiscount"]]: (state, payload) => {
    payload.loading = true;
    return {...state, xcTicketDiscount: payload };
  },
  [adminXhrAction["orgTicketDiscount"]]: (state, payload) => {
    payload.loading = true;
    return {...state, orgTicketDiscount: payload };
  },
  [adminXhrAction["xcTotalTrend"]]: (state, payload) => {
    payload.loading = true;
    return {...state, xcTotalTrend: payload };
  },
  [adminXhrAction["orgFeeRate"]]: (state, payload) => {
    let temp = {
      loading: true,
      data: [],
      name: ['age']
    };
    if(JSON.stringify(payload) === '[]') {
      return {...state, orgFeeRate: temp}
    }
    temp.data = payload.map((item, index) => ({
      name: item.name,
      value: item.value,
      percent: item.id
    }));
    console.log(temp)
    return {...state, orgFeeRate: temp };
  },
  [adminXhrAction["startDistination"]]: (state, payload) => { 
    if(!payload.departure.length && !payload.destination.length && !payload.route.length){
      payload.noData = true;
    }
    payload.loading = true;
    return {...state, startDistination: payload };
  },
  [adminXhrAction["hotelUsage"]]: (state, payload) => {
    payload.loading = true;
    return {...state, hotelUsage: payload};
  },
  [adminXhrAction["hotelLoseTrend"]]: (state, payload) => {
    payload.loading = true;
    return {...state, hotelLoseTrend: payload};
  },
  [adminXhrAction["hotelCompare"]]: (state, payload) => {
    payload.loading = true;
    payload.name = [""];
    payload.xLabels = payload.xLabels.map((item) => {
      return item.match(/.{1,2}/g).join("\n");
     });
    return {...state, hotelCompare: payload};
  },
  [adminXhrAction["ticketUsage"]]: (state, payload) => {
    payload.loading = true;
    return {...state, ticketUsage: payload};
  },
  [adminXhrAction["ticketLoseFee"]]: (state, payload) => {
    payload.loading = true;
    return {...state,ticketLoseFee: payload};
  },
  [adminXhrAction["ticketLoseOutRule"]]: (state, payload) => {
    payload.loading = true;
    return {...state, ticketLoseOutRule: payload};
  },
  [adminXhrAction["ticketCompareFee"]]: (state, payload) => {
    payload.loading = true;
    payload.xLabels = payload.xLabels.map((item) => {
     return item.match(/.{1,2}/g).join("\n");
    });
    return {...state, ticketCompareFee: payload};
  },
  [adminXhrAction["ticketCompareOutRule"]]: (state, payload) => {
    payload.loading = true;
    payload.xLabels = payload.xLabels.map((label) => label.match(/.{1,2}/g).join("\n"));
    return {...state, ticketCompareOutRule: payload};
  },
  [adminUiAction["selectFirstOrg"]]: (state, payload) => {
    return {...state, org1Id: payload};
  },
  [adminUiAction["selectSecondOrg"]]: (state, payload) => {
    return {...state, org2Id: payload, org3Id: "-1", org4Id: "-1"};
  },
  [adminUiAction["selectThirdOrg"]]: (state, payload) => {
    return {...state, org3Id: payload, org4Id: "-1"};
  },
  [adminUiAction["selectForthOrg"]]: (state, payload) => {
    return {...state, org4Id: payload};
  },
  [adminUiAction["selectMonth"]]: (state, payload) => {
    return {...state, monthId: payload};
  },
  [adminUiAction["selectYear"]]: (state, payload) => {
    return {...state, yearId: payload};
  },

}, InitialState);
export default reducer;