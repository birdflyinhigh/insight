import {CommonMethod} from '../../common/tools/common';
export const ZHeaderXhrName = ["cityType", "region", "province", "city", "community"];
export const ZBodyXhrName = ["panelData", "communityArea", "proCons", "incomeTrend", "incomeCons", "incomeArea"];
export const ZworkXhrAct = {
  ...CommonMethod.generateActions(ZHeaderXhrName),
  ...CommonMethod.generateActions(ZBodyXhrName)
}
const ZworkUiName = ["selectEnd", "selectCityType", "selectRegion", "selectProvince", "selectCity", "selectCommunity"];
export const ZworkUiAct = CommonMethod.generateActions(ZworkUiName);