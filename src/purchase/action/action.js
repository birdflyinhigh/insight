import {createAction} from 'redux-act';
import {CommonMethod} from '../../common/tools/common';
export const xhrActionName = {
  index: ["getFirstCom", "getSecondCom", "getThirdCom", "getFirst", "getSecond", "getThird", "getForth", "getFifth", "allProviderDetail",  "manage", "overview", "rate", "save","provider", "urgent", "project", "examine", "allprovider"],
  overview: ["getFirstCom", "getSecondCom", "getThirdCom", "getFirst", "getSecond", "getThird", "getForth", "getFifth", "overviewBar", "overviewTable"],
  rate: ["getFirstCom", "getSecondCom", "getThirdCom", "getFirst", "getSecond", "getThird", "getForth", "getFifth", "category", "rateSecondTable",  "rateThirdTable"],
  save: ["getFirstCom", "getSecondCom", "getThirdCom", "getFirst", "getSecond", "getThird", "getForth", "getFifth", "saveBar", "saveFirstTable"],
  manage: ["getFirstCom", "getSecondCom", "getThirdCom", "getFirst", "getSecond", "getThird", "getForth", "getFifth", "manageway", "manageBar", "manageTable"],
  provider: ["getFirstCom", "getSecondCom", "getThirdCom", "getFirst", "getSecond", "getThird", "getForth", "getFifth", "providers", "allproTrade", "oneProvider"],
  urgent: ["getFirstCom", "getSecondCom", "getThirdCom", "getFirst", "getSecond", "getThird", "getForth", "getFifth", "urgentBar", "urgentTable"],
  project: ["getFirstCom", "getSecondCom", "getThirdCom", "getFirst", "getSecond", "getThird", "getForth", "getFifth", "projectTable"],
  examine: ["getFirstCom", "getSecondCom", "getThirdCom", "getFirst", "getSecond", "getThird", "getForth", "getFifth", "examineBar", "examineTable"]
};
let uiActionName = {
  index: ["iselectType", "selectFirstCom", "selectSecondCom", "selectThirdCom", "selectFirst", "selectSecond", "selectThird", "selectForth", "selectFifth", "chooseLevel"],
  overview: ["oselectType", "selectFirstCom", "selectSecondCom", "selectThirdCom", "selectFirst", "selectSecond", "selectThird", "selectForth", "selectFifth"],
  rate: ["rselectType", "selectFirstCom", "selectSecondCom", "selectThirdCom", "selectFirst", "selectSecond", "selectThird", "selectForth", "selectFifth", "rselectCategory"],
  save: ["sselectType", "selectFirstCom", "selectSecondCom", "selectThirdCom",  "selectFirst", "selectSecond", "selectThird", "selectForth", "selectFifth"],
  manage: ["mselectType","selectFirstCom", "selectSecondCom", "selectThirdCom",  "selectFirst", "selectSecond", "selectThird", "selectForth", "selectFifth", "mselectManage"],
  provider: ["pselectType", "selectFirstCom", "selectSecondCom", "selectThirdCom",  "selectFirst", "selectSecond", "selectThird", "selectForth", "selectFifth", "pselectProvider"],
  urgent: ["uselectType", "selectFirstCom", "selectSecondCom", "selectThirdCom",  "selectFirst", "selectSecond", "selectThird", "selectForth", "selectFifth"],
  project: ["prselectType", "selectFirstCom", "selectSecondCom", "selectThirdCom",  "selectFirst", "selectSecond", "selectThird", "selectForth", "selectFifth"],
  examine: ["eselectType", "selectFirstCom", "selectSecondCom", "selectThirdCom",  "selectFirst", "selectSecond", "selectThird", "selectForth", "selectFifth"]
};
export const indexAction = CommonMethod.generateActions(xhrActionName.index);
export const overviewAction = CommonMethod.generateActions(xhrActionName.overview);
export const rateAction = CommonMethod.generateActions(xhrActionName.rate);
export const saveAction = CommonMethod.generateActions(xhrActionName.save);
export const manageAction = CommonMethod.generateActions(xhrActionName.manage);
export const providerAction = CommonMethod.generateActions(xhrActionName.provider);
export const urgentAction = CommonMethod.generateActions(xhrActionName.urgent);
export const projectAction = CommonMethod.generateActions(xhrActionName.project);
export const examineAction = CommonMethod.generateActions(xhrActionName.examine);

export const indexUiAction = CommonMethod.generateActions(uiActionName.index);
export const overviewUiAction = CommonMethod.generateActions(uiActionName.overview);
export const saveUiAction = CommonMethod.generateActions(uiActionName.save);
export const urgentUiAction = CommonMethod.generateActions(uiActionName.urgent);
export const rateUiAction = CommonMethod.generateActions(uiActionName.rate);
export const manageUiAction = CommonMethod.generateActions(uiActionName.manage);
export const providerUiAction = CommonMethod.generateActions(uiActionName.provider);
export const projectUiAction = CommonMethod.generateActions(uiActionName.project);
export const examineUiAction = CommonMethod.generateActions(uiActionName.examine);