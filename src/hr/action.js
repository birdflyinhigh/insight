import {CommonMethod} from '../common/tools/common';

export const BaseXhrName = ["org1", "org2", "org3", "org4", "secKind", "staffNumber", "keyPositionRate", "leaveRate", "avgAge", "mF",
 "btrend", "staffAge", "level", "kind", "leaveRateChart", "leaveRate90Z9", "leaveAge", "leaveReason"];
// export const BaseXhrName = ["org1", "org2", "org3", "org4", "staffNumber", "keyPositionRate", "leaveRate", "avgAge", "mF",
//  "btrend", "performance", "level", "kind", "leaveReason", "keyWorkerRate", "highPerRate"];
export const BaseUiName = ["selectOrg1", "selectOrg2", "selectOrg3", "selectOrg4", "selectYear", "selectMonth", "selectLevel"];
 export const ManageXhrName = ["department", "rankPanel", "costRate", "bugetRate", "avgProduction", "perCost", "perWorktime", "structure"];
export const ManageUiName = ["selectCurdepart", "nextPage", "prevPage", "selectIndex", "selectLevel", "selectYear", "selectMonth"];
export const OverviewXhrName = ["org1", "org2", "org3", "pstaffNum", "pincome", "pcost", "proi", "costRate", "costStructure", "budgetRate", "avgProductivity", "rank"];
export const CommonDetailXhrName = ["tableData"];
export const perManageXhrActName = ["org1", "org2", "org3", "org4", "exameTab", "joinExameTab", "indexCompleteTab", "indexAvgCompleteTab",
"staff", "quitStaff", "nineBox", "orgCompare", "orgQuitStaffCompare", "indexCompleteRate"
];
export const perManageXhrUiName = ["selectOrg1", "selectOrg2", "selectOrg3", "selectOrg4", 
"selectYear", "selectMonth", "selectLevel", "selectYTD", "nextStaffCompare", "nextQuitStaffCompare"];

export const BaseXhrAct = CommonMethod.generateActions(BaseXhrName);
export const BaseUiAct = CommonMethod.generateActions(BaseUiName);
export const ManageXhrAct = CommonMethod.generateActions(ManageXhrName);
export const ManageUiAct = CommonMethod.generateActions(ManageUiName);
export const OverviewXhrAct = CommonMethod.generateActions(OverviewXhrName);
export const CommonDetailXhrAct = CommonMethod.generateActions(CommonDetailXhrName);
export const perManageXhrAct = CommonMethod.generateActions(perManageXhrActName);
export const perManageUiAct= CommonMethod.generateActions(perManageXhrUiName);