import React, {Component} from 'react';
import NodataEcharts from '../../../../common/charts/NodataECharts';
import EConfig from '../../../../common/charts/EConfig';
import {RainbowColor} from '../../../common/constant';

export default class BaseBody extends Component{
  constructor(props){
		super(props);
	}
  render(){
		let trend = {
			data: this.props.profitTrend,
			option: EConfig.lineBarChart,
			config: {
				color: ["#98a1fb","#5888f4", "#84e1bf"],
        startAntherIndex: 2,
        lineIndex: 2,
        normalLegend: true,
        noRadius: true,
        smooth: true,
        // yFormatter: "万",
        y1Formatter: "%",
        hideY1AxisFormat: true,
				hideY2AxisFormat: true,
				gridLeft: 60
			},
			height: 385,
		}
		let construct= {
			data: this.props.profitConstruct,
			option: EConfig.topHBarChart,
			config: {
				color: ["#5888f4", "#949afa"],
        showLegend: true,
        normalLegend: true,
        noRadius: true,
			},
			height: 385
		}
		let ratio = {
			data: this.props.profitRatio,
			option: EConfig.areaLineChart,
			config: {
				color: RainbowColor,
        showLegend: true,
        normalLegend: true,
        noRadius: true,
        smooth: true,
        // stackId: "industryTrend",
        hideYformatter: true
			},
			height: 385
		};
		
    return <div>
				<div className="hrchart-container">
					<div className="hr-section">
						<div className="hrsec-container" style={{width: "32%"}}>
							<p className="hrchart-title">{this.props.trendTitle}</p>
							<NodataEcharts config={trend}/>
						</div>
						<div className="hrsec-container" style={{width: "33%"}}>
							<p className="hrchart-title">{this.props.consTitle}</p>
							<NodataEcharts config={construct}/>
						</div>
						<div className="hrsec-container" style={{width: "33%"}}>
							<p className="hrchart-title">{this.props.ratioTitle}</p>
							<NodataEcharts config={ratio}/>
						</div>
					</div>
				</div>
      </div>
  }
}