import React, {Component} from 'react';
import {CommonMethod} from '../../common/tools/common';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import withSubscriptionHeader from '../common/component/BodyBox';
import OrderMain from './Component';
import {XhrName, XhrAct} from './action';
import {PathInfo} from './constant';

function mapStateToProps(state){
  return {...state.statetree.ceoOrder};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    sendRequest: CommonMethod.sendRequest,
    }, dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
class CeoOrder extends Component{
  constructor(props){
    super(props);
    this.queryParams = {
      startTime: this.props.startTime,
      endTime: this.props.endTime,
      area: this.props.regionId,
      province: this.props.provinceId,
      product: this.props.productId
    };
    this.selectParams = {
      orderTrend: "count"
    }
  }
  componentDidMount(){
    this.sendRequest.bind(this)();
  }
  sendRequest(){
    XhrName.forEach((item) => {
      if(item === "orderTrend"){
        this.props.sendRequest({
          actionName: item,
          path: PathInfo[item],
          params: {
            target: this.selectParams[item],
            ...this.queryParams
          } ,
          actions: XhrAct
        });
      }else{
        this.props.sendRequest({
          actionName: item,
          path: PathInfo[item],
          params: this.queryParams ,
          actions: XhrAct
        });
      }
    });
  }
  selectTrend(value){
    this.selectParams.orderTrend = value;
    this.props.sendRequest({
      actionName: "orderTrend",
      path: PathInfo.orderTrend,
      params: {
        target: value,
        ...this.queryParams
      } ,
      actions: XhrAct
    });
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
    let fns = {
      selectTrend: this.selectTrend.bind(this),
      queryData: this.queryData.bind(this)
    }
    return <OrderMain {...this.props} 
    fns={fns}/>
  }
}
export default withSubscriptionHeader(CeoOrder , {
  showProduct: true
});