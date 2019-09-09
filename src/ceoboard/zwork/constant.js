export const InitialState = {
  regionId: -1,
  provinceId: -1,
  cityId: -1,
  communityId: -1,
  cityType: [],
  region: [],
  province: [],
  city: [],
  community: [],
  zworkSign: {
    data: [],
    loading: true,
    xLabel: []
  },
  zworkCons: {
    data: [],
    loading: true,
    xLabel: []
  },
  stationSign: {
    data: [],
    loading: true,
    xLabel: []
  },
  newSignStation: {
    data: [],
    loading: true,
    xLabel: []
  },
  investment: {
    data: {},
    loading: false,
    xLabel: []
  },
  yearInvestment: {
    data: {},
    loading: false,
    xLabel: []
  },
  continueInvestment: {
    data: {},
    loading: false,
    xLabel: []
  },
  stopInvestment: {
    data: {},
    loading: false,
    xLabel: []
  },
  receiptSituation: {
    data: [],
    loading: true,
    xLabel: []
  },
  zworkSignAll: 0,
  zworkConsAll: 0,
  stationSignAll: 0,
  newSignStationAll: 0,
  newSignCount: 0,
  newSignCus: 0,
  investAll: 0,
  yearInvestAll: 0,
  continueInvestAll: 0,
  stopInvestAll: 0,
  receiptSituationAll: 0,
  signRoaming: 0
};
export const PathInfo = {
  region: "manager/zwork/getAllRegion",
  province: "manager/zwork/getProvinceByRegionId",
  city: "manager/zwork/getCityByProvinceId",
  community: "manager/zwork/getCommunityByCityId",
  zworkSign: "manager/factory/customForm",
  zworkCons: "manager/factory/communityForm",
  stationSign: "manager/factory/contractStatus",
  newSignStation: "/manager/factory/newContractStatus",
  newSignAmount:"/manager/factory/zworkBusiness",
  receiptSituation: "/manager/factory/receivables",
};