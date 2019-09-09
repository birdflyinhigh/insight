import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ComptUtils} from '../../../common/tools/util';
import NoquickHeader from '../../header/NoquickHeader';
import ChartsPart from './Component';
import SecPanel from '../../common/SecPanel';
import {EmployTabKey, CommonPath} from '../../common/constant';
import {PathInfo} from './constant';
import {CommonMethod} from '../../../common/tools/common';
import {CusRateXhrAct, CusRateUiAct} from './action';
import {commonEmployUiAct, commonEmployXhrAct} from '../commonAction';

function mapStateToProps(state){
  return {
		...state.statetree.dashCusrate,
		...state.statetree.dashComEmploy
	};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(Object.assign(
		{sendRequest: CommonMethod.sendRequest}, 
		{...commonEmployUiAct},
		{...CusRateUiAct}
		), dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class DashCusrate extends Component{
  constructor(props){
		super(props);
		this.queryParams = {
			startTime: ComptUtils.getLocationProps(this.props, "startTime"),
			endTime: ComptUtils.getLocationProps(this.props, "endTime"),
			area: ComptUtils.getLocationProps(this.props, "regionId"),
			provence: ComptUtils.getLocationProps(this.props, "provinceId"),
			profession: ComptUtils.getLocationProps(this.props, "industryId"),
			// userType: -1,
			type: -1,
			dimension: "index6"
		};
	
	}
	componentDidMount(){
		let parentState = this.props.location.state;
		this.props.getComData();
		this.props.getData();
		if(parentState){
			this.props.selectEnd(this.queryParams.endTime);
			this.props.selectRegion(this.queryParams.area);
			this.props.selectProvince(this.queryParams.provence);
			this.props.selectIndustry(this.queryParams.profession);
		}
		if(this.props.region.length == 0){
			this.sendHeadData.bind(this)();
		}else{
			this.props.sendRequest({
				actionName: "province",
				path: CommonPath["province"],
				params: {
					area: this.queryParams.area
				},
				actions: commonEmployXhrAct
			});
		}
		this.props.sendRequest({
			actionName: "panelData",
			path: CommonPath["epanelData"],
			params: this.queryParams,
			actions: commonEmployXhrAct
		});
		this.props.sendRequest({
			actionName: "getCusRateTrend",
			path: PathInfo["trend"],
			params: this.queryParams,
			actions: CusRateXhrAct
		});
	}
	sendHeadData(){
		this.props.sendRequest({
			actionName: "region",
			path: CommonPath["region"],
			params: {},
			actions: commonEmployXhrAct
		});
		this.props.sendRequest({
			actionName: "province",
			path: CommonPath["province"],
			params: {
				area: this.queryParams.area
			},
			actions: commonEmployXhrAct
		});
		this.props.sendRequest({
			actionName: "industry",
			path: CommonPath["industry"],
			params: {},
			actions: commonEmployXhrAct
		});
	}
	jumpFn(link){
		this.props.history.push(link, {
			startTime: this.queryParams.startTime,
			endTime: this.queryParams.endTime,
			regionId: this.queryParams.area,
      provinceId: this.queryParams.provence,
			industryId: this.queryParams.profession
		});
	}
  selectEnd(value){
		this.props.selectEnd(value);
	}
	selectRegion(value){
		this.props.selectRegion(value);
		this.props.selectProvince(-1);
		this.props.sendRequest({
			actionName: "province",
			path: CommonPath["province"],
			params: {
				area: value
			},
			actions: commonEmployXhrAct
		});
  }
  selectProvince(value){
		this.props.selectProvince(value);
		
  }
  selectIndustry(value){
    this.props.selectIndustry(value);
	}
  selectUserType(value){
    // this.props.selectUserType(value);
	}
	queryData(){
		this.queryParams.endTime = this.props.endTime;
		this.queryParams.area = this.props.regionId;
		this.queryParams.provence = this.props.provinceId;
		this.queryParams.profession = this.props.industryId;
		this.queryParams.userType = this.props.userTypeId;
		this.props.getComData();
		this.props.getData();
		this.props.sendRequest({
			actionName: "panelData",
			path: CommonPath["epanelData"],
			params: this.queryParams,
			actions: commonEmployXhrAct
		});
		this.props.sendRequest({
			actionName: "getCusRateTrend",
			path: PathInfo["trend"],
			params: this.queryParams,
			actions: CusRateXhrAct
		});
	}
  render(){
    let headerData = {
			defaultStartTime: this.props.defaultStartTime,
			endTime: this.props.endTime,
			// userTypeId: this.props.userTypeId, 
			regionId: this.props.regionId,
			provinceId: this.props.provinceId,
			industryId: this.props.industryId,
      region: this.props.region,
      province: this.props.province,
      industry: this.props.industry,
			// userType: this.props.userType
		};
		let headerFns = {
			selectEnd:  this.selectEnd.bind(this),
			selectRegion: this.selectRegion.bind(this),
      selectProvince: this.selectProvince.bind(this),
			selectIndustry: this.selectIndustry.bind(this),
      selectUserType: this.selectUserType.bind(this),
			queryData: this.queryData.bind(this)
		}
		let pannelData = [{...EmployTabKey[0],
			num: this.props.panelData.employer,
			ratio: this.props.panelData.employerRate
		},{
      ...EmployTabKey[1],
			num: this.props.panelData.onumber,
			ratio: this.props.panelData.onumberRate
		},{
			...EmployTabKey[2],
			num: this.props.panelData.income,
			ratio: this.props.panelData.incomeRate,
			unit: "万"
		},{
			...EmployTabKey[3],
			num: this.props.panelData.gprofit,
			ratio: this.props.panelData.gprofitRate,
			unit: "万"
		},{
      ...EmployTabKey[4],
      num: this.props.panelData.core,
		},{
      ...EmployTabKey[5],
      num: this.props.panelData.rate,
		}];
    return <div className="hr-bg">
			<div className="dash-container">
				<h1 className="dash-pagetitle">
				<Link to="/manager/index" style={{fontSize: 18, color: "#5888f4"}}>总经理仪表盘&nbsp;>&nbsp;</Link>	
				雇主分析
				</h1>
				<NoquickHeader data={headerData} fns={headerFns}/>
				<SecPanel data={pannelData} defaultValue="cusrate" jumpFn={this.jumpFn.bind(this)}/>
        <ChartsPart data={this.props}/>
			</div>
		</div>
  }
}