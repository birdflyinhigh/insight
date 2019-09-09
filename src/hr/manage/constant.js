import {Methods} from '../../common/tools/util';
export const InitialState = {
	selectDepartId: "100079",
	curPage: 0,
	year: Methods.getYear(),
	// month: Methods.getMonth(),
	month: 5,
	indexId: "income",
	levelId: 3,
	indexName: "收入",
	levelName: "一级组织",
	departName: "IT事业部",
	indexList: [{
		id: "income",
		value: "收入"
	},{
		id: "incomedCompeteRate",
		value: "收入完成率"
	},{
		id: "personNum",
		value: "人数"
	},{
		id: "perCapacity",
		value: "人均产值"
	}],
	totalPanelData: [],
	departList: [],
	rankPannel1: [],
	rankPannel2: [],
	costIncrease: {
		data: [],
		xlabel: [],
		loading: false
	},
	bugetRate: {
		data: [],
		xLabel: [],
		loading: false
	},
	avgProduct: {
		data: [],
		xLabel: [],
		loading: false
	},
	perCost: {
		data: [],
		xLabel: [],
		loading: false
	},
	perWorktime:{
		data: [],
		xLabel: [],
		loading: false
	},
	structure: {
		data: [],
		xLabel: [],
		loading: false
	}
}
export const PathInfo = {
	department: "erp/hrcost/selectDepts",
	rankPanel: "erp/hrcost/selectIncomeSort",
	costRate: "erp/hrcost/selectGrowthRate", 
	bugetRate: "erp/hrcost/selectBudgeRate", 
	avgProduction: "erp/hrcost/selectPerCapacity", 
	perCost: "erp/hrcost/selectPerHumanCost", 
	perWorktime: "erp/hrcost/selectPerWorkHours", 
	structure: "erp/hrcost/selectJXRate"
}
