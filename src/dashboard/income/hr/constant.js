import {Methods} from '../../../common/tools/util';
export const InitialState = {
	org1: [],
	org2: [],
	org3: [],
	org4: [],
	allPerson: 0,
	workRate: 0,
	leaveRate: 0,
	avgAge: 0,
	mF: "0:0",
	monthPerson: {
		data: [],
		xLabel: [],
		loading: false
	},
	staffAge: {
		data: [],
		xLabel: [],
		loading: false
	},
	level: {
		data: [],
		xLabel: [],
		markLabel: [],
		loading: false
	},
	kind: {
		data: [],
		xLabel: [],
		loading: false
	},
	leaveRateChart: {
		data: [],
		xLabel: [],
		loading: false
	},
	leaveReason: {
		data: [],
		xLabel: [],
		loading: false
	},
	leaveRate90Z9: {
		data: [],
		xLabel: [],
		loading: false
	},
	leaveAge: {
		data: [],
		xLabel: [],
		loading: false
	},
	secKind: {
		data: [],
		xLabel: [],
		loading: false
	},
	// 为了下级页面依然能记住
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
	monthId: Methods.getMonth(),
	yearId: Methods.getYear() 
}
export const PathInfo = {
	org: "erp/memu/getHRManagerOrg",
	staffNumber: "manager/revenue/selectStaffNum",
	keyPositionRate: "manager/revenue/selectKeyJobRate",
	leaveRate: "manager/revenue/selectQuitRate",
	avgAge: "manager/revenue/selectAvgAge",
	mF: "manager/revenue/selectSexRatio",
	btrend: "manager/revenue/selectStaffNumTrend",
	staffAge: "manager/revenue/companyAgePie",
	performance: "manager/revenue/selectStaffJX",
	level: "manager/revenue/selectStaffPosition",
	kind: "manager/revenue/selectJobFunction",
	// second row, number is order
	leaveRate90Z9: "manager/revenue/getRevenueStaffLossRate",//1
	// leaveAge: "erp/hr/companyAgeLossPie",//2
	leaveRateChart:"manager/revenue/getRevenueQuitRates",//3
	perProCost: "manager/revenue/getPerIncomeCost",
	leaveReason: "manager/revenue/getDeptPerCost",//4	
	secKind: "erp/hr/getSubsequence"
}