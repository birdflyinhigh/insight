import {CommonMethod} from '../../common/tools/common';
export const commonUiName = ["selectStart", "selectEnd", "selectRegion", "selectProvince", "selectProduct", "selectIndustry", "getComData"];
export const commonXhrName = ["region", "province", "industry", "panelData"];
export const commonEmployUiAct = CommonMethod.generateActions(commonUiName);
export const commonEmployXhrAct = CommonMethod.generateActions(commonXhrName);
