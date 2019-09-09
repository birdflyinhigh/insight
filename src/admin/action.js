import {CommonMethod} from '../common/tools/common';

export const adminXrhActName = ["org1", "org2", "org3", "org4", 
"tripTotal", "ticketPrice", "ticketAvgPrice", "hotelPrice", "hotelAvgPrice",  "xcTicketDiscount", "orgTicketDiscount",
"xcTotalTrend",  "orgFeeRate", "startDistination",
"hotelUsage", "hotelLoseTrend", "hotelCompare", 
"ticketUsage", "ticketLoseFee", "ticketLoseOutRule", "ticketCompareFee", "ticketCompareOutRule"];
export const adminUiActName = ["selectFirstOrg", "selectSecondOrg", "selectThirdOrg", "selectForthOrg",
"selectMonth", "selectYear"];
export const adminXhrAction = CommonMethod.generateActions(adminXrhActName);
export const adminUiAction = CommonMethod.generateActions(adminUiActName);