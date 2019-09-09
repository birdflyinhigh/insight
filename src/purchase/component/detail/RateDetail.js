import React, {Component} from 'react';
import ErpTable from '../../../common/component/Table';
import {Methods} from '../../../common/tools/util';

export default class OverviewDetailPage extends Component{
  constructor(){
    super();
    this.state = {
      curPage: 0,//第一个表页
      secondPage: 0
    };
  }
  nextPage(curPage, pageName){
    this.setState({
      [pageName]: curPage
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
        value: "二级品类",
        colspan: 1,
        rowspan: 1
      },{
        value: "二级品类金额（万元）",
        colspan: 1,
        rowspan: 1
      },{
        value: "二级品类金额占比(%)",
        colspan: 1,
        rowspan: 1
      }],
      row: [1],
      nocollapse: true
    };
    let header2 = {
      data: [{
        value: this.props.data.orgType == 1 ? "一级公司" : "行业线/组织",
        colspan: 1,
        rowspan: 1
      },{
        value: "一级品类",
        colspan: 1,
        rowspan: 1
      },{
        value: "二级品类",
        colspan: 1,
        rowspan: 1
      },{
        value: "金额（万元）",
        colspan: 1,
        rowspan: 1
      },{
        value: "占比(%)",
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
      key:"categoryTwoName",
    }, {
      key:"amount",
    },{
      key:"rate",
    }];
    let columns2 = [{
      key:"orgName",
      mainColumn: true
    }, {
      key:"categoryOneName",
      mainColumn: true
    }, {
      key:"categoryTwoName",
    }, {
      key:"amount",
    },{
      key:"rate",
    }];
      return <div className="erp-body">
        <div className="self-row self-clearfix">
          <div className="self-col-5" style={{height: 650}}>
            <div className="item-container">
              <h3 className="chart-title">采购二级品类金额分析
                <span onClick={this.download.bind(this, "rateSecond")}>下载</span>
              </h3>
                <div className="common-padding table-wrapper" >
                <ErpTable header={header1} data={this.props.data.secondTable} columns={columns1} config={{two: true, first: true}}
                data={Methods.getNextPage(this.state.curPage, 10, this.props.data.secondTable.data)}
                nextPage={this.nextPage.bind(this)}/>
                </div>
            </div>
          </div>
          <div className="self-col-5" style={{height: 650}}>
            <div className="item-container">
              <h3 className="chart-title">{this.props.data.orgType == 1 ? "公司" : "行业线"}/组织采购品类金额明细分析
                <span onClick={this.download.bind(this, "rateThird")}>下载</span>
              </h3>
                <div className="common-padding table-wrapper" >
                <ErpTable header={header2} columns={columns2} config={{two: true, second: true}}
                data={Methods.getNextPage(this.state.secondPage, 10, this.props.data.thirdTable.data)}
                nextPage={this.nextPage.bind(this)}
                pageName="secondPage"
                />
                </div>
            </div>
          </div>
      </div> 
      <div className="bottom-intro">
            <h3>说明</h3>
            <ul>
              <li>采购类别（一级分类）: 一级采购品类包括市场类、IT类、工程类、行政/HR/法务类、质询类五大类。</li>
              <li>采购类别（二级分类）: 二级采购品类包括市场类（印刷类、品牌宣传类、礼品类等）、IT类（IT设备、IT配件、软件等）、工程类（工程实施和装饰材料）、行政/HR/法务类（办公用品、办公设备、办公耗材等）、质询类（法务服务和财务服务）五大类。</li>
              <li>采购类别（三级分类）: 三级采购品类包括标签、海报、书册、服装、包类、电脑、内存条等各个细分类别。</li>
            </ul>
        </div>
      </div>
  }
}