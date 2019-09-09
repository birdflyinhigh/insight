import React, {Component} from 'react';
import { Table } from 'antd';
import {TabInfo} from './config';
import Header from '../common/component/Header';
import EConfig from '../../common/charts/EConfig';
import NodataEcharts from '../../common/charts/NodataECharts';
import Help from '../../common/component/Help';
import {ProductColumn, AreaColumn, 
  BottomIntroText, IntroText} from './config';
import BottomIntro from '../../common/component/BottomIntro';

export default class IncomeMain extends Component{
  constructor(props){
    super(props);
    this.state = {
      trendType: "day",
      typeType: "income",
      typeName: "收入",
      proType: "area",
      incomeType: "product",
      timeType: "month"
    };
  }
  selectTrend(value){
    this.setState({
      trendType: value
    });
    this.props.fns.selectTrend(value);
  }
  selectType(value, name){
    this.setState({
      typeType: value,
      typeName: name
    });
    this.props.fns.selectType(value);
  }
  selectDistribute(value){
    this.setState({
      proType: value
    });
    this.props.fns.selectDistribute(value);
  }
  selectIncome(value){
    this.setState({
      incomeType: value
    });
    this.props.fns.selectIncome(value);
  }
  selectTime(value){
    this.setState({
      timeType: value
    });
    this.props.fns.selectTime(value);
  }
  render(){
    const headerData = {
      startTime: this.props.startTime,
      endTime: this.props.endTime,
      regionId: this.props.regionId,
      provinceId: this.props.provinceId,
      productId: this.props.productId,
      region: this.props.region,
      province: this.props.province,
      product: this.props.product,
      curBtn: this.props.curBtn,
      role: this.props.userRole
    };
    const headerFns = {
      selectStart:  this.props.selectStart,
      selectEnd:  this.props.selectEnd,
      selectRegion: this.props.selectRegion,
      selectProvince: this.props.selectProvince,
      selectProduct: this.props.selectProduct,
      queryData: this.props.queryData
    };
    const incomeTrend = {
      data: this.props.incomeTrend,
      option: EConfig.gradientLineOption,
      config: {
        lineColor: ["#689ef9","#f89fa4"],
        showLegend: true,
        normalLegend: true,
        smooth: true,
        hideSplitLine: true
      },
      height: 330
    };
    const incomeType = {
			data: this.props.incomeType,
			option: EConfig.donutChart,
			config: {
        unit: "",
        showSelfBoth: true,
				center: ["60%", "55%"]
			},
			height: 330
    };
    const areaStatus = {
			data: this.props.areaStatus,
			option: EConfig.radiusBarOption,
			config: {
				barColor: ["#2a7bff", "#36db98"],
        showLabel: false,
        showLegend: true,
        sameSeriesColor: true,
        gridBottom: 30
			},
			height: 330,
    };
    const isShowAllBtn = this.props.userRole === "ceo" ? true : false;
    const isShowAllAreaBtn = this.props.userRole === "area" ? true : false; 
    const tableName = this.state.proType === "area" ? "区域" : "产品";
    return <div className="ceo-income">
    <h3 className="ceotitle-box">营收分析
      {/*<span className="ceotitle-link"*/}
      {/*onClick={this.props.fns.jumpManage}*/}
      {/*>管报矩阵>></span>*/}
    </h3>
    <div className="ceocontent-body dash-container">
      <Header data={headerData} fns={headerFns} specialTime={true}/>
      <div className="income-tab">
        {TabInfo.map((item, index) => 
        <div className="income-tab-item-wrapper" key={index}>
          <div className="income-tab-item">
            <div className="income-tab-title">{item.name}
              <Help info={item.extraText} />
            </div>
            <p className="income-tab-num">
              <span>{this.props.incomeTab[item.keyValue]}</span>
            万</p>
            <p className="income-tab-num">环比：
              <span>{this.props.incomeTab[item.keyRate]}%</span>
            </p>
          </div>
        </div>
          )}
      </div>
      <div className="charts-content">
        <div className="dc-chart-wrapper">
          <div className="dc-chart-item" style={{width: "50%"}}>
            <div className="dc-chart">
              <div className="hrchart-title admin-body">
              收入趋势（万）
                <div className="erp-selectbox"
                style={{right: 0, width: "auto", top: 15}}
                >
                  <div className="selecticon-group">
                    <span 
                    className={this.state.trendType === "day" ? "active-btnicon" : ""}
                    onClick={this.selectTrend.bind(this, "day")}
                    >天</span>
                    <span
                    className={this.state.trendType === "month" ? "active-btnicon" : ""}
                    onClick={this.selectTrend.bind(this, "month")}
                    >月</span>
                  </div>
                </div>
              </div>
              <NodataEcharts config={incomeTrend}/>
            </div>
          </div>
          <div className="dc-chart-item" style={{width: "50%"}}>
            <div className="dc-chart">
              <div className="hrchart-title admin-body">{this.state.typeName}类型（万）
                <div className="erp-selectbox"
                 style={{right: 0, width: "auto", top: 15}}
                >
                  <div className="selecticon-group">
                    <span 
                    className={this.state.typeType === "income" ? "active-btnicon" : ""}
                    onClick={this.selectType.bind(this, "income", "收入")}
                    >收入</span>
                    <span
                    className={this.state.typeType === "cost" ? "active-btnicon" : ""}
                    onClick={this.selectType.bind(this, "cost", "主营业务成本")}
                    >主营业务成本</span>
                    <span
                    className={this.state.typeType === "profit" ? "active-btnicon" : ""}
                    onClick={this.selectType.bind(this, "profit", "毛利")}
                    >毛利</span>
                  </div>
                </div>
              </div>
              <NodataEcharts config={incomeType}/>
            </div>
          </div>
        </div>
        <div className="dc-chart-wrapper">
          <div className="dc-chart-item" style={{width: "50%"}}>
            <div className="dc-chart">
              <div className="hrchart-title admin-body">{tableName}分布（万）
                <div className="erp-selectbox"
                 style={{right: 0, width: "auto", top: 15}}>
                    {isShowAllBtn ? <div className="selecticon-group">
                      <span 
                      className={this.state.proType === "area" ? "active-btnicon" : ""}
                      onClick={this.selectDistribute.bind(this, "area")}
                      >区域</span>
                      <span
                      className={this.state.proType === "product" ? "active-btnicon" : ""}
                      onClick={this.selectDistribute.bind(this, "product")}
                      >产品</span>
                    </div> : ""}
                </div>
              </div>
              <NodataEcharts config={areaStatus}/>
            </div>
          </div>
          <div className="dc-chart-item" style={{width: "50%"}}>
            <div className="dc-chart">
              <div className="hrchart-title admin-body">
                排行榜
                {/* <Help info={IntroText.rank} /> */}
                <div className="erp-selectbox"
                 style={{right: 200, width: "auto", top: 15}}>
                  <div className="selecticon-group">
                    <span 
                    className={this.state.timeType === "month" ? "active-btnicon" : ""}
                    onClick={this.selectTime.bind(this, "month")}
                    >本月</span>
                    <span 
                    className={this.state.timeType === "yesterday" ? "active-btnicon" : ""}
                    onClick={this.selectTime.bind(this, "yesterday")}
                    >昨日</span>
                  </div>
                </div>
                <div className="erp-selectbox"
                 style={{right: 0, width: "auto", top: 15}}>
                  <div className="selecticon-group">
                    {isShowAllBtn || isShowAllAreaBtn ? <span 
                    className={this.state.incomeType === "area" ? "active-btnicon" : ""}
                    onClick={this.selectIncome.bind(this, "area")}
                    >区域-大区</span> : ""}
                    {isShowAllBtn || isShowAllAreaBtn ? <span 
                    className={this.state.incomeType === "province" ? "active-btnicon" : ""}
                    onClick={this.selectIncome.bind(this, "province")}
                    >区域-省份</span> : ""}
                    {isShowAllBtn ? <span
                    className={this.state.incomeType === "product" ? "active-btnicon" : ""}
                    onClick={this.selectIncome.bind(this, "product")}
                    >产品</span> : ""}
                  </div>
                </div>
              </div>
              <p style={{color: "#999", fontSize: 12,paddingTop: 10}}>（非ERP财务数据，T+1数据来自大数据平台，金额单位：万）</p>
              <div style={{marginTop: 5, height: 250, overflow: "auto"}}>
                <div style={{
                  display: this.state.incomeType === "product" ? "block" : "none"
                }}>
                  <Table columns={ProductColumn} 
                  dataSource={this.props.incomeRank} 
                  rowKey="name"
                  pagination={false}
                  />
                </div>
                <div style={{
                  display: this.state.incomeType === "area" ? "block" : "none"
                }}>
                  <Table columns={AreaColumn(this.state.incomeType)} 
                  dataSource={this.props.incomeRank} 
                  rowKey="name"
                  pagination={false}
                  />
                </div>
                <div style={{
                  display: this.state.incomeType === "province" ? "block" : "none"
                }}>
                  <Table columns={AreaColumn(this.state.incomeType)} 
                  dataSource={this.props.incomeRank} 
                  rowKey="name"
                  pagination={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <BottomIntro intro={BottomIntroText}/>
      </div>
    </div>
  </div>
  }
}