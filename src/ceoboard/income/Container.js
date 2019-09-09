import React, {Component} from 'react';
import {CommonMethod} from '../../common/tools/common';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import withSubscriptionHeader from '../common/component/BodyBox';
import IncomeMain from './Component';
import {XhrName, XhrAct} from './action';
import {PathInfo} from './constant';
import TimeUtil from '../../common/tools/timeUtil';

function mapStateToProps(state){
  return {...state.statetree.ceoIncome};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    sendRequest: CommonMethod.sendRequest,
    }, dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
class CeoIncome extends Component{
  constructor(props){
    super(props);
    console.log(props);
    this.queryParams = {
      startTime: this.props.startTime,
      endTime: this.props.endTime,
      area: this.props.regionId,
      province: this.props.provinceId,
      product: this.props.productId
    };
    this.selectParams = {
      incomeTrend: "day",
      incomeType: "income",
      areaStatus: "area",
      incomeRank: "product"
    };
    this.time = (new TimeUtil()).getAllDate();
  }
  componentDidMount(){
    this.sendRequest.bind(this)();
  }
  sendRequest(){
    XhrName.forEach((item) => {
      this.props.sendRequest({
        actionName: item,
        path: PathInfo[item],
        params: {
          target: this.selectParams[item],
          ...this.queryParams
        } ,
        actions: XhrAct
      })
    });
  }
  selectTrend(value){
    this.selectParams.incomeTrend = value;
    this.props.sendRequest({
      actionName: "incomeTrend",
      path: PathInfo.incomeTrend,
      params: {
        target: value,
        ...this.queryParams
      } ,
      actions: XhrAct
    });
  }
  selectType(value){
    this.selectParams.incomeType = value;
    this.props.sendRequest({
      actionName: "incomeType",
      path: PathInfo.incomeType,
      params: {
        target: value,
        ...this.queryParams
      } ,
      actions: XhrAct
    });
  }
  selectDistribute(value){
    this.selectParams.areaStatus = value;
    this.props.sendRequest({
      actionName: "areaStatus",
      path: PathInfo.areaStatus,
      params: {
        target: value,
        ...this.queryParams
      },
      actions: XhrAct
    });
  }
  selectIncome(value){
    this.selectParams.incomeRank = value;
    this.props.sendRequest({
      actionName: "incomeRank",
      path: PathInfo.incomeRank,
      params: {
        target: value,
        ...this.queryParams
      },
      actions: XhrAct
    });
  }
  selectTime(value){
    this.props.sendRequest({
      actionName: "incomeRank",
      path: PathInfo.incomeRank,
      params: {
        target: this.selectParams.incomeRank,
        ...this.queryParams,
        startTime: value === "month" ? this.time.curMonth :  this.time.yesterDay,
        endTime: this.time.yesterDay,
      },
      actions: XhrAct
    });
  }
  jumpManage(){
    this.props.selectRegion(this.props.userRole === "ceo" ? -1 : this.props.region[0].id);
    this.props.selectProvince(this.props.province[0].id);
    this.props.selectProduct(this.props.product[0].id);
    this.props.history.push("/secmanager/cmanage");
  }
  queryData(){
    this.queryParams.startTime = this.props.startTime;
    this.queryParams.endTime = this.props.endTime;
    this.queryParams.area = this.props.regionId;
    this.queryParams.province = this.props.provinceId;
    this.queryParams.product = this.props.productId;
    this.sendRequest.bind(this)();
  }
  render(){
    const fns = {
      selectTrend: this.selectTrend.bind(this),
      selectType: this.selectType.bind(this),
      selectDistribute: this.selectDistribute.bind(this),
      selectIncome: this.selectIncome.bind(this),
      selectTime: this.selectTime.bind(this),
      jumpManage: this.jumpManage.bind(this)
    }
    return <IncomeMain 
    {...this.props} 
    fns={fns}
    queryData={this.queryData.bind(this)}/>
  }
}
export default withSubscriptionHeader(CeoIncome , {
  showProduct: true
});