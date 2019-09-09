import React, {Component} from 'react';
import {Select} from 'antd';
import {Methods} from '../../common/tools/util';
const Option = Select.Option;

export default class Header extends Component{
  constructor(props){
    super(props);
    this.year = Methods.generateYear(2018);
    this.state = {
      month: Methods.generateUniYearMonths(this.props.data.yearId).tempMonth,
    };
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
    this.setState({
      month: tempMonth
    });
    this.props.fns.selectYear(value);
    this.props.fns.selectMonth(tempMonthId);
  }
  queryData(){
    this.props.fns.queryData();
  }
  render(){
    return 	<div className="dash-header">
              <div className="dashh-item">
              <b className="dashh-title">日期：</b>
                <Select defaultValue={this.props.data.yearId} className="hrselect-box" onChange={this.selectYear.bind(this)}>
                  {this.year.map((item, index) => <Option value={item} key={index}>{item}</Option>)}
                </Select>
                <Select value={this.props.data.monthId} className="hrselect-box" onChange={this.selectMonth.bind(this)}>
                  {this.state.month.map((item, index) => <Option value={item.key} key={index}>{item.value}</Option>)}
                </Select>
              </div>
              <div className="dashh-item" onClick={this.queryData.bind(this)}>
                <div className="query-btn">
                  <a>查询</a>
                </div>
              </div> 
            </div>
  }
}