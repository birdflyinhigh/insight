export const InitialState = {
	org1: [],
	org2: [],
	org3: [],
	pstaffNum: {},
	pincome: {},
	pcost: {},
	proi: {},
	costIncrease: {
		data: [],
		xlabel: [],
		loading: false
	},
	costStructure: {
		data: [],
		xlabel: [],
		loading: false
	},
	budgetRate: {
		data: [],
		xlabel: [],
		loading: false
	},
	avgProductivity: {
		data: [],
		xlabel: [],
		loading: false
	},
	rank: []
}
export const PathInfo = {
	org: "erp/memu/getHrOrg",
	pstaffNum: "erp/hrcost/selectStaffNum",
	pincome: "erp/hrcost/selectIncome",
	pcost: "erp/hrcost/selectHumanCost",
	proi: "erp/hrcost/selectIncomePercent",
	costRate: "erp/hrcost/selectGrowthRate",
	costStructure: "erp/hrcost/selectHumanCostCons",
	budgetRate: "erp/hrcost/selectBudgeRate",
	avgProductivity: "erp/hrcost/selectPerCapacity",
	rank: "erp/hrcost/selectPerCapacitySort"
}