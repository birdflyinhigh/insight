import React, {Component} from 'react';
import NodataEcharts from '../../../common/charts/NodataECharts';
import EConfig from '../../../common/charts/EConfig';
import {RainbowColor} from '../../common/constant';
export default class ChartsPart extends Component{
  constructor(props){
    super(props);
  }
  render(){
    let flowData = [{
      title: "核心客户消费留存率",
      rate: this.props.data.flowData.coreAllRate
    },{
      title: "雇主消费留存率",
      rate: this.props.data.flowData.employerRate
    },{
      title: "服务商消费留存率",
      rate: this.props.data.flowData.businessRate
    },{
      title: "核心雇主消费留存率",
      rate: this.props.data.flowData.coreemployerRate
    },{
      title: "核心服务商消费留存率",
      rate: this.props.data.flowData.corebusinessRate
    }]
    return <div className="dash-charts-wrapper">
    	<div className="dc-chart-wrapper">	
				<div className="dc-chart-item" style={{width: "100%"}}>
					<div className="dc-chart">
						<p className="dc-chart-title">客户消费留存率变化趋势</p>
            {this.props.data.flowData.hasLoaded ? <CusRateFlow flowData={flowData} allRate={this.props.data.flowData.allRate}/>: 
            <div style={{lineHeight: "290px", textAlign: "center"}}>正在加载</div>}
					</div>
				</div>
      </div>
    </div>
  }
}
const CusRateFlow = (props) => {
  return <div className="dash-rateflow">
  <div className="dash-rftop self-clearfix">
    <span className="dash-rftop-title">客户消费留存率</span>
    <span className="dash-rftop-num">{props.allRate || 0}%</span>
    <span className="dash-rftop-vline"></span>
  </div>
  <div className="dash-rfbody">
    <div className="dash-rfbody-hline"></div>
    <div className="dash-rfbody-wrapper self-clearfix">
    {props.flowData.map((item, index) => 
      <div className="dash-rfbody-item self-clearfix" key={index}>
        <span className="dash-rftop-vline"></span>
        <span className="dash-rfbody-title">{item.title}</span>
        <span>{item.rate || 0}%</span>
      </div>
      )}
    </div>
  </div>
</div>
}
