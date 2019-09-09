import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import {notification} from 'antd';
import {ComptUtils} from '../../common/tools/util';
import NoquickHeader from '../header/NoquickHeader';
import ServiceCharts from './Component';
import SecPanel from '../common/SecPanel';
import {CommonPath} from '../common/constant';
import {PathInfo, panelKey, PageKey} from './constant';
import {CommonMethod} from '../../common/tools/common';
import {ServiceCommonXhrAct, ServiceXhrName, ServiceXhrAct, ServiceUiAct} from './action';
import '../sec.css';

function mapStateToProps(state){
  return {...state.statetree.dashService};
}
function mapDispatchToProps(dispatch){
	return bindActionCreators(Object.assign(
		{sendRequest: CommonMethod.sendRequest}, 
		{...ServiceUiAct}), dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class DashService extends Component{
  constructor(props){
		super(props);		
		this.defaultTab = "keyService";
		this.queryParams = {
			startTime: ComptUtils.getLocationProps(this.props, "startTime"),
			endTime: ComptUtils.getLocationProps(this.props, "endTime"),
			area: ComptUtils.getLocationProps(this.props, "regionId"),
			provence: ComptUtils.getLocationProps(this.props, "provinceId"),
			profession: ComptUtils.getLocationProps(this.props, "industryId"),
			dimension: PageKey[this.defaultTab]
		};
		this.newStartTime = `${moment(this.queryParams.endTime).format("YYYY")}-01-01`;
  }
  componentDidMount() {
		let parentState = this.props.location.state;
		let sendRequest = this.props.sendRequest;
		this.props.getData();
		if(parentState){
			this.props.selectEnd(this.queryParams.endTime);
			this.props.selectRegion(this.queryParams.area);
			this.props.selectProvince(this.queryParams.provence);
			this.props.selectIndustry(this.queryParams.profession);
			this.props.clickPanelItem(this.defaultTab);
		}
		// this.popInvalidTimeNotify.bind(this)();
		if(this.props.region.length == 0){
			sendRequest({
				actionName: "region",
				path: CommonPath.region,
				params: {},
				actions: ServiceCommonXhrAct
			});
			sendRequest({ 
				actionName: "province",
				path: CommonPath.province,
				params: {
					area: this.queryParams.area
				},
				actions: ServiceCommonXhrAct
			});
			sendRequest({
				actionName: "industry",
				path: CommonPath.industry,
				params: {},
				actions: ServiceCommonXhrAct
			});	
		}else{
			sendRequest({
				actionName: "province",
				path: CommonPath.province,
				params: {
					area: this.queryParams.area
				},
				actions: ServiceCommonXhrAct
			});
		}
		sendRequest({
			actionName: "panelData",
			path: PathInfo.panelData,
			params: this.queryParams,
			actions: ServiceCommonXhrAct
		});
		ServiceXhrName.forEach((item, index) => {
			sendRequest({
				actionName: item,
				path: PathInfo[item],
				params: this.queryParams,
				actions: ServiceXhrAct
			});
		});
	}
	popInvalidTimeNotify(){
		let mStart = moment(this.queryParams.startTime);
		let mEnd = moment(this.queryParams.endTime);
		if(mEnd.diff(mStart) < 0){
			notification.error({
				message: '温馨提示',
				description: '您选择的开始日期小于结束日期',
			});
		}
	}
  selectEnd(value){
		this.props.selectEnd(value);
  }
  selectRegion(value){
		this.props.selectRegion(value);
		this.props.selectProvince(-1);
		this.queryParams.provence = -1;
		this.props.sendRequest({
			actionName: "province",
			path: CommonPath.province,
			params: {
				area: value
			},
			actions: ServiceCommonXhrAct
		});
  }
  selectProvince(value){
    this.props.selectProvince(value);
  }
  selectIndustry(value){
    this.props.selectIndustry(value);
	}
	clickPanelItem(item){
		if(item.key != this.defaultTab){
			this.props.clickPanelItem(item.key);
			this.props.getData();
			this.props.selectEnd(this.queryParams.endTime);
			this.props.selectRegion(this.queryParams.area);
			this.props.selectProvince(this.queryParams.provence);
			this.props.selectIndustry(this.queryParams.profession);
			if(item.link){
				this.props.history.push(item.link, {
					startTime: this.queryParams.startTime,
					endTime: this.queryParams.endTime,
					regionId: this.queryParams.area,
					provinceId: this.queryParams.provence,
					industryId: this.queryParams.profession,
					defaultTab: item.key
				});
			}
		}		
	}
	queryData(){
		this.queryParams.endTime = this.props.endTime;
		this.queryParams.area = this.props.regionId;
		this.queryParams.provence = this.props.provinceId;
		this.queryParams.profession = this.props.industryId;
		this.props.getData();
		this.props.sendRequest({
			actionName: "panelData",
			path: PathInfo.panelData,
			params: this.queryParams,
			actions: ServiceCommonXhrAct
		});
		ServiceXhrName.forEach((item, index) => {
			this.props.sendRequest({
				actionName: item,
				path: PathInfo[item],
				params: this.queryParams,
				actions: ServiceXhrAct
			});
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
		let pannelData = [{
			title: panelKey["newService"],
			key: "newService",
			link: "/manager/shop",
			num: this.props.panelData.ashop,
			ratio: this.props.panelData.ashopRate
		},{
			title: panelKey["serviceIncome"],
			key: "serviceIncome",
			link: "/manager/shop",
			num: this.props.panelData.income,
			unit: "万",
			ratio: this.props.panelData.incomeRate
		},{
			title: panelKey["serviceContri"],
			key: "serviceContri",
			link: "/manager/shop",
			num: this.props.panelData.camount,
			unit: "万",
			ratio: this.props.panelData.camountRate
		},{
			title: panelKey["hasIncomeService"],
			key: "hasIncomeService",
			link: "/manager/shop",
			num: this.props.panelData.incomeValue,
			ratio: this.props.panelData.incomeValueRate
		},{
			title: panelKey["keyService"],
			key: "keyService",
			link: "/manager/keyshop",
			num: this.props.panelData.core,
		},{
			title: panelKey["zworkService"],
			key: "zworkService",
			link: "/manager/zworkshop",
			num: this.props.panelData.factory,
		}];

  	return <div className="hr-bg">
			<div className="dash-container">
				<h1 className="dash-pagetitle">
				<Link to="/manager/index" style={{fontSize: 18, color: "#5888f4"}}>总经理仪表盘&nbsp;>&nbsp;</Link>	
				服务商分析
				</h1>
				<NoquickHeader data={headerData} fns={headerFns}/>
				<SecPanel data={pannelData} defaultValue={this.defaultTab} clickFn={this.clickPanelItem.bind(this)}/>
				<ServiceCharts title={panelKey[this.props.defaultTab]} data={this.props}/>
			</div>
		</div>
  }
}