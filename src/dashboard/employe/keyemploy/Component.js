import React, {Component} from 'react';
import NodataEcharts from '../../../common/charts/NodataECharts';
import EConfig from '../../../common/charts/EConfig';
import {RainbowColor} from '../../common/constant';
export default class ChartsPart extends Component{
  constructor(props){
    super(props);
  }
  render(){
    let keyemployTrend = {
			data: this.props.data.trend,
			option: EConfig.areaLineChart,
			config: {
				color: RainbowColor,
        showLegend: true,
        normalLegend: true,
        noRadius: true,
        smooth: true,
        gridLeft: 60,
        gridRight: 50,
        stackId: "areaServiceTrend",
        hideYformatter: true
			},
			height: 330
		};
    return <div className="dash-charts-wrapper">
    	<div className="dc-chart-wrapper">	
				<div className="dc-chart-item" style={{width: "100%"}}>
					<div className="dc-chart">
						<p className="dc-chart-title">全年累计核心雇主数增长趋势</p>
						{this.props.data.trend.hasLoaded ? <NodataEcharts config={keyemployTrend}/> : 
            <div style={{lineHeight: "290px", fontSize: 14, textAlign: "center"}}>正在加载</div>}
					</div>
				</div>
      </div>
    </div>
  }
}
