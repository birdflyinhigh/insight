export const InitialState = {
  org1: [],
  org2: [],
  org3: [],
  org4: [],
  orgold: [],
  originOld: [],
  incomeTab: {},
  costTab: {},
  profitTab: {},
  ratioTab: {},
  incomeRate:  {
    data: [],
		xlabel: [],
		loading: false
  },
  costRate: {
    data: [],
		xlabel: [],
		loading: false
  },
  profitRate: {
    data: [],
		xlabel: [],
		loading: false
  },
  empoyeRate: {
    data: [],
		xlabel: [],
		loading: false
  },
  categoryRate: {
    data: [],
		xlabel: [],
		loading: false
  },
  keyworkerRate: {
    data: [],
		xlabel: [],
		loading: false
  },
  icpClickableData: {
    data: [],
		xlabel: [],
		loading: false
  },
  icpUnclickableData: {
    data: [],
		xlabel: [],
		loading: false
  },
  orgICPCompletionLevel1: {
    data: [],
		xlabel: [],
		loading: false
  },
  orgICPCompletionLevel2: {
    data: [],
		xlabel: [],
		loading: false
  },
  regionLevel1: {
    data: [],
		xlabel: [],
		loading: false
  },
  regionLevel2: {
    data: [],
		xlabel: [],
		loading: false
  },
  regionLevel3: {
    data: [],
		xlabel: [],
		loading: false
  }
};
export const PathInfo = {
  org: "erp/memu/getHRFinanceOrg",
  tab: "erp/finance/getManageTotalData",
  rate: "erp/finance/getManageMonthlyData",
  businessRate: "erp/finance/getManageTotalData",
  icpIndexOrgData: "erp/finance/getManageDeptData",
  icpIndexOtherData: "erp/finance/getManageKindData",
  region: "erp/finance/getManageDrillRegion",
  allCountry: "erp/finance/getManageAllRegion"
};