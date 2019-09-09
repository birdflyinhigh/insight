import React, { Component } from 'react';
import Header from '../common/component/Header';
import EConfig from '../../common/charts/EConfig';
import SumDonut from '../../common/charts/SumDonut';
import Help from '../../common/component/Help';
import NodataEcharts from '../../common/charts/NodataECharts';
import { TabInfo, IntroInfo } from './config';
import { ComptUtils } from '../../common/tools/util';
export default class ManageMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: "sale",
      salesType: "day",
      profitType: "day",
      refundType: "day"
    };
  }

  selectSales(value){
    this.setState({
      sales: value
    });
    this.props.fns.selectSales(value);
  }


  selectSalesTrend(value) {
    this.setState({
      salesType: value
    });
    this.props.fns.selectSalesTrend(value);
  }
  selectProfitTrend(value) {
    this.setState({
      profitType: value
    });
    this.props.fns.selectProfitTrend(value);
  }
  selectRefoundTrend(value) {
    this.setState({
      refundType: value
    });
    this.props.fns.selectRefoundTrend(value);
  }
  render() {
    const headerData = {
      startTime: this.props.startTime,
      endTime: this.props.endTime,
      regionId: this.props.regionId,
      provinceId: this.props.provinceId,
      region: this.props.region,
      province: this.props.province,
      curBtn: this.props.curBtn,
      role: this.props.userRole
    };
    const headerFns = {
      selectStart: this.props.selectStart,
      selectEnd: this.props.selectEnd,
      selectRegion: this.props.selectRegion,
      selectProvince: this.props.selectProvince,
      selectProduct: this.props.selectProduct,
      queryData: this.props.queryData
    };
    const sales = {
      data: this.props.sales,
      option: EConfig.donutChart,
      config: {
        unit: "",
        showSelfBoth: true,
        center: ["75%", "55%"]
      },
      height: 330
    };
    const profit = {
      data: this.props.profit,
      option: EConfig.donutChart,
      config: {
        unit: "",
        showSelfBoth: true,
        center: ["75%", "55%"]
      },
      height: 330
    };
    const refound = {
      data: this.props.refound,
      option: EConfig.donutChart,
      config: {
        unit: "",
        showSelfBoth: true,
        center: ["75%", "55%"]
      },
      height: 330
    };
    const salesTrend = {
      data: this.props.salesTrend,
      option: EConfig.gradientLineOption,
      config: {
        lineColor: ["#689ef9", "#f89fa4"],
        showLegend: true,
        normalLegend: true,
        smooth: true,
        hideSplitLine: true
      },
      height: 330
    };
    const profitTrend = {
      data: this.props.profitTrend,
      option: EConfig.gradientLineOption,
      config: {
        lineColor: ["#689ef9", "#f89fa4"],
        showLegend: true,
        normalLegend: true,
        smooth: true,
        hideSplitLine: true
      },
      height: 330
    };
    const refoundTrend = {
      data: this.props.refoundTrend,
      option: EConfig.gradientLineOption,
      config: {
        lineColor: ["#689ef9", "#f89fa4"],
        showLegend: true,
        normalLegend: true,
        smooth: true,
        hideSplitLine: true
      },
      height: 330
    };
    return <div className="dash-container">
      <h3 className="ceotitle-box">企业管家分析</h3>
      <div className="ceocontent-body">
        <Header data={headerData} fns={headerFns} />
        <div className="income-tab">
          {TabInfo.map((item, index) =>
            <div className="income-tab-item-wrapper" style={{ width: "33.33%" }} key={index}>
              <div className="income-tab-item">
                <div className="income-tab-title">{item.name}
                  <Help info={item.extraText} />
                </div>
                <p className="income-tab-num manager-tab-num">
                  <span>{this.props.mtopCard[item.key]}</span>
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="charts-content">
          <div className="dc-chart-wrapper">
            <div className="dc-chart-item" style={{ width: "33.33%" }}>
              <div className="dc-chart">
                <div className="hrchart-title admin-body">销售额及构成
                <Help info={IntroInfo.salesCons} />
                <div className="erp-selectbox" style={{ right: 0, width: "auto", top: 15 }}>
                  <div className="selecticon-group">
                    <span className={this.state.sales === "sale" ? "active-btnicon" : ""}
                      onClick={this.selectSales.bind(this, "sale")}>消费额</span>
                    <span className={this.state.sales === "expend" ? "active-btnicon" : ""}
                    onClick={this.selectSales.bind(this, "expend")}>消耗额</span>
                  </div>
                </div>
              </div>

                <SumDonut config={sales}
                  total={this.props.salesAll}
                  title="销售额"
                  style={{ left: '48%' }} />
              </div>
            </div>
            <div className="dc-chart-item" style={{ width: "33.33%" }}>
              <div className="dc-chart">
                <div className="hrchart-title">毛利及构成
                <Help info={IntroInfo.profitCons} />
                </div>
                <SumDonut config={profit}
                  total={this.props.profitAll}
                  title="毛利"
                  style={{ left: '48%' }} />
              </div>
            </div>
            <div className="dc-chart-item" style={{ width: "33.33%" }}>
              <div className="dc-chart">
                <div className="hrchart-title">退款额及构成
                <Help info={IntroInfo.refoundCons} />
                </div>
                <SumDonut config={refound}
                  total={this.props.refoundAll}
                  title="退款额"
                  style={{ left: '48%' }} />
              </div>
            </div>
          </div>
          <div className="dc-chart-wrapper">
            <div className="dc-chart-item" style={{ width: "33.33%" }}>
              <div className="dc-chart">
                <div className="hrchart-title admin-body">销售额&消耗额趋势
                <div className="erp-selectbox"
                    style={{ right: 0, width: "auto", top: 15 }}>
                    <div className="selecticon-group">
                      <span
                        className={this.state.salesType === "day" ? "active-btnicon" : ""}
                        onClick={this.selectSalesTrend.bind(this, "day")}
                      >天</span>
                      <span
                        className={this.state.salesType === "month" ? "active-btnicon" : ""}
                        onClick={this.selectSalesTrend.bind(this, "month")}
                      >月</span>
                    </div>
                  </div>
                </div>
                <NodataEcharts config={salesTrend} />
              </div>
            </div>
            <div className="dc-chart-item" style={{ width: "33.33%" }}>
              <div className="dc-chart">
                <div className="hrchart-title admin-body">
                  毛利趋势
                <div className="erp-selectbox"
                    style={{ right: 0, width: "auto", top: 15 }}>
                    <div className="selecticon-group">
                      <span
                        className={this.state.profitType === "day" ? "active-btnicon" : ""}
                        onClick={this.selectProfitTrend.bind(this, "day")}
                      >天</span>
                      <span
                        className={this.state.profitType === "month" ? "active-btnicon" : ""}
                        onClick={this.selectProfitTrend.bind(this, "month")}
                      >月</span>
                    </div>
                  </div>
                </div>
                <NodataEcharts config={profitTrend} />
              </div>
            </div>
            <div className="dc-chart-item" style={{ width: "33.33%" }}>
              <div className="dc-chart">
                <div className="hrchart-title admin-body">
                  退款额趋势
                <div className="erp-selectbox"
                    style={{ right: 0, width: "auto", top: 15 }}>
                    <div className="selecticon-group">
                      <span
                        className={this.state.refundType === "day" ? "active-btnicon" : ""}
                        onClick={this.selectRefoundTrend.bind(this, "day")}
                      >天</span>
                      <span
                        className={this.state.refundType === "month" ? "active-btnicon" : ""}
                        onClick={this.selectRefoundTrend.bind(this, "month")}
                      >月</span>
                    </div>
                  </div>
                </div>
                <NodataEcharts config={refoundTrend} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}