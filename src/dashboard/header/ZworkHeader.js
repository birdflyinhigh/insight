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
    return current < moment("2018-12-25") || current > moment().subtract(1, 'days');
  }
  selectEnd(date, dateString){
    this.props.fns.selectEnd(dateString);
  }
  selectCityType(value){
    this.props.fns.selectCityType(value);
  }
  selectRegion(value){
    this.props.fns.selectRegion(value);
  }
  selectCity(value){
    this.props.fns.selectCity(value);
  }
  selectProvince(value){
    this.props.fns.selectProvince(value);
  }
  selectCommunity(value){
    this.props.fns.selectCommunity(value);
  }
  queryData(){
    this.props.fns.queryData();
  }
  render(){
    return <div className="dash-header">
      {this.props.hideTime ? "" : <div className="dashh-item">
        <b className="dashh-title">时间:</b>
        <div className="dashh-dates">
          <DatePicker value={moment(this.props.data.endTime)}
          locale={locale}
          allowClear={false}
          format={this.dateFormat} 
          onChange={this.selectEnd.bind(this)}
          disabledDate={this.disabledEndTime.bind(this)}/>
        </div>
      </div>}
      {/* {this.props.data.cityType ? <div className="dashh-item">
        <b className="dashh-title">城市类别:</b>
        <Select style={{width: 180}} 
        value={this.props.data.cityTypeId}
        onChange={this.selectCityType.bind(this)}>
            <Option value={-1}>全部</Option>
            {this.props.data.cityType.map((item, index) => 
              <Option key={index} value={item.cityTypeId}>{item.cityTypeName}</Option>)}
        </Select>
      </div> : ""} */}
      {this.props.data.region ? <div className="dashh-item">
        <b className="dashh-title">社区:</b>
        <Select style={{width: 180,marginRight: 12}}
        value={this.props.data.regionId}
        onChange={this.selectRegion.bind(this)}>
          <Option value={-1}>全部大区</Option>
          {this.props.data.region.map((item, index) => 
            <Option key={index} value={item.regionId}>{item.regionName}</Option>)}
        </Select>
        <Select style={{width: 180,marginRight: 12}} 
        value={this.props.data.provinceId}
        onChange={this.selectProvince.bind(this)}>
          <Option value={-1}>全部省份</Option>
          {this.props.data.province.map((item, index) => 
            <Option key={index} value={item.provinceId}>{item.provinceName}</Option>)}
        </Select>
        <Select style={{width: 180,marginRight: 12}} 
        value={this.props.data.cityId}
        onChange={this.selectCity.bind(this)}>
          <Option value={-1}>全部城市</Option>
          {this.props.data.city.map((item, index) => 
            <Option key={index} value={item.cityId}>{item.cityName}</Option>)}
        </Select>
        <Select style={{width: 180}} 
        value={this.props.data.communityId}
        onChange={this.selectCommunity.bind(this)}>
            <Option value={-1}>全部社区</Option>
            {this.props.data.community.map((item, index) => 
              <Option key={index} value={item.communityId}>{item.communityName}</Option>)}
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