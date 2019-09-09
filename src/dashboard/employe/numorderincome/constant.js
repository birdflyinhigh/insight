export const InitialState = {
  proEtrend: {
    loading: false,
    data: [],
    xLabel: []
  },
  proErate: {
    loading: false,
    data: [],
    xLabel: []
  },
  areaEtrend: {
    loading: false,
    data: [],
    xLabel: []
  },
  areaEtrend: {
    loading: false,
    data: [],
    xLabel: []
  },
  areaErate: {
    loading: false,
    data: [],
    xLabel: []
  },
  areaETop: {
    loading: false,
    data: [],
    xLabel: []
  },
  industryEtrend: {
    loading: false,
    data: [],
    xLabel: []
  },
  industryEtop: {
    loading: false,
    data: [],
    xLabel: []
  }
};
export const PathInfo = {
  proEtrend: "manager/employer/getEmployerProductTrend",
  proErate: "manager/employer/getEmployerProductRate",
  areaEtrend: "manager/employer/getEmployerAreaTrend",
  areaErate: "manager/employer/getEmployerAreaRate",
  areaETop: "manager/employer/getEmployerAreaTop",
  industryEtrend: "manager/employer/getEmployerProfessionTrend",
  industryEtop: "manager/employer/getEmployerProfessionTop"
};
export const EmployPageTitles = {
  employe: [
    "企业管家与非企业管家成交雇主数变化趋势",
    "企业管家与非企业管家成交雇主数占比",
    "各地区成交雇主数变化趋势",
    "各地区成交雇主数占比",
    "全国各省成交雇主数排名-TOP10",
    "各行业成交雇主数变化趋势",
    "各行业成交雇主数-TOP10"
  ],
  serverorder: [
    "各产品成交订单数变化趋势",
    "成交订单数产品构成",
    "各地区成交订单数变化趋势",
    "各地区成交订单数占比",
    "全国各省成交订单数排名-TOP10",
    "各行业成交订单数变化趋势",
    "各行业成交订单数-TOP10"
  ],
  income: [
    "各产品GMV变化趋势",
    "GMV产品构成",
    "各地区GMV变化趋势",
    "各地区GMV占比",
    "全国各省GMV数排名-TOP10",
    "各行业GMV变化趋势",
    "各行业GMV-TOP10"
  ]
}