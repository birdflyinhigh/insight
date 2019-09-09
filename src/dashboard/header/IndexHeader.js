import React, {Component} from 'react';
import { DatePicker, Select } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import {notification} from 'antd';
import moment from 'moment';
import './header.css';
const Option = Select.Option;
// time based on today, default last day;
// recent 30 days : today - 30days' time;
export default class IndexHeader extends Component{
  constructor(props){
    super(props);
    this.quickBtn = [{
      name: "昨天",
      interval: 1,
      index: 0
    }, {
      name: "最近7天",
      interval: 7,
      index: 1
    }, {
      name: "最近30天",
      interval: 30,
      index: 2
    }];
    this.dateFormat = "YYYY-MM-DD";
    this.oneDayTime = 1 * 24 *60 *60 * 1000;
    this.state = {
      curBtn: 1
    };  
    this.timeParams = {
      startTime: this.props.data.startTime,
      endTime: this.props.data.endTime
    };
  }
  componentWillReceiveProps(nextProps){
    let curData = this.props.data;
    let nextData = nextProps.data;
    let isSameTime = (curData.startTime == nextData.startTime && curData.endTime == nextData.endTime)
    if(isSameTime) return;
    this.setCurBtn(nextData.startTime, nextData.endTime);
    
  }
  componentDidMount(){
    this.setCurBtn(this.props.data.startTime, this.props.data.endTime);
  }
  disableFutureTime(current){
    return current && current > moment().subtract(1, 'days');
  }
  quickClick(btnObj){
    // this.setState({
    //   curBtn: btnObj.index,
    // });
    let startTime = moment().subtract(btnObj.interval, 'days').format('YYYY-MM-DD');
    let endTime = moment().subtract(1, 'days').format('YYYY-MM-DD');
    this.timeParams.startTime = startTime;
    this.timeParams.endTime = endTime;
    this.props.fns.selectStart(startTime);
    this.props.fns.selectEnd(endTime);
  }
  judgeInterval(start, end){
    // let ms = Math.abs(moment(end).diff(moment(start)));
    let ms = moment(end).diff(moment(start));
    return moment.duration(ms).asDays();
  }
  getInterval(start, end){
    if(end != moment().subtract(1, 'days').format('YYYY-MM-DD')){
      // console.log('equal, not recent');
      return [];
    }
    let interval = this.judgeInterval(start, end);
    // console.log(interval);
    return this.quickBtn.filter((item, index) => item.interval - 1 === Math.ceil(interval))
  }
  setCurBtn(start, end){
    let btnItem = this.getInterval(start, end);
    if(btnItem.length){
      this.setState({
        curBtn: btnItem[0].index
      });
      return ;
    }
    this.setState({
      curBtn: -1
    });
  }
  selectStart(date, dateString){
    let formatDate = date.format('YYYY-MM-DD')
    this.timeParams.startTime = formatDate;
    this.props.fns.selectStart(formatDate);
    // this.setCurBtn(dateString, this.props.data.endTime);  
  }
  selectEnd(date, dateString){
    let formatDate = date.format('YYYY-MM-DD')
    this.timeParams.endTime = formatDate;
    this.props.fns.selectEnd(formatDate);
    // let nowDate = moment().format('YYYY-MM-DD');
    // this.setCurBtn(this.judgeInterval(dateString, nowDate));
  }
  selectProduct(value){
    this.props.fns.selectProduct(value);
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
  popInvalidTimeNotify(){
		let mStart = moment(this.timeParams.startTime);
		let mEnd = moment(this.timeParams.endTime);
		if(mEnd.diff(mStart) < 0){
			notification.error({
				message: '温馨提示',
				description: '您选择的开始日期小于结束日期,请重新选择',
      });
      return true;
		}
	}
  queryData(){
    if(this.popInvalidTimeNotify.bind(this)()) return;
    this.props.fns.queryData();
  }
  render(){
    return <div className="dash-header">
      <div className="dashh-item">
        <b className="dashh-title">时间维度:</b>
        <div className="dashh-quickbtn">
          {this.quickBtn.map((item, index) => 
            <b key={index} className={item.index === this.state.curBtn ? "active" : ""} onClick={this.quickClick.bind(this, item)}>{item.name}</b>)}
        </div>
        <div className="dashh-dates">
          <DatePicker value={moment(this.props.data.startTime)}
          locale={locale}
          allowClear={false}
          format={this.dateFormat} 
          disabledDate={this.disableFutureTime.bind(this)}
          onChange={this.selectStart.bind(this)}/>
          <span>&nbsp;——&nbsp;</span>
          <DatePicker value={moment(this.props.data.endTime)}
          locale={locale}
          allowClear={false}
          format={this.dateFormat} 
          disabledDate={this.disableFutureTime.bind(this)}
          onChange={this.selectEnd.bind(this)}/>
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
      {this.props.data.product ? <div className="dashh-item">
        <b className="dashh-title">产品:</b>
        <Select style={{width: 180}} 
        value={this.props.data.productId}
        onChange={this.selectProduct.bind(this)}
        >
            <Option value={-1}>全部</Option>
            {this.props.data.product.map((item, index) => 
              <Option key={index} value={item.value}>{item.name}</Option>)}
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
      <div className="dashh-item" onClick={this.queryData.bind(this)}>
        <div className="query-btn">
          <a>查询</a>
        </div>
      </div> 
    </div>
  }
}