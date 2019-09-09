export const InitialState = {
  org1: [{
    companyID: "1001",
    companyName: "重庆猪八戒网络有限公司"
  }],
  org2: [],
  org3: [],
  org1Id: "1001",
  org2Id: "1001",
  org3Id: "C1001",
  pincome: {},
  pcost: {},
  pprofit: {},
  passets: {},
  pdebt: {},
  pnetAssets: {},
  income:  {
		data:[],
		xLabels:[],
		loading: false
  },
  cost: {
    data: [],
		xlabel: [],
		loading: false
  },
  netProfit: {
    data: [],
		xlabel: [],
		loading: false
  },
  assets: {
    data: [],
		xlabel: [],
		loading: false
  },
  debt: {
    data: [],
		xlabel: [],
		loading: false
  },
  netAssets: {
    data: [],
		xlabel: [],
		loading: false
  },
  corporationCompare: {
    data: [],
		xlabel: [],
		loading: false
  }
};
export const PathInfo = {
  org: "erp/finance/getFinanceCompany",
  totalData: "manager/revenue/getRevenueReportInfo",
  income: "manager/revenue/getRevenueReportMonthlyData",
  cost: "manager/revenue/getRevenueReportMonthlyData",
  profit: "manager/revenue/getRevenueReportMonthlyData",
  assets: "manager/revenue/getRevenueReportMonthlyData",
  debt: "manager/revenue/getRevenueReportMonthlyData",
  netAssets: "manager/revenue/getRevenueReportMonthlyData",
  corporationCompare: "manager/revenue/getRevenueReportSecondData"
};