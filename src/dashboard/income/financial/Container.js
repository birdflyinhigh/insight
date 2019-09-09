import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import {CommonMethod} from '../../../common/tools/common';
import {PathInfo} from './constant';
import {Methods} from '../../../common/tools/util';
import ManageBody from './Component';
import Header from './header';
import {chartDataXhrActName, chartPanelXhrActName, chartDataXhrAction, chartDataUiAction} from './action';

function mapStateToProps(state){
  return {...state.statetree.dashfinancial};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(Object.assign({sendRequest: CommonMethod.sendRequest}, chartDataUiAction), dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class FinancialManage extends Component{
  constructor(props){
		super(props);
		this.defaultParams = {
			year: (props.location.state && props.location.state.year) ? props.location.state.year : Methods.getYear(),
			month: (props.location.state && props.location.state.month) ? props.location.state.month : Methods.getMonth() - 1,
		};
    this.queryParams = {
			companyID: 'C1001',
			year: this.defaultParams.year,
			month: this.defaultParams.month,
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
		chartPanelXhrActName.forEach((item, index) => {
			sendRequest({
				actionName: item,
				path: PathInfo["totalData"],
				params: {
					...this.queryParams, 
					indexType: this.indexTypeParams[index]},
				actions: chartDataXhrAction
			});
		});
		chartDataXhrActName.forEach((item, index) => {
			if(index > 3){
				sendRequest({
					actionName: item,
					path: PathInfo[item],
					params: {
						...this.queryParams, 
						indexType: this.indexTypeParams[index - 4]},
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
		chartPanelXhrActName.forEach((item, index) => {
			this.props.sendRequest({
				actionName: item,
				path: PathInfo["totalData"],
				params: {
					...this.queryParams, 
					indexType: this.indexTypeParams[index]},
				actions: chartDataXhrAction
			});
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
			org3Id: this.props.org3Id,
			monthId: this.queryParams.month,
			yearId: this.queryParams.year
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
          <h1 className="erp-pagetitle">
					<Link to="/manager/index" style={{fontSize: 14}}>返回上级页面</Link>	
					财报数据
					</h1>
          <Header fns={fns} data={hdata}/>
          <ManageBody data={{...this.props}} month={this.queryParams.month} fns={bodyFns}/>
        </div>
      </div>
  }
}