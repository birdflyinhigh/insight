import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CommonMethod} from '../../common/tools/common';
import {PathInfo} from './constant';
import {Methods} from '../../common/tools/util';
import ManageBody from './Component';
import Header from './header';
import {manageXhrAction, manageXhrActName, manageUiAction} from '../action';
import '../financial.css';
function mapStateToProps(state){
  return {...state.statetree.fmanage};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(Object.assign({sendRequest: CommonMethod.sendRequest}, manageUiAction), dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class FinancialManage extends Component{
  constructor(props){
		super(props);
    this.queryParams = {
			sign: 0,
			year: Methods.getLastYear(),
			month: Methods.getLastMonth(),
			orgID: 100000
		};
		this.orgs = {
			org1Id: 100000,
			org2Id: -1,
			org3Id: -1, 
			org4Id: -1
		};
    this.orgType = 1;//0-老组织，1-新组织
		// 上方tab和前三个表格indexType;
		this.tabIndexType = ["income", "cost", "profit", "roi", ];
		this.chartsIndexType = ["income", "cost", "profit", "deal_emp", "rebuy_rate", "core_work"];
		this.extraSelectFlag = {
			icpIndex: "income",
			icpDimension: "org",
			icpChartBarId: -1,
		};
		this.extraAreaFlag = {
			areaDemension: "region",//region-单个区域,allcountry-全国
			areaIndex: "income",//income-收入，profit-利润，little-profit-毛利			
			areaLevelType: "region",// region-大区，province-省份，city-城市
			areaChartBarId: -1,
			curLevel: "regionData1",//regionData1-一层，regionData2-二层，regionData3-第三
			level1BarKey: -1,//一层点击柱子暂存，返回用
		}
  }
  componentDidMount() {
		let {sendRequest} = this.props;
		sendRequest({
			actionName: "org1",
			path: PathInfo.org,
			params: {
				prentOrgLevel: -1,
				prentOrgID: -1,
				state: this.orgType
			},
			actions: manageXhrAction
		});
		sendRequest({
			actionName: "org2",
			path: PathInfo.org,
			params: {
				prentOrgLevel: 1,
				prentOrgID: 100000,
				state: this.orgType
			},
			actions: manageXhrAction
		});
		sendRequest({
			actionName: "orgold",
			path: PathInfo.org,
			params: {
				prentOrgLevel: 1,
				prentOrgID: 100000,
				state: 0
			},
			actions: manageXhrAction
		});
		for(let i = 0; i < manageXhrActName.length; i ++){
			if( i > 4 && i <= 8){
				sendRequest({
					actionName: manageXhrActName[i],
					path: PathInfo.tab,
					params: {
						...this.queryParams,
						// tabindextype从0开始取
						indexType: this.tabIndexType[i - 5]
					},
					actions: manageXhrAction
				});
			}else if(i > 8 && i <= 14){
				sendRequest({
					actionName: manageXhrActName[i],
					path: PathInfo.rate,
					params: {
						...this.queryParams,
						// chartsIndexType从0开始取
						indexType: this.chartsIndexType[i - 9]
					},
					actions: manageXhrAction
				});
			}else if(i > 14){
				break;
			}
		}
		sendRequest({
			actionName: "icpIndexOrgData",
			path: PathInfo["icpIndexOrgData"],
			params:  {
				...this.queryParams,
				indexType: "income",
				parentOrgID: -1
			},
			actions: manageXhrAction
		});
		// 区域的
		sendRequest({
			actionName: "regionData1",
			path: PathInfo["region"],
			params:  {
				...this.queryParams,
				indexType: "income",
				regionType: "region",
				parentRegionID: -1
			},
			actions: manageXhrAction
		});
	}
	sendICPRequestChart(type, id){
		// 收入、成本、利润的下级组织
		if(type === "org"){
			if(id == -1){
				this.props.sendRequest({
					actionName: "icpIndexOrgData",
					path: PathInfo.icpIndexOrgData,
					params: {
						...this.queryParams,
						indexType: this.extraSelectFlag.icpIndex,
						parentOrgID: id
					},
					actions: manageXhrAction
				});
			}else{
				this.props.sendRequest({
					actionName: "icpSecondOrgData",
					path: PathInfo.icpIndexOrgData,
					params: {
						...this.queryParams,
						indexType: this.extraSelectFlag.icpIndex,
						parentOrgID: id
					},
					actions: manageXhrAction
				});
			}
			
		// 成本科目（默认属于成本）
		}else if(type === "cost_kind"){
			if(id == -1){
				this.props.sendRequest({
					actionName: "icpCostSubject",
					path: PathInfo.icpIndexOtherData,
					params: {
						...this.queryParams,
						indexType: type,
						parentKindID: id
					},
					actions: manageXhrAction
				});
			}else{
				this.props.sendRequest({
					actionName: "icpCostSecondSubject",
					path: PathInfo.icpIndexOtherData,
					params: {
						...this.queryParams,
						indexType: type,
						parentKindID: id
					},
					actions: manageXhrAction
				});
			}
			
		// 收入-收入科目 +  商业产品
		}else{
			this.props.sendRequest({
				actionName: "icpIndexOtherData",
				path: PathInfo.icpIndexOtherData,
				params: {
					...this.queryParams,
					indexType: type,
					parentKindID: id
				},
				actions: manageXhrAction
			});
		}
	}
	selectOrgType(value){
		this.orgType = value;
		this.queryParams.orgLevel = 1;
		this.queryParams.orgID = 100000;
		this.props.sendRequest({
			actionName: "org1",
			path: PathInfo.org,
			params: {
				prentOrgLevel: -1,
				prentOrgID: -1,
				state: this.orgType
			},
			actions: manageXhrAction
		});
		this.props.sendRequest({
			actionName: "org2",
			path: PathInfo.org,
			params: {
				prentOrgLevel: 1,
				prentOrgID: 100000,
				state: this.orgType
			},
			actions: manageXhrAction
		});
	}
	selectOldOrg(value){
		this.orgType = 0;
		this.queryParams.orgLevel = 1000;
		this.queryParams.orgID = value;
		this.props.clearList(this.queryParams.orgID);
	}
	handleSearchOld(value){
		this.props.searchOld(value);
	}
	onFucusSearch(){
		
	}
  selectFirstOrg(value){
		this.queryParams.orgLevel = 1;
		this.queryParams.orgID = value;
		this.orgs.org1Id = value;
	}
	selectSecondOrg(value){
		this.queryParams.orgLevel = 2;
		this.queryParams.orgID = value;
		if(value == -1){
			this.queryParams.orgLevel = 1;		
			this.queryParams.orgID = this.orgs.org1Id;
		}else{
			this.orgs.org2Id = value;
		}
		this.props.sendRequest({
			actionName: "org3",
			path: PathInfo.org,
			params: {
				prentOrgLevel: 2,
				prentOrgID: value,
				state: this.orgType
			},
			actions: manageXhrAction
		});
		this.props.sendRequest({
			actionName: "org4",
			path: PathInfo.org,
			params: {
				prentOrgLevel: 3,
				prentOrgID: -1,
				state: this.orgType
			},
			actions: manageXhrAction
		});
	}
	selectThirdOrg(value){
		this.queryParams.orgLevel = 3;
		if(value == -1){
			this.queryParams.orgLevel = 2;
			this.queryParams.orgID = this.orgs.org2Id;
		}else{
			this.queryParams.orgID = value;
			this.orgs.org3Id = value;
		}	
		this.props.sendRequest({
			actionName: "org4",
			path: PathInfo.org,
			params: {
				prentOrgLevel: 3,
				prentOrgID: value,
				state: this.orgType
			},
			actions: manageXhrAction
		});
	}
	selectForthOrg(value){
		this.queryParams.orgLevel = 4;
		if(value == -1){
			this.queryParams.orgLevel = 3;
			this.queryParams.orgID = this.orgs.org3Id;
		}else{
			this.queryParams.orgID = value;
			this.orgs.org4Id = value;
		}	
	}
	selectYear(value){
		this.queryParams.year = value;
	}
	selectMonth(value){
		this.queryParams.month = value;
  }
  // selectFType(value){
	// 	this.queryParams.sign = value;
	// }
	chooseICPIndex(value){
		this.extraSelectFlag.icpIndex = value;
		this.extraSelectFlag.icpDimension = "org";
		this.icpIndexType = value;
		this.extraSelectFlag.icpChartBarId = -1;
		this.props.sendRequest({
			actionName: "icpIndexOrgData",
			path: PathInfo.icpIndexOrgData,
			params: {
				...this.queryParams,
				indexType: value,
				parentOrgID: -1
			},
			actions: manageXhrAction
		});
	}
	chooseICPDimension(value){
		this.extraSelectFlag.icpDimension = value;
		this.extraSelectFlag.icpChartBarId = -1;
		this.sendICPRequestChart.bind(this, value, -1)();
	}
	clickICPChart(id){
		console.log(id);
		this.extraSelectFlag.icpChartBarId = id;
		this.sendICPRequestChart.bind(this, this.extraSelectFlag.icpDimension, id)();
	}
	icpBackChart(){
		this.extraSelectFlag.icpChartBarId = -1;
	}
	chooseAreaIndex(value){
		this.extraAreaFlag.areaLevelType = "region";
		this.extraAreaFlag.areaIndex = value;
		this.extraAreaFlag.areaDemension = "region";
		this.extraAreaFlag.areaChartBarId = "-1";
		this.extraAreaFlag.curLevel = "regionData1";
		this.props.sendRequest({
			actionName: "regionData1",
			path: PathInfo.region,
			params: {
				...this.queryParams,
				indexType: value,
				parentRegionID: -1,
				regionType: "region"
			},
			actions: manageXhrAction
		});
	}
	chooseAreaDimension(value){
		this.extraAreaFlag.areaLevelType = "region";
		this.extraAreaFlag.areaDemension = value;
		this.extraAreaFlag.curLevel = "regionData1";
		this.extraAreaFlag.areaChartBarId = "-1";
		this.props.sendRequest({
			actionName: "regionData1",
			path: PathInfo[value],
			params: {
				...this.queryParams,
				indexType: this.extraAreaFlag.areaIndex,
				parentRegionID: this.extraAreaFlag.areaChartBarId,
				regionType: "region"
			},
			actions: manageXhrAction
		});
	}
	clickAreaChart1(id){
		this.extraAreaFlag.areaLevelType = "province";
		this.extraAreaFlag.areaChartBarId = id;
		this.extraAreaFlag.curLevel = "regionData2";
		this.extraAreaFlag.level1BarKey = id;
		this.props.sendRequest({
			actionName: "regionData2",
			path: PathInfo[this.extraAreaFlag.areaDemension],
			params: {
				...this.queryParams,
				indexType: this.extraAreaFlag.areaIndex,
				parentRegionID: id,
				regionType: "province"
			},
			actions: manageXhrAction
		});
	}
	clickAreaChart2(id){
		this.extraAreaFlag.areaLevelType = "city";
		this.extraAreaFlag.areaChartBarId = id;
		this.extraAreaFlag.curLevel = "regionData3";
		this.extraAreaFlag.level2BarKey = id;
		this.props.sendRequest({
			actionName: "regionData3",
			path: PathInfo[this.extraAreaFlag.areaDemension],
			params: {
				...this.queryParams,
				indexType: this.extraAreaFlag.areaIndex,
				parentRegionID: id,
				regionType: "city"
			},
			actions: manageXhrAction
		});
	}
	returnLevel1(){
		this.extraAreaFlag.areaLevelType = "region";
		this.extraAreaFlag.areaChartBarId = -1;
	}
	returnLevel2(){
		this.extraAreaFlag.areaLevelType = "province";
		this.extraAreaFlag.areaChartBarId = this.extraAreaFlag.level1BarKey;
	}
	jumptoDetail(){
		this.props.history.push(`/fmdetail`, {
      year: this.queryParams.year,
      month: this.queryParams.month,
      sign:this.queryParams.sign,
      indexType: this.extraAreaFlag.areaIndex,
      regionType: this.extraAreaFlag.areaLevelType
    });
	}
	queryData(){
		for(let i = 0; i < manageXhrActName.length; i ++){
			if( i > 4 && i <= 8){
				this.props.sendRequest({
					actionName: manageXhrActName[i],
					path: PathInfo.tab,
					params: {
						...this.queryParams,
						// tabindextype从0开始取
						indexType: this.tabIndexType[i - 5]
					},
					actions: manageXhrAction
				});
			}else if(i > 8 && i <= 14){
				this.props.sendRequest({
					actionName: manageXhrActName[i],
					path: PathInfo.rate,
					params: {
						...this.queryParams,
						// chartsIndexType从0开始取
						indexType: this.chartsIndexType[i - 9]
					},
					actions: manageXhrAction
				});
			}else if(i > 14){
				break;
			}
		}
		this.props.sendRequest({
			actionName: this.extraAreaFlag.curLevel,
			path: PathInfo[this.extraAreaFlag.areaDemension],
			params: {
				...this.queryParams,
				indexType: this.extraAreaFlag.areaIndex,
				parentRegionID: this.extraAreaFlag.areaChartBarId,
				regionType: this.extraAreaFlag.areaLevelType
			},
			actions: manageXhrAction
		});
		this.sendICPRequestChart.bind(this, this.extraSelectFlag.icpDimension, this.extraSelectFlag.icpChartBarId)();
	}
  render(){
    let hdata = {
			org1: this.props.org1,
			org2: this.props.org2,
			org3: this.props.org3,
			org4: this.props.org4,
			orgold: this.props.orgold
		}
		let fns = {
			selectOrgType: this.selectOrgType.bind(this),
			selectFirstOrg: this.selectFirstOrg.bind(this), 
			selectSecondOrg: this.selectSecondOrg.bind(this), 
			selectThirdOrg: this.selectThirdOrg.bind(this), 
			selectForthOrg: this.selectForthOrg.bind(this), 
			selectOldOrg: this.selectOldOrg.bind(this),
			handleSearchOld: this.handleSearchOld.bind(this),
			onFucusSearch: this.onFucusSearch.bind(this),
			selectYear: this.selectYear.bind(this), 
      selectMonth: this.selectMonth.bind(this),
			// selectFType: this.selectFType.bind(this),
			queryData: this.queryData.bind(this)
		};
		let bodyFns = {
			chooseICPIndex: this.chooseICPIndex.bind(this),
			chooseICPDimension: this.chooseICPDimension.bind(this),
			clickICPChart: this.clickICPChart.bind(this),
			icpBackChart: this.icpBackChart.bind(this),
			chooseAreaIndex: this.chooseAreaIndex.bind(this),
			chooseAreaDimension: this.chooseAreaDimension.bind(this),
			clickAreaChart1: this.clickAreaChart1.bind(this),
			clickAreaChart2: this.clickAreaChart2.bind(this),
			returnLevel1: this.returnLevel1.bind(this),
			returnLevel2: this.returnLevel2.bind(this),
			jumptoDetail: this.jumptoDetail.bind(this)
		}
    let panelData = [{
      title1: `${this.queryParams.month}月收入`,
      title2: "全年累计收入：",
      title3: `${this.queryParams.month}月人均收入：`,
      num: (this.props.incomeTab.monthNum || 0) + "万",
      stackNum: (this.props.incomeTab.totalNum || 0) + "万",
      avgNum: (this.props.incomeTab.avgNum || 0) + "万"
    },{
      title1: `${this.queryParams.month}月成本`,
      title2: "全年累计成本：",
      title3: `${this.queryParams.month}月人均成本：`,
      num: (this.props.costTab.monthNum || 0) + "万",
      stackNum: (this.props.costTab.totalNum || 0) + "万",
      avgNum: (this.props.costTab.avgNum || 0) + "万"
    },{
      title1: `${this.queryParams.month}月利润`,
      title2: "全年累计利润：",
      title3: `${this.queryParams.month}月人均利润：`,
      num: (this.props.profitTab.monthNum || 0) + "万",
      stackNum: (this.props.profitTab.totalNum || 0) + "万",
      avgNum: (this.props.profitTab.avgNum || 0) + "万"
    },{
      title1: `${this.queryParams.month}月投入产出比`,
      title2: "全年投入产出比：",
      title3: "",
			num: this.props.ratioTab.monthNum || 0,
      stackNum: this.props.ratioTab.totalNum || 0,
		}];
		return <div className="financial-bg">
        <div className="hr-container">
          <h1 className="erp-pagetitle">集团预算-管理核心数据（负责人：刘新）</h1>
          <Header fns={fns} data={hdata}/>
          <ManageBody panelData={panelData} data={{...this.props}} fns={bodyFns} month={this.queryParams.month}/>
        </div>
      </div>
  }
}