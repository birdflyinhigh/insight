import React, {Component} from 'react';
import { Table } from 'antd';
import {Column, IntroText, FunelConfig, BottomIntroText} from './config';
import Header from '../common/component/Header';
import EConfig from '../../common/charts/EConfig';
import NodataEcharts from '../../common/charts/NodataECharts';
import SumDonut from '../../common/charts/SumDonut';
import Help from '../../common/component/Help';
import BottomIntro from '../../common/component/BottomIntro';

export default class OrderMain extends Component{
  constructor(props){
    super(props);
    this.state = {
      trendType: "count"
    }
  }
  selectTrend(value){
    this.setState({
      trendType: value
    });
    this.props.fns.selectTrend(value);
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
      queryData: this.props.fns.queryData
    };
    const orderDistribute = {
			data: this.props.orderDistribute,
			option: EConfig.donutChart,
			config: {
        unit: "",
        showSelfBoth: true,
				center: ["60%", "55%"]
			},
			height: 330
    };
    const orderStatus = {
			data: this.props.orderStatus,
			option: EConfig.donutChart,
			config: {
        unit: "",
        showSelfBoth: true,
				center: ["60%", "55%"]
			},
			height: 330
    };
    const orderTrend = {
      data: this.props.orderTrend,
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
    return <div className="ceo-order dash-container">
    <h3 className="ceotitle-box">订单分析
      {/* <span className="ceotitle-link">更多订单分析</span> */}
    </h3>
    <div className="ceocontent-body">
      <Header data={headerData} fns={headerFns}/>
      <div className="charts-content">
        <div className="dc-chart-wrapper">
          <div className="dc-chart-item" style={{width: "33.33%"}}>
            <div className="dc-chart">
              <div className="hrchart-title">订单概览
                <Help info={IntroText.overview}/>
              </div>
              <FunelItem data={this.props.orderOverview}
              config={FunelConfig}
              />
            </div>
          </div>
          <div className="dc-chart-item" style={{width: "33.33%"}}>
            <div className="dc-chart">
              <div className="hrchart-title">
              订单分配
                <Help info={IntroText.assign}/>
              </div>
              <SumDonut config={orderDistribute} 
              total={this.props.distributeAll} 
              title="分配量"/>
            </div>
          </div>
          <div className="dc-chart-item" style={{width: "33.33%"}}>
            <div className="dc-chart">
              <div className="hrchart-title">
              派单情况
                <Help info={IntroText.assignSituation}/>
              </div>
              <SumDonut config={orderStatus} 
              total={this.props.assignAll} 
              title="派单量"/>
            </div>
          </div>
        </div>
        <div className="dc-chart-wrapper">
          <div className="dc-chart-item" style={{width: "50%"}}>
            <div className="dc-chart">
              <div className="hrchart-title admin-body">
              订单趋势{this.state.trendType === "amount" ? "（万）" : ""}
              <div className="erp-selectbox"
                 style={{right: 0, width: "auto", top: 15}}
                >
                  <div className="selecticon-group">
                    <span 
                    className={this.state.trendType === "count" ? "active-btnicon" : ""}
                    onClick={this.selectTrend.bind(this, "count")}
                    >数量</span>
                    <span
                    className={this.state.trendType === "amount" ? "active-btnicon" : ""}
                    onClick={this.selectTrend.bind(this, "amount")}
                    >金额</span>
                  </div>
                </div>
              </div>
              <NodataEcharts config={orderTrend}/>
            </div>
          </div>
          <div className="dc-chart-item" style={{width: "50%"}}>
            <div className="dc-chart">
              <div className="hrchart-title">
              订单相关指标排行榜
              </div>
              <div style={{marginTop: 15, height: 250, overflow: "auto"}}>
                <Table columns={Column} 
                dataSource={this.props.orderIndexRank} 
                rowKey="rank"
                pagination={false} />
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

function FunelItem({data, config}){
  const orderedMount = data.orderedData;
  const widthArr = data.width;
  return <div className="funel-wrapper">
    <div className="funel-bg">
      <p>UV：{data.uv}</p>
      {widthArr.map((item, index) => 
        <div className="funel-bg-item" key={index}>
          <span className={`funel-item${index + 1}`} style={{
            width: item + "%",
            height: 60
            }}></span>
        </div>
        )}
    </div>
    <p>UV：{data.uv}</p>
    {orderedMount.map((item, index) => 
      <div className="funel-item-text" key={index}>
        <p style={item.key === "submit" ? {lineHeight: "50px"} : {}}>
          <span className="funeli-text-title">{config[item.key]}</span>
          <span>{item.value}</span>
          {config[`${item.key}Rate`] ? <span style={{marginLeft: 10}}>
          {config[`${item.key}Rate`] + data[`${item.key}Rate`]}%
          </span> : ""}
        </p>
        {config[`${item.key}Money`] ? <p>
          <span className="funeli-text-title">{config[`${item.key}Money`]}</span>
          <span>{data[`${item.key}Money`]}w</span>
        </p> : ""}
      </div>
        )}
</div>
}