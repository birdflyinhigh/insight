import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import {CommonMethod} from '../../../common/tools/common';
import {CommonDetailXhrAct} from '../../action';

import {TableColum, PathInfo} from '../quite/constant';
import {Table, Pagination} from 'antd';

function mapStateToProps(state){
  return {...state.statetree.quiterateTable};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(Object.assign({sendRequest: CommonMethod.sendRequest}), dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class Keyposition extends Component{
  constructor(props){
    super(props);
    this.queryParams = {
      orgLevel: this.props.history.location.state ? this.props.history.location.state.orgLevel : "",
			year: this.props.history.location.state ? this.props.history.location.state.name.slice(0,4) : "",
			month: this.props.history.location.state ? this.props.history.location.state.name.slice(5) : "",
      orgID: this.props.history.location.state ? this.props.history.location.state.orgID : "",
      pageNum: 1,
      pageSize: 15
    };
    this.state = {
      curPage: 1
    }
  }
  componentDidMount(){
    this.props.sendRequest({
			actionName: "tableData",
			path: PathInfo.table,
			params: this.queryParams,
			actions: CommonDetailXhrAct
		});
  }
  nextPage(curPage){
    this.queryParams.pageNum = curPage;
    this.props.sendRequest({
			actionName: "tableData",
			path: PathInfo.table,
			params: this.queryParams,
			actions: CommonDetailXhrAct
    });
    this.setState({
      curPage: curPage
    });
  }
  downloadData(){
    CommonMethod.download( "erp/hr/exportQuitNumInfo",this.queryParams);
  }
  render(){
    let state = this.props.history.location.state;
    return <div className="financial-bg">
      <div className="hr-container">
        <h1 className="erp-pagetitle">
        <Link to={state.link ? state.link : "/hr"} style={{fontSize: 16, fontWeight: "bold"}}>>>返回</Link>
        人员离职率明细数据({state.name})
        </h1>
        <div className="mdetail-container">
          <p style={{fontSize: 16}}>
            <span>组织:{`  ${state.org1Name}-${state.org2Name}-${state.org3Name}-${state.org4Name}`}</span>
            <span style={{paddingLeft: 20}}>数据时间: {this.queryParams.year}年{this.queryParams.month}月</span>
            {/* <span className="download-icon" onClick={this.downloadData.bind(this)}>下载</span> */}
          </p>
          <div className="financial-table">
            <Table columns={TableColum} pagination={false}
            dataSource={this.props.tableData.pageData}
            />
            <div style={{float: "right", paddingTop: 15, paddingRight: 20}}>
              <Pagination current={this.state.curPage}  total={this.props.tableData.total} 
              pageSize={15}
              onChange={this.nextPage.bind(this)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}