import moment from 'moment';
export const InitialState = {
  startTime: moment().subtract(7, 'days').format('YYYY-MM-DD'),
  endTime: moment().subtract(1, 'days').format('YYYY-MM-DD'),
  productId: -1,
  regionId: -1,
  provinceId: -1,
  industryId: -1,
  region: [],
  province: [],
  industry: [],
  panelData: [],
}
