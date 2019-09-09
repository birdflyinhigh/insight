import React, {Component} from 'react';
import NodataEcharts from '../../common/charts/NodataECharts';
import LoadingEcharts from '../../common/charts/LoadingEcharts';
import EConfig from '../../common/charts/EConfig';
import {RainbowColor} from '../common/constant';

export default class BaseBody extends Component{
  constructor(props){
		super(props);
	}

  render(){
		let areaServiceTrend = {
			data: this.props.data.areaServiceTrend,
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
		let areaServiceRate = {
			data: this.props.data.areaServiceRate,
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
		let areaServiceTop = {
			data: this.props.data.areaServiceTop,
			option: EConfig.topHBarChart,
			config: {
				topColor: ["#c0c5fa"],
				normalColor: ["#eb8989"],
				topNum: 20,
        showLegend: true,
        normalLegend: true,
        noRadius: true,
			},
			height: 330
		};
		let industryServiceTrend = {
			data: this.props.data.industryServiceTrend,
			option: EConfig.areaLineChart,
			config: {
				color: RainbowColor,
        showLegend: true,
        normalLegend: true,
        noRadius: true,
        smooth: true,
        stackId: "areaServiceTrend",
				hideYformatter: true,
				gridBottom: 120
			},
			height: 330
		};
		let industryerviceTop = {
			data: this.props.data.industryerviceTop,
			option: EConfig.donutChart,
			config: {
				color: RainbowColor,
				// unit: "人",
				showLegend: true,
        normalLegend: true,
				center: ["60%", "50%"]
			},
			height: 330
		}
		return <div className="dash-charts-wrapper">
			<h3 className="dcs-ection-title">地域维度</h3>
			<div className="dc-chart-wrapper">	
				<div className="dc-chart-item" style={{width: "38%"}}>
					<div className="dc-chart">
						<p className="dc-chart-title">各地区{this.props.title}变化趋势
							{this.props.showUnit ? <span style={{fontSize: 14}}>（单位：万）</span> : ""}
						</p>
						{/* {this.props.data.areaServiceTrend.hasLoaded ? <NodataEcharts config={areaServiceTrend}/> : 
					<div style={{lineHeight: "290px", fontSize: 14, textAlign: "center"}}>正在加载</div>} */}
						<LoadingEcharts config={areaServiceTrend}/>
					</div>
				</div>
				<div className="dc-chart-item" style={{width: "27.6%"}}>
					<div className="dc-chart">
						<p className="dc-chart-title">各地区{this.props.title}占比</p>
						<NodataEcharts config={areaServiceRate}/>
					</div>
				</div> 
				<div className="dc-chart-item" style={{width: "34.4%"}}>
					<div className="dc-chart">
						<p className="dc-chart-title">全国各省{this.props.title}排名-TOP10
							{this.props.showUnit ? <span style={{fontSize: 14}}>（单位：万）</span> : ""}
						</p>
						<NodataEcharts config={areaServiceTop}/>
					</div>
				</div> 
			</div>
			<h3 className="dcs-ection-title">行业维度</h3>
			<div className="dc-chart-wrapper">
				<div className="dc-chart-item" style={{width: "64%"}}>
					<div className="dc-chart">
						<p className="dc-chart-title">各行业{this.props.title}变化趋势
							{this.props.showUnit ? <span style={{fontSize: 14}}>（单位：万）</span> : ""}
						</p>
						<LoadingEcharts config={industryServiceTrend}/>
						{/* {this.props.industryServiceTrend.hasLoaded ? <NodataEcharts config={industryServiceTrend}/> : <div>
							<div style={{lineHeight: "290px", fontSize: 14, textAlign: "center"}}>正在加载</div>
						</div>} */}
					</div>
				</div>
				<div className="dc-chart-item" style={{width: "36%"}}>
					<div className="dc-chart">
						<p className="dc-chart-title">各行业{this.props.title}占比-TOP10
							{this.props.showUnit ? <span style={{fontSize: 14}}>（单位：万）</span> : ""}
						</p>
						<NodataEcharts config={industryerviceTop}/>
					</div>
				</div> 
			</div>
		</div>
	}
		
}