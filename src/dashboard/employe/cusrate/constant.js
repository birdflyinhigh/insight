import moment from 'moment';
export const InitialState = {
  defaultStartTime: moment().subtract(365, 'days').format('YYYY-MM-DD'),
  userTypeId: -1,
  userType: [{
    name: "全部",
    value: -1
  },{
    name: "雇主",
    value: 1
  },{
    name: "服务商",
    value: 2
  },{
    name: "核心雇主",
    value: 3
  },{
    name: "核心服务商",
    value: 4
  }],
  flowData: {}
}
export const PathInfo = {
  trend: "manager/employer/getEmployerRateTrend"
};