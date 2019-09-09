import React, {Component} from 'react';
import { Select } from 'antd';

const Option = Select.Option;
export default class SingleHeader extends Component{
  constructor(props){
    super(props);
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
      <div className="dashh-item">
        <label>社区:</label>
        <Select className="hrselect-box" 
        value={this.props.data.regionId}
        onChange={this.selectRegion.bind(this)}>
          <Option value={-1}>全部大区</Option>
          {this.props.data.region.map((item, index) => 
            <Option key={index} value={item.regionId}>{item.regionName}</Option>)}
        </Select>
        <Select className="hrselect-box" 
        value={this.props.data.provinceId}
        onChange={this.selectProvince.bind(this)}>
          <Option value={-1}>全部省份</Option>
          {this.props.data.province.map((item, index) => 
            <Option key={index} value={item.provinceId}>{item.provinceName}</Option>)}
        </Select>
        <Select className="hrselect-box" 
        value={this.props.data.cityId}
        onChange={this.selectCity.bind(this)}>
          <Option value={-1}>全部城市</Option>
          {this.props.data.city.map((item, index) => 
            <Option key={index} value={item.cityId}>{item.cityName}</Option>)}
        </Select>
        <Select className="hrselect-box" 
        value={this.props.data.communityId}
        onChange={this.selectCommunity.bind(this)}>
            <Option value={-1}>全部社区</Option>
            {this.props.data.community.map((item, index) => 
              <Option key={index} value={item.communityId}>{item.communityName}</Option>)}
        </Select>
      </div>
      <div className="dashh-item">
        <div className="query-btn">
          <a onClick={this.queryData.bind(this)}>查询</a>
        </div>
      </div>
    </div>
  }
}