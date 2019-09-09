import {CommonMethod} from '../common/tools/common';
// indexOrgData--有部门的图表数据（全部可下钻） indexOtherData--无部门其他表数据（成本科目可下钻）
export const manageXhrActName = ["org1", "org2", "org3", "org4", "orgold",
 "incomeTab", "costTab", "profitTab", "ratioTab",
"incomeRate", "costRate", "profitRate", "empoyeRate", "categoryRate", "keyworkerRate", "icpIndexOrgData", "icpSecondOrgData", "icpCostSubject",
"icpCostSecondSubject", "icpIndexOtherData", "regionData1", "regionData2", "regionData3", "countryData1", "countryData2", "countryData3"];
export const manageUiActName = ["searchOld", "clearList"];
export const chartDataXhrActName = ["org1", "org2", "org3", "totalData", "income", "cost", "profit", "assets", "debt", "netAssets", "corporationCompare"];
export const chartDataUiActName = ["selectOrg1", "selectOrg2", "selectOrg3"];
export const fundDataXhrActName = ["totalData", "unmarketData", "marketData", "marketYearDetail", "marketIncomeDetail", "marketPayDetail", "marketMonthRestDetail", "yearDetail", "incomeDetail", "payDetail", "monthRestDetail"];

export const manageDetailXhrActName = ["getTableData"];

export const manageXhrAction = CommonMethod.generateActions(manageXhrActName);
export const manageUiAction = CommonMethod.generateActions(manageUiActName);
export const chartDataXhrAction = CommonMethod.generateActions(chartDataXhrActName);
export const chartDataUiAction = CommonMethod.generateActions(chartDataUiActName);
export const fundDataXhrAction = CommonMethod.generateActions(fundDataXhrActName);
export const manageDetailXhrAction = CommonMethod.generateActions(manageDetailXhrActName);