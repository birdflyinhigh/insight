import moment from 'moment';
export const InitialState = {
  endTime: moment().subtract(1, "days").format('YYYY-MM-DD'),
  cityTypeId: -1,
  regionId: -1,
  provinceId: -1,
  cityId: -1,
  communityId: -1,
  cityType: [],
  region: [],
  province: [],
  city: [],
  community: [],
  panelData: {},
  communityArea: {
    data: [],
    xLabels: [],
    name: []
  },
  proCons: {
    data: [],
    xLabels: [],
    name: []
  },
  stationRent: [],
  incomeTrend: {
    data: [],
    xLabels: [],
    name: []
  },
  incomeCons: {
    data: [],
    xLabels: [],
    name: []
  },
  incomeArea: {
    data: [],
    xLabels: [],
    name: []
  }
};
export const PathInfo = {
  cityType: "manager/zwork/getCityType",
  region: "manager/zwork/getAllRegion",
  province: "manager/zwork/getProvinceByRegionId",
  city: "manager/zwork/getCityByProvinceId",
  community: "manager/zwork/getCommunityByCityId",
  panelData: "manager/zwork/getIndex",
  communityArea: "manager/zwork/getCommunityRegionalDistribution",
  proCons: "manager/zwork/getStationMakeUp",
  incomeTrend: "manager/zwork/getRevenueRange",
  incomeCons: "manager/zwork/getRevenueMakeUp",
  incomeArea: "manager/zwork/getRevenueRegionalDistribution"
};
export const ChartTitle = {
  communityArea: "社区地域分布",
  proConst: "产品构成",
  stationRent: "工位出租情况",
  incomeTrend: "前12月收入变化趋势",
  incomeCons: "累计收入构成",
  incomeArea: "累计收入地域分布"
};