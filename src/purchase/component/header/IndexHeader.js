import React, {Component} from 'react';
import {Select, Radio } from 'antd';
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
export default class IndexHeader extends Component{
  constructor(props){
    super(props);
    this.month = Methods.generateMonth();
    this.year = Methods.generateYear(2016);
    this.curYear = (new Date()).getFullYear();
    // this.defaultYear = [this.curYear , this.curYear - 1, this.curYear - 2];
    this.defaultYear = [this.curYear];
    // this.state = {...generateState(this.props.data.aIds), 
    //   disableComBox3: true
    // };
  }
  selectYear(value){
    this.props.fns.selectYear(value.join(","));
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
  
  queryData(){
    this.props.fns.queryData();
  }
  render(){
    let {selectedTypeId, 
        firstComId, secondComId, thirdComId,
        firstComData, secondComData, thirdComData,
        firstOrgId, secondOrgId, thirdOrgId,
        firstData, secondData, thirdData} = this.props.data;
    return <div className="financial-header">
        <div className="self-clearfix">
          <div className="header-item">
            <b>年份:</b>
            <Select defaultValue={this.defaultYear} onChange={this.selectYear.bind(this)} style={{width: 235}} mode="multiple">  
              {this.year.map((item, index)=>
                <Option value={item} key={index}>{item}</Option>
              )}
            </Select>
          </div>
          <div className="org-wrapper">
            <div className="header-item" style={{paddingTop: 20}}>
                <RadioGroup onChange={this.selectType.bind(this)} defaultValue={selectedTypeId} onChange={this.selectType.bind(this)}>
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
            <div className="header-item">
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
             { /*<Select value={forthOrgId} onChange={this.selectForth.bind(this)} style={{width: 180}} disabled={this.state.disabledBox4}>
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
                           </Select>*/ }
            </div>}
            <div className="query-btn" onClick={this.queryData.bind(this)}>
              <a href="#">查询</a>
            </div>
          </div>
          
        </div>
      </div>
  }
}