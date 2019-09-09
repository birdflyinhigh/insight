import moment from 'moment';
export const InitialState = {
  defaultStartTime: `${(new Date()).getFullYear()}-01-01`,
  trend: {
    loading: false,
    data: [],
    xLabel: []
  }
}
export const PathInfo = {
  trend: "manager/employer/getEmployerProductTrend"
};