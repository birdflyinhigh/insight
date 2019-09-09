import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import FManage from './financial/managedata/Container';
import FChartdata from './financial/chartdata/Container';
import FinancialFund from './financial/funddata/Container';
import FinancialManageDetail from './financial/managedetail/Container';
import Purchase from './purchase/container/Puchase';
import SubOverview from './purchase/container/SubOverview';
import SubRate from './purchase/container/SubRate';
import SubSave from './purchase/container/SubSave';
import SubManage from './purchase/container/SubManage';
import SubProvider from './purchase/container/SubProvider';
import SubUrgent from './purchase/container/SubUrgent';
import SubProject from './purchase/container/SubProject';
import SubExamine from './purchase/container/SubExamine';

import HrBase from './hr/base/Container';
import HrManage from './hr/manage/Container';
import HrOverview from './hr/overview/Container';
import HrPerformance from './hr/performance/Container';
import KeyDetail from './hr/detailtables/keyposition/Container';
import kindDetail from './hr/detailtables/kind/Container';
import levelDetail from './hr/detailtables/level/Container';
import quiteDetail from './hr/detailtables/quite/Container';
import quite90z9Detail from './hr/detailtables/quite90z9/Container';
import quiteageDetail from './hr/detailtables/quiteage/Container';
import quiterateDetail from './hr/detailtables/quiterate/Container';
import quitereasonDetail from './hr/detailtables/quitereason/Container';
import staffageDetail from './hr/detailtables/staffage/Container';
import worktimeDetail from './hr/detailtables/worktime/Container';
import performanceDetail from './hr/detailtables/performance/Container';
import pmstaffDetail from './hr/detailtables/permanage/staff/Container';
import pmcontriDetail from './hr/detailtables/permanage/contribute/Container';
import pmindexDetail from './hr/detailtables/permanage/index/Container';
// import Admin from './administration/Container';
import Admin from './admin/Container';

import managerIndex from './dashboard/index/Container';
import DashHrBase from './dashboard/income/hr/Container';
import DashManageICP from './dashboard/income/manage/Container';
import DashFinancial from './dashboard/income/financial/Container';
import DashService from './dashboard/service/CommonContainer';
import DashKeyService from './dashboard/service/KeyServiceContainer';
import DashZworkService from './dashboard/service/ZworkServiceContainer';
import DashKeyemploy from './dashboard/employe/keyemploy/Container';
import DashCusRate from './dashboard/employe/cusrate/Container';
import DashProfit from './dashboard/employe/profit/Container';
import DashNOINum from './dashboard/employe/numorderincome/ENumContainer';
import DashNOIOrder from './dashboard/employe/numorderincome/OrderContainer';
import DashNOIIncome from './dashboard/employe/numorderincome/IncomeContainer';
import DashZwork from './dashboard/zwork/Container';
import DashCmanage from './dashboard/income/cmanage/Container';
import CEOIndex from './ceoboard/index/Container';
import CEOAuth from './ceoboard/authority/Container';
export default () => (
  <Router>
    <div>
    {/* <Redirect exact from='/' to='/manager/index' /> */}
    <Route path='/fmanage' exact render={(props) => {return <FManage {...props}/>}}/>
    <Route path='/fmdetail' exact render={(props) => {return <FinancialManageDetail {...props}/>}}/>
    <Route path='/fchartdata' exact component={FChartdata} />
    <Route path='/ffund' exact component={FinancialFund} />
    <Route path='/purchase' exact component={Purchase} />
    <Route path='/purchase/puroverview' exact render={(props) => {return <SubOverview {...props}/>}} />
    <Route path='/purchase/purrate' exact  render={(props) => {return <SubRate {...props}/>}} />
    <Route path='/purchase/pursave' exact  render={(props) => {return <SubSave {...props}/>}} />
    <Route path='/purchase/purmanage' render={(props) => {return <SubManage {...props}/>}} />
    <Route path='/purchase/purprovider' render={(props) => {return <SubProvider {...props}/>}}  />
    <Route path='/purchase/pururgent' exact render={(props) => {return <SubUrgent {...props}/>}}  />
    <Route path='/purchase/purproject' exact render={(props) => {return <SubProject {...props}/>}}  />
    <Route path='/purchase/purexamine' exact render={(props) => {return <SubExamine {...props}/>}}  />
    <Route path='/hr' exact component={HrBase} />
    <Route path='/hrmanage' exact component={HrManage} />
    <Route path='/hroverview' exact component={HrOverview} />
    <Route path='/hrpermanage' exact component={HrPerformance} />
    <Route path='/keytable' exact component={KeyDetail} />
    <Route path='/kindtable' exact component={kindDetail} />
    <Route path='/leveltable' exact component={levelDetail} />
    <Route path='/quitetable' exact component={quiteDetail} />
    <Route path='/quite90z90table' exact component={quite90z9Detail} />
    <Route path='/quiteagetable' exact component={quiteageDetail} />
    <Route path='/quiteratetable' exact component={quiterateDetail} />
    <Route path='/quitereasontable' exact component={quitereasonDetail} />
    <Route path='/staffagetable' exact component={staffageDetail} />
    <Route path='/perworktime' exact component={worktimeDetail} />
    <Route path="/performance" exact component={performanceDetail} />
    <Route path="/hr/pmstafftable" exact component={pmstaffDetail} />
    <Route path="/hr/pmindextable" exact component={pmindexDetail} />
    <Route path="/hr/pmcontritable" exact component={pmcontriDetail} />
    <Route path="/admin" exact component={Admin} />
    {/* <Route path="/manager/index" exact component={managerIndex} /> */}
    <Route path="/manager/" component={CEOIndex} />
    <Route path="/secmanager/ihr" exact component={DashHrBase} />
    <Route path="/ceoauth" exact component={CEOAuth} />
    {/*<Route path="/manager/financial" exact component={DashFinancial} />
    <Route path="/manager/icp" exact component={DashManageICP} />
    <Route path="/manager/shop" exact component={DashService} />
    <Route path="/manager/keyshop" exact component={DashKeyService} />
    <Route path="/manager/zworkshop" exact component={DashZworkService} />
    <Route path="/manager/kemploy" exact component={DashKeyemploy} />
    <Route path="/manager/cusrate" exact component={DashCusRate} />
    <Route path="/manager/profit" exact component={DashProfit} />
    <Route path="/manager/enum" exact component={DashNOINum} />
    <Route path="/manager/eorder" exact component={DashNOIOrder} />
    <Route path="/manager/eincome" exact component={DashNOIIncome} />
    <Route path="/manager/zwork" exact component={DashZwork} /> */}
    <Route path="/secmanager/cmanage" exact component={DashCmanage}/>
    {/* <Route component={NotFound} /> */}
    </div>
  </Router>)



