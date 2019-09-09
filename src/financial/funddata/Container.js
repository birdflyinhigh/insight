import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CommonMethod} from '../../common/tools/common';
import {PathInfo} from './constant';
import {Methods} from '../../common/tools/util';
import ManageBody from './Component';
import Header from './header';
import {fundDataXhrAction, fundDataXhrActName} from '../action';
import '../financial.css';

function mapStateToProps(state){
  return {...state.statetree.ffunddata};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(Object.assign({sendRequest: CommonMethod.sendRequest}, {}), dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class FinancialFund extends Component{
  constructor(props){
		super(props);
    this.queryParams = {
			year: Methods.getLastYear(),
			month: Methods.getLastMonth(),
		};
		this.indexType = ["balance", "income", "cost", "month_balance"];
  }
  componentDidMount() {
		let {sendRequest} = this.props;
		fundDataXhrActName.forEach((item, index) => {
			if(index > 2){
				sendRequest({
					actionName: item,
					path: PathInfo["detail"],
					params: {...this.queryParams,
						indexType: this.indexType[(index - 3) % 4],
						sign: index > 6 ? 0 : 1
					},
					actions: fundDataXhrAction
				});
			}else{
				sendRequest({
					actionName: item,
					path: PathInfo["totalData"],
					params: {...this.queryParams,
						sign: index - 1
					},
					actions: fundDataXhrAction
				});
			}
		});
	}
	selectYear(value){
		this.queryParams.year = value;
	}
	selectMonth(value){
		this.queryParams.month = value;
  }
  selectFType(value){

  }
	queryData(){
		fundDataXhrActName.forEach((item, index) => {
			if(index > 2){
				this.props.sendRequest({
					actionName: item,
					path: PathInfo["detail"],
					params: {...this.queryParams,
						indexType: this.indexType[(index - 3 )% 4],
						sign: index > 6 ? 0 : 1
					},
					actions: fundDataXhrAction
				});
			}else{
				this.props.sendRequest({
					actionName: item,
					path: PathInfo["totalData"],
					params: {...this.queryParams,
						sign: index - 1
					},
					actions: fundDataXhrAction
				});
			}
		});
	}
  render(){
		let fns = {
			selectYear: this.selectYear.bind(this), 
      selectMonth: this.selectMonth.bind(this),
			queryData: this.queryData.bind(this)
    };
		return <div className="financial-bg">
        <div className="hr-container">
          <h1 className="erp-pagetitle">集团资金核心数据（负责人：刘新）</h1>
          <Header fns={fns}/>
          <ManageBody data={{...this.props}} time={this.queryParams.month}/>
        </div>
      </div>
  }
}