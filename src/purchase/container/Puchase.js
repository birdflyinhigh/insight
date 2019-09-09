import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import IndexHeader from '../component/header/IndexHeader';
import PurchaseIndex from '../component/index/Index';
import { CommonMethod } from '../../common/tools/common';
import { indexAction, indexUiAction, xhrActionName } from '../action/action';
import { PathInfo, LevelMap, IdName, DownloadUrl} from '../constants';


function getGroupId(data, value) {
  let id = "";
  data.forEach((item, index) => {
    if (item.name == value) {
      id = item.id;
    }
  })
  return id;
}

function mapStateToProps(state) {
  return { ...state.statetree.purchase.index };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({  sendRequest: CommonMethod.sendRequest}, indexUiAction), dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class Purchase extends Component {
  constructor(props) {
    super(props);
    this.curYear = (new Date()).getFullYear();
    this.organizeType = props.selectedTypeId;
    this.queryParams = {
      organizeType: this.organizeType,
      org1ID: this.organizeType == 1 ? this.props.firstComId : this.props.firstOrgId,
      org2ID: this.organizeType == 1 ? this.props.secondComId : this.props.secondOrgId,
      org3ID: this.organizeType == 1 ? this.props.thirdComId : this.props.thirdOrgId,
      // years: `${this.curYear},${this.curYear - 1},${this.curYear - 2}`,
      years: `${this.curYear}`,
    };
    this.company = {
      organizeType: 1
    };
    this.group = {
      organizeType: 2
    };
  }
  componentDidMount() {
    let onlysendRequest = CommonMethod.onlysendRequest;
    let { sendRequest } = this.props;
    this.props.iselectType(this.organizeType);
    //async function to deal with dependency problem
    function prepare() {
      try {
        sendRequest({
          actionName: "getFirstCom",
          path: PathInfo["orgPath"],
          params: {
            organizeType: 1,
            prentOrgLevel: -1,
            prentOrgID: -1
          },
          actions: indexAction
        }, (data) => {
          this.queryParams.orgID1 = data.data[0]["orgID"];
          sendRequest({
            actionName: "manage",
            path: PathInfo["imanage"],
            params: {...this.queryParams, orgID1: 101, orgID2: -1, orgID3: -1},
            actions: indexAction
          });
          xhrActionName.index.forEach((actionName, index) => {
            if (index > 9) {
              sendRequest({
                actionName: actionName,
                path: PathInfo[`i${actionName}`],
                params: this.queryParams,
                actions: indexAction
              });
            }
          });
        });
        sendRequest({
          actionName: "getSecondCom",
          path: PathInfo["orgPath"],
          params: {
            organizeType: 1,
            prentOrgLevel: 1,
            prentOrgID: 101
          },
          actions: indexAction
        });
        sendRequest({
          actionName: "getFirst",
          path: PathInfo["orgPath"],
          params: {
            organizeType: 2,
            prentOrgLevel: -1,
            prentOrgID: -1
          },
          actions: indexAction
        });
        sendRequest({
          actionName: "getSecond",
          path: PathInfo["orgPath"],
          params: {
            organizeType: 2,
            prentOrgLevel: 1,
            prentOrgID: 100000
          },
          actions: indexAction
        });
        this.props.sendRequest({
          actionName: "allProviderDetail",
          path: PathInfo["allProvider"],
          params: {
            years: this.queryParams.years
          },
          actions: indexAction
        });
      } catch (err) {
        console.log("something went wrong", err);
      }
    }
    if (!this.props.loaded) {
      prepare.bind(this)();
    }
    }
  selectYear(value) {
    this.queryParams.years = value;
  }
  selectType(value) {
    this.queryParams.organizeType = value;
    this.props.iselectType(value);
    if(value == 1){
      this.queryParams.org1ID = this.props.firstComId;
      this.queryParams.org2ID = this.props.secondComId;
      this.queryParams.org3ID = this.props.thirdComId;
    }else{
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
          actions: indexAction
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
          actions: indexAction
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
          actions: indexAction
    });
    this.queryParams.org1ID = value;
    this.queryParams.org2ID = -1;
    this.queryParams.org3ID = -1;
    this.props.selectSecond(-1);
    this.props.selectThird(-1);
  }
  selectSecond(value){
    this.props.sendRequest({
          actionName: "getThird",
          path: PathInfo["orgPath"],
          params: {
            organizeType: 2,
            prentOrgLevel: 2,
            prentOrgID: value
          },
          actions: indexAction
    });
    this.queryParams.org2ID = value;
    this.queryParams.org3ID = -1;
    this.props.selectSecond(value);
    this.props.selectThird(-1);
  }
  selectThird(value){
    this.queryParams.org3ID = value;
    this.props.selectThird(value);
  }
  jumpSecondPage(link, value, isPie) {
    let id = value;
    if (isPie) {
      id = getGroupId(this.props.rateData.data, value)
    }
    this.props.history.push(`/purchase${link}`, {
      defaultType: this.props.selectedTypeId,
      org1ID: this.queryParams.org1ID,
      org2ID: this.queryParams.org2ID,
      org3ID: this.queryParams.org3ID,
      // defaultComany: this.props.selectedCompanyId,
      // orgIds: [this.queryParams.orgID1,this.queryParams.orgID2,this.queryParams.orgID3],
      // orgLevel: this.props.choosedLevel,
      id: id
    });
  }
  download(name){
    CommonMethod.download(DownloadUrl[name], {years: this.queryParams.years});
  }
  queryData() {
    let { sendRequest } = this.props;
    sendRequest({
      actionName: "manage",
      path: PathInfo["imanage"],
      params: {...this.queryParams, org1ID: 101, org2ID: -1, org3ID: -1},
      actions: indexAction
    });
    xhrActionName.index.forEach((actionName, index) => {
      if (index > 9) {
        sendRequest({
          actionName: actionName,
          path: PathInfo[`i${actionName}`],
          params: this.queryParams,
          actions: indexAction
        });
      }
    });
  }
  render() {
    let headerData = {
      selectedTypeId: this.props.selectedTypeId,
      firstComId: this.props.firstComId,
      secondComId: this.props.secondComId,
      thirdComId: this.props.thirdComId,
      firstComData: this.props.firstComData,
      secondComData: this.props.secondComData,
      thirdComData: this.props.thirdComData,
      firstOrgId: this.props.firstOrgId,
      secondOrgId: this.props.secondOrgId,
      thirdOrgId: this.props.thirdOrgId,
      firstData: this.props.firstData,
      secondData: this.props.secondData,
      thirdData: this.props.thirdData,
      aIds: [this.props.firstOrgId,this.props.secondOrgId,this.props.thirdOrgId,this.props.forthOrgId,this.props.fifthOrgId]
    }
    let fns = {
      selectYear: this.selectYear.bind(this),
      selectType: this.selectType.bind(this),
      selectFirstCom: this.selectFirstCom.bind(this),
      selectSecondCom: this.selectSecondCom.bind(this),
      selectThirdCom: this.selectThirdCom.bind(this),
      selectFirst: this.selectFirst.bind(this),
      selectSecond: this.selectSecond.bind(this),
      selectThird: this.selectThird.bind(this),
      // selectForth: this.selectForth.bind(this),
      // selectFifth: this.selectFifth.bind(this),
      queryData: this.queryData.bind(this)
    }
    let mainfn = {
      // clickAllPro: this.clickAllPro.bind(this),
      jumpSecondPage: this.jumpSecondPage.bind(this),
      download: this.download.bind(this)
    }
    let mainData = {                                                                                                   
      totalProvider: this.props.totalProvider,
      overviewData: this.props.overviewData,
      rateData: this.props.rateData,
      saveData: this.props.saveData,
      manageData: this.props.manageData,
      providerData: this.props.providerData,
      urgentData: this.props.urgentData,
      projectData: this.props.projectData,
      examineData: this.props.examineData,
      allProData:  this.props.allProData
    }
    return <div className = "erp-container erp-chart-hover" >
      <h1 className = "erp-pagetitle" > 采购执行分析总览（负责人：邓仕荣） </h1> 
      <IndexHeader data = {headerData} fns = {fns}/> 
      <PurchaseIndex fns = { mainfn } data = {mainData}/> 
      </div >
  }
}