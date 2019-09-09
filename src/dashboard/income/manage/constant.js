import {Methods} from '../../../common/tools/util';
export const InitialState = {
	org1: [],
	org2: [],
	org3: [],
	org4: [],
	incomePanel: {},
	costPanel: {},
	profitPanel: {},
	incomeTrend: {
		loading: false,
    data: [],
    xLabel: []
	},
	incomeConstruct: {
		loading: false,
    data: [],
    xLabel: []
	},
	incomeSubjectCons: {
		loading: false,
    data: [],
    xLabel: []
	},
	incomeSubjectTrend: {
		loading: false,
    data: [],
    xLabel: []
	},
	costTrend: {
		loading: false,
    data: [],
    xLabel: []
	},
	costConstruct: {
		loading: false,
    data: [],
    xLabel: []
	},
	costSubjectCons: {
		loading: false,
    data: [],
    xLabel: []
	},
	costSubjectTrend: {
		loading: false,
    data: [],
    xLabel: []
	},
	profitTrend: {
		loading: false,
    data: [],
    xLabel: []
	},
	profitConstruct: {
		loading: false,
    data: [],
    xLabel: []
	},
	profitRatio: {
		loading: false,
    data: [],
    xLabel: []
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
	panelData: "manager/revenue/getRevenueManageData",
	incomeTrend: "manager/revenue/getRevenueMonthlyData",
	incomeConstruct: "manager/revenue/getRevenueDeptInfo",
	incomeSubjectCons: "manager/revenue/getRevenueManageKind",
	incomeSubjectTrend: "manager/revenue/getManageKindInfo",
	costTrend: "manager/revenue/getRevenueMonthlyData",
	costConstruct: "manager/revenue/getRevenueDeptInfo",
	costSubjectCons: "manager/revenue/getRevenueManageKind",
	costSubjectTrend: "manager/revenue/getManageKindInfo",
	profitTrend: "manager/revenue/getRevenueMonthlyData",
	profitConstruct: "manager/revenue/getRevenueDeptInfo",
	profitRatio: "manager/revenue/getRevenueRoiInfo"
}