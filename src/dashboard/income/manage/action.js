import {CommonMethod} from '../../../common/tools/common';

export const CommonManageXhrName = ["org1", "org2", "org3", "org4", "incomePanel", "costPanel", "profitPanel"]
export const DashMIncomeXhrName = ["incomeTrend", "incomeConstruct", "incomeSubjectCons", "incomeSubjectTrend"];
export const DashMCostXhrName = ["costTrend", "costConstruct", "costSubjectCons", "costSubjectTrend"];
export const DashMProfitXhrName = ["profitTrend", "profitConstruct", "profitRatio"];

export const DashManageUiName = ["selectOrg1", "selectOrg2", "selectOrg3", "selectOrg4", "selectYear", "selectMonth", "selectLevel"];

export const DashManageUiAct = CommonMethod.generateActions(DashManageUiName);
export const CommonManageAct = CommonMethod.generateActions(CommonManageXhrName);
export const DashMIncomeXhrAct = CommonMethod.generateActions(DashMIncomeXhrName);
export const DashMCostXhrAct = CommonMethod.generateActions(DashMCostXhrName);
export const DashMProfitXhrAct = CommonMethod.generateActions(DashMProfitXhrName);