import React, {Component} from 'react';
import Header from '../../dashboard/income/hr/header';
import EConfig from '../../common/charts/EConfig';
import Help from '../../common/component/Help';
import NodataEcharts from '../../common/charts/NodataECharts';

export default class OrderMain extends Component{
  constructor(props){
    super(props);
    console.log(props);
  }
  render(){
    let staffTrend = {
      data: this.props.staffTrend,
      option: EConfig.radiusBarOption,
      config: {
        barColor: ["#fa939f", "#939afa"],
        showLegend: true,
        stackId: "staff",
        gridLeft: 50,
        gridRight: '10%',
        gridTop: 60,
        bottom: 60,
        barMaxWidth: 10,
        containLabel: false
      },
      height: 426
    };
    	//人均产能、人均成本 
    let perProductCost = {
			data: this.props.perProductCost,
			option: EConfig.gradientLineOption,
			config: {
        lineColor: ["#01ce7e", "#4875fa"],
        showLegend: true
			},
			height: 300
    };
    console.log(this.props.leaveRate);
    let leaveRate = {
			data: this.props.leaveRate,
			option: EConfig.gradientLineOption,
			config: {
				lineColor: ["#01ce7e", "#4875fa", "#f98c4b", "#f06968"],
				yFormatter: "%",
				showLegend: true
			},
			height: 300
    };
    let hdata = {
			org1: this.props.org1,
			org2: this.props.org2,
			org3: this.props.org3,
			org4: this.props.org4,
			org1Id: this.props.org1Id,
			org2Id: this.props.org2Id,
			org3Id: this.props.org3Id,
			org4Id: this.props.org4Id,
			monthId: this.props.monthId,
			yearId: this.props.yearId
    }

    return <div className="dash-container">
    <h3 className="ceotitle-box">人力分析
      <span 
      className="ceotitle-link"
      onClick={this.props.jumpSecondPage}
      >更多人力分析>></span>
    </h3>
    <div className="ceocontent-body">
      <Header fns={this.props.fns} data={hdata}/>
      <div className="charts-content">
        <div className="dc-chart-wrapper">
          <div className="dc-chart-item" style={{width: "50%", height: 420}}>
            <div className="dc-chart">
              <p className="hrchart-title">人数与构成</p>
              <PersonList 
              staffAge={this.props.staffAge}
              staffLevel={this.props.staffLevel}
              allStaff={this.props.allStaff}
              staffKind={this.props.staffKind}
              />
            </div>
          </div>
          <div className="dc-chart-item" style={{width: "50%", height: 420}}>
            <div className="dc-chart">
              <p className="hrchart-title">人数趋势</p>
              <NodataEcharts config={staffTrend}/>
            </div>
          </div>
        </div>
        <div className="dc-chart-wrapper">
          <div className="dc-chart-item" style={{width: "50%"}}>
            <div className="dc-chart">
              <div className="hrchart-title">人均产能、人均成本
                <span style={{fontSize: 12, 
                  fontWeight: "normal",
                  color: "#888",
                  paddingLeft: 10
                  }}>(ERP管报收入数据暂未分到组织)</span>
              </div>
              <NodataEcharts config={perProductCost}/>
            </div>
          </div>
          <div className="dc-chart-item" style={{width: "50%"}}>
            <div className="dc-chart">
              <p className="hrchart-title">离职率</p>
              <NodataEcharts config={leaveRate}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  }
}
const PersonList = ({allStaff, staffAge, staffLevel, staffKind}) => {
  return <div className="dash-map-common-box">
  <div className="dicr-body">
    <div className="dirc-title">
      <span className="dicr-total-title">实时人数</span>
      <div className="dicr-total-num">
        <span>{allStaff}</span>
      </div>
    </div>
    <div className="dicr-lines"></div>
    <div className="dicr-groups">
      <div className="dicr-groups-item">
        <b className="dicr-sec-title">司龄</b>
        <ul>
          {staffAge.map((item, index) => 
            <li key={index}>
              <div className="dir-secli-wrapper self-clearfix">
                <span className="dicr-sec-name">{item.name}</span>
                <b className="dicr-sec-num">{item.value}</b>
              </div>
              
            </li>
            )}
        </ul>
      </div>
      <div className="dicr-groups-item" style={{width: "41%", visibility: "hidden"}}>
        <b className="dicr-sec-title" style={{paddingLeft: "10%"}}>职级</b>
        <ul>
          {/* {staffLevel.map((item, index) => 
            <li key={index}>
              <div className="dir-secli-wrapper self-clearfix">
                <span className="dicr-sec-name">{item.name}</span>
                <b className="dicr-sec-num">{item.value}</b>
              </div>
              
            </li>
            )} */}
        </ul>
      </div>
      <div className="dicr-groups-item">
        <b className="dicr-sec-title">职级</b>
        <ul>
          {staffLevel.map((item, index) => 
            <li key={index}>
              <div className="dir-secli-wrapper self-clearfix">
                <span className="dicr-sec-name">{item.name}</span>
                <b className="dicr-sec-num">{item.value}</b>
              </div>
              
            </li>
            )}
        </ul>
      </div>
    </div>
  </div>
</div>
}