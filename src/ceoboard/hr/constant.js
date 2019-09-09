import moment from 'moment';
export const InitialState = {
  org1: [],
	org2: [],
	org3: [],
  org4: [],
  org1Name: "猪八戒网",
	org2Name: "全部",
	org3Name: "全部",
	org4Name: "全部",
	org1Id: "100000",
	org2Id: "-1",
	org3Id: "-1",
	org4Id: "-1",
	orgLevel: 1,
	orgId: 100000,
	monthId: moment().month() + 1,
	yearId: moment().year(),
  staffAge: [], 
  staffLevel: [],
  allStaff: 0,
  staffKind: [],
  staffTrend: {
    loading: false,
    data: [[]],
    xLabel: []
  },
  perProductCost: {
    loading: false,
    data: [[]],
    xLabel: []
  },
  leaveRate: {
    loading: false,
    data: [[]],
    xLabel: []
  }
}
export const PathInfo = {
  org: "erp/memu/getHRManagerOrg",
  staffCons: "manager/revenue/getRevenueStaffInfo",
  staffTrend: "manager/revenue/selectStaffNumTrend",
  perProductCost: "/manager/revenue/getPerIncomeCost",
  leaveRate: "/manager/revenue/getRevenueQuitRates"
}