import React, {Component} from 'react';
import {CommonMethod} from '../../common/tools/common';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import withSubscriptionHeader from '../common/component/BodyBox';
import ServiceMain from './Component';
import {XhrAct, XhrName} from './action';
import {PathInfo} from './constant';

function mapStateToProps(state){
  return {...state.statetree.ceoService};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    sendRequest: CommonMethod.sendRequest,
    }, dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
class CeoService extends Component{
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
      newShop: "area",
      keyService: "area"
    }
  }
  componentDidMount(){
    this.sendRequest.bind(this)();
  }
  sendRequest(){
    XhrName.forEach((item, index) => {
      if(item === "newShop" || item === "keyService"){
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
  selectNewShop(value){
    this.selectParams.newShop = value;
    this.props.sendRequest({
      actionName: "newShop",
      path: PathInfo.newShop,
      params: {
        target: value,
        ...this.queryParams
      } ,
      actions: XhrAct
    });
  }
  selectKeyService(value){
    this.selectParams.keyService = value;
    this.props.sendRequest({
      actionName: "keyService",
      path: PathInfo.keyService,
      params: {
        target: value,
        ...this.queryParams
      },
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
      selectKeyService: this.selectKeyService.bind(this),
      selectNewShop: this.selectNewShop.bind(this)
    }
    return <ServiceMain 
    {...this.props} 
    fns={fns}
    queryData={this.queryData.bind(this)}/>
  }
}
export default withSubscriptionHeader(CeoService , {
  showProduct: true
});