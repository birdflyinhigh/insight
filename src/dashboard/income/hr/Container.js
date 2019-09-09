import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Header from './header';
import BaseBody from './Component';
import {PathInfo} from './constant';
import {CommonMethod} from '../../../common/tools/common';
import {BaseXhrName, BaseXhrAct, BaseUiAct} from './action';

function mapStateToProps(state){
  return {...state.statetree.dashihr};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(Object.assign({sendRequest: CommonMethod.sendRequest}, {...BaseUiAct}), dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class DashHrBase extends Component{
  constructor(props){
		super(props);
		this.queryParams = {
			// orgLevel: (this.props.location.state && this.props.location.state.orgLevel) ? this.props.location.state.orgLevel : this.props.orgLevel, 
			year: this.props.location.state && this.props.location.state.year ? this.props.location.state.year : this.props.yearId,
			month: this.props.location.state && this.props.location.state.month ? this.props.location.state.month : this.props.monthId,
			// orgID: (this.props.location.state && this.props.location.state.orgID) ? this.props.location.state.orgID : this.props.orgId
			orgLevel: this.props.orgLevel,
			orgID: this.props.orgId,
		};
		this.tempObj = {
			org1Name: this.props.org1Name,
			org2Name: this.props.org2Name,
			org3Name: this.props.org3Name,
			org4Name: this.props.org4Name,
		};;
  }
  componentDidMount() {
		let {sendRequest} = this.props;
		this.props.selectYear(this.queryParams.year);
		this.props.selectMonth(this.queryParams.month);
		// this.props.selectLevel({
		// 	orgId: this.queryParams.orgID,
		// 	orgLevel: this.queryParams.orgLevel
		// });
		// if(this.props.org1.length > 0){
		// 	return; 
		// }
		sendRequest({
			actionName: "org1",
			path: PathInfo.org,
			params: {
				prentOrgLevel: -1,
				prentOrgID: -1,
				state: 1
			},
			actions: BaseXhrAct
		});
		sendRequest({
			actionName: "org2",
			path: PathInfo.org,
			params: {
				prentOrgLevel: 1,
				prentOrgID: 100000,
				state: 1
			},
			actions: BaseXhrAct
		});
		BaseXhrName.forEach((item, index) => {
			if(index > 4){
				sendRequest({
					actionName: item,
					path: PathInfo[item],
					params: this.queryParams,
					actions: BaseXhrAct
				});
			}
		});
	}
	selectFirstOrg(value){
		this.props.selectOrg1(value);
		this.props.selectLevel({
			orgId: value,
			orgLevel: 1
		});
	}
	selectSecondOrg(value){
		this.props.selectOrg2(value);
		this.props.selectLevel({
			orgId: value == -1 ? this.props.org1Id : value,
			orgLevel: value == -1 ?  1 : 2
		});
		this.props.sendRequest({
			actionName: "org3",
			path: PathInfo.org,
			params: {
				prentOrgLevel: 2,
				prentOrgID: value,
				state: 1
			},
			actions: BaseXhrAct
		});
		this.props.sendRequest({
			actionName: "org4",
			path: PathInfo.org,
			params: {
				prentOrgLevel: 3,
				prentOrgID: -1,
				state: 1
			},
			actions: BaseXhrAct
		});
	}
	selectThirdOrg(value){
		this.props.selectOrg3(value);
		this.props.selectLevel({
			orgId: value == -1 ? this.props.org2Id : value,
			orgLevel: value == -1 ?  2 : 3
		});
		this.props.sendRequest({
			actionName: "org4",
			path: PathInfo.org,
			params: {
				prentOrgLevel: 3,
				prentOrgID: value,
				state: 1
			},
			actions: BaseXhrAct
		});
		
	}
	selectForthOrg(value){
		this.props.selectOrg4(value);
		this.props.selectLevel({
			orgId: value == -1 ? this.props.org3Id : value,
			orgLevel: value == -1 ?  3 : 4
		});
	}
	selectYear(value){
		this.props.selectYear(value);
	}
	selectMonth(value){
		this.props.selectMonth(value);
	}
	jumpSecondPage(link, id, name){
		let clickId = id ? id : "";
		let clickName = name ? name : "";
		this.props.history.push(link, {
			...this.tempObj,
			month: this.queryParams.month,
			year: this.queryParams.year,
			orgLevel: this.queryParams.orgLevel,
			orgID: this.queryParams.orgID,
			name: clickName,
			specificId: clickId,
			link: "/manager/ihr"
		});
	}
	kindChartFn(jobFunction){
		this.props.sendRequest({
			actionName: "secKind",
			path: PathInfo["secKind"],
			params: {
				...this.queryParams,
				jobfunction: jobFunction
			},
			actions: BaseXhrAct
		});
	}
	queryData(){
		this.queryParams.year = this.props.yearId;
		this.queryParams.month = this.props.monthId;
		this.queryParams.orgID = this.props.orgId;
		this.queryParams.orgLevel = this.props.orgLevel;
		BaseXhrName.forEach((item, index) => {
			if(index > 4){
				this.props.sendRequest({
					actionName: item,
					path: PathInfo[item],
					params: this.queryParams,
					actions: BaseXhrAct
				});
			}
		});
	}
  render(){
		let hdata = {
			org1: this.props.org1,
			org2: this.props.org2,
			org3: this.props.org3,
			org4: this.props.org4,
			org1Id: this.props.org1Id,
			org2Id: this.props.org2Id,
			org3Id: this.props.org3Id,
			org4Id: this.props.org4Id,
			monthId: this.props.monthId,
			yearId: this.props.yearId
		}
		let fns = {
			selectFirstOrg: this.selectFirstOrg.bind(this), 
			selectSecondOrg: this.selectSecondOrg.bind(this), 
			selectThirdOrg: this.selectThirdOrg.bind(this), 
			selectForthOrg: this.selectForthOrg.bind(this), 
			selectYear: this.selectYear.bind(this), 
			selectMonth: this.selectMonth.bind(this),
			queryData: this.queryData.bind(this)
		};
		let bodyFns = {
			jumpSecondPage: this.jumpSecondPage.bind(this),
			kindChartFn: this.kindChartFn.bind(this)
		}
  	return <div className="hr-bg">
			<div className="hr-container">
				<h1 className="erp-pagetitle">
					<Link to="/manager/hr" style={{fontSize: 14}}>返回上级页面</Link>	
					人员基础数据
				</h1>
				<Header fns={fns} data={hdata}/>
				<BaseBody {...this.props} fns={bodyFns}/>
			</div>
		</div>
  }
}