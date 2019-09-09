export const initial = {
  index: {
    loaded: false,
    choosedLevel: 1, //选择的层级，从1开始，对公司无效
    selectedTypeId: 1,
    firstComId: 101,
    secondComId: -1,
    thirdComId: -1,
    firstComData: [],
    secondComData: [],
    thirdComData: [],
    firstOrgId: 100000,
    secondOrgId: -1,
    thirdOrgId: -1,
    forthOrgId: -1,
    fifthOrgId: -1,    
    firstData: [],
    secondData: [],
    thirdData: [],
    forthData: [],
    fifthData: [],
    totalProvider: 0,
    overviewData: {
      data: [],
      loading: false
    },
    rateData: {
      data: [],
      loading: false
    },
    saveData: {
      data: [],
      loading: false
    },
    manageData: {
      data: [],
      loading: false
    },
    providerData: {
      data: [],
      loading: false
    },
    urgentData: {
      data: [],
      loading: false
    },
    projectData: {
      data: [],
      loading: false
    },
    examineData: {
      data: [],
      loading: false
    },
    allProData: {
      data: [],
      loading: false
    }
  },
  overview: {
    selectedTypeId: 1,
    firstComId: 101,
    secondComId: -1,
    thirdComId: -1,
    firstComData: [],
    secondComData: [],
    thirdComData: [],
    firstOrgId: 100000,
    secondOrgId: -1,
    thirdOrgId: -1,
    forthOrgId: -1,
    fifthOrgId: -1,
    firstData: [],
    secondData: [],
    thirdData: [],
    forthData: [],
    fifthData: [],
    monthBarData: {
      data: [],
      loading: false
    },
    detailTableData: {
      data: [],
      loading: false
    }
  },
  rate: {
    selectedTypeId: 1,
    firstComId: 101,
    secondComId: -1,
    thirdComId: -1,
    firstComData: [],
    secondComData: [],
    thirdComData: [],
    selectCategoryId: [1],
    firstOrgId: 100000,
    secondOrgId: -1,
    thirdOrgId: -1,
    forthOrgId: -1,
    fifthOrgId: -1,
    firstData: [],
    secondData: [],
    thirdData: [],
    forthData: [],
    fifthData: [],
    categoryData: [],
    secondTableData:{
      data: [],
      loading: false
    },
    thirdTableData: {
      data: [],
      loading: false
    }
  },
  save: {
    selectedTypeId: 1,
    firstComId: 101,
    secondComId: -1,
    thirdComId: -1,
    firstComData: [],
    secondComData: [],
    thirdComData: [],
    firstOrgId: 100000,
    secondOrgId: -1,
    thirdOrgId: -1,
    forthOrgId: -1,
    fifthOrgId: -1,
    firstData: [],
    secondData: [],
    thirdData: [],
    forthData: [],
    fifthData: [],
    saveBarData:{
      data: [],
      loading: false
    },
    firstTableData: {
      data: [],
      loading: false
    }
  },
  manage: {
    selectedTypeId: 1,
    firstComId: 101,
    secondComId: -1,
    thirdComId: -1,
    firstComData: [],
    secondComData: [],
    thirdComData: [],
    selectManageId:[-1],
    firstOrgId: 100000,
    secondOrgId: -1,
    thirdOrgId: -1,
    forthOrgId: -1,
    fifthOrgId: -1,
    firstData: [],
    secondData: [],
    thirdData: [],
    forthData: [],
    fifthData: [],
    managewayData: [],
    manageBarData:{
      data: [],
      loading: false
    },
    firstTableData: {
      data: [],
      loading: false
    },
    isReload: false
  },
  provider: {
    selectedTypeId: 1,
    firstComId: 101,
    secondComId: -1,
    thirdComId: -1,
    firstComData: [],
    secondComData: [],
    thirdComData: [],
    selectedProviderId: [-1],
    firstOrgId: 100000,
    secondOrgId: -1,
    thirdOrgId: -1,
    forthOrgId: -1,
    fifthOrgId: -1,
    firstData: [],
    secondData: [],
    thirdData: [],
    forthData: [],
    fifthData: [],
    providersData: [],
    // 某个供应商的列表
    providerTableData: {
      data: [],
      loading: false
    },
    allOrderProData: {
      data: [],
      loading: false
    }
  },
  urgent: {
    selectedTypeId: 1,
    firstComId: 101,
    secondComId: -1,
    thirdComId: -1,
    firstComData: [],
    secondComData: [],
    thirdComData: [],
    firstOrgId: 100000,
    secondOrgId: -1,
    thirdOrgId: -1,
    forthOrgId: -1,
    fifthOrgId: -1,
    firstData: [],
    secondData: [],
    thirdData: [],
    forthData: [],
    fifthData: [],
    urgentBarData: {
      data: [],
      loading: false
    },
    detailTableData: {
      data: [],
      loading: false
    }
  },
  project: {
    selectedTypeId: 1,
    firstComId: 101,
    secondComId: -1,
    thirdComId: -1,
    firstComData: [],
    secondComData: [],
    thirdComData: [],
    firstOrgId: 100000,
    secondOrgId: -1,
    thirdOrgId: -1,
    forthOrgId: -1,
    fifthOrgId: -1,
    firstData: [],
    secondData: [],
    thirdData: [],
    forthData: [],
    fifthData: [],
    detailTableData: {
      data: [],
      loading: false
    }
  },
  examine: {
    selectedTypeId: 1,
    firstComId: 101,
    secondComId: -1,
    thirdComId: -1,
    firstComData: [],
    secondComData: [],
    thirdComData: [],
    firstOrgId: 100000,
    secondOrgId: -1,
    thirdOrgId: -1,
    forthOrgId: -1,
    fifthOrgId: -1,
    firstData: [],
    secondData: [],
    thirdData: [],
    forthData: [],
    fifthData: [],
    monthBarData: {
      data: [],
      loading: false
    },
    detailTableData: {
      data: [],
      loading: false
    }
  }
}
export const PathInfo = {
  orgPath: "erp/memu/getPurchaseOrg",
  company: "erp/memu/getPurchaseOrganize",
  subcompany: "erp/memu/getPurchaseSubOrganize",
  firstCategory: "erp/memu/getPurchaseCategory",
  manageway: "erp/memu/getPurchaseControl",
  providers: "erp/memu/getPurchaseProvider",
  iallprovider: "erp/purchase/queryYearProviderTotal",
  ioverview: "erp/purchase/queryYearPurchaseAmount",
  irate: "erp/purchase/queryYearCategoryAmount",
  isave: "erp/purchase/queryYearSaveAmount",
  imanage: "erp/purchase/queryYearControlMode",
  iprovider: "erp/purchase/queryYearProviderRank",
  iurgent: "erp/purchase/queryYearUrgentPur",
  iproject: "erp/purchase/queryYearPurchaseEngineering",
  iexamine: "erp/purchase/queryYearPurchaseApprove",
  doverviewBar: "erp/purchase/queryMonthPurAmount",
  doverviewTable: "erp/purchase/queryMonthPurAmountDetail",
  drateSecondTable: "erp/purchase/queryMonthTwoCategoryAmount",
  drateThirdTable: "erp/purchase/queryMonthOrgAmount",
  dsaveBar: "erp/purchase/queryMonthPurSaveAmount",
  dsaveFirstTable: "erp/purchase/queryMonthPurSaveAmountSource",
  dmanageBar: "erp/purchase/queryMonthControlMode",
  dmanageTable: "erp/purchase/queryMonthControlModeCategory",
  // dproviderTable: "erp/purchase/queryMonthProviderRank",
  durgentBar: "erp/purchase/queryMonthUrgentPur",
  durgentTable: "erp/purchase/queryMonthUrgentPurDetail",
  dprojectTable: "erp/purchase/queryMonthPurEngineeringDetail",
  dexamineBar: "erp/purchase/queryMonthPurchaseApprove",
  dexamineTable: "erp/purchase/queryMonthPurApproveDetail",

  allProDetail: "erp/purchase/queryMonthProviderTotal",
  providerTableData: "erp/purchase/queryMonthProviderDetail",
  allProvider: "erp/purchase/queryAllProviderInfo"
}
export const DownloadUrl = {
  iallprovider: "erp/purchase/exportAllProviderInfo",
  overviewDetail: "erp/purchase/exportMonthPurAmountDetail",
  rateSecond: "erp/purchase/exportMonthTwoCategoryAmount",
  rateThird: "erp/purchase/exportMonthOrgAmount",
  saveBarDetail: "erp/purchase/exportMonthPurSaveAmount",
  saveDetail: "erp/purchase/exportMonthPurSaveAmountSource",
  manageDetail: "erp/purchase/exportMonthControlModeCategory",
  // providerDetial: "erp/purchase/exportMonthProviderRank",
  urgentDetail: "erp/purchase/exportMonthUrgentPurDetail",
  allProDetail: "erp/purchase/exportMonthProviderTotal",
  oneProvider: "erp/purchase/exportMonthProviderDetail",
  projectDetail: "erp/purchase/exportMonthPurEngineeringDetail",
  examineDetail: "erp/purchase/exportMonthPurApproveDetail"
}
export const LevelMap = ["getFirst", "getSecond", "getThird", "getForth", "getFifth"];
export const IdName = ["firstOrgId", "secondOrgId", "thirdOrgId", "forthOrgId", "fifthOrgId"]
export const SelectMap = ["selectFirst", "selectSecond", "selectThird", "selectForth", "selectFifth"];