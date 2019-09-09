import { CommonMethod } from '../../common/tools/common';
const ZHeaderXhrName = ["cityType", "region", "province", "city", "community"];
export const BodyXhrName = ["zworkSign", "zworkCons", "stationSign", "newSignStation", "newSignAmount", "receiptSituation"];
const ZworkUiName = ["selectEnd", "selectCityType", "selectRegion", "selectProvince", "selectCity", "selectCommunity"];
export const ZworkXhrAct = {
  ...CommonMethod.generateActions(BodyXhrName),
  ...CommonMethod.generateActions(ZHeaderXhrName)
}
export const ZworkUiAct = CommonMethod.generateActions(ZworkUiName);