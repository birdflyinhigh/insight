import {CommonMethod} from '../../common/tools/common';
export const XhrName = ["productList", "regionList",
  "provinceList", "module", "roles", "authList",
  "hdList", "hnList", "hxList", "hbList", "hzList",
  "cyList", "bjList", "otherList", "deleteList","xnList", "sdList"
];
export const XhrAct = CommonMethod.generateActions(XhrName);