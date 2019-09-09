import React, {Component} from 'react';
import NodataEcharts from '../../../common/charts/NodataECharts';
import EConfig from '../../../common/charts/EConfig';
import {RainbowColor} from '../../common/constant';
export default class ChartsPart extends Component{
  constructor(props){
		super(props);
  }
  render(){
		let proTrend = {
			data: this.props.data.proEtrend,
			option: EConfig.areaLineChart,
			config: {
				color: RainbowColor,
        showLegend: true,
        normalLegend: true,
        noRadius: true,
        smooth: true,
        stackId: "proTrend",
        hideYformatter: true
			},
			height: 330
		};
    let proRate = {
			data: this.props.data.proErate,
			option: EConfig.donutChart,
			config: {
				color: ["#949afa", "#eb898a"],
				// unit: "人",
				showLegend: true,
        normalLegend: true,
				center: ["60%", "50%"]
			},
			height: 330
    };
    let areaTrend = {
			data: this.props.data.areaEtrend,
			option: EConfig.areaLineChart,
			config: {
				color: RainbowColor,
        showLegend: true,
        normalLegend: true,
        noRadius: true,
        smooth: true,
        stackId: "areaServiceTrend",
        hideYformatter: true
			},
			height: 330
    };
    let areaRate = {
			data: this.props.data.areaErate,
			option: EConfig.donutChart,
			config: {
				color: RainbowColor,
				// unit: "人",
				showLegend: true,
        normalLegend: true,
				center: ["60%", "50%"]
			},
			height: 330
    };
		let areaTop = {
			data: this.props.data.areaETop,
			option: EConfig.topHBarChart,
			config: {
				topColor: ["#eb8989"],
				normalColor: ["#c0c5fa"],
				topNum: 3,
        showLegend: true,
        normalLegend: true,
        noRadius: true,
			},
			height: 330
		};
		let industryTrend = {
			data: this.props.data.industryEtrend,
			option: EConfig.areaLineChart,
			config: {
				color: RainbowColor,
        showLegend: true,
        normalLegend: true,
        noRadius: true,
        smooth: true,
        stackId: "industryTrend",
				hideYformatter: true,
				gridBottom: 140
			},
			height: 360
		};
		let industryTop = {
			data: this.props.data.industryEtop,
			option: EConfig.donutChart,
			config: {
				color: RainbowColor,
				// unit: "人",
				showLegend: true,
        normalLegend: true,
				center: ["60%", "50%"]
			},
			height: 360
		}
    return <div className="dash-charts-wrapper">
    <h3 className="dcs-ection-title">产品维度</h3>
			<div className="dc-chart-wrapper">	
				<div className="dc-chart-item" style={{width: "65.6%"}}>
					<div className="dc-chart">
						<p className="dc-chart-title">{this.props.title[0]}
							{this.props.showUnit ? <span style={{fontSize: 14}}>（单位：万）</span> : ""}
						</p>
						<NodataEcharts config={proTrend}/>
					</div>
				</div>
				<div className="dc-chart-item" style={{width: "34.4%"}}>
					<div className="dc-chart">
						<p className="dc-chart-title">{this.props.title[1]}
							{this.props.showUnit ? <span style={{fontSize: 14}}>（单位：万）</span> : ""}
						</p>
						<NodataEcharts config={proRate}/>
					</div>
				</div> 
			</div>
			<h3 className="dcs-ection-title">地域维度</h3>
			<div className="dc-chart-wrapper">	
				<div className="dc-chart-item" style={{width: "38%"}}>
					<div className="dc-chart">
						<p className="dc-chart-title">{this.props.title[2]}
							{this.props.showUnit ? <span style={{fontSize: 14}}>（单位：万）</span> : ""}
						</p>
						<NodataEcharts config={areaTrend}/>
					</div>
				</div>
				<div className="dc-chart-item" style={{width: "27.6%"}}>
					<div className="dc-chart">
						<p className="dc-chart-title">{this.props.title[3]}</p>
						<NodataEcharts config={areaRate}/>
					</div>
				</div> 
				<div className="dc-chart-item" style={{width: "34.4%"}}>
					<div className="dc-chart">
						<p className="dc-chart-title">{this.props.title[4]}
							{this.props.showUnit ? <span style={{fontSize: 14}}>（单位：万）</span> : ""}
						</p>
						<NodataEcharts config={areaTop}/>
					</div>
				</div> 
			</div>
			<h3 className="dcs-ection-title">行业维度</h3>
			<div className="dc-chart-wrapper">
				<div className="dc-chart-item" style={{width: "65.6%",height: 360}}>
					<div className="dc-chart">
						<p className="dc-chart-title">{this.props.title[5]}
							{this.props.showUnit ? <span style={{fontSize: 14}}>（单位：万）</span> : ""}
						</p>
						<NodataEcharts config={industryTrend}/>
					</div>
				</div>
				<div className="dc-chart-item" style={{width: "34.4%",height: 360}}>
					<div className="dc-chart">
						<p className="dc-chart-title">{this.props.title[6]}
							{this.props.showUnit ? <span style={{fontSize: 14}}>（单位：万）</span> : ""}
						</p>
						<NodataEcharts config={industryTop}/>
					</div>
				</div> 
			</div>
		</div>
  }
}
