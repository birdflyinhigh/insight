import React, {Component} from 'react';
import {Select, Radio} from 'antd';
import './header.css';
import {Methods} from '../../../common/tools/util';
const Option = Select.Option;
const RadioGroup = Radio.Group;

function generateState(ids) {
  let temp = {
    disabledBox3: true,
    disabledBox4: true,
    disabledBox5: true
  };
  let disabledId = ids.findIndex((ele) => ele == -1);
  if (disabledId == -1) {
    return {
      disabledBox3: false,
      disabledBox4: false,
      disabledBox5: false
    };
  }
  for (let i = 3; i < ids.length + 1; i++) {
    if (i <= disabledId + 1) {
      temp[`disabledBox${i}`] = false;
    } else {
      temp[`disabledBox${i}`] = true;
    }
  }
  return temp;
}
export default class DetailHeader extends Component{
  constructor(props){
    super(props);
    this.month = Methods.generateMonth();
    this.year = Methods.generateYear(2016);
    this.defaultMonth = [1,2,3,4,5,6,7,8,9,10,11,12];
    this.curYear = props.data.defaultYear ? props.data.defaultYear : Methods.getYear();
    this.prevCate = props.data.defaultCategoryId ? [this.props.data.defaultCategoryId] : [-1];
    this.prevMana = props.data.defaultManageId ? [this.props.data.defaultManageId] : [-1];
    this.prevPro = props.data.defaultProviders ? [this.props.data.defaultProviders] : [-1];
    // this.state = generateState(this.props.data.aIds);
  }
  selectYear(value){
    this.props.fns.selectYear(value);
  }
  selectMonth(value){
    this.props.fns.selectMonth(value.join(","));
  }
  selectType(e){
    this.props.fns.selectType(e.target.value)
  }
  selectFirstCom(value){
    this.props.fns.selectFirstCom(value);
  }
  selectSecondCom(value){
    this.setState({
      disableComBox3: false,
    });
    this.props.fns.selectSecondCom(value);
  }
  selectThirdCom(value){
    this.props.fns.selectThirdCom(value);
  }
  selectFirst(value){
    this.props.fns.selectFirst(value);
  }
  selectSecond(value){
    this.setState({
      disabledBox3: false,
      disabledBox4: true,
      disabledBox5: true
    });
    this.props.fns.selectSecond(value);
  }
  selectThird(value){
    this.setState({
      disabledBox4: false,
      disabledBox5: true
    });
    this.props.fns.selectThird(value);
  }
  // selectForth(value){
  //   this.setState({
  //     disabledBox5: false
  //   });
  //   this.props.fns.selectForth(value);
  // }
  // selectFifth(value){
  //   this.props.fns.selectFifth(value);
  // }
  selectCategory(value){
    let choosed = this.props.data.categoryList.map((item, index) => item.category_one)
    let choosedId = value.filter((item) => this.prevCate.indexOf(item) == -1);
    if(choosedId[0] == -1 || value.sort().join(",") == choosed.sort().join(",")){
      this.props.fns.selectCategory([-1]);
      this.prevCate = [-1];
    }else{
      let index = value.indexOf(-1);
      let temp = [...value];
      temp.splice(index, 1);
      if(index > -1){
        this.props.fns.selectCategory(temp);
        this.prevCate = temp;
      }else{
        this.props.fns.selectCategory(value);
        this.prevCate = value;
      }  
    }    
  }
  selectManage(value){
    let choosed = this.props.data.manageList.map((item, index) => item.control_id)
    let choosedId = value.filter((item) => this.prevMana.indexOf(item) == -1);
    if(choosedId[0] == -1 || value.sort().join(",") == choosed.sort().join(",")){
      this.props.fns.selectManage([-1]);
      this.prevMana = [-1];
    }else{
      let index = value.indexOf(-1);
      let temp = [...value];
      temp.splice(index, 1);
      if(index > -1){
        this.props.fns.selectManage(temp);
        this.prevMana = temp;
      }else{
        this.props.fns.selectManage(value);
        this.prevMana = value;
      }
      
    }    
  }
  selectProvider(value){
    let choosed = this.props.data.providerList.map((item, index) => item.providerName)
    let choosedId = value.filter((item) => this.prevPro.indexOf(item) == -1);
    if(choosedId[0] == -1 || value.sort().join(",") == choosed.sort().join(",")){
      this.props.fns.selectProvider([-1]);
      this.prevPro = [-1];
    }else{
      let index = value.indexOf(-1);
      let temp = [...value];
      temp.splice(index, 1);
      if(index > -1){
        this.props.fns.selectProvider(temp);
        this.prevPro = temp;
      }else{
        this.props.fns.selectProvider(value);
        this.prevPro = value;
      }
      
    }    
  }
  
  queryData(){
    this.props.fns.queryData();
  }
  render(){
     let {selectedTypeId, 
        firstComId, secondComId, thirdComId,
        firstComData, secondComData, thirdComData,
        firstOrgId, secondOrgId, thirdOrgId,
        firstData, secondData, thirdData} = this.props.data;
        // console.log(this.props.data.selectedProviderId);
    return <div className="financial-header">
        <div className="self-clearfix">
          <div className="header-item">
            <b>年份:</b>
            <Select defaultValue={this.curYear} onChange={this.selectYear.bind(this)} style={{width: 120}}>  
              {this.year.map((item, index)=>
                <Option value={item} key={index}>{item}</Option>
              )}
            </Select>
          </div>
          <div className="header-item">
            <b>月份:</b>
            <Select onChange={this.selectMonth.bind(this)} defaultValue={this.defaultMonth} style={{width: 750}} mode="multiple"> 
              {this.month.map((item, index) => 
              <Option value={item.key} key={index}>{item.value}</Option>
              )}
            </Select>
          </div>
          <div className="header-level2 org-wrapper">
            <div className="header-item" style={{paddingTop: 5,marginRight: 15}}>
                <RadioGroup onChange={this.selectType.bind(this)} value={selectedTypeId} onChange={this.selectType.bind(this)}>
                  <Radio value={1}>公司</Radio>
                  <Radio value={2}>组织</Radio>
                </RadioGroup>
            </div>
            {selectedTypeId == 1 ? <div className="header-item">
              <b>选择公司:</b>
              <Select value={firstComId} style={{width: 220,marginRight: 10}}  onChange={this.selectFirstCom.bind(this)}> 
                {firstComData.map((item, index) => 
                <Option value={item.orgID} key={index}>{item.orgName}</Option>
                )}
              </Select>~
               <Select value={secondComId} style={{width: 220,marginRight: 10}}  onChange={this.selectSecondCom.bind(this)}> 
                <Option value={-1}>全部</Option>
                {secondComData.map((item, index) => 
                <Option value={item.orgID} key={index}>{item.orgName}</Option>
                )}
              </Select>~
               <Select value={thirdComId} style={{width: 220,marginRight: 10}}  onChange={this.selectThirdCom.bind(this)}> 
                <Option value={-1}>全部</Option>
                {thirdComData.map((item, index) => 
                <Option value={item.orgID} key={index}>{item.orgName}</Option>
                )}
              </Select>
            </div> :
            <div className="header-item" style={{marginRight: 10}}>
              <b>选择组织:</b>
              <Select value={firstOrgId} onChange={this.selectFirst.bind(this)} style={{width: 180}}>  
                {firstData.map((item, index)=>
                  <Option value={item.orgID} key={index}>{item.orgName}</Option>
                )}
              </Select>~
              <Select value={secondOrgId} onChange={this.selectSecond.bind(this)} style={{width: 180}}>  
                <Option value={-1}>全部</Option>
                {secondData.map((item, index)=>
                  <Option value={item.orgID} key={index}>{item.orgName}</Option>
                )}
              </Select>~
              <Select value={thirdOrgId} onChange={this.selectThird.bind(this)} style={{width: 180}}>  
                <Option value={-1}>全部</Option>
                {thirdData.map((item, index)=>
                  <Option value={item.orgID} key={index}>{item.orgName}</Option>
                )}
              </Select>
              {/*<Select value={forthOrgId} onChange={this.selectForth.bind(this)} style={{width: 180}} disabled={this.state.disabledBox4}>
                              <Option value={-1}>全部</Option>  
                              {forthData.map((item, index)=>
                                <Option value={item.orgID} key={index}>{item.orgName}</Option>
                              )}
                            </Select>~
                            <Select value={fifthOrgId} onChange={this.selectFifth.bind(this)} style={{width: 180}} disabled={this.state.disabledBox5}>  
                              <Option value={-1}>全部</Option>
                                {fifthData.map((item, index)=>
                                  <Option value={item.orgID} key={index}>{item.orgName}</Option>
                                )}
                            </Select> */}
            </div>}
            {this.props.data.categoryList ? <div className="header-item" style={{ width: 300, position: "relative"}}>
              <b>一级采购品类:</b> 
              <Select value={this.props.data.selectCategoryId} style={{width: 180,marginRight: 10, position: "absolute", zIndex: 20}}  onChange={this.selectCategory.bind(this)} mode="multiple"> 
                <Option value={-1}>全选</Option>
                {this.props.data.categoryList.map((item, index) => 
                  <Option value={item.categoryOne} key={index}>{item.categoryOneMame}</Option>
                )}
              </Select>
            </div> : ""}
            {/*this.props.data.manageList ? <div className="header-item" style={{ width: 300, position: "relative"}}>
              <b>管控方式:</b>
              <Select value={this.props.data.selectManageId} style={{width: 200,marginRight: 10, position: "absolute", zIndex: 20}}  onChange={this.selectManage.bind(this)} mode="multiple"> 
                <Option value={-1}>全选</Option>
                {this.props.data.manageList.map((item, index) => 
                  <Option value={item.controlName} key={index}>{item.controlName}</Option>
                )}
              </Select>
            </div> : ""*/}
            {this.props.data.providerList ? <div className="header-item" style={{ width: 300, position: "relative"}}>
                          <b>供应商:</b>
                           <Select value={this.props.data.selectedProviderId} style={{width: 265,marginRight: 10, position: "absolute", zIndex: 20}}  onChange={this.selectProvider.bind(this)} mode="multiple">  
                              <Option value={-1}>全部</Option>
                              {this.props.data.providerList.map((item, index)=>
                                <Option value={item.providerID} key={item.providerID}>{item.providerName}</Option>
                              )}
                            </Select>
                        </div> : ""}
            <div className="query-btn" onClick={this.queryData.bind(this)}>
              <a href="#">查询</a>
            </div>
          </div>
        </div>
      </div>
  }
}