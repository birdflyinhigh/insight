import moment from 'moment';
import 'moment/locale/zh-cn';
import { Methods} from '../../common/tools/util';
import {Comment} from '../comment';
moment.locale('zh-cn');
export const InitialState = {
  startTime: moment().subtract(7, 'days').format('YYYY-MM-DD'),
  // startTime: moment("2010-01-01").subtract(7, 'days').format('YYYY-MM-DD'),
  endTime: moment().subtract(1, 'days').format('YYYY-MM-DD'),
  regionId: -1,
  provinceId: -1,
  industryId: -1,
  yearId: moment().year(),
  monthId: moment().month() + 1,
  monthDate: moment(),
  // monthId: 7,
  region: [],
  province: [],
  industry: [],
  orderNumber: {},
  gmv: {},
  consumeRate: {},
  keyEmploy: {},
  keyService: {},
  cusAnaEmploy: [],
  cusBusManager: [],
  cusNoneBusManager: [],
  cusService: [],
  employeTrend: {
    data: [],
    xLabels: [],
    loading: false
  },
  shopZwork: {
    data: [],
    xLabels: [],
    loading: false
  },
  shopBusniessContri: {
    data: [],
    xLabels: [],
    loading: false
  },
  zworkCollect: [],
  zworkMap: [],
  // manage income analysis
  // icmManage: {},
  // icmFinancial: {},
  // icmMPayIncome: 0,
  // icmMPayIncomeArr: [],
  // icmMPayCost: 0,
  // icmMPayCostArr: [],
  // icmMPayProfit: 0,
  manageAll: {},
  protop5: {
    data: [],
    xLabels: [],
    loading: false
  },
  areaChart: {
    data: [],
    xLabels: [],
    loading: false
  },
  allStaff: 0,
  staffAge: [],
  staffLevel: [],
  staffKind: [],
  // manageProfit: {
  //   data:[],
  // 	xLabels:[],
  // 	loading: false
  // },
  // financialProfit: {
  //   data:[],
  // 	xLabels:[],
  // 	loading: false
  // },
  staffTrend: {
    data: [],
    xLabels: [],
    loading: false
  }
}
export const PathInfo = {
  ordergmv: "manager/revenue/getOrderIndex",
  rate: "manager/revenue/getAmountIndex",
  employshopNum: "manager/revenue/getNumIndex",
  cusEmploy: "manager/employer/getAll",
  cusService: "manager/business/getAll",
  employeTrend: "manager/business/getEmployerNumberTrend",
  shopZwork: "manager/business/getEmployer2Trend",
  shopBusniessContri: "manager/business/getEmployerNumber3Trend",
  zworkCollect: "manager/zwork/getIndex",
  zworkMap: "manager/zwork/getZworkMapData",
  // year, month, orgID, sign=0
  // manageTab: "manager/revenue/getManageRevenueData",
  // manageDetail: "manager/revenue/getManageRevenueDetails",
  // manageprofit: "manager/revenue/getManageProfit",
  // year, month, companyID=C1001
  // financialTab: "manager/revenue/getRevenueReportMonthData",
  // year, month, companyID=C1001, indexType=profit
  // financialTrend: "manager/revenue/getRevenueReportMonthlyData",
  // year, month, orgID=100000,orgLevel=1)
  staffCons: "manager/revenue/getRevenueStaffInfo",
  staffTrend: "manager/revenue/selectStaffNumTrend",
  manageAll: "manager/report/getAll",
  protop5: "manager/report/getProductTop",
  areaChart: "manager/report/getAllAreaTrend"
};
export const CusEmployeKey = [{
  name: "成交雇主数",
  link: "/manager/enum",
  key: "employer",
  subNumKey: "employerRate",
  manatips: Comment.manaEmploy,
  nonetips: Comment.noneEmploy,
}, {
  name: "成交订单",
  link: "/manager/eorder",
  key: "onumber",
  subNumKey: "onumberRate",
  manatips: Comment.manaOrder,
  nonetips: Comment.noneOrder,
}, {
  name: "GMV(万)",
  link: "/manager/eincome",
  key: "income",
  subNumKey: "incomeRate",
  manatips: Comment.manaGmv,
  nonetips: Comment.noneGmv,
}, {
  name: "订单毛利(万)",
  link: "/manager/profit",
  key: "gprofit",
  subNumKey: "gprofitRate",
  manatips: Comment.manaProfit,
  nonetips: Comment.noneProfit,
}];
export const CusServiceKey = [{
  name: "新增开店",
  nameKey: "newService",
  link: "/manager/shop",
  key: "ashop",
  subNumKey: "ashopRate",
  tips: Comment.newshop
}, {
  name: "商家收入(万)",
  nameKey: "serviceIncome",
  link: "/manager/shop",
  key: "income",
  subNumKey: "incomeRate",
  tips: Comment.shopIncome
}, {
  name: "商业贡献额(万)",
  nameKey: "serviceContri",
  link: "/manager/shop",
  key: "camount",
  subNumKey: "camountRate",
  tips: Comment.contri
}, {
  name: "有收入商家数",
  nameKey: "hasIncomeService",
  link: "/manager/shop",
  key: "incomeValue",
  subNumKey: "incomeValueRate",
  tips: Comment.incomeshop
}, {
  name: "核心商家数",
  nameKey: "keyService",
  link: "/manager/keyshop",
  subTitle: "当年累计",
  key: "core",
  // subNumKey: "coreRate",
}, {
  name: "入驻八戒工场商家数",
  nameKey: "zworkService",
  link: "/manager/zworkshop",
  subTitle: "历史累计",
  key: "factory",
  // subNumKey: "factoryRate",
  tips: Comment.zworkshop
}];

export const CusChartKey = [{
  name: "成交雇主数变化趋势",
  key: "employeTrend"
}, {
  name: "新增开店数",
  key: "shopZwork"
}, {
  name: "商家收入与商业贡献额趋势",
  key: "shopBusniessContri",
  unit: "(单位:万)"
}];
export const ManageChartKey = [{
  name: "管报利润趋势",
  unit: "(单位:万)",
  key: "manageProfit"
}, {
  name: "财报利润趋势",
  unit: "(单位:万)",
  key: "financialProfit"
}, {
  name: "人数趋势",
  key: "staffTrend"
}]
export const ZworkKey = [{
  name: "社区数",
  key: "communityCount",
  subTitle1: "已运营",
  subTitle2: "未运营",
}, {
  name: "分布城市数",
  key: "cityCount"
}, {
  name: "运营面积(万㎡)",
  key: "operateArea"
}, {
  name: "总工位数",
  key: "stationCount"
}, {
  name: "入驻企业数",
  key: "enterCompanyCount"
}, {
  name: "入驻人数",
  key: "enterUserCount"
}, {
  name: "年累计收入（万）",
  key: "totalRevenue"
}, {
  name: "工位出租率",
  key: "stationLeaseRate"
}, ]