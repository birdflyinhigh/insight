import React, {Component} from 'react';
import NodataEcharts from '../../common/charts/NodataECharts';
import EConfig from '../../common/charts/EConfig';
import { link } from 'fs';
export default class ManageBody extends Component{
  constructor(props){
    super(props);
	}
	perTimeChartFn(instance){
		let that = this;
		let handler = instance.on("click", (params) => {
			this.props.fns.jumpSecondPage("perworktime", params.data.specifedId, params.name);
			instance.off(handler);
		});
	}
	performanceChartFn(instance){
		let that = this;
		let handler = instance.on("click", (params) => {
			this.props.fns.jumpSecondPage("performance", params.name.match(/,(\d+)/)[1], params.name);
			instance.off(handler);
		});
	}
  render(){
		let costIncrease = {
			data: this.props.data.costIncrease,
			option: EConfig.waringLineChart,
			config: {
				color: ["#2a7bff", "#01ce7e"],
				startAntherIndex: 1
			},
			height: 385,
		};
		let bugetRate = {
			data: this.props.data.bugetRate,
			option: EConfig.waringLineChart,
			config: {
				yFormatter: "%",
				color: ["#2a7bff", "#01ce7e"]
			},
			height: 385,
		};
		let avgProduct = {
			data: this.props.data.avgProduct,
			option: EConfig.waringLineChart,
			config: {
				color: ["#2a7bff", "#01ce7e"],
				barIndex: 1,
				startAntherIndex: 1
			},
			height: 385,
		};	
		let perCost = {
			data: this.props.data.perCost,
			option: EConfig.hRadiusBarOption,
			config: {
				barColor: ["#2a7bff", "#01ce7e"],
			},
			height: 385,
		};
		let perWorktime = {
			data: this.props.data.perWorktime,
			option: EConfig.hRadiusBarOption,
			config: {
				barColor: ["#2a7bff", "#01ce7e"],
			},
			height: 385,
		};
		let structure = {
			data: this.props.data.structure,
			option: EConfig.stairsBarOption,
			config: {
				barColor: ["#2a7bff"],
				formatter: "%"
			},
			height: 385
		}
    return <div>
      <div className="hr-section">
							<div className="hrsec-container" style={{width: "32.4%"}}>
								<p className="hrchart-title">人力成本增长率</p>
								<NodataEcharts config={costIncrease}/>
						</div>
						<div className="hrsec-container" style={{width: "32.4%"}}>
							<p className="hrchart-title">预算执行率</p>
							<NodataEcharts config={bugetRate}/>
						</div>
						<div className="hrsec-container" style={{width: "32.4%"}}>
							<p className="hrchart-title">人均产值（万元）</p>
							<NodataEcharts config={avgProduct}/>
						</div>
					</div>
					<div className="hr-section">
						<div className="hrsec-container" style={{width: "32.4%"}}>
							<p className="hrchart-title">人均人力成本（万元）</p>
						<NodataEcharts config={perCost}/>
						</div>
						<div className="hrsec-container" style={{width: "32.4%"}}>
							<p className="hrchart-title">人均工作时长（小时）</p>
							<NodataEcharts config={perWorktime} onChartReadyCallback={this.perTimeChartFn.bind(this)}/>
						</div>
						<div className="hrsec-container" style={{width: "32.4%"}}>
							<p className="hrchart-title">人员绩效分布</p>
							<NodataEcharts config={structure} onChartReadyCallback={this.performanceChartFn.bind(this)}/>
						</div>
					</div>
    </div>
  }
}