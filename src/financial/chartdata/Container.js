import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CommonMethod} from '../../common/tools/common';
import {PathInfo} from './constant';
import {Methods} from '../../common/tools/util';
import ManageBody from './Component';
import Header from './header';
import {chartDataXhrActName, chartDataXhrAction, chartDataUiAction} from '../action';
import '../financial.css';

function mapStateToProps(state){
  return {...state.statetree.fchartdata};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(Object.assign({sendRequest: CommonMethod.sendRequest}, chartDataUiAction), dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class FinancialManage extends Component{
  constructor(props){
    super(props);
    this.queryParams = {
			companyID: 'C1001',
			year: Methods.getLastYear(),
			month: Methods.getLastMonth(),
		};
		this.indexTypeParams = ["income", "cost", "profit", "total_balance", "debt", "net_balance", "income"];
  }
  componentDidMount() {
		let {sendRequest} = this.props;
		sendRequest({
			actionName: "org2",
			path: PathInfo.org,
			params: {
				parentCompanyID: 1001,
				queryLevel: 2
			},
			actions: chartDataXhrAction
		});
		sendRequest({
			actionName: "org3",
			path: PathInfo.org,
			params: {
				parentCompanyID: 1001,
				queryLevel: 3
			},
			actions: chartDataXhrAction
		});
		sendRequest({
			actionName: "totalData",
			path: PathInfo.totalData,
			params: this.queryParams,
			actions: chartDataXhrAction
		});
		chartDataXhrActName.forEach((item, index) => {
			if(index > 3){
				sendRequest({
					actionName: item,
					path: PathInfo[item],
					params: {...this.queryParams, indexType: this.indexTypeParams[index - 4]},
					actions: chartDataXhrAction
				});
			}
		});
	}
  selectFirstOrg(value){
		this.queryParams.companyID = value;
		this.props.selectOrg1(value);
	}
	selectSecondOrg(value){
		this.props.selectOrg2(value);
		this.props.sendRequest({
			actionName: "org3",
			path: PathInfo.org,
			params: {
				parentCompanyID: value,
				queryLevel: 3
			},
			actions: chartDataXhrAction
		}, (data) => {
			this.queryParams.companyID = data.data[0]["companyID"];
		});
	}
	selectThirdOrg(value){
		this.queryParams.companyID = value;
		this.props.selectOrg3(value);
	}
	selectYear(value){
		this.queryParams.year = value;
	}
	selectMonth(value){
		this.queryParams.month = value;
	}
	selectSecond(value){
		this.props.sendRequest({
			actionName: "corporationCompare",
			path: PathInfo.corporationCompare,
			params: {...this.queryParams, indexType: value},
			actions: chartDataXhrAction
		});
		this.indexTypeParams[this.indexTypeParams.length - 1] = value;
	}
	queryData(){
		this.props.sendRequest({
			actionName: "totalData",
			path: PathInfo.totalData,
			params: this.queryParams,
			actions: chartDataXhrAction
		});
		chartDataXhrActName.forEach((item, index) => {
			if(index > 3){
				this.props.sendRequest({
					actionName: item,
					path: PathInfo[item],
					params: {...this.queryParams, indexType: this.indexTypeParams[index - 4]},
					actions: chartDataXhrAction
				});
			}
		});
	}
  render(){
    let hdata = {
			org1: this.props.org1,
			org2: this.props.org2,
			org3: this.props.org3,
			org1Id: this.props.org1Id,
			org2Id: this.props.org2Id,
			org3Id: this.props.org3Id
		}
		let fns = {
			selectFirstOrg: this.selectFirstOrg.bind(this), 
			selectSecondOrg: this.selectSecondOrg.bind(this), 
			selectThirdOrg: this.selectThirdOrg.bind(this), 
			selectYear: this.selectYear.bind(this), 
      selectMonth: this.selectMonth.bind(this),
			queryData: this.queryData.bind(this)
		};
		let bodyFns = {
			selectSecond: this.selectSecond.bind(this)
		}
		return <div className="financial-bg">
        <div className="hr-container">
          <h1 className="erp-pagetitle">集团财报核心数据（负责人：刘新）</h1>
          <Header fns={fns} data={hdata}/>
          <ManageBody data={{...this.props}} month={this.queryParams.month} fns={bodyFns}/>
        </div>
      </div>
  }
}