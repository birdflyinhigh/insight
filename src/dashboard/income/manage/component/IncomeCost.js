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
			data: this.props.trend,
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
        hideY2AxisFormat: true
			},
			height: 385,
		}
		let construct= {
			data: this.props.construct,
			option: EConfig.donutChart,
			config: {
				color: RainbowColor,
				showLegend: true,
        normalLegend: true,
				center: ["60%", "55%"],
				legendLeft: 22,
			},
			height: 385
		}
		let subjectCons = {
			data: this.props.subjectCons,
			option: EConfig.topHBarChart,
			config: {
				topColor: ["#5888f4"],
				normalColor: ["#98a1fb"],
				topNum: 20,
        showLegend: true,
        normalLegend: true,
				noRadius: true,
			},
			height: 385
		};
		let subjectTrend = {
			data: this.props.subjectTrend,
			option: EConfig.areaLineChart,
			config: {
				color: RainbowColor,
        showLegend: true,
        normalLegend: true,
        noRadius: true,
        smooth: true,
				stackId: "industryTrend",
				gridBottom: 120,
        hideYformatter: true
			},
			height: 385
		};
		
    return <div>
				<div className="hrchart-container">
					<div className="hr-section">
						<div className="hrsec-container" style={{width: "59%"}}>
							<p className="hrchart-title">{this.props.trendTitle}</p>
							<NodataEcharts config={trend}/>
						</div>
						<div className="hrsec-container" style={{width: "40%"}}>
							<p className="hrchart-title">{this.props.consTitle}</p>
							<NodataEcharts config={construct}/>
						</div>
					</div>
					<div className="hr-section">
					<div className="hrsec-container" style={{width: "40%"}}>
							<div className="hrchart-title">{this.props.sconsTitle}</div>
							<NodataEcharts config={subjectCons} />
						</div>		
						<div className="hrsec-container" style={{width: "59%"}}>
							<div className="hrchart-title">{this.props.strendTitle}</div>
							<NodataEcharts config={subjectTrend} />
						</div>
					</div>
				</div>
      </div>
  }
}