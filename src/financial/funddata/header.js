import React, {Component} from 'react';
import {Select} from 'antd';
import {Methods} from '../../common/tools/util';
const Option = Select.Option;

export default class Header extends Component{
  constructor(props){
    super(props);
    this.year = Methods.generateYear(2018);
		// this.month = Methods.generateMonth(Methods.getMonth());
    this.state = {
      month: Methods.generateMonth(Methods.getLastMonth() + 1),
      monthId: Methods.getLastMonth()
    }
  }
  selectMonth(value){
    this.setState({
      monthId: value
    });
    this.props.fns.selectMonth(value);
  }
  selectYear(value){
    let tempMonth = Methods.generateMonth(Methods.getMonth() + 1);
    if(value != (new Date()).getFullYear()){
     tempMonth = Methods.generateMonth();
    }
    let tempMonthId = tempMonth[tempMonth.length - 1]["key"]
    this.setState({
      month: tempMonth,
      monthId: tempMonthId
    });
    this.props.fns.selectYear(value);
    this.props.fns.selectMonth(tempMonthId);
  }
  queryData(){
    this.props.fns.queryData();
  }
  render(){
    return <div className="hr-header">
          <div className="hrheader-item">
						<label>日期：</label>
						<Select defaultValue={Methods.getLastYear()} className="hrselect-box" onChange={this.selectYear.bind(this)}>
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