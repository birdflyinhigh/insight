// HOC 营收分析，订单分析，雇主分析， 服务商分析，企业管家分析
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {CommonMethod} from '../../../common/tools/common';
import {PathInfo} from '../../index/constant';
import {HeaderXhrAct, HeaderUiAct} from '../../index/action';
import {TabLink} from '../../index/config';
function withSubscriptionHeader(WrappedComponent, configObj) {
  function mapStateToProps(state){
    return {...state.statetree.ceoIndex};
  }
  function mapDispatchToProps(dispatch){
    return bindActionCreators({
      sendRequest: CommonMethod.sendRequest,
      ...HeaderUiAct
      }, dispatch);
  }
  @connect(mapStateToProps, mapDispatchToProps)
  class WrapperContainer extends Component{
    constructor(props){
      super(props);
    }
    componentDidMount(){
      if(!this.props.product.length){
        this.props.sendRequest({
          actionName: "region",
          path: PathInfo.region,
          params: {},
          actions: HeaderXhrAct
        });
        this.props.sendRequest({ 
          actionName: "province",
          path: PathInfo.province,
          params: {
            area: this.props.regionId
          },
          actions: HeaderXhrAct
        });
      }
      if(configObj.showProduct){
        const curTab = TabLink.find((item) => item.link === window.location.pathname);
        this.props.sendRequest({ 
          actionName: "product",
          path: PathInfo.product,
          params: {
            module: curTab.key
          },
          actions: HeaderXhrAct
        });
      }
    }
    selectRegion(value){
      this.props.selectRegion(value);
      this.props.sendRequest({
        actionName: "province",
        path: PathInfo.province,
        params: {
          area: value
        },
        actions: HeaderXhrAct
      });
    }


    render(){
      if(!this.props.loadedProduct){
        return <span></span>
      }
      const childProps = {...this.props};
      childProps.selectRegion = this.selectRegion.bind(this);
      return <WrappedComponent {...childProps} />
    }
  }
  return WrapperContainer;
}
export default withSubscriptionHeader;
