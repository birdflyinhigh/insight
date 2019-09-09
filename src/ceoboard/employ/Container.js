import React, {Component} from 'react';
import {CommonMethod} from '../../common/tools/common';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import withSubscriptionHeader from '../common/component/BodyBox';
import EmployeMain from './Component';
import {XhrName, XhrAct} from './action';
import {PathInfo} from './constant';

function mapStateToProps(state){
  return {...state.statetree.ceoEmploye};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    sendRequest: CommonMethod.sendRequest,
    }, dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
class ceoEmploye extends Component{
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
      employArea: "submit",
      employProduct: "submit"
    };
  }
  componentDidMount(){
    this.sendRequest.bind(this)();
  }
  sendRequest(){
    XhrName.forEach((item) => {
      if(item === "employArea" || item === "employProduct"){
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
          params: this.queryParams,
          actions: XhrAct
        });
      }
    });
  }
  chooseAreaType(value){
    this.selectParams.employArea = value;
    this.props.sendRequest({
      actionName: "employArea",
      path: PathInfo.employArea,
      params: {
        target: value,
        ...this.queryParams
      } ,
      actions: XhrAct
    });
  }
  chooseProType(value){
    this.selectParams.employProduct = value;
    this.props.sendRequest({
      actionName: "employProduct",
      path: PathInfo.employProduct,
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
    const fns = {
      chooseAreaType: this.chooseAreaType.bind(this),
      chooseProType: this.chooseProType.bind(this)
    }
    return <EmployeMain 
    {...this.props} 
    fns={fns}
    queryData={this.queryData.bind(this)}/>
  }
}
export default withSubscriptionHeader(ceoEmploye , {
  showProduct: true
});