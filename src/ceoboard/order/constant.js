export const InitialState = {
  orderOverview: {
    orderedData: [],
    width: [0, 0, 0]
  },
  orderDistribute: {
    loading: false,
    data: [],
    xLabel: []
  },
  orderStatus: {
    loading: false,
    data: [],
    xLabel: []
  },
  orderTrend: {
    loading: false,
    data: [],
    xLabel: []
  },
  distributeAll: 0,
  assignAll: 0,
  orderIndexRank: [] 
};
export const PathInfo = {
  orderOverview: "manager/order/overview",
  orderDistribute: "manager/order/allocation",
  orderStatus: "manager/order/dispatch",
  orderTrend: "manager/order/trend",
  orderIndexRank: "manager/order/rank"
};