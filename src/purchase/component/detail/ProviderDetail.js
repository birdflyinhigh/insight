import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import ErpTable from '../../../common/component/Table';
import {Methods} from '../../../common/tools/util';
import {Modal} from 'antd';
import {providerAction} from '../../action/action';
import {PathInfo, DownloadUrl,LevelMap, SelectMap, IdName} from '../../constants';

export default class ProviderDetail extends Component{
  constructor(props){
    super(props);
    this.state = {
      curPage: 0
    };
  }
  componentDidMount(){
    this.props.fns.getAllPro();
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
        rowspan: 1,
      },{
        value: "供应商排名",
        colspan: 1,
        rowspan: 1
      },{
        value: "供应商采购总金额（万元）",
        colspan: 1,
        rowspan: 1
      },{
        value: "笔数",
        colspan: 1,
        rowspan: 1
      }],
      row: [1],
      nocollapse: true
    };
    let columns = [{
      key: "rank"
    },{
      key:"providerName",
      render: function(record){
        let providerIndex = that.props.data.allTradeData.data.providerName.indexOf(record.value);
        return <Link to={{
          pathname: "/purchase/purprovider/pursubpro",
          state: {
            id: that.props.data.allTradeData.data.providerID[providerIndex],
            link: "/purchase/purprovider/alltrade"
          }
        }}>{record.value}</Link>
      }
    }, {
      key:"amount",
    }, {
      key: "num"
    }];// this.props.data.tableData.data
    // console.log(this.props.data.allTradeData.data)
      return <div className="erp-body">
        <div className="self-row self-clearfix">
          <div className="common-padding" style={{height: 650}}>
            <div className="item-container">
              <h3 className="chart-title">集团有采购明细的供应商数据
                <span onClick={this.download.bind(this, "allProDetail")}>下载</span>
              </h3>
                <div className="common-padding table-wrapper" >
                  <ErpTable header={header} columns={columns}
                  data={Methods.getNextPage(this.state.curPage, 10, this.props.data.allTradeData.data)}
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