import React, {Component} from 'react';
import {DatePicker} from 'antd';
import moment from 'moment';
import EConfig from '../../../common/charts/EConfig';
import NodataEcharts from '../../../common/charts/NodataECharts';
const {MonthPicker} = DatePicker;

export default class ManagePart extends Component{
  constructor(props){
    super(props);
  }
  selectMonth = (date) => {
    this.props.fns.selectManageDate(date);
  }
  jumpSecondICP(kind, kindName){
    this.props.fns.jumpSecondICP(kind, kindName);
  }
  chooseProductChart(instance){
		let that = this;
		let handler = instance.on("click", (params) => {
			that.props.fns.jumpSecondManage({
        productId: [+params.data.specifiedId],
        regionId: -1,
        regionName: "全部大区"
      });
			instance.off(handler);
		});
  }
  chooseAreaChart(instance){
		let that = this;
		let handler = instance.on("click", (params) => {
			that.props.fns.jumpSecondManage({
        productId: [-1],
        regionId: +params.data.specifiedId,
        regionName: `${params.name}-全部省份`
      });
			instance.off(handler);
		});
	}
  render(){
    const chartConfig = {
      barColor: ["#fa939f", "#939afa"],
      showLegend: true,
      normalLegend: true,
      noRadius: true,
      stackId: "staff",
      gridLeft: 50,
      gridRight: '10%',
      gridTop: 60,
      bottom: 60,
      barMaxWidth: 10,
      containLabel: false
    };
    let proTop5 = {
      data: this.props.protop5,
      option: EConfig.radiusBarOption,
      config: chartConfig,
      height: 330
    };
    let areaChart = {
      data: this.props.areaChart,
      option: EConfig.radiusBarOption,
      config: chartConfig,
      height: 330
    };
    return <div className="dashinc-analysis">
      <h3 className="dashsection-title">管报矩阵
        <span style={{fontSize: 14, fontWeight: "normal", paddingLeft: 10}}>（单位：万）</span>
        <div className="manage-picker">
          <MonthPicker 
          allowClear={false}
          value={this.props.monthDate} 
          disabledDate={(currentDate) => (currentDate > moment() || currentDate < moment('2018-01-01'))}
          onChange={this.selectMonth}/>
        </div>
      </h3>
      <div className="dashinc-body">
        <div className="dash-map-common-box">
          <p className="dc-map-title">集团整体</p>
          <div className="dashin-mgroups">
            <div className="dnm-item" onClick={this.jumpSecondICP.bind(this, "income", "收入")}>
              <span className="dnm-title">{this.props.monthId}月收入</span>
              <div>
                <span className="dnm-num dnmnred">{this.props.manageAll.income || 0}</span>
                <span style={{paddingLeft: 15}}>环比：</span>
                <span className={this.props.manageAll.incomeRate > 0 ? "panel-num-up" : "panel-num-down"}></span>
                <span>{this.props.manageAll.incomeRate}%</span>
              </div>
              <div>年累计：{this.props.manageAll.incomeYear}</div>
              <div className="dnm-symbol">-</div>
            </div>
            <div className="dnm-item" onClick={this.jumpSecondICP.bind(this, "cost", "成本")}>
              <span className="dnm-title">{this.props.monthId}月主营业务成本</span>
              <div>
                <span className="dnm-num">{this.props.manageAll.cost || 0}</span>
                <span style={{paddingLeft: 15}}>环比：</span>
                <span className={this.props.manageAll.costRate > 0 ? "panel-num-up" : "panel-num-down"}></span>
                <span>{this.props.manageAll.costRate}%</span>
              </div>
              <div>年累计：{this.props.manageAll.costYear}</div>
              <div className="dnm-symbol">=</div>
            </div>
            <div className="dnm-item" onClick={this.jumpSecondICP.bind(this, "profit", "毛利")}>
              <span className="dnm-title">{this.props.monthId}月毛利</span>
              <div>
                <span className="dnm-num">{this.props.manageAll.profit || 0}</span>
                <span style={{paddingLeft: 15}}>环比：</span>
                <span className={this.props.manageAll.profitRate > 0 ? "panel-num-up" : "panel-num-down"}></span>
                <span>{this.props.manageAll.profitRate}%</span>
              </div>
              <div>年累计：{this.props.manageAll.profitYear}</div>
            </div>
          </div>
        </div>
        <div className="dc-chart-wrapper">
            <div className="dc-chart-item" style={{width: "50%"}}>
              <div className="dc-chart">
                <p className="dc-chart-title">产品分布 - TOP5</p>
                <NodataEcharts config={proTop5}
                onChartReadyCallback={this.chooseProductChart.bind(this)}
                />
              </div>
            </div>
            <div className="dc-chart-item" style={{width: "50%"}}>
              <div className="dc-chart">
                <p className="dc-chart-title">地区分布</p>
                <NodataEcharts config={areaChart} 
                onChartReadyCallback={this.chooseAreaChart.bind(this)}/>
              </div>
            </div>
        </div>
      </div>
    </div>
  }
}