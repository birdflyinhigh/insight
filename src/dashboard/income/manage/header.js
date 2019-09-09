import React, {Component} from 'react';
import {Select} from 'antd';
import {Methods} from '../../../common/tools/util';
const Option = Select.Option;

export default class Header extends Component{
  constructor(props){
    super(props);
    this.year = Methods.generateYear(2018);
    // this.state = {
    //   month: Methods.generateMonth(Methods.getCrossYearMonth(this.props.data.yearId) + 1),
    // }
  }
  selectFirstOrg(value){
    this.props.fns.selectFirstOrg(value);
  }
  selectSecondOrg(value){
    this.props.fns.selectSecondOrg(value);
  }
  selectThirdOrg(value){
    this.props.fns.selectThirdOrg(value);
  }
  selectForthOrg(value){
    this.props.fns.selectForthOrg(value);
  }
  selectMonth(value){
    this.props.fns.selectMonth(value);
  }
  selectYear(value){
    let tempMonth = Methods.generateMonth(Methods.getMonth() + 1);
    if(value != (new Date()).getFullYear()){
     tempMonth = Methods.generateMonth();
    }
    let tempMonthId = tempMonth[tempMonth.length - 1]["key"]
    // this.setState({
    //   month: tempMonth
    // });
    this.props.fns.selectYear(value);
    this.props.fns.selectMonth(tempMonthId);
  }
  queryData(){
    this.props.fns.queryData();
  }
  render(){
    let {org1, org2, org3, org4, yearId} = this.props.data;
    let monthArr = Methods.generateUniYearMonths(yearId);
    return 	<div className="hr-header">
              <div className="hrheader-item">
                <label>组织：</label>
                <Select value={this.props.data.org1Id} className="hrselect-box" onChange={this.selectFirstOrg.bind(this)}>
                  {org1.map((item, index) => <Option value={item.orgID + ""} key={index}>{item.orgName}</Option>)}
                </Select>
                <Select value={this.props.data.org2Id} className="hrselect-box" onChange={this.selectSecondOrg.bind(this)}>
                  <Option value={"-1"}>全部</Option>
                  {org2.map((item, index) => <Option value={item.orgID + ""} key={index}>{item.orgName}</Option>)}
                </Select>
                <Select value={this.props.data.org3Id} className="hrselect-box" onChange={this.selectThirdOrg.bind(this)}>
                  <Option value={"-1"}>全部</Option>
                  {org3.map((item, index) => <Option value={item.orgID + ""} key={index}>{item.orgName}</Option>)}
                </Select>
                <Select value={this.props.data.org4Id} className="hrselect-box" onChange={this.selectForthOrg.bind(this)}>
                  <Option value={"-1"}>全部</Option>
                  {org4.map((item, index) => <Option value={item.orgID + ""}  key={index}>{item.orgName}</Option>)}
                </Select>
              </div>
              <div className="hrheader-item">
                <label>日期：</label>
                <Select value={this.props.data.yearId} className="hrselect-box" onChange={this.selectYear.bind(this)}>
                  {this.year.map((item, index) => <Option value={item} key={index}>{item}</Option>)}
                </Select>
                <Select value={this.props.data.monthId} className="hrselect-box" onChange={this.selectMonth.bind(this)}>
                  {monthArr.tempMonth.map((item, index) => <Option value={item.key} key={index}>{item.value}</Option>)}
                </Select>
              </div>
              <div className="hrquery-btn">
                <a onClick={this.queryData.bind(this)}>查询</a>
              </div>
            </div>
  }
}