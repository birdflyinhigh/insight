export const InitialState = {
  mtopCard: {
    custom:0,
    followCustom:0,
    pay:0
  },
  sales: {
    loading: false,
    data: [],
    xLabel: []
  },
  profit: {
    loading: false,
    data: [],
    xLabel: []
  },
  refound: {
    loading: false,
    data: [],
    xLabel: []
  },
  salesTrend: {
    loading: false,
    data: [],
    xLabel: []
  },
  profitTrend: {
    loading: false,
    data: [],
    xLabel: []
  },
  refoundTrend: {
    loading: false,
    data: [],
    xLabel: []
  },
  salesAll: 0,
  profitAll: 0,
  refoundAll: 0
};
export const PathInfo = {
  mtopCard: "/manager/steward/info", 
  sales: "/manager/steward/saleroomForm", 
  profit: "/manager/steward/profileForm", 
  refound: "/manager/steward/refundForm", 
  salesTrend: "/manager/steward/saleAndExpendTrend", 
  profitTrend: "/manager/steward/profileTrend", 
  refoundTrend: "/manager/steward/refundTrend"
};
