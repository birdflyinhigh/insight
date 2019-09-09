import React, { Component } from 'react';
import { CommonMethod } from '../../common/tools/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withSubscriptionHeader from '../common/component/BodyBox';
import ManageMain from './Component';
import { PathInfo } from './constant';
import { XhrName, XhrAct } from './action';

function mapStateToProps(state) {
  return { ...state.statetree.ceoManager };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    sendRequest: CommonMethod.sendRequest,
  }, dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
class CeoManage extends Component {
  constructor(props) {
    super(props);
    this.queryParams = {
      startTime: this.props.startTime,
      endTime: this.props.endTime,
      area: this.props.regionId,
      province: this.props.provinceId,
    };
    this.selectParams = {
      sales: 'sale',
      salesTrend: "day",
      profitTrend: "day",
      refoundTrend: "day"
    }
  }
  componentDidMount() {
    this.sendRequest.bind(this)();
  }
  sendRequest() {
    const filterName = ["sales", "salesTrend", "profitTrend", "refoundTrend"];
    XhrName.forEach((item, index) => {
      if (filterName.indexOf(item) > -1) {
        this.props.sendRequest({
          actionName: item,
          path: PathInfo[item],
          params: {
            target: this.selectParams[item],
            ...this.queryParams
          },
          actions: XhrAct
        });
      } else {
        this.props.sendRequest({
          actionName: item,
          path: PathInfo[item],
          params: this.queryParams,
          actions: XhrAct
        });
      }
    })
  }

  selectSales(value) {
    this.selectParams.sales = value;
    this.props.sendRequest({
      actionName: "sales",
      path: PathInfo.sales,
      params: {
        target: value,
        ...this.queryParams
      },
      actions: XhrAct
    });
  }

  selectSalesTrend(value) {
    this.selectParams.salesTrend = value;
    this.props.sendRequest({
      actionName: "salesTrend",
      path: PathInfo.salesTrend,
      params: {
        target: value,
        ...this.queryParams
      },
      actions: XhrAct
    });
  }

  selectProfitTrend(value) {
    this.selectParams.profitTrend = value;
    this.props.sendRequest({
      actionName: "profitTrend",
      path: PathInfo.profitTrend,
      params: {
        target: value,
        ...this.queryParams
      },
      actions: XhrAct
    });
  }

  selectRefoundTrend(value) {
    this.selectParams.refoundTrend = value;
    this.props.sendRequest({
      actionName: "refoundTrend",
      path: PathInfo.refoundTrend,
      params: {
        target: value,
        ...this.queryParams
      },
      actions: XhrAct
    });
  }

  queryData() {
    this.queryParams.startTime = this.props.startTime;
    this.queryParams.endTime = this.props.endTime;
    this.queryParams.area = this.props.regionId;
    this.queryParams.province = this.props.provinceId;
    this.sendRequest.bind(this)();
  }

  render() {
    const fns = {
      selectSales: this.selectSales.bind(this),
      selectSalesTrend: this.selectSalesTrend.bind(this),
      selectProfitTrend: this.selectProfitTrend.bind(this),
      selectRefoundTrend: this.selectRefoundTrend.bind(this)
    }
    return <ManageMain {...this.props}
      fns={fns}
      queryData={this.queryData.bind(this)} />
  }
}
export default withSubscriptionHeader(CeoManage, {
  showProduct: true
});