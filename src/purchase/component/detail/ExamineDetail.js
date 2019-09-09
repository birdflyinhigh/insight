import React, {Component} from 'react';
import ErpTable from '../../../common/component/Table';
import LineBarChart from '../../../common/charts/LineBarChart';
import {chartTool} from '../../../common/tools/transChartData';
import {DetailConfig} from '../../config';
import {Methods} from '../../../common/tools/util';

export default class OverviewDetailPage extends Component{
  constructor(){
    super();
    this.state = {
      curPage: 0
    };
  }
  nextPage(curPage){
    this.setState({
      curPage: curPage
    });
  }
  download(name){
    this.props.fns.download(name);
  }
  render(){
    let header = {
      data: [{
        value: "年",
        colspan: 1,
        rowspan: 1
      },{
        value: "月",
        colspan: 1,
        rowspan: 1
      },{
        value: this.props.data.orgType == 1 ? "公司" : "行业线/组织",
        colspan: 1,
        rowspan: 1
      },{
        value: "采购总金额（万元）",
        colspan: 1,
        rowspan: 1
      },{
        value: "采购总数量",
        colspan: 1,
        rowspan: 1
      }],
      row: [1],
      nocollapse: true
    };
    let columns = [{
      key:"year",
    },{
      key:"month",
    },{
      key:"orgName",
    }, {
      key:"amount",
    }, {
      key:"num",
    }];
    let {tableData, barData} = this.props.data;
      return <div className="erp-body">
        <div className="self-row self-clearfix">
          <div className="self-col-4" style={{height: 700}}>
            <div className="item-container">
              <h3 className="chart-title">月度审批中的订单/合同金额分析</h3>
              <div style={{paddingTop: 100}}>
                <LineBarChart data={chartTool.generateBarLineData(barData, ["num"])} config={DetailConfig.overview}/>
              </div>
            </div>
          </div>
          <div className="self-col-6" style={{height: 700}}>
            <div className="item-container">
              <h3 className="chart-title">审批中的订单/合同金额明细表
                <span onClick={this.download.bind(this, "examineDetail")}>下载</span>
              </h3>
                <div className="common-padding table-wrapper">
                  <ErpTable header={header}  columns={columns} data={tableData}
                  data={Methods.getNextPage(this.state.curPage, 10, tableData.data)}
                  nextPage={this.nextPage.bind(this)}/>
                </div>
            </div>
          </div>
        </div>
        <div className="bottom-intro">
          <h3>说明</h3>
          <ul>
            <li>一级采购类目: 一级采购品类包括市场类、IT类、工程类、行政/HR/法务类、质询类五大类。</li>
            <li>二级采购类目: 二级采购品类包括市场类（印刷类、品牌宣传类、礼品类等）、IT类（IT设备、IT配件、软件等）、工程类（工程实施和装饰材料）、行政/HR/法务类（办公用品、办公设备、办公耗材等）、质询类（法务服务和财务服务）五大类。</li>
          </ul>
        </div>
      </div>
  }
}