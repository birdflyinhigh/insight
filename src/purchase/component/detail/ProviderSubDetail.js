import React, {Component} from 'react';
import ErpTable from '../../../common/component/Table';
import {Methods} from '../../../common/tools/util';
import {Modal} from 'antd';

export default class ProviderDetail extends Component{
  constructor(props){
    super(props);
    this.state = {
      curPage: 0,
    };
  }
  componentDidMount(){
    let id = this.props.location.state && this.props.location.state.id ? this.props.location.state.id : -1;
    let link = this.props.location.state && this.props.location.state.link ? this.props.location.state.link : "/purchase";
    this.props.fns.getProOrderDetail(id, link);
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
    let that = this;
    let header = {
      data: [{
        value: "供应商",
        colspan: 1,
        rowspan: 1
      },{
        value: this.props.data.orgType == 1 ? "公司" : "公司",
        colspan: 1,
        rowspan: 1
      },{
        value: "采购事项",
        colspan: 1,
        rowspan: 1
      },{
        value: "订单编号",
        colspan: 1,
        rowspan: 1
      },{
        value: "订单总金额(万元)",
        colspan: 1,
        rowspan: 1
      },{
        value: "订单日期",
        colspan: 1,
        rowspan: 1
      }],
      row: [1],
      nocollapse: true
    };
    let columns = [{
      key:"providerName",
      mainColumn: true,
    }, {
      key:"company",
    }, {
      key:"comments",
    },{
      key:"num",
    },{
      key:"amount",
    },{
      key: "creation_date"
    }];

      return <div className="erp-body">
        <div className="self-row self-clearfix">
          <div className="common-padding" style={{height: 650}}>
            <div className="item-container">
              <h3 className="chart-title">供应商的交易明细
                <span onClick={this.download.bind(this, "oneProvider")}>下载</span>
              </h3>
                <div className="common-padding table-wrapper" >
                  <ErpTable header={header} columns={columns}
                  data={Methods.getNextPage(this.state.curPage, 10, this.props.data.tableData.data)}
                  nextPage={this.nextPage.bind(this)}/>
                </div>
            </div>
          </div>
        </div>
        <div className="bottom-intro">
          <h3>说明</h3>
          <ul>
            <li>供应商采购金额明细分析: 通过明细表按月、公司和事业部维度展现不同供应商的供应品类和金额明细。以便持续优化供应商战略，以针对重点供应商制定合作策略，保障供应。</li>
          </ul>
        </div>
      </div>
  }
}