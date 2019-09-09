import React, {Component} from 'react';
import NodataEcharts from '../../common/charts/NodataECharts';
import EConfig from '../../common/charts/EConfig';
import {CommonMethod} from '../../common/tools/common';
export default class ManageBody extends Component{
  constructor(props){
    super(props);
  }
  render(){
    // let data = {
		// 	"data":[[202,279,419,432,739,776,1157]],
		// 	"xLabels":["市场序列","综合序列","运营序列","职能序列","研发序列","服务序列","销售序列"],
		// 	"name":[],
		// 	"markPoint": [{
		// 		  name: "警告",
    //   		xAxis: 320
		// 	}],
		// 	loading: true
		// }
		// let data2 = {
		// 	"data":[[820, 932, 901, 934, 1290, 1330, 1320],
		// 	[720, 832, 901, 1000, 1290, 1500, 1520]
		// ],
		// 	"xLabels":['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		// 	"name":["人力成本", "收入", "预警"],
		// 	"warnData": [
		// 		['Mon', 820],
		// 		['Sat', 1320]
		// 	],
		// 	"warnInfo": [
		// 		[6421, 6423],
		// 		[412, 231]
		// 	],
		// 	loading: true
		// }
		let costIncrease = {
			data: this.props.data.costIncrease,
			option: EConfig.waringLineChart,
			config: {
				color: ["#2a7bff", "#01ce7e"]
			},
			height: 385,
		};
		let costStructure = {
			data: this.props.data.costStructure,
			// data: data2,
			option: EConfig.multiStackBar,
			config: {
				color: ["#2b7bff", "#f98c4a", "#f35555", "#0ace7f", "#d96df4",  "#94bdff", "#6aa3ff"],
				// 这两个同时存在
				stackId1: "second",
				stackIdIndex: 5,
				rateKey: "rate"		
			},
			height: 385,
		};
		let budgetRate = {
			data: this.props.data.budgetRate,
			option: EConfig.waringLineChart,
			config: {
				yFormatter: "%",
				color: ["#2a7bff", "#01ce7e"]
			},
			height: 385,
		};
		let avgProductivity = {
			data: this.props.data.avgProductivity,
			option: EConfig.waringLineChart,
			config: {
				color: ["#2a7bff", "#01ce7e"],
				barIndex: 1,
				startAntherIndex: 1
			},
			height: 385,
		};
    return <div>      		
				<div className="hr-pannel">
						{this.props.data.pannelData.map((item, index) => {
							return <div className="hrpan-item-wrapper" key={index}>
												<div className={`hrpan-item itembg-${index + 1}`}>
													<div className="hrpan-num">{item.num}
													</div>
													<div className="hrpan-intro">{item.title}</div>
												</div>
										</div>
						})}
					</div>
					<div className="hrchart-container self-clearfix">
					<div className="oleft-container">
						<div className="hr-section">
								<div className="hrsec-container" style={{width: "48.5%"}}>
									<p className="hrchart-title">人力成本增长率</p>
									<NodataEcharts config={costIncrease}/>
							</div>
							<div className="hrsec-container" style={{width: "50%"}}>
									<p className="hrchart-title">人力成本结构（万元）</p>
									<NodataEcharts config={costStructure}/>
							</div>
						</div>
						<div className="hr-section">
							<div className="hrsec-container" style={{width: "48.5%"}}>
								<p className="hrchart-title">预算执行率</p>
								<NodataEcharts config={budgetRate}/>
							</div>
							<div className="hrsec-container" style={{width: "50%"}}>
								<p className="hrchart-title">人均产值（万元）</p>
								<NodataEcharts config={avgProductivity}/>
							</div>
					  </div>
					</div>
					<div className="oright-container">
						<div className="orank-wrapper">
							<p className="hrchart-title">一级经营单元排名</p>
							<ul className="orank-body">
								<li style={{fontWeight: "bold"}}>
									<span className="orank-col1">经营单元名称</span>
									<span className="orank-col2">人均产值(万元)</span>
									<span className="orank-col3">人力投产比</span>
								</li>
								{this.props.data.rank.length > 0 ? this.props.data.rank.map((item, index) => 
									<li key={index}>
										<span className="orank-col1">{item.name}</span>
										<span className="orank-col2">{item.perCapacity}</span>
										<span className="orank-col3">{item.incomePercent}</span>
									</li>
								) : <li style={{textAlign: "center"}}>暂无数据</li>}
							</ul>
						</div>
					</div>
				</div>
    </div>
  }
}