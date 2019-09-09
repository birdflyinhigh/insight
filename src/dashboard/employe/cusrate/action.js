import {CommonMethod} from '../../../common/tools/common';
export const CusRateXhrName = ["getCusRateTrend"];
export const CusRateUiName = ["selectUserType", "getData"]
export const CusRateXhrAct = CommonMethod.generateActions(CusRateXhrName);
export const CusRateUiAct = CommonMethod.generateActions(CusRateUiName);