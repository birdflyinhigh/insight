import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';

import ExamineDetail from '../component/detail/ExamineDetail';
import DetailHeader from '../component/header/detailHeader';
import {Methods} from '../../common/tools/util';
import {CommonMethod} from '../../common/tools/common';
import {examineUiAction, examineAction, xhrActionName} from '../action/action';
import {PathInfo, DownloadUrl,LevelMap, SelectMap, IdName} from '../constants';
function getDefaultOption(context) {
  let state = context.props.location.state;
  let temp = {
    org1ID: 101,
    org2ID: -1,
    org3ID: -1
  }
  if (context.organizeType == 1) {
    temp.org1ID = state ? state.org1ID : 101;
  }else{
    temp.org1ID = state ? state.org1ID : 101;
  }
    temp.org2ID = state ? state.org2ID : -1;
    temp.org3ID = state ? state.org3ID : -1;
  return temp;
}

function mapStateToProps(state){
  let indexState = state.statetree.purchase.index;
  return {...state.statetree.purchase.examine};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(Object.assign({sendRequest: CommonMethod.sendRequest}, examineUiAction), dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class DetailPage extends Component{
  constructor(props){
    super(props);
    this.organizeType = props.location.state ? props.location.state.defaultType : 1,
    this.queryParams = {
      months: '1,2,3,4,5,6,7,8,9,10,11,12',
      organizeType: this.organizeType,
      org1ID: getDefaultOption(this).org1ID,
      org2ID: getDefaultOption(this).org2ID,
      org3ID: getDefaultOption(this).org3ID,
      year: props.location.state ? props.location.state.id : new Date().getFullYear()
    };
    this.chooseType = this.organizeType;
  }
  componentDidMount() {
    let { sendRequest } = this.props;
    let { state } = this.props.location;

    function selectItem() {
      this.props.eselectType(this.queryParams.organizeType);
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
      xhrActionName.examine.forEach((actionName, index) => {
        if (index > 7) {
          sendRequest({
            actionName: actionName,
            path: PathInfo[`d${actionName}`],
            params: this.queryParams,
            actions: examineAction
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
        actions: examineAction
      });
      sendRequest({
        actionName: "getSecondCom",
        path: PathInfo["orgPath"],
        params: {
          organizeType: 1,
          prentOrgLevel: 1,
          prentOrgID: 101
        },
        actions: examineAction
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
          actions: examineAction
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
        actions: examineAction
      });
      sendRequest({
        actionName: "getSecond",
        path: PathInfo["orgPath"],
        params: {
          organizeType: 2,
          prentOrgLevel: 1,
          prentOrgID: 100000
        },
        actions: examineAction
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
          actions: examineAction
        });
      }
      sendRequest({
        actionName: "manageway",
        path: PathInfo["manageway"],
        params: {},
        actions: examineAction
      });
    }
    selectItem.bind(this)();
    getRestData.bind(this)();
    getOptionData.bind(this)();
  }
  selectYear(value){
    this.queryParams.year = value;
  }
  selectMonth(value){
    this.queryParams.months = value;
  }
  selectType(value){
    this.queryParams.organizeType = value;
    this.props.eselectType(value);
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
          actions: examineAction
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
          actions: examineAction
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
          actions: examineAction
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
          actions: examineAction
    });
    this.queryParams.org2ID = value;
    this.queryParams.org3ID = -1;
  }
  selectThird(value){
    this.props.selectThird(value);
    this.queryParams.org3ID = value;
  }
  // selectForth(value){
  //   this.chooseBoxId = 4;
  //   this.props.selectForth(value);
  //   this.props.selectFifth(-1);
  //   this.props.sendRequest({
  //         actionName: "getFifth",
  //         path: PathInfo["orgPath"],
  //         params: {
  //           prentOrgLevel: 4,
  //           prentOrgID: value
  //         },
  //         actions: examineAction
  //   });
  //   this.queryParams.orgLevel = 4;
  //   this.queryParams.orgID = value;
  //   if(value == -1){
  //     this.queryParams.orgLevel = 3;
  //     this.queryParams.orgID = this.props.thirdOrgId;
  //   }
  // }
  // selectFifth(value){
  //   this.chooseBoxId = 5;
  //   this.queryParams.orgLevel = 5;
  //   this.queryParams.orgID = value;
  //   this.props.selectFifth(value);
  //   if(value == -1){
  //     this.queryParams.orgLevel = 4;
  //     this.queryParams.orgID = this.props.forthOrgId;
  //   }
  // }
  download(name){
    CommonMethod.download(DownloadUrl[name], this.queryParams);
  }
  queryData(){
    this.chooseType = this.queryParams.organizeType;
    let {sendRequest} = this.props;
    xhrActionName.examine.forEach((actionName, index) =>{
      if(index > 7){
        sendRequest({
          actionName: actionName,
          path: PathInfo[`d${actionName}`],
          params: this.queryParams,
          actions: examineAction
        });
      }   
    });
  }
  render(){
    let headerData = {
      defaultYear: this.props.location.state ? this.props.location.state.id : new Date().getFullYear(),
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
      forthOrgId: this.props.forthOrgId,
      fifthOrgId: this.props.fifthOrgId,
      firstData: this.props.firstData,
      secondData: this.props.secondData,
      thirdData: this.props.thirdData,
      forthData: this.props.forthData,
      fifthData: this.props.fifthData,
      // aIds: this.props.location.state ? this.props.location.state.orgIds : [100000, -1, -1, -1, -1]
    }
    let fns = {
      selectYear: this.selectYear.bind(this),
      selectMonth: this.selectMonth.bind(this),
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
    const {params} = {...this.props.match}
    let mainData = {
      barData: this.props.monthBarData,
      tableData: this.props.detailTableData,
      orgType: this.chooseType
    }
    let mainfn = {
      download: this.download.bind(this)
    }
    return <div className="erp-container">
      <h1 className="erp-pagetitle">
        <Link to="/purchase">>>返回</Link>审批中的订单/合同金额
      </h1>
      <DetailHeader data={headerData} fns={fns}/>
      <ExamineDetail data={mainData} fns={mainfn}/>
    </div>
  }
}