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
      month: Methods.generateMonth(Methods.getMonth() + 1),
      monthId: Methods.getMonth()
    }
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
  selectIndex(value){
    this.props.fns.selectIndex(value);
  }
  selectLevel(value){
    this.props.fns.selectLevel(value);
  }
  selectCurdepart(value){
    this.props.fns.selectCurdepart(value);
  }
  queryData(){
    this.props.fns.queryData();
  }
  render(){
    return <div>
        <div className="hrheader-item">
						<label>日期：</label>
						<Select defaultValue={this.props.data.year} className="hrselect-box" onChange={this.selectYear.bind(this)}>
							{this.year.map((item, index) => <Option value={item} key={index}>{item}</Option>)}
						</Select>
						<Select defaultValue={this.props.data.month} className="hrselect-box" onChange={this.selectMonth.bind(this)}>
              {/* {this.month.map((item, index) => <Option value={item.key} key={index}>{item.value}</Option>)} */}
              <Option value={5}>5月</Option>
						</Select>
					</div>
					<div className="hrheader-item">
            <label>排名指标：</label>
						<Select defaultValue={this.props.data.indexId} className="hrselect-box"  onChange={this.selectIndex.bind(this)}>
							{this.props.data.indexList.map((item, index) => <Option value={item.id} key={index}>{item.value}</Option>)}
						</Select>
					</div>
					<div className="hrheader-item">
            <label>排名层级：</label>
						<Select value={this.props.data.levelId} className="hrselect-box"  onChange={this.selectLevel.bind(this)}>
							<Option value={3}>一级组织</Option>
              <Option value={4}>二级组织</Option>
						</Select>
					</div>
          <div className="hrheader-item">
            <label>当前展示：</label>
						<Select value={this.props.data.selectDepartId} className="hrselect-box" onChange={this.selectCurdepart.bind(this)} style={{width: 280}}>
              {this.props.data.departList.map((item) => 
                <Option value={item.id} key={item.id}>{item.name}</Option> 
              )}
						</Select>
					</div>
					<div className="hrquery-btn">
						<a onClick={this.queryData.bind(this)}>查询</a>
					</div>
      </div>
  }
}