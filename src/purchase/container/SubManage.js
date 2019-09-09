import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, Route} from 'react-router-dom';

import ManageDetail from '../component/detail/ManageDetail';
import DetailHeader from '../component/header/detailHeader';
import {Methods} from '../../common/tools/util';
import {CommonMethod} from '../../common/tools/common';
import {manageAction, manageUiAction, xhrActionName} from '../action/action';
import {PathInfo, DownloadUrl, LevelMap, SelectMap, IdName} from '../constants';
function getDefaultOption(context) {
  let state = context.props.location.state;
  let temp = {
    org1ID: 101,
    org2ID: -1,
    org3ID: -1
  }
  if (context.organizeType == 1) {
    temp.org1ID = state && state.org1ID  ? state.org1ID : 101;
  }else{
    temp.org1ID = state && state.org1ID ? state.org1ID : 101;
  }
    temp.org2ID = state && state.org2ID ? state.org2ID : -1;
    temp.org3ID = state && state.org3ID ? state.org3ID : -1;
  return temp;
}
function mapStateToProps(state){
  let indexState = state.statetree.purchase.index;
  return {...state.statetree.purchase.manage};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(Object.assign({sendRequest: CommonMethod.sendRequest}, manageUiAction), dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class DetailPage extends Component{
  constructor(props){
    super(props);
    this.organizeType = props.location.state && props.location.state.defaultType ? props.location.state.defaultType : 1,
    this.queryParams = {
      months: '1,2,3,4,5,6,7,8,9,10,11,12',
      organizeType: this.organizeType,
      org1ID: getDefaultOption(this).org1ID,
      org2ID: getDefaultOption(this).org2ID,
      org3ID: getDefaultOption(this).org3ID,
      year: Methods.getYear(),
      categoryOneID: -1,
      categoryTwoID: -1,
      controls: this.props.location.state && this.props.location.state.id ? this.props.location.state.id : -1
    };
    this.curLevel = 1;
    this.state = {
      returnLink: "/purchase"
    }
  }
  componentDidMount() {
     let { sendRequest } = this.props;
     let { state } = this.props.location;
     if(this.props.location.pathname != "/purchase/purmanage/cate1"){
      this.props.history.push("/purchase/purmanage/cate1");
     }
     function selectItem() {
       this.props.mselectType(this.queryParams.organizeType);
       this.props.mselectManage([this.queryParams.controls]);
       if (this.queryParams.organizeType == 1) {
         this.props.selectFirstCom(this.queryParams.org1ID);
         this.props.selectSecondCom(this.queryParams.org2ID);
         this.props.selectThirdCom(this.queryParams.org3ID);
       } else {
         this.props.selectFirst(this.queryParams.org1ID);
         this.props.selectSecond(this.queryParams.org2ID);
         this.props.selectThird(this.queryParams.org3ID);
       }
     }

     function getRestData() {
       xhrActionName.manage.forEach((actionName, index) => {
         if (index > 8) {
           sendRequest({
             actionName: actionName,
             path: PathInfo[`d${actionName}`],
             params: this.queryParams,
             actions: manageAction
           });
         }
       });
     }

     function getOptionData() {
       sendRequest({
         actionName: "getFirstCom",
         path: PathInfo["orgPath"],
         params: {
           organizeType: 1,
           prentOrgLevel: -1,
           prentOrgID: -1
         },
         actions: manageAction
       });
       sendRequest({
         actionName: "getSecondCom",
         path: PathInfo["orgPath"],
         params: {
           organizeType: 1,
           prentOrgLevel: 1,
           prentOrgID: 101
         },
         actions: manageAction
       });
       if (this.queryParams.organizeType == 1 && this.queryParams.org3ID != -1) {
         sendRequest({
           actionName: "getThirdCom",
           path: PathInfo["orgPath"],
           params: {
             organizeType: 1,
             prentOrgLevel: 2,
             prentOrgID: this.queryParams.org3ID
           },
           actions: manageAction
         });
       }
       sendRequest({
         actionName: "getFirst",
         path: PathInfo["orgPath"],
         params: {
           organizeType: 2,
           prentOrgLevel: -1,
           prentOrgID: -1
         },
         actions: manageAction
       });
       sendRequest({
         actionName: "getSecond",
         path: PathInfo["orgPath"],
         params: {
           organizeType: 2,
           prentOrgLevel: 1,
           prentOrgID: 100000
         },
         actions: manageAction
       });
       if (this.queryParams.organizeType == 2 && this.queryParams.org3ID != -1) {
         sendRequest({
           actionName: "getThird",
           path: PathInfo["orgPath"],
           params: {
             organizeType: 2,
             prentOrgLevel: 2,
             prentOrgID: this.queryParams.org3ID
           },
           actions: manageAction
         });
       }
       sendRequest({
         actionName: "manageway",
         path: PathInfo["manageway"],
         params: {},
         actions: manageAction
       });
     }
     //请求，选择
     selectItem.bind(this)();
     getRestData.bind(this)();
     getOptionData.bind(this)();
  }
  getAllData() {
    this.props.sendRequest({
      actionName: "manageTable",
      path: PathInfo["dmanageTable"],
      params: this.queryParams,
      actions: manageAction
    });
    this.props.sendRequest({
      actionName: "manageBar",
      path: PathInfo["dmanageBar"],
      params: this.queryParams,
      actions: manageAction
    });
  }
  nextCategory(id, level, name) {
    if(level == 1){
      this.queryParams.categoryOneID = id;
      this.props.history.push("/purchase/purmanage/cate2", {
        name: name
      });
    }else if(level == 2){
      this.queryParams.categoryTwoID = id;
      this.props.history.push("/purchase/purmanage/cate3", {
        name: name
      });
    }else if(level == 3){
      return ;
    }
    this.getAllData();
  }
  prevCategory(){
    // 在第三层操作返回
    if(this.curLevel == 3){
      this.queryParams.categoryTwoID = -1;
    }else if(this.curLevel == 2){
      this.queryParams.categoryOneID = -1;
      this.queryParams.categoryTwoID = -1;
    }
    this.getAllData();
  }
  getReturnLink(link, curLevel){
    this.setState({
      returnLink: link
    });
    this.curLevel = curLevel;
  }
  selectYear(value) {
    this.queryParams.year = value;
  }
  selectMonth(value) {
    this.queryParams.months = value;
  }
  selectType(value) {
    this.queryParams.organizeType = value;
    this.props.mselectType(value);
    if (value == 1) {
      this.queryParams.org1ID = this.props.firstComId;
      this.queryParams.org2ID = this.props.secondComId;
      this.queryParams.org3ID = this.props.thirdComId;
    } else {
      this.queryParams.org1ID = this.props.firstOrgId;
      this.queryParams.org2ID = this.props.secondOrgId;
      this.queryParams.org3ID = this.props.thirdOrgId;
    }
  }
  selectFirstCom(value){
    this.queryParams.org1ID = value;
    this.queryParams.org2ID = -1;
    this.queryParams.org3ID = -1;
    this.props.selectFirstCom(value);
    this.props.sendRequest({
          actionName: "getSecondCom",
          path: PathInfo["orgPath"],
          params: {
            organizeType: 1,
            prentOrgLevel: 1,
            prentOrgID: value
          },
          actions: manageAction
    });
    this.props.selectSecondCom(-1);
    this.props.selectThirdCom(-1);
  }
  selectSecondCom(value){
    this.queryParams.org2ID = value;
    this.queryParams.org3ID = -1;
    this.props.selectSecondCom(value);
    this.props.sendRequest({
          actionName: "getThirdCom",
          path: PathInfo["orgPath"],
          params: {
            organizeType: 1,
            prentOrgLevel: 2,
            prentOrgID: value
          },
          actions: manageAction
    });
    this.props.selectThirdCom(-1);
  }
  selectThirdCom(value){
    this.queryParams.org3ID = value;
    this.props.selectThirdCom(value);
  }
  selectFirst(value){
    this.props.selectFirst(value);
    this.props.sendRequest({
          actionName: "getSecond",
          path: PathInfo["orgPath"],
          params: {
            organizeType: 2,
            prentOrgLevel: 1,
            prentOrgID: value
          },
          actions: manageAction
    });
    this.queryParams.org1ID = value;
    this.queryParams.org2ID = -1;
    this.queryParams.org3ID = -1;
  }
  selectSecond(value){
    this.props.selectSecond(value);
    this.props.selectThird(-1);
    this.props.sendRequest({
          actionName: "getThird",
          path: PathInfo["orgPath"],
          params: {
            organizeType: 2,
            prentOrgLevel: 2,
            prentOrgID: value
          },
          actions: manageAction
    });
    this.queryParams.org2ID = value;
    this.queryParams.org3ID = -1;
  }
  selectThird(value){
    this.props.selectThird(value);
    this.queryParams.org3ID = value;
  }
  selectManage(value){
    this.queryParams.controls = value.join(",");
    this.props.mselectManage(value);
  }
  download(name){
    CommonMethod.download(DownloadUrl[name], this.queryParams);
  }
  getClickParams(params){
    // console.log(params);
  }
  queryData(){
    let {sendRequest} = this.props;
    xhrActionName.manage.forEach((actionName, index) =>{
      if(index > 8){
        sendRequest({
          actionName: actionName,
          path: PathInfo[`d${actionName}`],
          params: this.queryParams,
          actions: manageAction
        });
      }   
    });
  }
  render(){
    let headerData = {
      defaultYear: this.queryParams.year,
      selectedTypeId: this.props.selectedTypeId,
      firstComId: this.props.firstComId,
      secondComId: this.props.secondComId,
      thirdComId: this.props.thirdComId,
      firstComData: this.props.firstComData,
      secondComData: this.props.secondComData,
      thirdComData: this.props.thirdComData,
      selectManageId: this.props.selectManageId,
      defaultManageId: this.props.location.state && this.props.location.state.id ? this.props.location.state.id : -1,
      manageList: this.props.managewayData,
      firstOrgId: this.props.firstOrgId,
      secondOrgId: this.props.secondOrgId,
      thirdOrgId: this.props.thirdOrgId,
      forthOrgId: this.props.forthOrgId,
      fifthOrgId: this.props.fifthOrgId,
      firstData: this.props.firstData,
      secondData: this.props.secondData,
      thirdData: this.props.thirdData,
      forthData: this.props.forthData,
      fifthData: this.props.fifthData,
    }
    let fns = {
      selectYear: this.selectYear.bind(this),
      selectMonth: this.selectMonth.bind(this),
      selectType: this.selectType.bind(this),
      selectFirstCom: this.selectFirstCom.bind(this),
      selectSecondCom: this.selectSecondCom.bind(this),
      selectThirdCom: this.selectThirdCom.bind(this),
      selectManage: this.selectManage.bind(this),
      selectFirst: this.selectFirst.bind(this),
      selectSecond: this.selectSecond.bind(this),
      selectThird: this.selectThird.bind(this),
      // selectForth: this.selectForth.bind(this),
      // selectFifth: this.selectFifth.bind(this),
      queryData: this.queryData.bind(this)
    }
    let mainfn = {
      download: this.download.bind(this),
      nextCategory: this.nextCategory.bind(this),
      getReturnLink:  this.getReturnLink.bind(this)
    }
    let mainData = {
      manageBarData: this.props.manageBarData,
      firstTableData: this.props.firstTableData
    }
    let routerJsx = <div>
      <Route path="/purchase/purmanage/cate1" render={(props) => {return <ManageDetail data={mainData} fns={mainfn} {...props} level={1}/>}} />
      <Route path="/purchase/purmanage/cate2" render={(props) => {return <ManageDetail data={mainData} fns={mainfn} {...props} level={2}/>}} />
      <Route path="/purchase/purmanage/cate3" render={(props) => {return <ManageDetail data={mainData} fns={mainfn} {...props} level={3}/>}} />
    </div>
    return <div className="erp-container">
      <h1 className="erp-pagetitle">
      <Link to="/purchase">>>返回首页</Link>
      {this.state.returnLink != "/purchase" ? <Link to={this.state.returnLink} onClick={this.prevCategory.bind(this)}>>>返回上一级</Link> : ""}
      不同管控方式分析
      </h1>
      <DetailHeader data={headerData} fns={fns}/>
      {/*<ManageDetail data={{...this.props}} fns={mainfn} month={this.queryParams.months}/>*/}
      {routerJsx}
    </div>
  }
}