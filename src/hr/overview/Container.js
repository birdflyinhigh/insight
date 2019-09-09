import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CommonMethod} from '../../common/tools/common';
import {PathInfo} from './constant';
import {Methods} from '../../common/tools/util';
import ManageBody from './Component';
import Header from './header';
import {OverviewXhrAct, OverviewXhrName} from '../action';
import './overview.css';

function mapStateToProps(state){
  return {...state.statetree.overview};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(Object.assign({sendRequest: CommonMethod.sendRequest}), dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class HrOverview extends Component{
  constructor(props){
    super(props);
    this.queryParams = {
			year: Methods.getYear(),
			// month: Methods.getMonth(),
			month: 5,
			orgLevel: 1,
			orgID: 100000,
			// 此参数只有最后一个接口才有用，其余接口无用，固定不变
			item: "perCapacity"
		};
  }
  componentDidMount() {
		let sendRequest = this.props.sendRequest;
		sendRequest({
			actionName: "org1",
			path: PathInfo.org,
			params: {
				prentOrgLevel: -1,
        prentOrgID: -1
			},
			actions: OverviewXhrAct
		});
		sendRequest({
			actionName: "org2",
			path: PathInfo.org,
			params: {
				prentOrgLevel: 1,
        prentOrgID: 100000
			},
			actions: OverviewXhrAct
		});
		OverviewXhrName.forEach((item, index) => {
			if(index > 2){
				sendRequest({
					actionName: item,
					path: PathInfo[item],
					params: this.queryParams,
					actions: OverviewXhrAct
				});
			}
		});
	}
	selectMonth(value){
		this.queryParams.month = value;
  }
  selectYear(value){
		this.queryParams.year = value;
	}
	selectFirstOrg(value){
		this.queryParams.orgLevel = 1;
		this.queryParams.orgID = value;
  }
  selectSecondOrg(value){
    this.queryParams.orgLevel = 2;
		this.queryParams.orgID = value;
		if(value == -1){
			this.queryParams.orgLevel = 1;		
			this.queryParams.orgID = this.props.org1Id;
		}
		this.props.sendRequest({
			actionName: "org3",
			path: PathInfo.org,
			params: {
				prentOrgLevel: 2,
        prentOrgID: value
			},
			actions: OverviewXhrAct
		});

  }
  selectThirdOrg(value){
    this.queryParams.orgLevel = 3;
		this.queryParams.orgID = value;
  }
  queryData(){
		OverviewXhrName.forEach((item, index) => {
			if(index > 2){
				this.props.sendRequest({
					actionName: item,
					path: PathInfo[item],
					params: this.queryParams,
					actions: OverviewXhrAct
				});
			}
		});
  }
  render(){
		let headerFns = {
			selectMonth: this.selectMonth.bind(this),
			selectYear: this.selectYear.bind(this),
			selectFirstOrg: this.selectFirstOrg.bind(this),
			selectSecondOrg: this.selectSecondOrg.bind(this),
			selectThirdOrg: this.selectThirdOrg.bind(this),
			queryData: this.queryData.bind(this)
		};
		let headerData = {
			org1: this.props.org1,
			org2: this.props.org2,
			org3: this.props.org3,
		};
		let pannelData = [{
			title: "发薪人数",
			num: (this.props.pstaffNum.totalNum || "0") + "人"
		},{
			title: "收入",
			num: (this.props.pincome.income || "0") + "万"
		},{
			title: "人力成本",
			num: (this.props.pcost.humanCost || "0") + "万"
		},{
			title: "人力投产比",
			num: (this.props.proi.incomePercent || "0")
		}];
		let data = {
			pannelData: pannelData,
			costIncrease: this.props.costIncrease,
			costStructure: this.props.costStructure,
			budgetRate: this.props.budgetRate,
			avgProductivity:this.props.avgProductivity,
			rank: this.props.rank
		};
		
  	return <div className="hr-bg">
			<div className="hr-container hr-overview">
				<h1 className="erp-pagetitle">整体概况</h1>
				<div className="hr-header">
					<Header fns={headerFns} data={headerData}/>
				</div>
				<div>
					<ManageBody data={data}/>
				</div>
			</div>
		</div>
  }
}