import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Header from './header';
import IncomeCost from './component/IncomeCost';
import Profit from './component/Profit';
import {PathInfo} from './constant';
import {CommonMethod} from '../../../common/tools/common';
import {DashManageUiAct,
	DashMIncomeXhrAct, DashMIncomeXhrName,
	DashMCostXhrAct, DashMCostXhrName,
	DashMProfitXhrAct, DashMProfitXhrName,
	CommonManageAct
} from './action';

function mapStateToProps(state){
  return {...state.statetree.dashmanage};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(Object.assign({sendRequest: CommonMethod.sendRequest}, {...DashManageUiAct}), dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class DashHrBase extends Component{
  constructor(props){
		super(props);
		this.defaultParams = {
			year: (props.location.state && props.location.state.year) ? props.location.state.year : props.yearId,
			month: (props.location.state && props.location.state.month) ? props.location.state.month : props.monthId,
			indexType: (props.location.state && props.location.state.defaultTab) ? props.location.state.defaultTab : "income",
		};
		this.kindType = {
			income: "income_kind",
			cost: "cost_kind",
			profit: ""
		};
    this.queryParams = {
			orgLevel: this.props.orgLevel, 
			year: this.defaultParams.year,
			month: this.defaultParams.month,
			orgID: this.props.orgId,
			indexType: this.defaultParams.indexType,
			sign: 0, //only for trend
			index: this.kindType[this.defaultParams.indexType]
		};
		this.state = {
			curPanel: this.queryParams.indexType
		};
		this.curPanel = this.queryParams.indexType;
  }
  componentDidMount() {
		let {sendRequest} = this.props;
		this.props.selectYear(this.defaultParams.year);
		this.props.selectMonth(this.defaultParams.month);
		// console.log(this.props)
		this.allRequest.bind(this)();
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
			actions: CommonManageAct
		});
		sendRequest({
			actionName: "org2",
			path: PathInfo.org,
			params: {
				prentOrgLevel: 1,
				prentOrgID: 100000,
				state: 1
			},
			actions: CommonManageAct
		});
		this.props.sendRequest({
			actionName: "incomePanel",
			path: PathInfo["panelData"],
			params: {...this.queryParams,
				indexType: "income"
			},
			actions: CommonManageAct
		});
		this.props.sendRequest({
			actionName: "costPanel",
			path: PathInfo["panelData"],
			params: {...this.queryParams,
				indexType: "cost"
			},
			actions: CommonManageAct
		});
		this.props.sendRequest({
			actionName: "profitPanel",
			path: PathInfo["panelData"],
			params: {...this.queryParams,
				indexType: "profit"
			},
			actions: CommonManageAct
		});
	}
	allRequest(){	
		switch(this.curPanel){
			case "income":	
				DashMIncomeXhrName.forEach((item, index) => {
					this.props.sendRequest({
						actionName: item,
						path: PathInfo[item],
						params: this.queryParams,
						actions: DashMIncomeXhrAct
					});
				});
			break;
			case "cost":
				DashMCostXhrName.forEach((item, index) => {
					this.props.sendRequest({
						actionName: item,
						path: PathInfo[item],
						params: this.queryParams,
						actions: DashMCostXhrAct
					});
				});
			break;
			case "profit":
				DashMProfitXhrName.forEach((item, index) => {
					this.props.sendRequest({
						actionName: item,
						path: PathInfo[item],
						params: this.queryParams,
						actions: DashMProfitXhrAct
					});
				});
			break;
			default:
			break;
		}	
	}
	selectFirstOrg(value){
		this.queryParams.orgLevel = 1;
		this.queryParams.orgID = value;
		this.props.selectOrg1(value);
		this.props.selectLevel({
			orgId: this.queryParams.orgID,
			orgLevel: this.queryParams.orgLevel 
		});
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
				prentOrgID: value,
				state: 1
			},
			actions: CommonManageAct
		});
		this.props.sendRequest({
			actionName: "org4",
			path: PathInfo.org,
			params: {
				prentOrgLevel: 3,
				prentOrgID: -1,
				state: 1
			},
			actions: CommonManageAct
		});
		this.props.selectOrg2(value);
		this.props.selectLevel({
			orgId: this.queryParams.orgID,
			orgLevel: this.queryParams.orgLevel 
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
		this.props.sendRequest({
			actionName: "org4",
			path: PathInfo.org,
			params: {
				prentOrgLevel: 3,
				prentOrgID: value,
				state: 1
			},
			actions: CommonManageAct
		});
		this.props.selectOrg3(value);
		this.props.selectLevel({
			orgId: this.queryParams.orgID,
			orgLevel: this.queryParams.orgLevel 
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
		this.props.selectOrg4(value);
		this.props.selectLevel({
			orgId: this.queryParams.orgID,
			orgLevel: this.queryParams.orgLevel 
		});
	}
	selectYear(value){
		this.queryParams.year = value;
		this.props.selectYear(value);
	}
	selectMonth(value){
		this.queryParams.month = value;
		this.props.selectMonth(value);
	}
	checkTab(item){
		this.setState({
			curPanel: item.key
		});
		this.curPanel = item.key;
		this.queryParams.indexType = item.key;
		this.queryParams.index = this.kindType[item.key];
		this.allRequest.bind(this)();
	}
	queryData(){
		this.props.sendRequest({
			actionName: "incomePanel",
			path: PathInfo["panelData"],
			params: {...this.queryParams,
				indexType: "income"
			},
			actions: CommonManageAct
		});
		this.props.sendRequest({
			actionName: "costPanel",
			path: PathInfo["panelData"],
			params: {...this.queryParams,
				indexType: "cost"
			},
			actions: CommonManageAct
		});
		this.props.sendRequest({
			actionName: "profitPanel",
			path: PathInfo["panelData"],
			params: {...this.queryParams,
				indexType: "profit"
			},
			actions: CommonManageAct
		});
		this.allRequest.bind(this)();
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
		};
		let fns = {
			selectFirstOrg: this.selectFirstOrg.bind(this), 
			selectSecondOrg: this.selectSecondOrg.bind(this), 
			selectThirdOrg: this.selectThirdOrg.bind(this), 
			selectForthOrg: this.selectForthOrg.bind(this), 
			selectYear: this.selectYear.bind(this), 
			selectMonth: this.selectMonth.bind(this),
			queryData: this.queryData.bind(this)
		};
		let pannelData = [{
			title: `${this.queryParams.month}月管报收入`,
			num: this.props.incomePanel.monthNum + "万",
			// subText1: this.props.incomePanel.budgetRate,
			subText2: this.props.incomePanel.lastRate,
			key: "income"
		},{
			title: `${this.queryParams.month}月管报成本`,
			num: this.props.costPanel.monthNum + "万",
			// subText1: this.props.costPanel.budgetRate,
			subText2: this.props.costPanel.lastRate,
			key: "cost"
		},{
			title: `${this.queryParams.month}月管报利润`,
			num: this.props.profitPanel.monthNum + "万",
			// subText1: this.props.profitPanel.budgetRate,
			subText2: this.props.profitPanel.lastRate,
			key: "profit"
		}];
		let incomeCostTitles = {
			incomeTrendTitle: "收入趋势(单位:万)",
			costTrendTitle: "成本趋势及预算完成情况(单位:万)",
			incomeConsTitle: `${this.queryParams.month}月收入组织构成(单位:万)`,
			costConsTitle: `${this.queryParams.month}月成本组织构成(单位:万)`,
			incomeSconsTitle: `${this.queryParams.month}月收入科目构成-top10(单位:万)`,
			costSconsTitle: `${this.queryParams.month}月成本科目构成(单位:万)`,
			incomeStrendTitle: "各科目收入趋势(单位:万)",
			costStrendTitle: "各科目成本趋势(单位:万)",
		};
		let tempPanelKey = this.state.curPanel == "profit" ? "profit" : this.state.curPanel
		let incCostData = {
			trend: this.props[`${tempPanelKey}Trend`],
			trendTitle: incomeCostTitles[`${tempPanelKey}TrendTitle`],
			construct: this.props[`${tempPanelKey}Construct`],
			consTitle: incomeCostTitles[`${tempPanelKey}ConsTitle`],
			subjectCons: this.props[`${tempPanelKey}SubjectCons`],
			sconsTitle: incomeCostTitles[`${tempPanelKey}SconsTitle`],
			subjectTrend: this.props[`${tempPanelKey}SubjectTrend`],
			strendTitle: incomeCostTitles[`${tempPanelKey}StrendTitle`],
		};
		let profitData = {
			profitTrend: this.props.profitTrend,
			trendTitle: "利润趋势(单位:万)",
			profitConstruct: this.props.profitConstruct,
			consTitle: `${this.queryParams.month}月利润组织构成(单位:万)`,
			profitRatio: this.props.profitRatio,
			ratioTitle: "投入产出比",
		};
  	return <div className="hr-bg">
			<div className="hr-container">
				<h1 className="erp-pagetitle">
					<Link to="/manager/index" style={{fontSize: 14}}>返回上级页面</Link>	
					管报数据
				</h1>
				<Header fns={fns} data={hdata}/>
				<div className="hr-pannel">
					{pannelData.map((item, index, arr) => {
						return <div className="hrpan-item-wrapper" key={index} 
							style={{width: `${(93/arr.length).toFixed(2)}%`}}
							onClick={this.checkTab.bind(this, item)}>
											<div className={`${this.state.curPanel === item.key ? "itembg-1" : "itembg-5"} hrpan-item clickable`}
											style={{backgroundSize: "100% 100%"}}
											>
												<div className="hrpan-num">{item.num || 0}</div>
												<div className="hrpan-intro">{item.title}</div>
												<div className="dash-subhr-title">
													{/* <div>
														<span className="dst-titletxt">目标完成</span>
														<span>{item.subText1 || 0}%</span>
													</div> */}
													<div>
														<span className="dst-titletxt">环比</span>
														<span className={item.subText2 > 0 ? "panel-num-up" : "panel-num-down"}>{item.subText2 || 0}%</span>
													</div>
													{/* <div>
														<span className="dst-titletxt">同比</span>
														<span className={item.subText2 > 0 ? "panel-num-up" : "panel-num-down"}>{item.subText3.rate}</span>
														<span>{item.subText2}%</span>
													</div> */}
												</div>
											</div>
									</div>
					})}
				</div>
				{this.state.curPanel == "profit" ? <Profit {...profitData}/> : <IncomeCost {...incCostData}/>}			
			</div>
		</div>
  }
}