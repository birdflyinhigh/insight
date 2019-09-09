import React, {Component} from 'react';
import ErpTable from '../../../common/component/Table';
import BarChart from '../../../common/charts/BarChart';
import {chartTool} from '../../../common/tools/transChartData';
import {DetailConfig} from '../../config';
import {Methods} from '../../../common/tools/util';

export default class SaveDetail extends Component{
  constructor(){
    super();
    this.state = {
      curPage1: 0,
      curPage2: 0
    };
  }
  nextPage1(curPage){
    this.setState({
      curPage1: curPage
    });
  }
  nextPage2(curPage){
    this.setState({
      curPage2: curPage
    });
  }
  download(name){
    this.props.fns.download(name);
  }
  render(){
    let header1 = {
      data: [{
        value: "一级品类",
        colspan: 1,
        rowspan: 1
      },{
        value: "预估金额（万元）",
        colspan: 1,
        rowspan: 1
      },{
        value: "实际采购金额（万元）",
        colspan: 1,
        rowspan: 1
      },{
        value: "节约比率（%）",
        colspan: 1,
        rowspan: 1
      }],
      row: [1],
      nocollapse: true
    };
    let header = {
      data: [{
        value: "寻源主体公司",
        colspan: 1,
        rowspan: 1
      },{
        value: "品类",
        colspan: 1,
        rowspan: 1
      },{
        value: "预估金额（万元）",
        colspan: 1,
        rowspan: 1
      },{
        value: "实际采购金额（万元）",
        colspan: 1,
        rowspan: 1
      },{
        value: "节约比率（%）",
        colspan: 1,
        rowspan: 1
      }],
      row: [1],
      nocollapse: true
    };
    let columns1 = [{
      key:"categoryOneName",
      mainColumn: true
    }, {
      key:"predictAmount",
    },{
      key:"realAmount",
    },{
      key:"saveRate",
    }];
    let columns2 = [{
      key:"company",
      mainColumn: true
    }, {
      key:"categoryOneName",
    },{
      key:"predictAmount",
    },{
      key:"realAmount",
    },{
      key:"saveRate",
    }];

    const {tableData, barData} = this.props.data;
      return <div className="erp-body">
        <div className="self-row self-clearfix">
        <div className="self-col-4" style={{height: 650}}>
        <div className="item-container">
          <h3 className="chart-title">月度采购金额节约分析
          <span onClick={this.download.bind(this, "saveBarDetail")}>下载</span></h3>
           <div className="common-padding table-wrapper">
              <ErpTable header={header1} columns={columns1} data={Methods.getNextPage(this.state.curPage1, 10, barData.data)}
              nextPage={this.nextPage1.bind(this)}/>
            </div>
        </div>
      </div>
      <div className="self-col-6" style={{height: 650}}>
        <div className="item-container">
          <h3 className="chart-title">采购一级品类节约金额明细表
            <span onClick={this.download.bind(this, "saveDetail")}>下载</span>
          </h3>
            <div className="common-padding table-wrapper">
              <ErpTable header={header} columns={columns2} data={Methods.getNextPage(this.state.curPage2, 10, tableData.data)}
              nextPage={this.nextPage2.bind(this)}/>
            </div>
        </div>
        </div>
      </div>
      </div>
  }
}