export const InitialState = {
  basicInfo: {},
  incomeService: {},
  newShop: {
    loading: false,
    data: [],
    xLabel: []
  },
  keyService:  {
    loading: false,
    data: [],
    xLabel: []
  },
  serviceVIP:  {
    loading: false,
    data: [],
    xLabel: []
  },
  serviceVIPAll: 0,
  keyServiceAll: 0,
  newShopAll: 0,
  serviceAmountTop: [1, 2, 3, 4, 5, 7, 8, 9]
};
export const PathInfo = {
  basicInfo: "manager/facilitator/info",
  incomeService: "manager/facilitator/trend",
  newShop: "manager/facilitator/shopTrend",
  keyService: "manager/facilitator/AreaTrend",
  serviceVIP: "manager/facilitator/memberTrend",
  serviceAmountTop: "manager/facilitator/top"
};