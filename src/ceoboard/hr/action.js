import {CommonMethod} from '../../common/tools/common';
export const XhrName = ["org1", "org2", "org3", "org4", "staffCons", "staffTrend", "perProductCost", "leaveRate"];
export const BaseUiName = ["selectOrg1", "selectOrg2", "selectOrg3", "selectOrg4", "selectYear", "selectMonth", "selectLevel"];

export const XhrAct = CommonMethod.generateActions(XhrName);
export const BaseUiAct = CommonMethod.generateActions(BaseUiName);