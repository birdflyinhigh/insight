import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CommonMethod} from '../../common/tools/common';
import {PathInfo} from './constant';
import ManageBody from './Component';
import Header from './header';
import {ManageXhrAct, ManageUiAct, ManageXhrName} from '../action';
import './manage.css';

function mapStateToProps(state){
  return {...state.statetree.manage};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(Object.assign({sendRequest: CommonMethod.sendRequest}, ManageUiAct), dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class HrManagege extends Component{
  constructor(props){
		super(props);
    this.queryParams = {
			year: this.props.year,
			// month: this.props.month,
			month: 5,
			orgLevel: this.props.levelId,
			orgID: this.props.selectDepartId
		};
		this.indexType = this.props.indexId;
  }
  componentDidMount() {
		this.props.sendRequest({
			actionName: "department",
			path: PathInfo.department,
			params: {
				orgLevel: this.props.levelId
			},
			actions: ManageXhrAct
		}, (data) => {
			this.props.selectCurdepart(this.queryParams.orgID);
		});
		this.props.sendRequest({
			actionName: "rankPanel",
			path: PathInfo.rankPanel,
			params: {...this.queryParams,
				item: this.indexType
			},
			actions: ManageXhrAct
		});
		ManageXhrName.forEach((actName, index) => {
			if(index > 1){
				this.props.sendRequest({
					actionName: actName,
					path: PathInfo[actName],
					params: this.queryParams,
					actions: ManageXhrAct
				});
			}
		})
	}
	getCurDepartName(){
		let selectedItem = this.props.totalPanelData.filter((item) => item.orgID == this.props.selectDepartId);
		return selectedItem[0] ? selectedItem[0].name : ""
	}
	jumpSecondPage(link, id, name){
		let clickId = id ? id : "";
		let clickName = name ? name : "";
		this.props.history.push(link, {
			year: this.props.year,
			month: this.props.month,
			indexId: this.props.indexId,
			levelId: this.props.levelId,
			selectDepartId: this.props.selectDepartId,
			indexName: this.props.indexName,
			levelName: this.props.levelName,
			departName: this.props.departName,
			id: clickId,
			name: clickName
		});
	}
	selectMonth(value){
		this.queryParams.month = value;
		this.props.selectMonth(value);
  }
  selectYear(value){
		this.queryParams.year = value;
		this.props.selectYear(value);
	}
  selectIndex(value){
		this.indexType = value;
		this.props.selectIndex(value);
  }
  selectLevel(value){
		this.queryParams.orgLevel = value;
		this.props.sendRequest({
			actionName: "department",
			path: PathInfo.department,
			params: {
				orgLevel: value
			},
			actions: ManageXhrAct
		}, (data) => {
			this.queryParams.orgID = data.data[0]["id"];
			this.props.selectCurdepart(this.queryParams.orgID);
		});
		this.props.selectLevel(value);
	}
	nextPage(){
		this.props.nextPage();
	}
	prevPage(){
		this.props.prevPage();
	}
  selectCurdepart(value){
		this.queryParams.orgID = value;
		this.props.selectCurdepart(value);
	}
	pannelSelectDepart(item){
		if(this.props.levelId  !=  item.orgLevel){
			this.queryParams.orgLevel = item.orgLevel;
			this.queryParams.orgID = item.orgID;
			this.props.selectLevel(item.orgLevel);
			this.props.selectCurdepart(item.orgID);
			this.props.sendRequest({
				actionName: "department",
				path: PathInfo.department,
				params: {
					orgLevel: item.orgLevel
				},
				actions: ManageXhrAct
			});
			
			
		}else{
			this.selectCurdepart(item.orgID);
		}
		ManageXhrName.forEach((actName, index) => {
			if(index > 1){
				this.props.sendRequest({
					actionName: actName,
					path: PathInfo[actName],
					params: this.queryParams,
					actions: ManageXhrAct
				});
			}
		});
	}
  queryData(value){
		this.props.sendRequest({
			actionName: "rankPanel",
			path: PathInfo.rankPanel,
			params: {...this.queryParams,
				item: this.indexType
			},
			actions: ManageXhrAct
		});
		ManageXhrName.forEach((actName, index) => {
			if(index > 1){
				this.props.sendRequest({
					actionName: actName,
					path: PathInfo[actName],
					params: this.queryParams,
					actions: ManageXhrAct
				});
			}
		});
  }
  render(){
		let headerFns = {
			selectMonth: this.selectMonth.bind(this),
			selectYear: this.selectYear.bind(this),
			selectIndex: this.selectIndex.bind(this),
			selectLevel: this.selectLevel.bind(this),
			selectCurdepart: this.selectCurdepart.bind(this),
			queryData: this.queryData.bind(this)
		};
		let headerData = {
			selectDepartId: this.props.selectDepartId,
			year: this.props.year,
			month: this.props.month,
			indexId: this.props.indexId,
			levelId: this.props.levelId,
			departList: this.props.departList,
			indexList: this.props.indexList
		};
		let data = {
			rankPannel1: this.props.rankPannel1,
			rankPannel2: this.props.rankPannel2,
			costIncrease: this.props.costIncrease,
			bugetRate: this.props.bugetRate,
			avgProduct: this.props.avgProduct,
			perCost: this.props.perCost,
			perWorktime:this.props.perWorktime,
			structure: this.props.structure
		};
		let bodyFns = {
			jumpSecondPage: this.jumpSecondPage.bind(this)
		}
  	return <div className="hr-bg">
			<div className="hr-container">
				<h1 className="erp-pagetitle">经营单元</h1>
				<div className="hr-header">
					<Header fns={headerFns} data={headerData}/>
				</div>
				<div className="hr-mpannel">
					<div className="mpanelbtn mprev-btn" onClick={this.prevPage.bind(this)} style={this.props.curPage == 0 ? {visibility: "hidden"} : {}}></div>
					<div className="m-pannel1">
						<div className="mpanel-title">
							<b className="pannel-col1" style={{textAlign: "center"}}>部门</b>
							<b className="pannel-col2">收入</b>
							<b className="pannel-col2">收入完成率</b>
							<b className="pannel-col2">发薪人数</b>
							<b className="pannel-col2">人均产值</b>
						</div>
						<ul className="mpannel-content">
						  {this.props.rankPannel1.length > 0 ? this.props.rankPannel1.map((item, index) => {
								return <li key={index}
								className={item.orgID == this.props.selectDepartId ? "choosedItem" : ""}
								onClick={this.pannelSelectDepart.bind(this, item)}>
										<b className="pannel-col1">
											<i className="prank-top">TOP</i>
											<i className="prank-index">{item.index}</i>
											<i>{item.name}</i>
										</b>
										<b className="pannel-col2">
											<i>{item.income}W</i>
											<i className={"prank-icon " + (item.incomeRate == "-" ? "" : item.incomeRate > 0 ? "pkup" : "pkdown")}></i>
											<i className="prank-rate">{item.incomeRate == "-" ? "" : `${item.incomeRate}%`}</i>
										</b>
										<b className="pannel-col2">
											<i>{item.incomedCompeteRate}%</i>
											<i className={"prank-icon " + (item.incomedIncreRate == "-" ? "" : item.incomedIncreRate > 0 ? "pkup" : "pkdown")}></i>
											<i className="prank-rate">{item.incomedIncreRate == "-" ? "" : `${item.incomedIncreRate}%`}</i>
										</b>
										<b className="pannel-col2">
											<i>{item.personNum}</i>
											<i className={"prank-icon " + (item.personNumRate == "-" ? "" : item.personNumRate > 0 ? "pkup" : "pkdown")}></i>
											<i className="prank-rate">{item.personNumRate == "-" ? "" : `${item.personNumRate}%`}</i>
										</b>
										<b className="pannel-col2">
											<i>{item.perCapacity}W/人</i>
											<i className={"prank-icon " + (item.perCapacityRate == "-" ? "" : item.perCapacityRate > 0 ? "pkup" : "pkdown")}></i>
											<i className="prank-rate">{item.perCapacityRate == "-" ? "" :`${item.perCapacityRate}%`}</i>
										</b>
									</li>
							}) : <p style={{textAlign: "center", paddingTop: 20}}>暂无数据</p>}	
						</ul>
					</div>
					<div className="m-pannel1 nomargin">
						<div className="mpanel-title">
							<b className="pannel-col1" style={{textAlign: "center"}}>部门</b>
							<b className="pannel-col2">收入</b>
							<b className="pannel-col2">收入完成率</b>
							<b className="pannel-col2">发薪人数</b>
							<b className="pannel-col2">人均产值</b>
						</div>
						<ul className="mpannel-content">
						{this.props.rankPannel2.length > 0 ? this.props.rankPannel2.map((item, index) => {
								return <li key={index}
									className={item.orgID == this.props.selectDepartId ? "choosedItem" : ""}
									onClick={this.pannelSelectDepart.bind(this, item)}>
										<b className="pannel-col1">
											<i className="prank-top">TOP</i>
											<i className="prank-index">{item.index}</i>
											<i>{item.name}</i>
										</b>
										<b className="pannel-col2">
											<i>{item.income}W</i>
											<i className={"prank-icon " + (item.incomeRate == "-" ? "" : +item.incomeRate > 0 ? "pkup" : "pkdown")}></i>
											<i className="prank-rate">{item.incomeRate == "-" ? "" : (item.incomeRate + "%")}</i>
										</b>
										<b className="pannel-col2">
											<i>{item.incomedCompeteRate}%</i>
											<i className={"prank-icon " + (item.incomedIncreRate == "-" ? "" : +item.incomedIncreRate > 0 ? "pkup" : "pkdown")}></i>
											<i className="prank-rate">{item.incomedIncreRate == "-" ? "" :  (item.incomedIncreRate + "%")}</i>
										</b>
										<b className="pannel-col2">
											<i>{item.personNum}</i>
											<i className={"prank-icon " + (item.personNumRate == "-" ? "" : +item.personNumRate > 0 ? "pkup" : "pkdown")}></i>
											<i className="prank-rate">{item.personNumRate == "-" ? "" :  (item.personNumRate + "%")}</i>
										</b>
										<b className="pannel-col2">
											<i>{item.perCapacity}W/人</i>
											<i className={"prank-icon " + (item.perCapacityRate =="-" ? "" : +item.perCapacityRate > 0 ? "pkup" : "pkdown")}></i>
											<i className="prank-rate">{item.perCapacityRate == "-" ? "" :  (item.perCapacityRate + "%")}</i>
										</b>
									</li>
							}) : <p style={{textAlign: "center", paddingTop: 20}}>暂无数据</p>}	
						</ul>
					</div>
					<div className="mpanelbtn" onClick={this.nextPage.bind(this)}
					style={(this.props.curPage + 1) <= (Math.ceil(this.props.totalPanelData.length / 10)) ? {} : {visibility: "hidden"}}></div>
				</div>
				<div className="hrchart-container">
					<p className="manage-sectitle">部门明细数据: {this.props.departName}</p>
					<ManageBody data={data} fns={bodyFns}/>
				</div>
			</div>
		</div>
  }
}