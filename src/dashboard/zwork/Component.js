import React, {Component} from 'react';
import NodataEcharts from '../../common/charts/NodataECharts';
import EConfig from '../../common/charts/EConfig';
import {ChartTitle} from './constant';

export default class ZworkBody extends Component{
  constructor(props){
    super(props);
  }
  render(){
		let panelData = [{
			title: "社区数",
			num: this.props.data.panelData.communityCount || 0,
			subTitle1: "已运营",
			subNum1: this.props.data.panelData.communityTypeCount ? this.props.data.panelData.communityTypeCount[0].communityCount : 0,
			subTitle2: "未运营",
			subNum2: this.props.data.panelData.communityTypeCount ? this.props.data.panelData.communityTypeCount[1].communityCount : 0,
		},{
			title: "城市数",
			num: this.props.data.panelData.cityCount || 0
		},{
			title: "运营面积(万㎡)",
			num: this.props.data.panelData.operateArea || 0
		},{
			title: "入驻企业数",
			num: this.props.data.panelData.enterCompanyCount || 0
		},{
			title: "入驻人数",
			num: this.props.data.panelData.enterUserCount || 0
		},{
			title: "当年累计收入(万)",
			num: this.props.data.panelData.totalRevenue || 0
		},{
			title: "总工位数",
			num: this.props.data.panelData.stationCount || 0
		},]
		let communityArea = {
			data: this.props.data.communityArea,
			option: EConfig.donutChart,
			config: {
				color: ["#78a7ff", "#2b7bff", "#f98c4a", "#f06868", "#16c17a", "#9999ff", "#ffca28"],
				showSelfNum: true,
				legendLeft: 20,
				center: ["60%", "55%"]
			},
			height: 385
		};
		let proConst = {
			data: this.props.data.proCons,
			option: EConfig.donutChart,
			config: {
				legendLeft: 20,
				center: ["60%", "55%"]
			},
			height: 385
		};
		let incomeTrend = {
			data: this.props.data.incomeTrend,
			option: EConfig.lineBarChart,
			config: {
				color: ["#98a1fb","#5888f4", "#84e1bf"],
        startAntherIndex: 2,
        lineIndex: 2,
        normalLegend: true,
        noRadius: true,
        smooth: true,
        yFormatter: "万",
        y1Formatter: "%",
        hideY1AxisFormat: true,
				hideY2AxisFormat: true,
				gridLeft: 60
			},
			height: 385,
		};
		let incomeCons = {
			data: this.props.data.incomeCons,
			option: EConfig.donutChart,
			config: {
				showSelfBoth: true,
				legendLeft: 20,
				center: ["60%", "55%"]
			},
			height: 385
		};
		let incomeArea = {
			data: this.props.data.incomeArea,
			option: EConfig.topHBarChart,
			config: {
				color: ["#5888f4", "#949afa"],
        showLegend: true,
        normalLegend: true,
				noRadius: true,
				gridLeft: 25
			},
			height: 385
		};

    return <div>
				<div className="hr-pannel">
					{panelData.map((item, index, arr) => {
						return <div className="hrpan-item-wrapper" key={index}
						style={{width: `${(93/arr.length).toFixed(2)}%`}}>
											<div className={`hrpan-item itembg-${(index % 5) + 1}${item.link ? " clickable" : ""}`}>
												<div className="hrpan-num">{item.num}
												</div>
												<div className="hrpan-intro">{item.title}</div>
												<div className="zp-subpart">
													<div className="zp-subtitle">
														{item.subTitle1}
														<span className="zp-subnum">{item.subNum1}</span>
													</div>
													<div className="zp-subtitle">
														{item.subTitle2}
														<span className="zp-subnum">{item.subNum2}</span>
													</div>
												</div>
											</div>
									</div>
					})}
				</div>
				<div className="hrchart-container">
					<div className="hr-section">
						<div className="hrsec-container" style={{width: "38.4%"}}>
							<p className="hrchart-title">{ChartTitle.communityArea}</p>
							<NodataEcharts config={communityArea}/>
						</div>
						<div className="hrsec-container" style={{width: "30%"}}>
							<p className="hrchart-title">{ChartTitle.proConst}</p>
							<NodataEcharts config={proConst}/>
						</div>
            <div className="hrsec-container" style={{width: "30%"}}>
							<p className="hrchart-title">{ChartTitle.stationRent}</p>
							<StationRent data={this.props.data.stationRent}/>
						</div>
					</div>
					<div className="hr-section">
					<div className="hrsec-container" style={{width: "38.4%"}}>
							<div className="hrchart-title">{ChartTitle.incomeTrend}</div>
							<NodataEcharts config={incomeTrend} />
						</div>		
						<div className="hrsec-container" style={{width: "30%"}}>
							<div className="hrchart-title">{ChartTitle.incomeCons}</div>
							<NodataEcharts config={incomeCons} />
						</div>
            <div className="hrsec-container" style={{width: "30%"}}>
							<div className="hrchart-title">{ChartTitle.incomeArea}</div>
							<NodataEcharts config={incomeArea} />
						</div>
					</div>
				</div>
      </div>
  }
}
function StationRent({data}){
	return <div>
		{data.length > 0 ? <div className="zrent">
			<div className="zrent-title">
				<div className="zrent-title-wrapper">
					<b>工位数</b>
				</div>
				<div className="zrent-title-wrapper">
					<b>出租率</b>
				</div>
			</div>
			<ul>
				{data.map((item, index) => 
					<li key={index}>
						<div className="zrent-kind">
							<span>{item.name}</span>
						</div>
						<div className="zrent-num">
							<span>{item.value}</span>
						</div>
						<div className="zrent-rate">
							<span>{item.rate}</span>
						</div>
					</li>
				)}
			</ul>
		</div> : <div style={{textAlign: "center", lineHeight: "349px"}}>暂无数据</div>}
</div>
}