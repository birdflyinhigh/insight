import React, {Component} from 'react';
import {Select,  Radio } from 'antd';
import {Methods} from '../../common/tools/util';
const Option = Select.Option;
const RadioGroup = Radio.Group;

export default class Header extends Component{
  constructor(props){
    super(props);
    this.year = Methods.generateYear(2018);
		// this.month = Methods.generateMonth(Methods.getLastMonth() + 1);
    this.state = {
      curType: 1,
      org1Id: "100000",
      org2Id: -1,
      org3Id: -1,
      org4Id: -1,
      oldOrg: undefined,
      month: Methods.generateMonth(Methods.getLastMonth() + 1),
      monthId: Methods.getLastMonth()
    };
    console.log(this.state);
  }
  selectOrgType(e){
    this.setState({
      curType: e.target.value,
      org1Id: "100000",
      org2Id: -1,
      org3Id: -1,
      org4Id: -1,
    });
    this.props.fns.selectOrgType(e.target.value);
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
      org4Id: -1
    });
  }
  selectThirdOrg(value){
    this.props.fns.selectThirdOrg(value);
    this.setState({
      org3Id: value,
      org4Id: -1
    });
  }
  selectForthOrg(value){
    this.setState({
      org4Id: value
    });
    this.props.fns.selectForthOrg(value);
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
  // selectFType(e){
  //   this.props.fns.selectFType(e.target.value);
  // }
  handleSearchOld(value){
    this.props.fns.handleSearchOld(value);
  }
  onFocus(){
    this.props.fns.onFucusSearch();
  }
  selectOldOrg(value){
    this.setState({
      oldOrg: value
    });
    this.props.fns.selectOldOrg(value);
  }
  queryData(){
    this.props.fns.queryData();
  }
  render(){
    let {org1, org2, org3, org4, orgold} = this.props.data;
    return <div className="hr-header">
         <div className="hrheader-item">
          <RadioGroup onChange={this.selectOrgType.bind(this)} defaultValue={1}>
            <Radio value={1}>当前组织</Radio>
            <Radio value={0}>失效组织</Radio>
          </RadioGroup>
         </div>
         {this.state.curType == 1 ? <div className="hrheader-item">
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
            <Select value={this.state.org4Id} className="hrselect-box" onChange={this.selectForthOrg.bind(this)}>
              <Option value={-1}>全部</Option>
              {org4.map((item, index) => <Option value={item.orgID}  key={index}>{item.orgName}</Option>)}
            </Select>
          </div> : 
          <div className="hrheader-item">
            <Select
              showSearch
              value={this.state.oldOrg}
              placeholder="请输入组织查找"
              className="hrselect-box"
              style={{width: 750}}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onSearch={this.handleSearchOld.bind(this)}
              onChange={this.selectOldOrg.bind(this)}
              notFoundContent={null}

            >
            {orgold.map((item, index) => 
              <Option key={item.deptId} value={item.deptId}>{item.deptName}</Option>
            )}
            </Select>
          </div>
        }
          <div className="hrheader-item">
						<label>日期：</label>
						<Select defaultValue={Methods.getLastYear()} className="hrselect-box" onChange={this.selectYear.bind(this)}>
							{this.year.map((item, index) => <Option value={item} key={index}>{item}</Option>)}
						</Select>
						<Select value={this.state.monthId} className="hrselect-box" onChange={this.selectMonth.bind(this)}>
							{this.state.month.map((item, index) => <Option value={item.key} key={index}>{item.value}</Option>)}
						</Select>
					</div>
          {/* <div className="hrheader-item">
						<label>收入&amp;利润：</label>
            <RadioGroup onChange={this.selectFType.bind(this)} defaultValue={1}>
              <Radio value={1}>复记</Radio>
              <Radio value={2}>非复记</Radio>
            </RadioGroup>
					</div> */}
					<div className="hrquery-btn">
						<a onClick={this.queryData.bind(this)}>查询</a>
					</div>
      </div>
  }
}