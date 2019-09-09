import React, {Component} from 'react';
import {Button, Input, Checkbox, Table} from 'antd';
import './auth.css';
const CheckboxGroup = Checkbox.Group;
function getTableColumn(fn){
  return [{
    key: "name",
    title: "姓名",
    dataIndex: "name"
  },{
    key: "id",
    title: "ID",
    dataIndex: "id"
  },{
    key: "delete",
    title: "操作",
    dataIndex: "delete",
    render: (text, record, index) => {
      return <a 
      href="javascript:;"
      onClick={fn(record)}
      >删除</a>
    }
  }];
}
export default class AuthContent extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectRole: "",
      hdList: [],
      hnList: [],
      hxList: [],
      hbList: [],
      hzList: [],
      hdList: [],
      cyList: [],
      bjList: [],
      otherList: [],
      hdListAll: false,
      hnListAll: false,
      hxListAll: false,
      hbListAll: false,
      hzListAll: false,
      hdListAll: false,
      cyListAll: false,
      bjListAll: false,
      otherListAll: false,
      productId: [],
      productAll: false
    };
    this.temp = {
      module: [],
      areaId: [],
      provinceId: [],
      productId: [],
      hdList: [],
      hnList: [],
      hxList: [],
      hbList: [],
      hzList: [],
      hdList: [],
      cyList: [],
      bjList: [],
      otherList: [],
    }
  }
  inputUserName = (e) => {
    this.props.fns.inputUserName(e.target.value);
  }
  inputUserId = (e) => {
    this.props.fns.inputUserId(e.target.value);
  }
  chooseRole = (item) => () => {
    this.setState({
      selectRole: item.value
    });
    this.props.fns.chooseRole(item.value, item.id, item.label);
  }
  chooseModule = (value) => {
    this.temp.module = value;
  }
  chooseProduct = (value) => {
    let isAllChoosed = false;
    let choosedValue = value;
    let allOptionIndex = value.findIndex((item) => item === "all");
    if(allOptionIndex > -1){
      value.splice(allOptionIndex, 1);
    }
    this.temp.productId = value;
    if(value.length === this.props.productList.length){
      isAllChoosed = true;
      choosedValue.unshift("all");
    }
    this.setState({
      productAll: isAllChoosed,
      productId: choosedValue
    });
  };
  chooseAllProduct = (e) => {
    let allProductId = [];
    if(e.target.checked){
      allProductId = ["all"].concat(this.props.productList.map((item) => item.value));
    }
    this.temp.productId = allProductId;
    this.setState({
      productAll: e.target.checked,
      productId: allProductId
    });
  }
  chooseAll = (item) => (e)=> {
    const type = item.enName;
    let provinceIds = [];
    // 全选
    if(e.target.checked){
      this.temp.areaId.push(item.value);
      provinceIds = ["all"].concat(this.props[type].map((proItem) => proItem.value));
    // 取消全选
    }else{
      // 删除区域id
      const index = this.temp.areaId.findIndex((id) => id === item.value);
      this.temp.areaId.splice(index, 1);
    }
    this.setState({
      [type]: provinceIds,
      [`${type}All`]: e.target.checked
    });
    this.temp[type] = provinceIds;
  }
  chooseProvince = (item) => (value) => {
    const type = item.enName;
    const regionId = item.value;
    let isAllChoosed = false;
    let allOptionIndex = value.findIndex((item) => item === "all");
    if(allOptionIndex > -1){
      value.splice(allOptionIndex, 1);
    }
    this.temp[type] = value;
    this.setState({
      [type]: value
    });
    if(value.length){
      // 不为空添加areaId
      const hasRegionId = this.temp.areaId.indexOf(regionId) > -1;
      if(!hasRegionId){
        this.temp.areaId.push(regionId);
      }
    }else{
      // 为空删除areaId
      const index = this.temp.areaId.findIndex((id) => id === item.value);
      this.temp.areaId.splice(index, 1);
    }
    // 是否选择了全选
    if(value.length === this.props[type].length){
      isAllChoosed = true;
      this.temp[type].unshift("all");
    }else{
      isAllChoosed = false;
    }
    this.setState({
        [`${type}All`]: isAllChoosed
    });
  }
  getChooseNameArr = (key, idArr, data) => {
    let temp = [];
    idArr.forEach((item) => {
      const findItem = data.find((dataItem) => dataItem.value === item)
      if(findItem){
        temp.push(findItem[key])
      }
    });
    return temp;
  }
  getProductNames = () => {
    let productAllName = [];
    productAllName = this.getChooseNameArr("label", this.temp.productId, this.props.productList);
    if(this.temp.productId.indexOf("all") > -1){
      productAllName.unshift("全部产品");
    }
    return productAllName;
  }
  getProvinceNames = () => {
    let provinceAllName = [];
    this.props.regionList.forEach((region) => {
      const type = region.enName;
      const curData = this.props[type];
      const provinceName = this.getChooseNameArr("label", this.temp[type], curData);
      if(this.temp[type].indexOf("all") > -1){
        provinceName.unshift("全部省份");
      }
      provinceAllName = provinceAllName.concat(provinceName);
    });
    return provinceAllName;
  }
  getProvinceIds = () => {
    let provinceAllIds = [];
    this.props.regionList.forEach((region, index) => {
      const type = region.enName;
      const regionId = region.value;
      let tempProArr = this.state[type].map((provinceId) => `${regionId}-${provinceId}`);
      provinceAllIds = provinceAllIds.concat(tempProArr);
    });
    return provinceAllIds;
  }
  submitUser = () => {
    let tempParamsObj = {
      moduleId: this.getChooseNameArr("id", this.temp.module, this.props.module),
      module: this.temp.module,
      moduleName: this.getChooseNameArr("label", this.temp.module, this.props.module),
      productId: this.temp.productId,
      productName: this.getProductNames(),
      areaId: this.temp.areaId,
      areaName: this.getChooseNameArr("label", this.temp.areaId, this.props.regionList),
      provinceName: this.getProvinceNames(),
      provinceId: this.getProvinceIds()
    };
    this.props.fns.submitUser(tempParamsObj);
  }
  deleteUser = (record) => () => {
    this.props.fns.deleteUser(record);
  }
  render(){
    return <div className="hr-bg">
    <div className="hr-container hr-overview">
      <h1 className="erp-pagetitle">权限管理</h1>
      <div className="auth-wrapper">
        <h3>权限开通（当前只支持新增）</h3>
        <div className="auth-item">
          <strong>用户名</strong>
          <Input placeholder="郑雪松"
          onChange={this.inputUserName}
          style={{width: 120
          }}
          />
          <strong style={{paddingLeft: 20}}>用户ID</strong>
          <Input placeholder="1"
          onChange={this.inputUserId}
          style={{width: 120}}
          />
        </div>
        <div className="auth-item">
          <strong>选择角色</strong> <br/>
          {this.props.roles.map((item, index) => 
          <Checkbox 
            key={index}
            checked={this.state.selectRole === item.value ? true : false}
            onChange={this.chooseRole(item)}>{item.label}</Checkbox>
            )}
        </div>
        <div className="auth-item">
          <strong>选择模块</strong>
          <CheckboxGroup options={this.props.module} 
          defaultValue={[]} 
          onChange={this.chooseModule} />
        </div>
        <div className="auth-item">
          <strong>选择产品</strong>
          <Checkbox 
          checked={this.state.productAll}
          onChange={this.chooseAllProduct}>全选</Checkbox>
          <CheckboxGroup options={this.props.productList} 
          value={this.state.productId} 
          onChange={this.chooseProduct} />
        </div>
        <div className="auth-item">
          <strong>选择区域-省份</strong>
          {this.props.regionList.map((item, index) => 
            <div key={index}
            style={{paddingBottom: 10}}>
              <strong>{item.label}</strong>
              <Checkbox 
              checked={this.state[`${item.enName}All`]}
              onChange={this.chooseAll(item)}>全选</Checkbox>
              <div className="auth-sec-group">
                <CheckboxGroup  options={this.props[item.enName]}
                key={index} 
                value={this.state[item.enName]} 
                onChange={this.chooseProvince(item)} />
              </div>
            </div> 
          )}
        </div>
        <div className="auth-item">
        <Button type="primary"
        onClick={this.submitUser}
        >提交</Button>
        </div>
      </div>
      <div className="auth-wrapper">
        <h3>已开通人员列表</h3>
        <Table dataSource={this.props.authList} columns={getTableColumn(this.deleteUser)} />
      </div>
    </div>
  </div>
  }
}