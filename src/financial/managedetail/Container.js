import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Table, Pagination} from 'antd';
import {CommonMethod} from '../../common/tools/common';
import {Methods} from '../../common/tools/util';
import {Columns, PathInfo} from './constant';
import {manageDetailXhrAction} from '../action';
function mapStateToProps(state){
  return {...state.statetree.fdmanage};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(Object.assign({sendRequest: CommonMethod.sendRequest}, {}), dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class FinancialManage extends Component{
  constructor(props){
    super(props);
    this.queryParam = {
      year: props.location.state ? props.location.state.year : Methods.getYear(),
      month: props.location.state ? props.location.state.month : Methods.getMonth() - 1,
      sign:props.location.state ? props.location.state.sign : 1,
      indexType: props.location.state ? props.location.state.indexType : "income",
      regionType: props.location.state ? props.location.state.regionType : "region",
      currentPage: 1,
      pageSize: 10
    };
    this.state = {
      currentPage: 1
    }
  }
  componentDidMount(){
    this.props.sendRequest({
      actionName: "getTableData",
			path: PathInfo.table,
			params: this.queryParam,
			actions: manageDetailXhrAction
    });
  }
  nextPage(page){
    this.queryParam.currentPage = page;
    this.setState({
      currentPage: page
    });
    this.props.sendRequest({
      actionName: "getTableData",
			path: PathInfo.table,
			params: this.queryParam,
			actions: manageDetailXhrAction
    });
  }
  render(){
    return <div className="financial-bg">
      <div className="hr-container">
        <h1 className="erp-pagetitle">集团预算-管理核心数据 > 区域线全国市级组织预算完成情况明细
          <Link to="/fmanage" style={{float: "right", fontSize: 16}}>返回上级页面</Link>
        </h1>
        <div className="mdetail-container">
          <p className="fdetail-title">数据时间: {this.queryParam.year}年{this.queryParam.month}月</p>
          <div className="financial-table">
            <Table columns={Columns[this.queryParam.indexType]} pagination={false}
            dataSource={this.props.tableData.pageData}/>
            <div style={{float: "right", paddingTop: 10, paddingRight: 20}}>
              <Pagination current={this.state.currentPage} total={this.props.tableData.total} 
              pageSize={10}
              onChange={this.nextPage.bind(this)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}