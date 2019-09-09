import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import {notification} from 'antd';
import {ComptUtils} from '../../../common/tools/util';
import NoquickHeader from '../../header/NoquickHeader';
import ChartsPart from './Component';
import SecPanel from '../../common/SecPanel';
import {EmployTabKey, CommonPath} from '../../common/constant';
import {PathInfo} from './constant';
import {CommonMethod} from '../../../common/tools/common';
import {KeyemployXhrAct, KeyemployUiAct} from './action';
import {commonEmployUiAct, commonEmployXhrAct} from '../commonAction';

function mapStateToProps(state){
  return {
		...state.statetree.dashKeyemploy,
		...state.statetree.dashComEmploy
	};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(Object.assign(
		{sendRequest: CommonMethod.sendRequest,
		...commonEmployUiAct,
		...KeyemployUiAct
	}), dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class DashHrBase extends Component{
  constructor(props){
		super(props);
		this.queryParams = {
			type: -1,
			startTime: ComptUtils.getLocationProps(this.props, "startTime"),
			endTime: ComptUtils.getLocationProps(this.props, "endTime"),
			area: ComptUtils.getLocationProps(this.props, "regionId"),
			provence: ComptUtils.getLocationProps(this.props, "provinceId"),
			profession: ComptUtils.getLocationProps(this.props, "industryId"),
			dimension: "index5"
		};
		this.newStartTime = `${moment(this.queryParams.endTime).format("YYYY")}-01-01`;
	}
	componentDidMount(){
		let parentState = this.props.location.state;
		this.props.getComData();
		this.props.getData();
		// this.popInvalidTimeNotify.bind(this)();
		if(parentState){
			this.props.selectEnd(this.queryParams.endTime);
			this.props.selectRegion(this.queryParams.area);
			this.props.selectProvince(this.queryParams.provence);
			this.props.selectIndustry(this.queryParams.profession);
		}
		if(this.props.region.length === 0){
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
			actionName: "trend",
			path: PathInfo["trend"],
			params: this.queryParams,
			actions: KeyemployXhrAct
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
	popInvalidTimeNotify(){
		let mStart = moment(this.props.defaultStartTime);
		let mEnd = moment(this.queryParams.endTime);
		if(mEnd.diff(mStart) < 0){
			notification.error({
				message: '温馨提示',
				description: '您选择的开始日期小于结束日期',
			});
		}
	}
	queryData(){
		this.queryParams.endTime = this.props.endTime;
		this.queryParams.area = this.props.regionId;
		this.queryParams.provence = this.props.provinceId;
		this.queryParams.profession = this.props.industryId;
		this.props.getComData();
		this.props.getData();
		// console.log(this.queryParams);
		this.props.sendRequest({
			actionName: "panelData",
			path: CommonPath["epanelData"],
			params: this.queryParams,
			actions: commonEmployXhrAct
		});
		this.props.sendRequest({
			actionName: "trend",
			path: PathInfo["trend"],
			params: this.queryParams,
			actions: KeyemployXhrAct
		});
	}
  render(){
    let headerData = {
			defaultStartTime: this.newStartTime,
			endTime: this.props.endTime,
			regionId: this.props.regionId,
			provinceId: this.props.provinceId,
			industryId: this.props.industryId,
      region: this.props.region,
      province: this.props.province,
      industry: this.props.industry,
		};
		let headerFns = {
			selectEnd:  this.selectEnd.bind(this),
			selectRegion: this.selectRegion.bind(this),
      selectProvince: this.selectProvince.bind(this),
			selectIndustry: this.selectIndustry.bind(this),
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
				<SecPanel data={pannelData} defaultValue="keyemploy" jumpFn={this.jumpFn.bind(this)}/>
        <ChartsPart data={this.props}/>
			</div>
		</div>
  }
}