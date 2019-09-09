import React, {Component} from 'react';
import {Select} from 'antd';
import {Methods} from '../../common/tools/util';
const Option = Select.Option;

export default class Header extends Component{
  constructor(props){
    super(props);
    this.year = Methods.generateYear(2018);
		this.month = Methods.generateMonth(Methods.getMonth() + 1);
    this.state = {
      org1Id: 100000,
      org2Id: -1,
      org3Id: -1,
      month: Methods.generateMonth(Methods.getMonth() + 1),
      monthId: Methods.getMonth()
    }
  }
  selectFirstOrg(value){
    this.setState({
      org1Id: value
    });
    this.props.fns.selectFirstOrg(value);
  }
  selectSecondOrg(value){
    this.props.fns.selectSecondOrg(value);
    this.setState({
      org2Id: value,
      org3Id: -1,
    });
  }
  selectThirdOrg(value){
    this.props.fns.selectThirdOrg(value);
    this.setState({
      org3Id: value,
    });
  }
  selectMonth(value){
    this.setState({
      monthId: value
    });
    this.props.fns.selectMonth(value);
  }
  selectYear(value){
    let tempMonth = Methods.generateMonth(Methods.getMonth());
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
    let {org1, org2, org3} = this.props.data;
    return <div>
         <div className="hrheader-item">
            <label>组织：</label>
            <Select value={this.state.org1Id} className="hrselect-box" onChange={this.selectFirstOrg.bind(this)}>
              {org1.map((item, index) => <Option value={item.orgID} key={index}>{item.orgName}</Option>)}
            </Select>
            <Select value={this.state.org2Id} className="hrselect-box" onChange={this.selectSecondOrg.bind(this)}>
              <Option value={-1}>全部</Option>
              {org2.map((item, index) => <Option value={item.orgID} key={index}>{item.orgName}</Option>)}
            </Select>
            <Select value={this.state.org3Id} className="hrselect-box" onChange={this.selectThirdOrg.bind(this)}>
              <Option value={-1}>全部</Option>
              {org3.map((item, index) => <Option value={item.orgID} key={index}>{item.orgName}</Option>)}
            </Select>
          </div>
          <div className="hrheader-item">
						<label>日期：</label>
						<Select defaultValue={Methods.getYear()} className="hrselect-box" onChange={this.selectYear.bind(this)}>
							{this.year.map((item, index) => <Option value={item} key={index}>{item}</Option>)}
						</Select>
						<Select defaultValue={5} className="hrselect-box" onChange={this.selectMonth.bind(this)}>
							{/* {this.month.map((item, index) => <Option value={item.key} key={index} disabled={item == 5 ? false : true}>{item.value}</Option>)} */}
              <Option value={5}>5月</Option>
            </Select>
					</div>
					<div className="hrquery-btn">
						<a onClick={this.queryData.bind(this)}>查询</a>
					</div>
      </div>
  }
}