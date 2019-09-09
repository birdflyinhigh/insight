export const InitialState = {
  proTrend:  {
    loading: false,
    data: [],
    xLabel: []
  },
  proKind: {
    loading: false,
    data: [],
    xLabel: []
  },
  proRate: {
    loading: false,
    data: [],
    xLabel: []
  },
  areaTrend: {
    loading: false,
    data: [],
    xLabel: []
  },
  areaRate:  {
    loading: false,
    data: [],
    xLabel: []
  },
  areaTop:  {
    loading: false,
    data: [],
    xLabel: []
  },
  industryTrend: {
    loading: false,
    data: [],
    xLabel: []
  },
  industryTop:  {
    loading: false,
    data: [],
    xLabel: []
  }
};
export const PathInfo = {
  proTrend: "manager/employer/getEmployerProductTrend",
  proRate: "manager/employer/getEmployerProductRate",
  areaTrend: "manager/employer/getEmployerAreaTrend",
  areaRate: "manager/employer/getEmployerAreaRate",
  areaTop: "manager/employer/getEmployerAreaTop",
  industryTrend: "manager/employer/getEmployerProfessionTrend",
  industryTop: "manager/employer/getEmployerProfessionTop"
}