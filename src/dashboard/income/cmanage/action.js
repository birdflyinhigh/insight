import {CommonMethod} from '../../../common/tools/common';
const CmanageUiActName = ["chooseDate", "chooseProduct", "chooseType", "chooseProvince", 
"chooseRegion", "deleteArea", "chooseTarget", "clearArea", "clearProduct"];
const CmanageHeaderActName = ["productList", "typeList", "regionList", "hdList", "hnList",
 "hxList", "hbList", "hzList", "cyList", "bjList"];
export const CmanageXhrActName = ["titleNum", "monthTrend", "productRank", "regionChart", "typeChart", "tableData"];
export const CmanageUiAct = CommonMethod.generateActions(CmanageUiActName);
export const CmanageXhrAct = {
  ...CommonMethod.generateActions(CmanageHeaderActName),
  ...CommonMethod.generateActions(CmanageXhrActName)
}