import React, {Component} from 'react';
import ErpTable from '../../../common/component/Table';
import BarChart from '../../../common/charts/BarChart';
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
    let header = {
      data: [{
        value: this.props.data.orgType == 1 ? "采购公司" : "行业线/组织",
        colspan: 1,
        rowspan: 1
      },{
        value: "二级品类",
        colspan: 1,
        rowspan: 1
      },{
        value: "金额",
        colspan: 1,
        rowspan: 1
      },{
        value: "寻源公司",
        colspan: 1,
        rowspan: 1
      }],
      row: [1],
      nocollapse: true
    };
    let columns = [{
      key: "company"
    },{
      key: "category2"
    },{
      key: "amount",
    },{
      key: "sourcingOrg",
    }];
    // let fixed = [{
    //   key: "year",
    //   value: "2017"     
    // }];
    let {barData, tableData} = this.props.data;
      return <div className="erp-body">
        <div className="self-row self-clearfix">
          <div style={{height: 650}}>
            <div className="item-container">
              <h3 className="chart-title">工程品类采购分析
                <span onClick={this.download.bind(this, "projectDetail")}>下载</span>
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