import {Methods} from '../common/tools/util';
export const InitialState = {
  org1: [],
  org2: [],
  org3: [],
  org4: [],
  org1Id: "100000",
	org2Id: "-1",
	org3Id: "-1",
	org4Id: "-1",
  yearId: Methods.getYear(),
  monthId: Methods.getMonth(),
  tripTotal: {},
  ticketPrice: {},
  ticketAvgPrice: {},
  hotelPrice: {},
  hotelAvgPrice: {},
  xcTicketDiscount: {},
  orgTicketDiscount: {},
  xcTotalTrend: {
    data:[],
		xLabels:[],
		loading: false
  },
  orgFeeRate: {
    data:[],
		xLabels:[],
		loading: false
  },
  startDistination: {
    loading: false,
    departure: [],
    destination: [],
    route: []
  },
  hotelUsage: {
    data:[],
		xLabels:[],
		loading: false
  },
  hotelLoseTrend: {
    data:[],
		xLabels:[],
		loading: false
  },
  hotelLose: {
    data:[],
		xLabels:[],
		loading: false
  },
  hotelCompare: {
    data:[],
		xLabels:[],
		loading: false
  },
  ticketUsage: {
    data:[],
		xLabels:[],
		loading: false
  },
  ticketLoseFee: {
    data:[],
		xLabels:[],
		loading: false
  },
  ticketLoseOutRule: {
    data:[],
		xLabels:[],
		loading: false
  },
  ticketCompareFee: {
    data:[],
		xLabels:[],
		loading: false
  },
  ticketCompareOutRule: {
    data:[],
		xLabels:[],
		loading: false
  }
};
export const PathInfo = {
  org: "erp/memu/getHRAdminOrg",
  tripTotal: "erp/administration/selectTotalFee",
  // tripTotalStack: "",
  ticketPrice: "erp/administration/selectAirfareFee",
  ticketAvgPrice: "erp/administration/selectAirfareAverage",
  hotelPrice: "erp/administration/selectHotelFee",
  hotelAvgPrice: "erp/administration/selectHotelAverage",
  xcTicketDiscount: "erp/administration/selectXCAverage",
  orgTicketDiscount: "erp/administration/selectAverageDiscount",
  xcTotalTrend: "erp/administration/selectTotalExpend",
  orgFeeRate: "erp/administration/selectTotalFeeRate",
  startDistination: "erp/administration/selectRouteInfo",
  hotelUsage: "erp/administration/selectHotelTrend",
  hotelLoseTrend: "erp/administration/selectHotelLossTrend",
  hotelCompare: "erp/administration/selectHotelContrast",
  ticketUsage: "erp/administration/selectAirfareTrend",
  ticketLoseFee: "erp/administration/selectAirfareLossTrend",
  ticketLoseOutRule: "erp/administration/selectAirfareLossTrend",
  ticketCompareFee: "erp/administration/selectAirfareContrast",
  ticketCompareOutRule: "erp/administration/selectAirfareContrast",
  totalDownload: "erp/administration/exportHotelLossInfo",
  sameDownload: "erp/administration/exportHomosexualInfo",
  costLossDownload: "erp/administration/exportAirfareInfo"
}
export const travelFeeRateOpts = [{
  name: "差旅总金额",
  value: "totalFee"
},{
  name: "机票金额",
  value: "airfareFee"
},{
  name: "酒店金额",
  value: "hotelFee"
},{
  name: "损失总金额",
  value: "totalLoss"
},{
  name: "机票损失金额",
  value: "airfareLoss"
},{
  name: "酒店损失金额",
  value: "hotelLoss"
}];
export const hotelCompareOpts = [{
  name: "超标总金额汇总",
  value: "excess"
},{
  name: "同性出差损失金额",
  value: "same"
},{
  name: "酒店损失总金额",
  value: "total"
}];
export const lostOutRule = [{
  name: "费用损失",
  value: "costLoss"
},{
  name: "违规情况",
  value: "wgCondition"
}];
export const marginStyle={
  marginLeft: 30,
  marginRight: 30
};
