import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CommonMethod} from '../../common/tools/common';
import {CommonPath} from '../common/constant';
import {PathInfo} from './constant';
import IndexHeader from '../header/IndexHeader';
import IndexIncome from '../header/IndexIncome';
import TopPanel from './component/TopPanel';
import Customer from './component/Customer';
import Zwork from './component/Zwork';
import Income from './component/manage';
import Person from './component/person';
import {DashXhrAct, DashUiAct, DashCusXhrName, DashManageXhrName} from './action';
import './dindex.css';
import './manage.css';
import './media.css';
// (function getChartMap(){
//   import("echarts/map/js/china").then(_ => {
//       console.log('success');
//   });
// })();

function mapStateToProps(state){
  return {...state.statetree.dashIndex}
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(Object.assign(
    {sendRequest: CommonMethod.sendRequest}, 
    {...DashUiAct}
  ), dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class Admin extends Component{
  constructor(props){
    super(props);
    this.queryParams = {
      startTime: this.props.startTime,
      endTime: this.props.endTime,
      area: this.props.regionId,
      provence: this.props.provinceId,
      profession: this.props.industryId ,
    };
    // send useless params - detail in constant
    this.incomeParams ={
      time: this.props.monthDate.format('YYYY-MM'),
      year: this.props.yearId,
      month: this.props.monthId,
      sign: 0,
      companyID: 'C1001',
      indexType: "profit", 
      orgID: 100000,
      orgLevel: 1,
    };
    this.zworkParams = {
      regionId: this.queryParams.area,
      provinceId: this.queryParams.provence,
      cityId: -1,
      cityTypeId: -1,
      communityId: -1,
      date: this.queryParams.endTime
    };
  }
  componentDidMount(){
    // if(this.props.region.length === 0){
      this.sendHeadData.bind(this)();
      DashCusXhrName.forEach((item, index) => {
        this.props.sendRequest({
          actionName: item,
          path: PathInfo[item],
          params: this.queryParams,
          actions: DashXhrAct
        });
      });
      this.props.sendRequest({
        actionName: "zworkCollect",
        path: PathInfo["zworkCollect"],
        params: this.zworkParams,
        actions: DashXhrAct
      });
      this.props.sendRequest({
        actionName: "zworkMap",
        path: PathInfo["zworkMap"],
        params: {
          date: this.zworkParams.date
        },
        actions: DashXhrAct
      });
      DashManageXhrName.forEach((item, index) => {
        this.props.sendRequest({
          actionName: item,
          path: PathInfo[item],
          params: this.incomeParams,
          actions: DashXhrAct
        });
      });
      this.sendPanelData.bind(this)();
      // here for slow reason
      this.props.sendRequest({
        actionName: "rate",
        path: PathInfo["rate"],
        params: this.queryParams,
        actions: DashXhrAct
      });
    // }
  }
  sendHeadData(){
    this.props.sendRequest({
      actionName: "region",
      path: CommonPath.region,
      params: {},
      actions: DashXhrAct
    });
    this.props.sendRequest({ 
      actionName: "province",
      path: CommonPath.province,
      params: {
        area: this.queryParams.area
      },
      actions: DashXhrAct
    });
    this.props.sendRequest({
      actionName: "industry",
      path: CommonPath.industry,
      params: {},
      actions: DashXhrAct
    });	
  }
  sendPanelData(){
    this.props.sendRequest({
      actionName: "order",
      path: PathInfo["ordergmv"],
      params: {
        ...this.queryParams,
        indexType: "onumber"
      },
      actions: DashXhrAct
    });
    this.props.sendRequest({
      actionName: "gmv",
      path: PathInfo["ordergmv"],
      params: {
        ...this.queryParams,
        indexType: "income"
      },
      actions: DashXhrAct
    });
    // this.props.sendRequest({
    //   actionName: "rate",
    //   path: PathInfo["rate"],
    //   params: this.queryParams,
    //   actions: DashXhrAct
    // });
    this.props.sendRequest({
      actionName: "employNum",
      path: PathInfo["employshopNum"],
      params: {
        ...this.queryParams,
        indexType: "employer"
      },
      actions: DashXhrAct
    });
    this.props.sendRequest({
      actionName: "shopNum",
      path: PathInfo["employshopNum"],
      params: {
        ...this.queryParams,
        indexType: "business"
      },
      actions: DashXhrAct
    });
  }
  jumpEmploy(dataObj){
    this.props.history.push(dataObj.link, {
      startTime: this.queryParams.startTime,
      endTime: this.queryParams.endTime,
      regionId: this.queryParams.area,
      provinceId: this.queryParams.provence,
      industryId: this.queryParams.profession,
      productId: dataObj.productType
    });
  }
  jumpServiceSec(item){
    this.props.history.push(item.link, {
      startTime: this.queryParams.startTime,
      endTime: this.queryParams.endTime,
      regionId: this.queryParams.area,
      provinceId: this.queryParams.provence,
      industryId: this.queryParams.profession,
      defaultTab: item.nameKey
    });
  }
  jumpZworkPage(link){
    this.props.history.push(link, {
      endTime: this.queryParams.endTime,
      regionId: this.queryParams.area,
      provinceId: this.queryParams.provence,
    });
  }
  jumpSecondMF(address){
    this.props.history.push(address, {
      year: this.incomeParams.year,
      month: this.incomeParams.month
    });
  }
  jumpSecondICP(defaultTab, defaultTabName){
    this.props.history.push("/manager/cmanage", {
      monthDate: this.props.monthDate.format('YYYY-MM'),
      productId: [-1],
      regionId: -1,
      target: defaultTab,
      targetName: defaultTabName,
      regionName: "全部大区"
    });
  }
  jumpSecondManage(dataObj){
    this.props.history.push("/manager/cmanage", {
      monthDate: this.props.monthDate.format('YYYY-MM'),
      productId: dataObj.productId,
      regionId: dataObj.regionId,
      target: "income",
      targetName: "收入",
      regionName: dataObj.regionName
    });
  }
  selectStart(value){
    this.props.selectStart(value);
  }
  selectEnd(value){
    this.props.selectEnd(value);
  }
  selectRegion(value){
    this.props.selectRegion(value);
    this.props.selectProvince(-1);
		this.props.sendRequest({
			actionName: "province",
			path: CommonPath.province,
			params: {
				area: value
			},
			actions: DashXhrAct
		});
  }
  selectProvince(value){
    this.props.selectProvince(value);
  }
  selectIndustry(value){
    this.props.selectIndustry(value);
  }
  selectManageDate(mdate){
    this.props.selectManageDate(mdate);
    this.incomeParams.time = mdate.format('YYYY-MM');
    this.incomeParams.year = mdate.year();
    this.incomeParams.month = mdate.month() + 1;
    this.queryManageData.bind(this)();
  }
  queryData(){
    this.queryParams.startTime = this.props.startTime;
    this.queryParams.endTime = this.props.endTime;
    this.queryParams.area = this.props.regionId;
    this.queryParams.provence = this.props.provinceId;
    this.queryParams.profession = this.props.industryId;
    this.zworkParams.date = this.props.endTime;
    this.zworkParams.regionId = this.props.regionId;
    this.zworkParams.provinceId = this.props.provinceId;
    DashCusXhrName.forEach((item, index) => {
      this.props.sendRequest({
        actionName: item,
        path: PathInfo[item],
        params: this.queryParams,
        actions: DashXhrAct
      });
    });
    this.props.sendRequest({
      actionName: "zworkCollect",
      path: PathInfo["zworkCollect"],
      params: this.zworkParams,
      actions: DashXhrAct
    });
    this.props.sendRequest({
      actionName: "zworkMap",
      path: PathInfo["zworkMap"],
      params: {
        date: this.zworkParams.date
      },
      actions: DashXhrAct
    });
    this.sendPanelData.bind(this)();
    this.props.sendRequest({
      actionName: "rate",
      path: PathInfo["rate"],
      params: this.queryParams,
      actions: DashXhrAct
    });
  }
  queryManageData(){
    DashManageXhrName.forEach((item, index) => {
      this.props.sendRequest({
        actionName: item,
        path: PathInfo[item],
        params: this.incomeParams,
        actions: DashXhrAct
      });
    });
  }
  render(){
    let headerData = {
      startTime: this.props.startTime,
      endTime: this.props.endTime,
      regionId: this.props.regionId,
      provinceId: this.props.provinceId,
      industryId: this.props.industryId,
      region: this.props.region,
      province: this.props.province,
      industry: this.props.industry,
      
    };
    let headerFns = {
      selectStart:  this.selectStart.bind(this),
      selectEnd:  this.selectEnd.bind(this),
      selectRegion: this.selectRegion.bind(this),
      selectProvince: this.selectProvince.bind(this),
      selectIndustry: this.selectIndustry.bind(this),
      queryData: this.queryData.bind(this)
    };
    let cusFns = {
      jumpEmploySec: this.jumpEmploy.bind(this),
      jumpServiceSec: this.jumpServiceSec.bind(this)
    };
    let manageFns = {
      jumpSecondMF: this.jumpSecondMF.bind(this),
      jumpSecondICP: this.jumpSecondICP.bind(this),
      selectManageDate: this.selectManageDate.bind(this),
      jumpSecondManage: this.jumpSecondManage.bind(this)
    };
    let panelData = {
      orderNumber: this.props.orderNumber,
      gmv: this.props.gmv,
      consumeRate:this.props.consumeRate,
      keyEmploy: this.props.keyEmploy,
      keyService: this.props.keyService,
    };
    let zworkData = {
      zworkMap: this.props.zworkMap,
      zworkCollect: this.props.zworkCollect
    }
    return <div className="hr-bg">
        <div className="dash-container">
          <h1 className="dash-pagetitle">业务数据模块</h1>
          <IndexHeader data={headerData} fns={headerFns}/>
          <TopPanel jumpFn={this.jumpEmploy.bind(this)} data={panelData}/>
          <Customer {...this.props} fns={cusFns}/>
          <Zwork {...zworkData} jumpfn={this.jumpZworkPage.bind(this)}/>
          <h1 className="dash-pagetitle">营收数据模块</h1>
          {/* <IndexIncome data={incomeHeader} fns={incomeHeaderFns}/> */}
          <Income {...this.props} fns={manageFns}/>
          <Person {...this.props} fns={manageFns}/>
        </div>
        
      </div>
  }
}