import {Methods} from '../../common/tools/util';
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
	org: "erp/memu/getHrOrg",
	staffNumber: "erp/hr/selectStaffNum",
	keyPositionRate: "erp/hr/selectKeyJobRate",
	leaveRate: "erp/hr/selectQuitRate",
	avgAge: "erp/hr/selectAvgAge",
	mF: "erp/hr/selectSexRatio",
	btrend: "erp/hr/selectStaffNumTrend",
	staffAge: "erp/hr/companyAgePie",
	performance: "erp/hr/selectStaffJX",
	level: "erp/hr/selectStaffPosition",
	kind: "erp/hr/selectJobFunction",
	leaveReason: "erp/hr/selectQuitReason",
	leaveRateChart:"erp/hr/selectQuitRates",
	leaveRate90Z9: "erp/hr/selectLossRate",
	leaveAge: "erp/hr/companyAgeLossPie",
	secKind: "erp/hr/getSubsequence"
}