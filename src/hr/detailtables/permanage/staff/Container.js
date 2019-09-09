import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import {CommonMethod} from '../../../../common/tools/common';
import {CommonDetailXhrAct} from '../../../action';

import {PerformDetail, PathInfo} from './constant';
import {Table, Pagination} from 'antd';

function mapStateToProps(state){
  return {...state.statetree.kindTable};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(Object.assign({sendRequest: CommonMethod.sendRequest}), dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class Permanage extends Component{
  constructor(props){
    super(props);
    console.log(props);
    this.stateVar = this.props.history.location.state ? this.props.history.location.state : {};
    this.queryParams = {
      orgID: this.stateVar.orgID,
			year: this.stateVar.year,
			month: this.stateVar.month,
      index: this.stateVar.ytd,
      pageNum: 1,
      pageSize: 15,
    }
    this.state = {
      curPage: 1
    }
  }
  componentDidMount(){
    if(this.stateVar.urlName === "staff"){
      this.queryParams.point = this.stateVar.query1;
      this.queryParams.type = this.stateVar.query2;
    }else{
      this.queryParams.item = this.stateVar.query1;
    }
    this.props.sendRequest({
			actionName: "tableData",
			path: PathInfo[this.stateVar.urlName],
			params: this.queryParams,
			actions: CommonDetailXhrAct
		});
  }
  nextPage(curPage){
    this.queryParams.pageNum = curPage;
    this.props.sendRequest({
			actionName: "tableData",
			path: PathInfo[this.stateVar.urlName],
			params: this.queryParams,
			actions: CommonDetailXhrAct
    });
    this.setState({
      curPage: curPage
    });
  }
  // downloadData(){
  //   CommonMethod.download( "erp/hrcost/exportJXInfo",this.queryParams);
  // }
  render(){
    let state = this.props.history.location.state ? this.props.history.location.state : {};
    return <div className="financial-bg">
      <div className="hr-container">
        <h1 className="erp-pagetitle">
        <Link to="/hrpermanage" style={{fontSize: 14}}>返回上级页面</Link>
        {state.title}明细表
        </h1>
        <div className="mdetail-container">
          <p style={{fontSize: 16}}>
            <span>组织:{`  ${state.org1Name}-${state.org2Name}-${state.org3Name}-${state.org4Name}`}</span>
            <span style={{paddingLeft: 20}}>数据时间: {state.year}年{state.month}月</span>
            <span style={{paddingLeft: 20}}>{state.ytd === "total" ? "YTD累积" : ""}</span>
            <span style={{paddingLeft: 20}}>{state.query1Name}</span>
            <span style={{paddingLeft: 20}}>{state.query2Name ? state.query2Name : state.query2Name}</span>
            <span style={{paddingLeft: 20}}>{state.extraText}</span>
            {/* <span className="download-icon" onClick={this.downloadData.bind(this)}>下载</span> */}
          </p>
          <div className="financial-table">
            <Table columns={PerformDetail(this.queryParams.month)} pagination={false}
            dataSource={this.props.tableData.pageData}
            />
            <div style={{float: "right", paddingTop: 15, paddingRight: 20}}>
              <Pagination current={this.state.curPage} total={this.props.tableData.total} 
              pageSize={15}
              onChange={this.nextPage.bind(this)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}