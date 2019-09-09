import React, {Component} from 'react';
import { DatePicker, Select } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import {Methods} from '../../common/tools/util';
import 'moment/locale/zh-cn';
import moment from 'moment';

import './header.css';
const Option = Select.Option;
export default class SingleHeader extends Component{
  constructor(props){
    super(props);
    this.dateFormat = "YYYY-MM-DD";
  }
  disabledEndTime(current){
    return current && current > moment().subtract(1, 'days');
  }
  selectEnd(date, dateString){
    this.props.fns.selectEnd(dateString);
  }
  selectUserType(value){
    this.props.fns.selectUserType(value);
  }
  selectRegion(value){
    this.props.fns.selectRegion(value);
  }
  selectProvince(value){
    this.props.fns.selectProvince(value);
  }
  selectIndustry(value){
    this.props.fns.selectIndustry(value);
  }
  queryData(){
    this.props.fns.queryData();
  }
  render(){
    return <div className="dash-header">
      <div className="dashh-item">
        <b className="dashh-title">时间:</b>
        <div className="dashh-dates">
          <DatePicker value={moment(this.props.data.endTime)}
          locale={locale}
          allowClear={false}
          format={this.dateFormat} 
          onChange={this.selectEnd.bind(this)}
          disabledDate={this.disabledEndTime.bind(this)}/>
        </div>
      </div>
      {this.props.data.region ? <div className="dashh-item">
        <b className="dashh-title">地域:</b>
        <Select style={{width: 180,marginRight: 12}}
        value={this.props.data.regionId}
        onChange={this.selectRegion.bind(this)}
        >
          <Option value={-1}>全部</Option>
          {this.props.data.region.map((item, index) => 
            <Option key={index} value={item.id}>{item.name}</Option>)}
        </Select>
        <Select style={{width: 180}} value={this.props.data.provinceId}
        onChange={this.selectProvince.bind(this)}
        >
          <Option value={-1}>全部</Option>
          {this.props.data.province.map((item, index) => 
            <Option key={index} value={item.id}>{item.name}</Option>)}
        </Select>
      </div> : ""}
      {this.props.data.industry ? <div className="dashh-item">
        <b className="dashh-title">行业:</b>
        <Select style={{width: 180}} value={this.props.data.industryId}
        onChange={this.selectIndustry.bind(this)}
        >
            <Option value={-1}>全部</Option>
            {this.props.data.industry.map((item, index) => 
              <Option key={index} value={item.id}>{item.name}</Option>)}
        </Select>
      </div> : ""}
      {this.props.data.userType ? <div className="dashh-item">
        <b className="dashh-title">用户类型：</b>
        <Select style={{width: 180}} defaultValue={-1} 
        onChange={this.selectUserType.bind(this)}>
            {this.props.data.userType.map((item, index) => 
              <Option key={index} value={item.value}>{item.name}</Option>
              )}
        </Select>
      </div> : ""}
      <div className="dashh-item">
        <div className="query-btn" onClick={this.queryData.bind(this)}>
          <a>查询</a>
        </div>
      </div> 
    </div>
  }
}