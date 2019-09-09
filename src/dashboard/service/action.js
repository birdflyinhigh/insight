import {CommonMethod} from '../../common/tools/common';

export const ServiceCommonXhrName = ["region", "province", "industry", "panelData"];
export const ServiceXhrName = ["areaServiceTrend", "areaServiceRate", "areaServiceTop", 
"industryServiceTrend", "industryerviceTop"];
export const ServiceUiName = ["clickPanelItem", "getData", 
"selectStart", "selectEnd", "selectRegion", "selectProvince", "selectIndustry"];
export const ServiceCommonXhrAct = CommonMethod.generateActions(ServiceCommonXhrName);
export const ServiceXhrAct = CommonMethod.generateActions(ServiceXhrName);
export const ServiceUiAct = CommonMethod.generateActions(ServiceUiName);
