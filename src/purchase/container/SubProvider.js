import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, Route, Switch} from 'react-router-dom';
import { withRouter } from 'react-router'

import ProviderDetail from '../component/detail/ProviderDetail';
import ProviderSubDetail from '../component/detail/ProviderSubDetail';
import DetailHeader from '../component/header/detailHeader';
import {Methods} from '../../common/tools/util';
import {CommonMethod} from '../../common/tools/common';
import {providerAction, providerUiAction, xhrActionName} from '../action/action';
import {PathInfo, DownloadUrl,LevelMap, SelectMap, IdName} from '../constants';

function getDefaultOption(context) {
  let state = context.props.location.state;
  let temp = {
    org1ID: 101,
    org2ID: -1,
    org3ID: -1
  }
  if (context.organizeType == 1) {
    temp.org1ID = state && state.org1ID ? state.org1ID : 101;
  }else{
    temp.org1ID = state && state.org1ID ? state.org1ID : 101;
  }
    temp.org2ID = state && state.org2ID ? state.org2ID : -1;
    temp.org3ID = state && state.org3ID ? state.org3ID : -1;
  return temp;
}
function mapStateToProps(state){
  let indexState = state.statetree.purchase.index;
  return {...state.statetree.purchase.provider};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(Object.assign({sendRequest: CommonMethod.sendRequest}, providerUiAction), dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
class DetailPage extends Component{
  constructor(props){
    super(props);
    this.organizeType = props.location.state && props.location.state.defaultType ? props.location.state.defaultType : 1;
    this.queryParams = {
      months: '1,2,3,4,5,6,7,8,9,10,11,12',
      providerID: this.props.location.state && this.props.location.state.id ? this.props.location.state.id : -1,
      organizeType: this.organizeType,
      org1ID: getDefaultOption(this).org1ID,
      org2ID: getDefaultOption(this).org2ID,
      org3ID: getDefaultOption(this).org3ID,
      year: Methods.getYear()
    };
    this.chooseType = this.organizeType;
    this.state = {
      returnLink: "/purchase"
    }
  }
  componentDidMount() {
      let { sendRequest } = this.props;
      let { state } = this.props.location;

      function selectItem() {
        this.props.pselectType(this.queryParams.organizeType);
        this.props.pselectProvider([this.queryParams.providerID]);
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
        // if (this.props.location.pathname == "/purchase/purprovider/alltrade") {
        //   //请求所有供应商的数据
        //   this.getAllPro();
        // } else if (this.props.location.pathname == "/purchase/purprovider/pursubpro") {
        //   //请求某个供应商的数据（供应商id不同） 
        //   this.getProOrderDetail();
        // }
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
        actions: providerAction
      });
      sendRequest({
        actionName: "getSecondCom",
        path: PathInfo["orgPath"],
        params: {
          organizeType: 1,
          prentOrgLevel: 1,
          prentOrgID: 101
        },
        actions: providerAction
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
          actions: providerAction
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
        actions: providerAction
      });
      sendRequest({
        actionName: "getSecond",
        path: PathInfo["orgPath"],
        params: {
          organizeType: 2,
          prentOrgLevel: 1,
          prentOrgID: 100000
        },
        actions: providerAction
      });
      sendRequest({
        actionName: "providers",
        path: PathInfo["providers"],
        params: {},
        actions: providerAction
      });
    }

    selectItem.bind(this)();
    getRestData.bind(this)();
    getOptionData.bind(this)();
  }
  getProOrderDetail(id, link) {
    this.queryParams.providerID = id;
    this.props.sendRequest({
      actionName: "oneProvider",
      path: PathInfo["providerTableData"],
      params: this.queryParams,
      actions: providerAction
    });
    this.setState({
      returnLink: link
    });
  }
 getAllPro() {
   this.props.sendRequest({
     actionName: "allproTrade",
     path: PathInfo["allProDetail"],
     params: {
       months: this.queryParams.months,
       organizeType: this.queryParams.organizeType,
       org1ID: this.queryParams.org1ID,
       org2ID: this.queryParams.org2ID,
       org3ID: this.queryParams.org3ID,
       year: this.queryParams.year,
       providers: -1
     },
     actions: providerAction
   });
   this.setState({
      returnLink: "/purchase"
    })
 }
  // getSubPageProvider(name){
  //   //得到点击的是哪个供应商
  //   // let providerItem = this.props.providersData.filter((item, index) => item.providerName == name);
  //   // this.queryParams.providerID = providerItem.providerID;
  // }
  selectYear(value){
    this.queryParams.year = value;
  }
  selectMonth(value){
    this.queryParams.months = value;
  }
  selectType(value){
    this.queryParams.organizeType = value;
    this.props.pselectType(value);
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
          actions: providerAction
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
          actions: providerAction
    });
    this.props.selectThirdCom(-1);
  }
  selectThirdCom(value){
    this.queryParams.org3ID = value;
    this.props.selectThirdCom(value);
  }
  selectProvider(value){
    this.queryParams.providerID = value.join(',');
    this.props.pselectProvider(value);
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
          actions: providerAction
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
          actions: providerAction
    });
    this.queryParams.org2ID = value;
    this.queryParams.org3ID = -1;
  }
  selectThird(value){
    this.props.selectThird(value);
    this.queryParams.org3ID = value;
  }
  download(name){
    CommonMethod.download(DownloadUrl[name], this.queryParams);
  }
  queryData() {
    this.chooseType = this.queryParams.organizeType;
    let { sendRequest } = this.props;
    if (this.props.location.pathname == "/purchase/purprovider/alltrade") {
      sendRequest({
        actionName: "allproTrade",
        path: PathInfo["allProDetail"],
        params: {
          months: this.queryParams.months,
          organizeType: this.queryParams.organizeType,
          org1ID: this.queryParams.org1ID,
          org2ID: this.queryParams.org2ID,
          org3ID: this.queryParams.org3ID,
          year: this.queryParams.year,
          providers: this.queryParams.providerID
        },
        actions: providerAction
      });
    } else if (this.props.location.pathname == "/purchase/purprovider/pursubpro") {
      sendRequest({
        actionName: "oneProvider",
        path: PathInfo["providerTableData"],
        params: this.queryParams,
        actions: providerAction
      })
    }
  }
  render(){
    let headerData = {
      selectedTypeId: this.props.selectedTypeId,
      firstComId: this.props.firstComId,
      secondComId: this.props.secondComId,
      thirdComId: this.props.thirdComId,
      firstComData: this.props.firstComData,
      secondComData: this.props.secondComData,
      thirdComData: this.props.thirdComData,
      selectedProviderId: this.props.selectedProviderId,
      providerList: this.props.providersData,
      defaultProviders: this.props.location.state ? this.props.location.state.id : -1,
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
      aIds: this.props.location.state ? this.props.location.state.orgIds : [100000, -1, -1, -1, -1]
      
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
      selectProvider: this.selectProvider.bind(this),
      queryData: this.queryData.bind(this)
    }
    let mainData = {
      allTradeData: this.props.allOrderProData,
      allProData: this.props.allProData,
      tableData: this.props.providerTableData,
      orgType: this.chooseType
    };
    let mainfn = {
      // getSubPageProvider: this.getSubPageProvider.bind(this),
      getAllPro: this.getAllPro.bind(this),
      getProOrderDetail: this.getProOrderDetail.bind(this),
      download: this.download.bind(this)
    }
    // console.log(this.props);
    const AutoRouter = <div>
      <Route path="/purchase/purprovider/alltrade" render={(props) => {return <ProviderDetail data={mainData} fns={mainfn} {...props} />}} />
      <Route path="/purchase/purprovider/pursubpro" render={(props) => {return <ProviderSubDetail data={mainData} fns={mainfn} {...props} />}} />
    </div>
    return <div className="erp-container">
      <h1 className="erp-pagetitle">
        <Link to={this.state.returnLink}>>>返回</Link>供应商排名分析
      </h1>
      <DetailHeader data={headerData} fns={fns}/>
      {AutoRouter}
    </div>
  }
}
export default DetailPage;