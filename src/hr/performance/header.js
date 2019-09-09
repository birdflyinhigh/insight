import React, {Component} from 'react';
import {Select, Checkbox } from 'antd';
import {Methods} from '../../common/tools/util';
const Option = Select.Option;
export default class Header extends Component{
  constructor(props){
    super(props);
    this.year = Methods.generateYear(2018);
    this.state = {
      month: Methods.generateMonth(Methods.getMonth() + 1),
    }
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
    let tempMonth = Methods.generateMonth(Methods.getMonth());
    if(value != (new Date()).getFullYear()){
     tempMonth = Methods.generateMonth();
    }
    let tempMonthId = tempMonth[tempMonth.length - 1]["key"]
    this.setState({
      month: tempMonth
    });
    this.props.fns.selectYear(value);
    this.props.fns.selectMonth(tempMonthId);
  }
  selectYTD(e){
    let checked = e.target.checked ? "total" : "normal";
    this.props.fns.selectYTD(checked);
  }
  queryData(){
    this.props.fns.queryData();
  }
  render(){
    let {org1, org2, org3, org4, org1Id, org2Id, org3Id, org4Id, ytd, yearId, monthId} = this.props.data;
    return <div className="hr-header">
    <div className="hrheader-item">
       <label>组织：</label>
       <Select value={org1Id} className="hrselect-box" onChange={this.selectFirstOrg.bind(this)}>
          {org1.map((item, index) => <Option value={item.orgID + ""} key={index}>{item.orgName}</Option>)}
        </Select>
        <Select value={org2Id} className="hrselect-box" onChange={this.selectSecondOrg.bind(this)}>
          <Option value={"-1"}>全部</Option>
          {org2.map((item, index) => <Option value={item.orgID + ""} key={index}>{item.orgName}</Option>)}
        </Select>
        <Select value={org3Id} className="hrselect-box" onChange={this.selectThirdOrg.bind(this)}>
          <Option value={"-1"}>全部</Option>
          {org3.map((item, index) => <Option value={item.orgID + ""} key={index}>{item.orgName}</Option>)}
        </Select>
        <Select value={org4Id} className="hrselect-box" onChange={this.selectForthOrg.bind(this)}>
          <Option value={"-1"}>全部</Option>
          {org4.map((item, index) => <Option value={item.orgID + ""}  key={index}>{item.orgName}</Option>)}
        </Select>
     </div>
     <div className="hrheader-item">
       <label>日期：</label>
       <Select value={yearId} className="hrselect-box" onChange={this.selectYear.bind(this)}>
         {this.year.map((item, index) => <Option value={item} key={index}>{item}</Option>)}
       </Select>
       <Select value={monthId} className="hrselect-box" onChange={this.selectMonth.bind(this)}>
         {this.state.month.map((item, index) => <Option value={item.key} key={index}>{item.value}</Option>)} 
       </Select>
     </div>
     <div className="hrheader-item">
      <Checkbox value={ytd} checked={ytd === "normal" ? 0 : 1} onChange={this.selectYTD.bind(this)} style={{fontSize: 14}}>YTD累积</Checkbox>
     </div>
     <div className="hrquery-btn">
       <a onClick={this.queryData.bind(this)}>查询</a>
     </div>
 </div>
  }
} 