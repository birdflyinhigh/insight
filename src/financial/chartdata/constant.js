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
  totalData: {},
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
  totalData: "erp/finance/getFinanceReportTotalData",
  income: "erp/finance/getFinanceReportMonthlyData",
  cost: "erp/finance/getFinanceReportMonthlyData",
  profit: "erp/finance/getFinanceReportMonthlyData",
  assets: "erp/finance/getFinanceReportMonthlyData",
  debt: "erp/finance/getFinanceReportMonthlyData",
  netAssets: "erp/finance/getFinanceReportMonthlyData",
  corporationCompare: "erp/finance/getFinanceReportSecondData"
};