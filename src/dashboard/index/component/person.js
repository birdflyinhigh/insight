import React, {Component} from 'react';
import EConfig from '../../../common/charts/EConfig';
import NodataEcharts from '../../../common/charts/NodataECharts';

export default class Person extends Component{
  constructor(props){
    super(props);
  }
  jumpSecondMF(address){
    // address
    this.props.fns.jumpSecondMF(address);
  }
  render(){
    let staffTrend = {
      data: this.props.staffTrend,
      option: EConfig.radiusBarOption,
      config: {
        barColor: ["#fa939f", "#939afa"],
        showLegend: true,
        normalLegend: true,
        noRadius: true,
        stackId: "staff",
        gridLeft: 50,
        gridRight: '10%',
        gridTop: 60,
        bottom: 60,
        barMaxWidth: 10,
        containLabel: false
      },
      height: 426
    }
    return <div className="dashinc-analysis dashperson">
      <h3 className="dashsection-title">人员基础</h3>
      <div className="dashinc-body">
        <div className="dash-map-common-box-wrapper">
          <div className="dash-map-common-box" style={{height: 426}}>
            <p className="dc-map-title">人数与构成</p>
            <div className="dicr-body">
              <div className="dirc-title" onClick={this.jumpSecondMF.bind(this, "/manager/ihr")}>
                <span className="dicr-total-title">{this.props.monthId}月人数</span>
                <div className="dicr-total-num">
                  <span>{this.props.allStaff}</span>
                </div>
              </div>
              <div className="dicr-lines"></div>
              <div className="dicr-groups">
                <div className="dicr-groups-item">
                  <b className="dicr-sec-title">司龄</b>
                  <ul>
                    {this.props.staffAge.map((item, index) => 
                      <li key={index} onClick={this.jumpSecondMF.bind(this, "/manager/ihr")}>
                        <div className="dir-secli-wrapper self-clearfix">
                          <span className="dicr-sec-name">{item.name}</span>
                          <b className="dicr-sec-num">{item.value}</b>
                        </div>
                        
                      </li>
                      )}
                  </ul>
                </div>
                <div className="dicr-groups-item" style={{width: "41%"}}>
                  <b className="dicr-sec-title" style={{paddingLeft: "10%"}}>职级</b>
                  <ul>
                    {this.props.staffLevel.map((item, index) => 
                      <li key={index} onClick={this.jumpSecondMF.bind(this, "/manager/ihr")}>
                        <div className="dir-secli-wrapper self-clearfix">
                          <span className="dicr-sec-name">{item.name}</span>
                          <b className="dicr-sec-num">{item.value}</b>
                        </div>
                        
                      </li>
                      )}
                  </ul>
                </div>
                <div className="dicr-groups-item">
                  <b className="dicr-sec-title">序列</b>
                  <ul>
                    {this.props.staffKind.map((item, index) => 
                      <li key={index} onClick={this.jumpSecondMF.bind(this, "/manager/ihr")}>
                        <div className="dir-secli-wrapper self-clearfix">
                          <span className="dicr-sec-name">{item.jobFD}</span>
                          <b className="dicr-sec-num">{item.num}</b>
                        </div>
                        
                      </li>
                      )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dc-chart-wrapper">
          <div className="dc-chart-item" style={{width: "100%"}}>
            <div className="dc-chart" style={{height: 426}}>
              <p className="dc-chart-title">人数趋势</p>
              <NodataEcharts config={staffTrend}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}