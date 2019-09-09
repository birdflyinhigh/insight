import React, {Component} from 'react';
import {TabValue} from '../constant';
import NodataEcharts from '../../../../common/charts/NodataECharts';
import EConfig from '../../../../common/charts/EConfig';
import MatrixTable from './Table';
import {ComptUtils} from '../../../../common/tools/util';

export default class MainContent extends Component{
  constructor(props){
    super(props);
    this.state = {
      chooseRankKey: "product"
    }
  }
  changeTab = (typeObj) => () => {
    this.props.fns.changeTab(typeObj);
  }
  chooseRankType = (type) => () => {
    this.setState({
      chooseRankKey: type,
    });
    this.props.fns.chooseRankType(type);
  }
  render(){
    const monthTrend = {
			data: this.props.monthTrend,
			option: EConfig.radiusBarOption,
			config: {
				barColor: ["#2a7bff", "#36db98"],
				stackId: "person",
				showLabel: false,
				// interval: 0
			},
			height: 330,
    };
    const regionChart = {
			data: this.props.regionChart,
			option: EConfig.donutChart,
			config: {
        unit: "",
        showSelfBoth: true,
				center: ["60%", "55%"]
			},
			height: 330
    };
    const typeChart = {
			data: this.props.typeChart,
			option: EConfig.donutChart,
			config: {
        unit: "",
        showSelfBoth: true,
				center: ["60%", "55%"]
			},
			height: 330
    }
    const profitTitleText = this.props.targetName === "毛利" && this.props.typeId === 1;
    return <div className="cmanage-main dash-container">
      <div className="hrchart-container">
        <div className="cmanage-tab-groups">
          {TabValue.map((item) => <b 
          key={item.key}
          className={this.props.target === item.key ? "activeTab" : ""}
          onClick={this.changeTab(item)}
          >{item.value}</b>)}
        </div>
      </div>
      <div className="hrchart-container">
        <div className="cmanage-index-show">
          <div className="cmanage-index-text">
          {this.props.monthDate}月{profitTitleText ? "毛利（技术服务费)" : this.props.targetName}总额
            {profitTitleText ? <div className="help">
              <ul className="intro" style={{width: 230}}>
                {ComptUtils.generateToolArr("交易毛利 = 交易收入 - 交易主营业务成本").map((toolstr, index1) =>  
                  <li key={index1}>{toolstr}</li> 
                  )}
              </ul>
            </div> : ""}
          </div>
          <span className="cindexshow-num">{this.props.titleNum.value}万</span>
          <span>环比: {this.props.titleNum.valueRate}%</span>
        </div>
      </div>
      <div>
        <div className="cmanage-left-wrapper">
            <div className="dc-chart-wrapper">
              <div className="dc-chart-item" style={{width: "100%"}}>
                <div className="dc-chart">
                  <p className="hrchart-title">{this.props.targetName}-月度趋势（万）</p>
                  <NodataEcharts config={monthTrend}/>
                </div>
              </div>
            </div>
            <div className="dc-chart-wrapper">
              <div className="dc-chart-item" style={{width: "50%"}}>
                <div className="dc-chart">
                  <p className="hrchart-title">{this.props.monthDate}月{this.props.targetName}-大区分布（万）</p>
                  <NodataEcharts config={regionChart}/>
                </div>
              </div>
              <div  className="dc-chart-item" style={{width: "50%"}}>
                <div className="dc-chart">
                  <p className="hrchart-title">{this.props.monthDate}月{this.props.targetName}-类型构成（万）</p>
                  <NodataEcharts config={typeChart}/>
                </div>
              </div>
            </div>
        </div>
        <div className="cmanage-right-wrapper">
          <div className="cmanage-rank">
            <div className="cmanage-rank-title self-clearfix">
              <p className="crt-text">{this.props.monthDate}月{this.props.targetName}排行</p>
              <div className="crt-btns">
                <b 
                onClick={this.chooseRankType("product")}
                className={this.state.chooseRankKey === "product" ? "active-btn" : ""}>产品</b>
                <b 
                onClick={this.chooseRankType("province")}
                className={this.state.chooseRankKey === "province" ? "active-btn" : ""}>省份</b>
              </div>
            </div>
            <div className="cmanage-rank-content">
              <ul>
                <li className="crc-row">
                  <b className="crt-col1">序号</b>
                  <b className="crt-col2">产品</b>
                  <b className="crt-col3">收入</b>
                  <b className="crt-col4">占比</b>
                </li>
                {
                  this.props.productRank.length === 0 ? <div style={{textAlign: "center"}}>暂无数据</div> : this.props.productRank.map((item, index) => 
                  <li className="crc-row" key={index}>
                    <b className="crt-col1">{index + 1}</b>
                    <b className="crt-col2">{item.name}</b>
                    <b className="crt-col3">{item.value}w</b>
                    <b className="crt-col4">{item.rate}%</b>
                  </li>
                  )
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="cm-table">
        <div className="cm-table-wrapper">
          <p className="hrchart-title">{this.props.monthDate}月{this.props.targetName}-矩阵表（万）</p>  
          <div className="matrix-table">
          {this.props.tableData.header.length > 0 ? 
          <MatrixTable data={this.props.tableData}/> : <div style={{textAlign: "center"}}>暂无数据</div>}
          </div>
        </div>
      </div>
    </div>
  }
}