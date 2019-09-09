import {CommonMethod} from '../../common/tools/common';
export const DashHeadXhrName = ["region", "province", "industry"];
export const DashPanelXhrName = ["order", "gmv", "rate", "employNum","shopNum"];
export const DashCusXhrName = ["cusEmploy", "cusService", "employeTrend", "shopZwork", "shopBusniessContri"];
export const DashZworkXhrName = ["zworkCollect", "zworkMap"];
// export const DashManageXhrName = ["manageTab", "financialTab", "manageDetail", "staffCons","manageprofit", "financialTrend", "staffTrend"];
export const DashManageXhrName = ["manageAll", "protop5", "areaChart", "staffCons", "staffTrend"];
export const DashUiName = ["selectStart", "selectEnd", "selectRegion", "selectProvince", "selectIndustry", "selectManageDate"];
export const DashXhrAct = {
  ...CommonMethod.generateActions(DashHeadXhrName),
  ...CommonMethod.generateActions(DashPanelXhrName),
  ...CommonMethod.generateActions(DashCusXhrName),
  ...CommonMethod.generateActions(DashZworkXhrName),
  ...CommonMethod.generateActions(DashManageXhrName)
};
export const DashUiAct = CommonMethod.generateActions(DashUiName);
