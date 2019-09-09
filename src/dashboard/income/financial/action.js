import {CommonMethod} from '../../../common/tools/common';
export const chartPanelXhrActName = ["pincome", "pcost", "pprofit", "passets", "pdebt", "pnetAssets"]
export const chartDataXhrActName = ["org1", "org2", "org3", "totalData", "income", "cost", "profit", "assets", "debt", "netAssets", "corporationCompare"];
export const chartDataUiActName = ["selectOrg1", "selectOrg2", "selectOrg3"];

export const chartDataXhrAction = {
  ...CommonMethod.generateActions(chartPanelXhrActName),
  ...CommonMethod.generateActions(chartDataXhrActName)
};
export const chartDataUiAction = CommonMethod.generateActions(chartDataUiActName);
