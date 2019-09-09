import moment from 'moment';
import 'moment/locale/zh-cn';
import TableUtil from './util';
export const InitialState = {
  monthDate: moment().subtract(5, "days").format('YYYY-MM'),
  productId: [-1],
  typeId: -1,
  regionId: -1,
  target: "income",
  targetName: "收入",
  areaInfo: [{
    regionId: -1,
    regionName: "全部大区",
    provinceId: -1,
    provinceName: "",
  }],
  productList: [],
  typeList: [],
  regionList: [],
  hdList: [],
  hnList: [],
  hxList: [],
  hbList: [],
  hzList: [],
  hdList: [],
  cyList: [],
  bjList: [],
  otherList: [],
  titleNum: {},
  monthTrend: {
    data: [],
    xLabels: [],
    loading: false
  },
  productRank: [],
  regionChart: {
    data: [],
    xLabels: [],
    loading: false
  },
  typeChart: {
    data: [],
    xLabels: [],
    loading: false
  },
  tableData: {
    header: [],
    table: [],
    endCol: 0
  }
};

export const TabValue = [{
  key: "income",
  value: "收入"
},{
  key: "cost",
  value: "主营业务成本"
},{
  key: "profit",
  value: "毛利"
}];
export const RegionList = [{
  enName: "hdList",
  name: "华东大区",
  id: 1
},{
  enName: "hnList",
  name: "华南大区",
  id: 2
},{
  enName: "hxList",
  name: "华西大区",
  id: 3
},{
  enName: "hbList",
  name: "华北大区",
  id: 4
},{
  enName: "hzList",
  name: "华中大区",
  id: 5
},{
  enName: "cyList",
  name: "川渝大区",
  id: 6
},{
  enName:"bjList",
  name: "北京大区",
  id: 7,
  // nosec: true
},{
  enName:"otherList",
  name: "其它大区",
  id: 8,
  nosec: true
}];
export const PathInfo = {
  // productList: "manager/report/getProduct",
  productList: "manager/home/getProduct",
  typeList: "manager/report/getType",
  // regionList: "manager/report/getArea",
  // provinceList: "manager/report/getProvince",
  regionList: "manager/home/getArea",
  provinceList: "manager/home/getProvince",
  titleNum: "manager/report/getTitle",
  monthTrend: "manager/report/getMonthsTrend",
  productRank: "manager/report/getRank",
  regionChart: "manager/report/getAreaTrend",
  typeChart: "manager/report/getTypeTrend",
  tableData: "manager/report/getTable"
}