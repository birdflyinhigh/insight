import React, {Component} from 'react';
import {Select,  Radio } from 'antd';
import {Methods} from '../../../common/tools/util';
const Option = Select.Option;

export default class Header extends Component{
  constructor(props){
    super(props);
    this.year = Methods.generateYear(2018);
    this.month = Methods.generateUniYearMonths(this.props.data.yearId).tempMonth;
    this.state = {
      month: Methods.generateUniYearMonths(this.props.data.yearId).tempMonth,
      monthId: this.props.data.monthId,
      yearId: this.props.data.yearId
    };
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
  selectMonth(value){
    this.setState({
      monthId: value
    });
    this.props.fns.selectMonth(value);
  }
  selectYear(value){
    let monthObj = Methods.generateUniYearMonths(value)
    this.setState({
      month: monthObj.tempMonth,
      monthId: monthObj.tempMonthId,
      yearId: value
    });
    this.props.fns.selectYear(value);
    this.props.fns.selectMonth(monthObj.tempMonthId);
  }
  queryData(){
    this.props.fns.queryData();
  }
  render(){
    let {org1, org2, org3, org1Id, org2Id, org3Id} = this.props.data;
    return <div className="hr-header">
         <div className="hrheader-item">
            <label>法人：</label>
            <Select value={org1Id} className="hrselect-box" onChange={this.selectFirstOrg.bind(this)} style={{width: 220}}>
              {org1.map((item, index) => <Option value={item.companyID + ""} key={index}>{item.companyName}</Option>)}
            </Select>
            <Select value={org2Id} className="hrselect-box" onChange={this.selectSecondOrg.bind(this)} style={{width: 300}}>
              {org2.map((item, index) => <Option value={item.companyID + ""} key={index}>{item.companyName}</Option>)}
            </Select>
            <Select value={org3Id} className="hrselect-box" onChange={this.selectThirdOrg.bind(this)} style={{width: 350}}>
              {org3.map((item, index) => <Option value={item.companyID + ""} key={index}>{item.companyName}</Option>)}
            </Select>
          </div>
          <div className="hrheader-item">
						<label>日期：</label>
						<Select value={this.state.yearId} className="hrselect-box" onChange={this.selectYear.bind(this)}>
							{this.year.map((item, index) => <Option value={item} key={index}>{item}</Option>)}
						</Select>
						<Select value={this.state.monthId} className="hrselect-box" onChange={this.selectMonth.bind(this)}>
							{this.state.month.map((item, index) => <Option value={item.key} key={index}>{item.value}</Option>)}
						</Select>
					</div>
					<div className="hrquery-btn">
						<a onClick={this.queryData.bind(this)}>查询</a>
					</div>
      </div>
  }
}