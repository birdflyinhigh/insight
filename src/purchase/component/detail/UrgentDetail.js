import React, {Component} from 'react';
import ErpTable from '../../../common/component/Table';
import BarChart from '../../../common/charts/BarChart';
import LineBarChart from '../../../common/charts/LineBarChart';
import {chartTool} from '../../../common/tools/transChartData';
import {Methods} from '../../../common/tools/util';
import {DetailConfig} from '../../config';
export default class UrgentDetail extends Component{
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
    const data = [{name: 'Page A', uv: 590, pv: 800},
    {name: 'Page B', uv: 868, pv: 967},
    {name: 'Page C', uv: 1397, pv: 1098},
    {name: 'Page D', uv: 1480, pv: 1200},
    {name: 'Page E', uv: 1520, pv: 1108},
    {name: 'Page F', uv: 1400, pv: 680}];
    let header = {
      data: [{
        value: "公司",
        colspan: 1,
        rowspan: 1
      },{
        value: "申请部门(中心)",
        colspan: 1,
        rowspan: 1
      },{
        value: "一级品类",
        colspan: 1,
        rowspan: 1
      },{
        value: "总金额（万元）",
        colspan: 1,
        rowspan: 1
      },{
        value: "紧急采购金额（万元）",
        colspan: 1,
        rowspan: 1
      },{
        value: "紧急采购金额占比(%)",
        colspan: 1,
        rowspan: 1
      },{
        value: "订单数（笔数）",
        colspan: 1,
        rowspan: 1
      },{
        value: "紧急采购订单数量（笔数）",
        colspan: 1,
        rowspan: 1
      },{
        value: "紧急采购订单数量占比（%）",
        colspan: 1,
        rowspan: 1
      }],
      row: [1],
      nocollapse: true
    };
    let columns = [{
      key: "companyName",
      mainColumn: true
    },{
      key: "departmentName"
    },{
      key: "categoryOneName"
    },{
      key: "totalAmount"
    },{
      key: "urgentAmount"
    },{
      key:"urgentAmountRate"
    },{
      key:"totalNum"
    },{
      key:"urgentNum"
    },{
      key:"urgentNumRate"
    }];
    // let fixed = [{
    //   key: "year",
    //   value: "2017"     
    // }];
    let {barData, tableData} = this.props.data;
      return <div className="erp-body">
        <div className="self-row self-clearfix">
        <div className="self-col-4" style={{height: 650}}>
        <div className="item-container">
          <h3 className="chart-title">月度紧急采购</h3>
          <div style={{paddingTop: 100}}>
            <LineBarChart data={chartTool.generateBarLineData(barData, ["num"])} config={DetailConfig.urgent}/>
          </div>
        </div>
      </div>
      <div className="self-col-6" style={{height: 650}}>
        <div className="item-container">
          <h3 className="chart-title">紧急采购订单明细表
            <span onClick={this.download.bind(this, "urgentDetail")}>下载</span>
          </h3>
            <div className="common-padding table-wrapper">
              <ErpTable header={header} columns={columns} data={Methods.getNextPage(this.state.curPage, 10, tableData.data)}
              nextPage={this.nextPage.bind(this)}/>
            </div>
        </div>
        </div>
      </div>
      </div>
  }
}