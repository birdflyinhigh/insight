import React, {Component} from 'react';
import NodataEcharts from '../../../common/charts/NodataECharts';
import EConfig from '../../../common/charts/EConfig';

export default class BaseBody extends Component{
  constructor(props){
		super(props);
		this.state = {
			showLevel2: false
		}
	}
	jumpSecondPage(link){
		if(link){
			this.props.fns.jumpSecondPage(link);
		}	
	}
	staffAgeChartFn(instance){
		let that = this;
		let handler = instance.on("click", (params) => {
			that.props.fns.jumpSecondPage("/staffagetable", params.data.id, params.name);
			instance.off(handler);
		});
		let legendHandler = instance.on("legendselectchanged",(params) => {
			that.props.fns.jumpSecondPage("/staffagetable", params.name, params.name);
			instance.off(legendHandler);
		 });
	}
	levelChartFn(instance){
		let that = this;
		let tempType = "";
		let handler = instance.on("click", (params) => {
			if(params.name == "indexline"){
				tempType = `Z${params.value}`;
			}else{
				tempType = params.name;
			}
			that.props.fns.jumpSecondPage("/leveltable", tempType, tempType);
			instance.off(handler);
		});
	}
	kindChartFn(instance){
		let that = this;
		let handler = instance.on("click", (params) => {
			that.setState({
				showLevel2: true
			});
			this.props.fns.kindChartFn(params.name);
			instance.off(handler);
		});
	}
	secKindChartFn(instance){
		let that = this;
		let handler = instance.on("click", (params) => {
			that.setState({
				showLevel2: false
			});
			that.props.fns.jumpSecondPage("/kindtable", params.name, params.name);
			instance.off(handler);
		})
	}
	leaveRateChartFn(instance){
		let that = this;
		let handler = instance.on("click", (params) => {
			that.props.fns.jumpSecondPage("/quiteratetable", params.data.specifedId, params.name);
			instance.off(handler);
		});
	}
	leaveRate90Z9ChartFn(instance){
		let that = this;
		let handler = instance.on("click", (params) => {
			that.props.fns.jumpSecondPage("/quite90z90table", params.data.specifedId, params.name);
			instance.off(handler);
		});
	}
	// leaveAgeChartFn(instance){
	// 	let that = this;
	// 	let handler = instance.on("click", (params) => {
	// 		that.props.fns.jumpSecondPage("/quiteagetable", params.data.id, params.name);
	// 		instance.off(handler);
	// 	});
	// 	let legendHandler = instance.on("legendselectchanged",(params) => {
	// 		that.props.fns.jumpSecondPage("/quiteagetable", params.name, params.name);
	// 		instance.off(legendHandler);
	// 	 });
	// }
	// leaveReasonChartFn(instance){
	// 	let that = this;
	// 	let handler = instance.on("click", (params) => {
	// 		that.props.fns.jumpSecondPage("/quitereasontable", params.data.specifedId, params.name);
	// 		instance.off(handler);
	// 	});
	// }
	backChart1(){
		this.setState({
			showLevel2: false
		})
	}

  render(){
		let pannelData = [{
			title: "实时人数",
			num: this.props.allPerson + "人"
		},{
			title: "核心紧急岗位招聘到岗率",
			showMark: true,
			link: "/keytable",
			num: (this.props.workRate == 0 ? "-" : this.props.workRate) + "%"
		},{
			title: "离职率",
			link: "/quitetable",
			num: this.props.leaveRate + "%"
		},{
			title: "平均年龄",
			num: this.props.avgAge + "岁"
		},{
			title: "男女比例",
			num: this.props.mF
		}];
		let monthPerson = {
			data: this.props.monthPerson,
			option: EConfig.radiusBarOption,
			config: {
				barColor: ["#2a7bff", "#36db98"],
				stackId: "person",
				showLabel: false,
				// interval: 0
			},
			height: 385,
		}
		let staffAge = {
			data: this.props.staffAge,
			option: EConfig.donutChart,
			config: {
				unit: "人",
				center: ["60%", "55%"]
			},
			height: 385
		}
		let level = {
			data: this.props.level,
			option: EConfig.stairsBarOption,
			config: {
				barColor: ["#2a7bff"],
				showIndexLine: true
			},
			height: 385
		}
		let kind = {
			data: this.props.kind,
			option: EConfig.hRadiusBarOption,
			config: {
				barColor: ["#2a7bff", "#01ce7e"]
			},
			height: 385
		}
		// 人员离职率
		let leaveRate90Z9 = {
			data: this.props.leaveRate90Z9,
			option: EConfig.gradientLineOption,
			config: {
				lineColor: ["#01ce7e", "#4875fa", "#f98c4b", "#f06968"],
				yFormatter: "%",
				showLegend: true
			},
			height: 385
		};
		// 人员构成 - 前后端
		// let personStru = {
		// 	data: this.props.leaveAge,
		// 	option: EConfig.donutChart,
		// 	config: {
		// 		unit: "人",
		// 		center: ["60%", "55%"]
		// 	},
		// 	height: 385
		// };
		
		let leaveRateChart = {
			data: this.props.leaveRateChart,
			option: EConfig.gradientLineOption,
			config: {
				lineColor: ["#01ce7e", "#4875fa"],
			},
			height: 385
		};
		//人均产能、人均成本 
		let perProCost = {
			data: this.props.leaveAge,
			option: EConfig.gradientLineOption,
			config: {
				lineColor: ["#01ce7e", "#4875fa"],
			},
			height: 385
		};
		// 人均成本对比
		let leaveReason = {
			data: this.props.leaveReason,
			option: EConfig.hRadiusBarOption,
			config: {
				barColor: ["#2a7bff", "#01ce7e"]
			},
			height: 385
		};
		
    return <div>
        <div className="hr-pannel">
					{pannelData.map((item, index) => {
						return <div className="hrpan-item-wrapper" key={index} onClick={this.jumpSecondPage.bind(this, item.link)}>
											<div className={`hrpan-item itembg-${index + 1}${item.link ? " clickable" : ""}`}>
												<div className="hrpan-num">{item.num}
													{item.showMark ? <a className={`help help${index}`}>
														<ul className="intro">
															<li>核心紧急岗位：以部门需求为主</li>
														</ul>
													</a> : ""}
												</div>
												<div className="hrpan-intro">{item.title}</div>
											</div>
									</div>
					})}
				</div>
				<div className="hrchart-container">
					<div className="hr-section">
						<div className="hrsec-container" style={{width: "30.78%"}}>
							<p className="hrchart-title">月度人数</p>
							<NodataEcharts config={monthPerson}/>
						</div>
						<div className="hrsec-container" style={{width: "22.75%"}}>
							<p className="hrchart-title">在职人员司龄</p>
							<NodataEcharts config={staffAge} onChartReadyCallback={this.staffAgeChartFn.bind(this)}/>
						</div>
						<div className="hrsec-container" style={{width: "22.75%"}}>
							<p className="hrchart-title">人员构成-职级</p>
							<NodataEcharts config={level} onChartReadyCallback={this.levelChartFn.bind(this)}/>
							<p className="hrchart-level-label" style={{top: 310}}>{this.props.level.markLabel[0]}%</p>
							<p className="hrchart-level-label" style={{top: 225}}>{this.props.level.markLabel[1]}%</p>
							<p className="hrchart-level-label" style={{top: 110}}>{this.props.level.markLabel[2]}%</p>
						</div>
						<div className="hrsec-container" style={{width: "20.53%"}}>
							<p className="hrchart-title">人员构成-序列</p>
							{this.state.showLevel2 ? <div>
									<span onClick={this.backChart1.bind(this)} className="back-text">返回</span>
									<NodataEcharts config={{...kind, data: this.props.secKind}} onChartReadyCallback={this.secKindChartFn.bind(this)}/> 
								</div>: 
								<NodataEcharts config={kind} onChartReadyCallback={this.kindChartFn.bind(this)}/>
							}
						</div>
					</div>
					<div className="hr-section">
					<div className="hrsec-container" style={{width: "30.78%"}}>
							<div className="hrchart-title">人员流失率</div>
							{/* <NodataEcharts config={leaveRate90Z9} onChartReadyCallback={this.leaveRate90Z9ChartFn.bind(this)}/> */}
							<NodataEcharts config={leaveRate90Z9} onChartReadyCallback={this.leaveRate90Z9ChartFn.bind(this)} />
						</div>		
						<div className="hrsec-container" style={{width: "22.75%"}}>
							<div className="hrchart-title">人员离职率</div>
							{/* <NodataEcharts config={personStru} onChartReadyCallback={this.leaveAgeChartFn.bind(this)}/> */}
							<NodataEcharts config={leaveRateChart} onChartReadyCallback={this.leaveRateChartFn.bind(this)}/>
						</div>
						
						<div className="hrsec-container" style={{width: "22.75%"}}>
							<div className="hrchart-title">人均产能、人均成本</div>
							{/* <NodataEcharts config={leaveRateChart} onChartReadyCallback={this.leaveRateChartFn.bind(this)}/> */}
							<NodataEcharts config={perProCost} />
						</div>
						<div className="hrsec-container" style={{width: "20.53%"}}>
							<p className="hrchart-title">人均成本对比</p>
							{/* <NodataEcharts config={leaveReason} onChartReadyCallback={this.leaveReasonChartFn.bind(this)}/> */}
							{/* <NodataEcharts config={leaveReason} /> */}
							<div style={{textAlign: "center"}}>
								<p style={{paddingTop: 130}}>ERP管报数据暂未分配到组织</p>
								<p>人均产能、成本暂无数据</p>
							</div>
						</div>
					</div>
				</div>
      </div>
  }
}