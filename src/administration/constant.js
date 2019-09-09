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
  xcTotalTrend: {
    data:[],
		xLabels:[],
    loading: false

  },
  hotelLoseTop5: [],
  ticketLoseTop5: [],
  hotelUsage: {
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
  org: "erp/memu/getHrOrg",
  xcTotalTrend: "erp/administration/selectTotalExpend",
  hotelLoseTop5: "erp/administration/selectTop5HotelExpend",
  ticketLostTop5: "erp/administration/selectTop5AirfareExpend",
  hotelUsage: "erp/administration/selectHotelTrend",
  hotelLose: "erp/administration/selectHotelLossTrend",
  hotelCompare: "erp/administration/selectHotelContrast",
  ticketUsage: "erp/administration/selectAirfareTrend",
  ticketLoseFee: "erp/administration/selectAirfareLossTrend",
  ticketLoseOutRule: "erp/administration/selectAirfareLossTrend",
  ticketCompareFee: "erp/administration/selectAirfareContrast",
  ticketCompareOutRule: "erp/administration/selectAirfareContrast"
}