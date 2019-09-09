import {CommonMethod} from '../../common/tools/common';
export const HeaderXhrName = ["region", "province", "product", "city"];
const HeaderUiName = ["selectStart", "selectEnd", "selectRegion", 
"selectProvince", "selectProduct", "selectChannel", "selectCity"];
export const HeaderXhrAct = CommonMethod.generateActions(HeaderXhrName);
export const HeaderUiAct = CommonMethod.generateActions(HeaderUiName);
export const TopXhrName = ["smallBNumber", "authority", "finishRequest", "changeTab"];
export const TopXhrAct = CommonMethod.generateActions(TopXhrName);