import {CommonMethod} from '../../../common/tools/common';

export const BaseXhrName = ["org1", "org2", "org3", "org4", "secKind", "staffNumber", "keyPositionRate", "leaveRate", "avgAge", "mF",
 "btrend", "staffAge", "level", "kind", "leaveRateChart", "leaveRate90Z9", "perProCost", "leaveReason"];

export const BaseUiName = ["selectOrg1", "selectOrg2", "selectOrg3", "selectOrg4", "selectYear", "selectMonth", "selectLevel"];

export const BaseXhrAct = CommonMethod.generateActions(BaseXhrName);
export const BaseUiAct = CommonMethod.generateActions(BaseUiName);
