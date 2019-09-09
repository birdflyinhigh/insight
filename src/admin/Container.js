import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {CommonMethod} from '../common/tools/common';
import Header from './component/header';
import {PathInfo} from './constant';
import {adminXhrAction, adminUiAction} from './action';
import TopPanel from './component/TopPanel';
import TopPart from './component/TopPart';

import './admin.css'
function mapStateToProps(state){
  return {...state.statetree.admin1}
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(Object.assign({sendRequest: CommonMethod.sendRequest}, adminUiAction), dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class Admin extends Component{
  constructor(props){
    super(props);
    this.queryParams = {
      year: props.yearId,
      month: props.monthId,
      orgLevel: 1,
      orgID: 100000
    };
    this.travelFeeIndex = "totalFee";
    this.hotelCompareIndex = "excess";
    this.ticketLoseIndex = "costLoss";
    this.ticketCompareIndex = "costLoss";
    this.commonXhrName = ["tripTotal", "ticketPrice", "ticketAvgPrice", "hotelPrice", "hotelAvgPrice",  "xcTicketDiscount", "orgTicketDiscount",
    "xcTotalTrend",  "startDistination", "hotelUsage", "hotelLoseTrend", "ticketUsage"
    ];
    this.ticketSelectName = ["ticketLoseFee", "ticketLoseOutRule", "ticketCompareFee", "ticketCompareOutRule"];
  }
  componentDidMount(){
    let {sendRequest} =  this.props;
    sendRequest({
      actionName: "org1",
      path: PathInfo.org,
      params: {
				prentOrgLevel: -1,
        prentOrgID: -1
			},
      actions: adminXhrAction
    });
    sendRequest({
      actionName: "org2",
      path: PathInfo.org,
      params: {
				prentOrgLevel: 1,
        prentOrgID: 100000
			},
      actions: adminXhrAction
    });
    sendRequest({
      actionName: "hotelCompare",
      path: PathInfo.hotelCompare,
      params: {
        ...this.queryParams,
        index: "excess"
			},
      actions: adminXhrAction
    });
    sendRequest({
      actionName: "orgFeeRate",
      path: PathInfo.orgFeeRate,
      params: {
        ...this.queryParams,
        index: this.travelFeeIndex
			},
      actions: adminXhrAction
    });
    this.commonXhrName.forEach((name) => {
      sendRequest({
        actionName: name,
        path: PathInfo[name],
        params: this.queryParams,
        actions: adminXhrAction
      });
    });
    this.ticketSelectName.forEach((name, index) => {
      sendRequest({
        actionName: name,
        path: PathInfo[name],
        params: {
          ...this.queryParams,
          index: index % 2 ? "wgCondition" : "costLoss"
        },
        actions: adminXhrAction
      });
    })
  }
  selectFirstOrg(value){
    this.queryParams.orgLevel = 1;
		this.queryParams.orgID = value;
    this.props.selectFirstOrg(value);
  }
  selectSecondOrg(value){
    this.queryParams.orgLevel = 2;
    this.queryParams.orgID = value;
    if(value == -1){
			this.queryParams.orgLevel = 1;		
			this.queryParams.orgID = this.props.org1Id;
		}
    this.props.selectSecondOrg(value);
    this.props.sendRequest({
      actionName: "org3",
      path: PathInfo.org,
      params: {
				prentOrgLevel: 2,
        prentOrgID: value
			},
      actions: adminXhrAction
    });
    this.props.sendRequest({
      actionName: "org4",
      path: PathInfo.org,
      params: {
				prentOrgLevel: 3,
        prentOrgID: -1
			},
      actions: adminXhrAction
    });
  }
  selectThirdOrg(value){
    this.queryParams.orgLevel = 3;
		if(value == -1){
			this.queryParams.orgLevel = 2;
			this.queryParams.orgID = this.props.org2Id;
		}else{
			this.queryParams.orgID = value;
		}	
    this.props.selectThirdOrg(value);
    this.props.sendRequest({
      actionName: "org4",
      path: PathInfo.org,
      params: {
				prentOrgLevel: 3,
        prentOrgID: value
			},
      actions: adminXhrAction
    });
  }
  selectForthOrg(value){
    this.queryParams.orgLevel = 4;
		if(value == -1){
			this.queryParams.orgLevel = 3;
			this.queryParams.orgID = this.props.org3Id;
		}else{
			this.queryParams.orgID = value;
		}	
    this.props.selectForthOrg(value);
  }
  selectMonth(value){
    this.props.selectMonth(value);
    this.queryParams.month = value;
  }
  selectYear(value){
    this.props.selectYear(value);
    this.queryParams.year = value;
  }
  selectHotelCompare(value){
    this.hotelCompareIndex = value;
    this.props.sendRequest({
      actionName: "hotelCompare",
      path: PathInfo.hotelCompare,
      params: {...this.queryParams,
        index: value
      },
      actions: adminXhrAction
    });
  }
  selectTravelFee(value){
    this.travelFeeIndex = value;
    this.props.sendRequest({
      actionName: "orgFeeRate",
      path: PathInfo.orgFeeRate,
      params: {...this.queryParams,
        index: value
      },
      actions: adminXhrAction
    });
  }
  downloadData(type){
    let url = PathInfo[type + 'Download'];
    CommonMethod.download(url, {
      year: this.queryParams.year,
      month: this.queryParams.month,
      orgLevel: this.queryParams.orgLevel,
      orgID: this.queryParams.orgID
    });
  }
  queryData(){
    let {sendRequest} = this.props;
    sendRequest({
      actionName: "hotelCompare",
      path: PathInfo.hotelCompare,
      params: {
        ...this.queryParams,
        index: this.hotelCompareIndex
			},
      actions: adminXhrAction
    });
    sendRequest({
      actionName: "orgFeeRate",
      path: PathInfo.orgFeeRate,
      params: {...this.queryParams,
        index: this.travelFeeIndex
      },
      actions: adminXhrAction
    });
    this.commonXhrName.forEach((name) => {
      sendRequest({
        actionName: name,
        path: PathInfo[name],
        params: this.queryParams,
        actions: adminXhrAction
      });
    });
    this.ticketSelectName.forEach((name, index) => {
      sendRequest({
        actionName: name,
        path: PathInfo[name],
        params: {
          ...this.queryParams,
          index: index % 2 ? "wgCondition" : "costLoss"
        },
        actions: adminXhrAction
      });
    })
  }
  render(){
    let headerData = {
      org1: this.props.org1,
      org2: this.props.org2,
      org3: this.props.org3,
      org4: this.props.org4,
      org1Id: this.props.org1Id,
      org2Id: this.props.org2Id,
      org3Id: this.props.org3Id,
      org4Id: this.props.org4Id,
      yearId: this.props.yearId,
      monthId: this.props.monthId
    }
    let headerFns = {
      selectFirstOrg: this.selectFirstOrg.bind(this),
      selectSecondOrg: this.selectSecondOrg.bind(this),
      selectThirdOrg: this.selectThirdOrg.bind(this),
      selectForthOrg: this.selectForthOrg.bind(this),
      selectMonth: this.selectMonth.bind(this),
      selectYear: this.selectYear.bind(this),
      queryData: this.queryData.bind(this)
    }
    let bodyFns = {
      selectHotelCompare: this.selectHotelCompare.bind(this),
      selectTravelFee: this.selectTravelFee.bind(this),
      downloadData: this.downloadData.bind(this)
    }
    return <div className="hr-bg admin-page">
      <div className="hr-container hr-overview">
				<h1 className="erp-pagetitle">携程差旅数据分析</h1>
				<Header fns={headerFns} data={headerData}/>
        <div className="container-body">
          <TopPanel data={{...this.props}}/>
        </div>
        <div className="container-body">
          <TopPart data={{...this.props}} fns={bodyFns}/>
        </div>
			</div>
    </div>
  }
}