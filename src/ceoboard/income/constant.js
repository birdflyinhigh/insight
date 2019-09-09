export const InitialState = {
  incomeTab: {},
  incomeTrend: {
    loading: false,
    data: [
      []
    ],
    xLabel: []
  },
  incomeType: {
    loading: false,
    data: [
      []
    ],
    xLabel: []
  },
  areaStatus: {
    loading: false,
    data: [
      []
    ],
    xLabel: []
  },
  incomeRank: []
};
export const PathInfo = {
  incomeTab: "manager/revenue/getTitle",
  incomeTrend: "manager/revenue/incomeTrend",
  incomeType: "manager/revenue/incomeType",
  areaStatus: "manager/revenue/areaTrend",
  incomeRank: "manager/revenue/rankingList"
};
