import {combineReducers} from 'redux';
import purchaseReducer from './purchase/reducer/reducer';
import baseReducer from './hr/base/reducer';
import manageReducer from './hr/manage/reducer';
import overviewReducer from './hr/overview/reducer';
import hrperManageReducer from './hr/performance/reducer';
import fmanageReducer from './financial/managedata/reducer';
import fmanageDetailReducer from './financial/managedetail/reducer';
import fchartReducer from './financial/chartdata/reducer';
import ffundReducer from './financial/funddata/reducer';
import KeyDetailReducer from './hr/detailtables/keyposition/reducer';
import kindReducer from './hr/detailtables/kind/reducer';
import levelReducer from './hr/detailtables/level/reducer';
import quiteReducer from './hr/detailtables/quite/reducer';
import quite90z9Reducer from './hr/detailtables/quite90z9/reducer';
import quiteageReducer from './hr/detailtables/quiteage/reducer';
import quiterateReducer from './hr/detailtables/quiterate/reducer';
import quitereasonReducer from './hr/detailtables/quitereason/reducer';
import staffageReducer from './hr/detailtables/staffage/reducer';
import ceoTrafficReducer from './ceoboard/traffic/reducer';
import ceoConvertReducer from './ceoboard/convert/reducer';
import ceoTrafficDetailReducer from './ceoboard/trafficHeat/reducer';
import ceoHeatSearchReducer from './ceoboard/heatsearch/reducer';
import ceoHeatSearchSecondReducer from './ceoboard/heatsearchsecond/reducer';
// import adminReducer from './administration/reducer';
import adminReducer1 from './admin/reducer';
// import dashIndexReducer from './dashboard/index/reducer';
import dashHrReducer from './dashboard/income/hr/reducer';
// import dashManageReducer from './dashboard/income/manage/reducer';
// import dashFiancialReducer from './dashboard/income/financial/reducer';
// import dashServiceReducer from './dashboard/service/reducer';
// import dashKeyemployReducer from './dashboard/employe/keyemploy/reducer';
// import dashCusrateReducer from './dashboard/employe/cusrate/reducer';
// import dashProfitReducer from './dashboard/employe/profit/reducer';
// import dashNOIReducer from './dashboard/employe/numorderincome/reducer';
// import dashCommonEmployReducer from './dashboard/employe/commonReducer';
// import dashZworkReducer from './dashboard/zwork/reducer';
import dashCManageReducer from './dashboard/income/cmanage/reducer';
import ceoUserReducer from './ceoboard/user/reducer';
// ceo
import ceoIndexHeader from './ceoboard/index/reducer';
import ceoEmployeReducer from './ceoboard/employ/reducer';
import ceoHrReducer from './ceoboard/hr/reducer';
import ceoIncomeReducer from './ceoboard/income/reducer';
import ceoManagerReducer from './ceoboard/manager/reducer';
import ceoOrderReducer from './ceoboard/order/reducer';
import ceoServiceReducer from './ceoboard/service/reducer';
import ceoZworkReducer from './ceoboard/zwork/reducer';
import ceoAuthReducer from './ceoboard/authority/reducer';
import ceoFlowAnalysisReducer from './ceoboard/flowAnalysis/reducer';

export default combineReducers({
    fmanage: fmanageReducer,
    fchartdata: fchartReducer,
    ffunddata: ffundReducer,
    fdmanage: fmanageDetailReducer,
    purchase: purchaseReducer,
    base: baseReducer,
    manage: manageReducer,
    overview: overviewReducer,
    hrperManage: hrperManageReducer,
    keyTable: KeyDetailReducer,
    kindTable: kindReducer,
    levelTable: levelReducer,
    quiteTable: quiteReducer,
    quite90z9Table: quite90z9Reducer,
    quiteageTable: quiteageReducer,
    quiterateTable: quiterateReducer,
    quitereasonTable: quitereasonReducer,
    staffageTable: staffageReducer,
    // admin: adminReducer,
    admin1: adminReducer1,
    // dashIndex: dashIndexReducer,
    dashihr: dashHrReducer,
    // dashmanage: dashManageReducer,
    // dashfinancial: dashFiancialReducer,
    // dashService: dashServiceReducer,
    // dashComEmploy: dashCommonEmployReducer,
    // dashKeyemploy: dashKeyemployReducer,
    // dashCusrate: dashCusrateReducer,
    // dashProfit:  dashProfitReducer,
    // dashnoi: dashNOIReducer,
    // dashZwork: dashZworkReducer,
    dashcmanage: dashCManageReducer,
    ceoIndex: ceoIndexHeader,
    ceoEmploye: ceoEmployeReducer,
    ceoHr: ceoHrReducer,
    ceoIncome: ceoIncomeReducer,
    ceoManager: ceoManagerReducer,
    ceoOrder: ceoOrderReducer,
    ceoService: ceoServiceReducer,
    ceoZwork: ceoZworkReducer,
    ceoAuth: ceoAuthReducer,
    ceoTraffic: ceoTrafficReducer,
    ceoConvert: ceoConvertReducer,
    ceoTrafficDetail: ceoTrafficDetailReducer,
    ceoHeatSearch: ceoHeatSearchReducer,
    ceoHeatSearchSecond: ceoHeatSearchSecondReducer,
    ceoFlowAnalysis: ceoFlowAnalysisReducer,
    ceoUser: ceoUserReducer
});