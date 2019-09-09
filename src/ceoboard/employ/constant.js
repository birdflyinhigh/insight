export const InitialState = {
  basisInfo: [],
  employNumTrend: {
    loading: false,
    data: [],
    xlabel: []
  },
  employArea: {
    loading: false,
    data: [],
    xlabel: []
  },
  employProduct: {
    loading: false,
    data: [],
    xlabel: []
  },
  employTop: [],
  employAreaAll: 0,
  employProductAll: 0
};
export const PathInfo = {
  basisInfo: "manager/employer/info",
  employNumTrend: "manager/employer/trend",
  employArea: "manager/employer/AreaTrend",
  employProduct: "manager/employer/productTrend",
  employTop: "manager/employer/top"
}