import {CommonMethod} from '../common/tools/common';

export const adminXrhActName = ["org1", "org2", "org3", "org4", "xcTotalTrend", "hotelLoseTop5", 
"ticketLostTop5", "hotelUsage", "hotelLose", "hotelCompare", 
"ticketUsage", "ticketLoseFee", "ticketLoseOutRule", "ticketCompareFee", "ticketCompareOutRule"];
export const adminUiActName = ["selectFirstOrg", "selectSecondOrg", "selectThirdOrg", "selectForthOrg",
"selectMonth", "selectYear"];
export const adminXhrAction = CommonMethod.generateActions(adminXrhActName);
export const adminUiAction = CommonMethod.generateActions(adminUiActName);