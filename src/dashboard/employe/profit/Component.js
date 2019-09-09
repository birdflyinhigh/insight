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
			data: this.props.data.proTrend,
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
		// let proKind = {
		// 	data: data2,
		// 	option: EConfig.donutChart,
		// 	config: {
		// 		color: ["#949afa", "#eb898a"],
		// 		// unit: "人",
		// 		showLegend: true,
    //     normalLegend: true,
		// 		center: ["60%", "50%"]
		// 	},
		// 	height: 385
    // }
    let proRate = {
			data: this.props.data.proRate,
			option: EConfig.donutChart,
			config: {
				color: ["#949afa", "#eb898a"],
				// unit: "人",
				showLegend: true,
        normalLegend: true,
				center: ["60%", "50%"]
			},
			height: 385
    };
    let areaTrend = {
			data: this.props.data.areaTrend,
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
			data: this.props.data.areaRate,
			option: EConfig.topHBarChart,
			config: {
				color: ["#5888f4", "#949afa"],
        showLegend: true,
        normalLegend: true,
        noRadius: true,
			},
			height: 330
    };
		let areaTop = {
			data: this.props.data.areaTop,
			option: EConfig.topHBarChart,
			config: {
				color: ["#5888f4", "#949afa"],
        showLegend: true,
        normalLegend: true,
        noRadius: true,
			},
			height: 330
		};
		let industryTrend = {
			data: this.props.data.industryTrend,
			option: EConfig.areaLineChart,
			config: {
				color: RainbowColor,
        showLegend: true,
        normalLegend: true,
        noRadius: true,
        smooth: true,
        stackId: "industryTrend",
				hideYformatter: true,
				gridBottom: 120
			},
			height: 330
		};
		let industryTop = {
			data: this.props.data.industryTop,
			option: EConfig.topHBarChart,
			config: {
				color: ["#5888f4", "#949afa"],
        showLegend: true,
        normalLegend: true,
        noRadius: true,
			},
			height: 330
		}
    return <div className="dash-charts-wrapper">
    <h3 className="dcs-ection-title">产品维度</h3>
			<div className="dc-chart-wrapper">	
				<div className="dc-chart-item" style={{width: "65.6%"}}>
					<div className="dc-chart">
						<p className="dc-chart-title">各产品订单毛利变化趋势
							<span style={{fontSize: 14}}>（单位：万）</span>
						</p>
						<NodataEcharts config={proTrend}/>
					</div>
				</div>
				{/* <div className="dc-chart-item" style={{width: "27.6%"}}>
					<div className="dc-chart">
						<p className="dc-chart-title">订单毛利类型构成</p>
						<NodataEcharts config={proKind}/>
					</div>
				</div>  */}
				<div className="dc-chart-item" style={{width: "34.4%"}}>
					<div className="dc-chart">
						<p className="dc-chart-title">订单毛利占比</p>
						<NodataEcharts config={proRate}/>
					</div>
				</div> 
			</div>
			<h3 className="dcs-ection-title">地域维度</h3>
			<div className="dc-chart-wrapper">	
				<div className="dc-chart-item" style={{width: "38%"}}>
					<div className="dc-chart">
						<p className="dc-chart-title">各地区订单毛利变化趋势
							<span style={{fontSize: 14}}>（单位：万）</span>
						</p>
						<NodataEcharts config={areaTrend}/>
					</div>
				</div>
				<div className="dc-chart-item" style={{width: "27.6%"}}>
					<div className="dc-chart">
						<p className="dc-chart-title">各地区订单毛利
							<span style={{fontSize: 14}}>（单位：万）</span>
						</p>
						<NodataEcharts config={areaRate}/>
					</div>
				</div> 
				<div className="dc-chart-item" style={{width: "34.4%"}}>
					<div className="dc-chart">
						<p className="dc-chart-title">全国各省订单毛利数排名-TOP10
							<span style={{fontSize: 14}}>（单位：万）</span>
						</p>
						<NodataEcharts config={areaTop}/>
					</div>
				</div> 
			</div>
			<h3 className="dcs-ection-title">行业维度</h3>
			<div className="dc-chart-wrapper">
				<div className="dc-chart-item" style={{width: "64%", height: 360}}>
					<div className="dc-chart">
						<p className="dc-chart-title">各行业订单毛利变化趋势
							<span style={{fontSize: 14}}>（单位：万）</span>
						</p>
						<NodataEcharts config={industryTrend}/>
					</div>
				</div>
				<div className="dc-chart-item" style={{width: "36%", height: 360}}>
					<div className="dc-chart">
						<p className="dc-chart-title">各行业订单毛利-TOP10
							<span style={{fontSize: 14}}>（单位：万）</span>
						</p>
						<NodataEcharts config={industryTop}/>
					</div>
				</div> 
			</div>
		</div>
  }
}
