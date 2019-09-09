import React, {Component} from 'react';
import EConfig from '../../../common/charts/EConfig';
import NodataEcharts from '../../../common/charts/NodataECharts';
import {ManageChartKey} from '../constant';
export default class Income extends Component{
  constructor(props){
    super(props);
  }
  jumpSecondMF(address){
    // address
    this.props.fns.jumpSecondMF(address);
  }
  jumpSecondICP(kind){
    this.props.fns.jumpSecondICP(kind);
  }
  render(){
    let chartData = {
      manageProfit: {
        data: this.props.manageProfit,
        option: EConfig.lineBarChart,
        config: {
          color: ["#8e98f5","#64e1bf", "#8e98f5"],
          startAntherIndex: 2,
          lineIndex: 2,
          showLegend: true,
          normalLegend: true,
          noRadius: true,
          y1Formatter: "%",
          barMaxWidth: 10,
          smooth: true,
          gridLeft: 50
        },
        height: 330
      },
      financialProfit: {
        data: this.props.financialProfit,
        option: EConfig.lineBarChart,
        config: {
          color: ["#85e1c0"],
          startAntherIndex: 2,
          lineIndex: 2,
          showLegend: true,
          normalLegend: true,
          noRadius: true,
          barMaxWidth: 10,
          gridLeft: 50
        },
        height: 330
      },
      staffTrend: {
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
        height: 330
      }
    }
    return <div className="dashinc-analysis">
      <h3 className="dashsection-title">营收矩阵</h3>
      <div className="dashinc-body">
        <div className="dashin-lwrapper">
          <div>
            <div className="dashin-mwrapper">
              <div className="dash-map-common-box">
                <p className="dc-map-title">管报
                  <span style={{fontSize: 14,paddingLeft: 10}}>(金额单位:万)</span>
                </p>
                <div className="dashin-mgroups">
                  <div className="dnm-item" onClick={this.jumpSecondICP.bind(this, "profit")}>
                    <span className="dnm-title">利润</span>
                    <span className="dnm-num dnmnred">{this.props.icmManage.profit || 0}</span>
                    <div className="dnm-symbol">=</div>
                  </div>
                  <div className="dnm-item" onClick={this.jumpSecondICP.bind(this, "income")}>
                    <span className="dnm-title">收入</span>
                    <span className="dnm-num">{this.props.icmManage.income || 0}</span>
                    <div className="dnm-symbol">-</div>
                  </div>
                  <div className="dnm-item" onClick={this.jumpSecondICP.bind(this, "cost")}>
                    <span className="dnm-title">成本</span>
                    <span className="dnm-num">{this.props.icmManage.cost || 0}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashin-fwrapper">
              <div className="dash-map-common-box">
                <p className="dc-map-title">财报
                  <span style={{fontSize: 14,paddingLeft: 10}}>(金额单位:万)</span>
                </p>
                <div className="dashin-mgroups">
                  <div className="dnm-item" onClick={this.jumpSecondMF.bind(this, "/manager/financial")}>
                    <span className="dnm-title">利润</span>
                    <span className="dnm-num dnmnred">{this.props.icmFinancial.profit || 0}</span>
                    <div className="dnm-symbol">=</div>
                  </div>
                  <div className="dnm-item" onClick={this.jumpSecondMF.bind(this, "/manager/financial")}>
                    <span className="dnm-title">收入</span>
                    <span className="dnm-num">{this.props.icmFinancial.income || 0}</span>
                    <div className="dnm-symbol">-</div>
                  </div>
                  <div className="dnm-item" onClick={this.jumpSecondMF.bind(this, "/manager/financial")}>
                    <span className="dnm-title">成本</span>
                    <span className="dnm-num">{this.props.icmFinancial.cost || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dashin-flow">
            <div className="dash-map-common-box">
              <p className="dc-map-title">管报收入-指出流向分析
                <span style={{fontSize: 14, paddingLeft: 10}}>(金额单位:万)</span>
              </p>
                <div className="dif-body">
                  <div className="diflow-part1" style={{visibility: this.props.icmMPayIncomeArr.length ? "visible" : "hidden"}}>
                    <div className="diflow-groups">
                      {this.props.icmMPayIncomeArr.map((item, index, arr) => 
                        <div className="diflow-item self-clearfix" key={index}
                        onClick={this.jumpSecondICP.bind(this, "income")}
                        >
                          <div className="diflow-title">{item.xName + "："}
                            <ul className="intro">
                              <li>{item.xName}</li> 
                            </ul>
                          </div>
                          <span className="diflow-num">{item.accNum}</span>
                          {(index === 0 || index === arr.length - 1) ? "" : <span className="diflow-index-line"></span>}
                        </div>
                        )}
                    </div>
                    <div className="diflow-lines">
                      <div className="difflow-box">
                        <div className="difflow-arrow">
                          <span className="difflow-triangle"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="diflow-part2">
                    <div className="diflow-item" onClick={this.jumpSecondICP.bind(this, "income")}>
                      <span className="diflow-title2">收入</span>
                      <span className="diflow-num2">{this.props.icmMPayIncome}</span>
                      <div className="difflow-arrow"></div>
                      <div className="diflow-p2lines">
                        <div className="diflow-p2lines-box1">
                          <span className="difflow-triangle"></span>
                        </div>
                        <div className="diflow-p2lines-box2">
                          <span className="difflow-triangle"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="diflow-part3">
                    <div className="diflow-item p3-item1" onClick={this.jumpSecondICP.bind(this, "cost")}>
                        <span className="diflow-title2">成本</span>
                        <span className="diflow-num2">{this.props.icmMPayCost}</span>
                        {this.props.icmMPayCostArr.length ? <div className="difflow-arrow"></div> : ""}
                    </div>
                    <div className="diflow-item p3-item2" onClick={this.jumpSecondICP.bind(this, "profit")}>
                        <span className="diflow-title2">利润</span>
                        <span className="diflow-num2">{this.props.icmMPayProfit}</span>
                    </div>
                  </div>
                  {this.props.icmMPayCostArr.length ? <div className="diflow-part4">
                    <div className="diflow-p4lines-box"></div>
                    <div className="diflow-groups">
                      {this.props.icmMPayCostArr.map((item, index, arr) => 
                        <div className="diflow-item self-clearfix" key={index}
                        onClick={this.jumpSecondICP.bind(this, "cost")}>
                          <div className="diflow-title">{item.xName + "："}
                            <ul className="intro">
                              <li>{item.xName}</li> 
                            </ul>
                          </div>
                          <span className="diflow-num">{item.accNum}</span>
                          {(index === 0 || index === arr.length - 1) ? "" : <span className="diflow-index-line"></span>}
                        </div>
                        )}
                    </div>
                  </div> : ""}
                </div>
            </div>
          </div>
        </div>
        <div className="dashin-rwrapper">
          <div className="dash-map-common-box">
            <p className="dc-map-title">人数与构成</p>
            <div className="dicr-body">
              <div className="dirc-title" onClick={this.jumpSecondMF.bind(this, "/manager/ihr")}>
                <span className="dicr-total-title">{this.props.month}月人数</span>
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
          {ManageChartKey.map((item, index) => 
            <div className="dc-chart-item" key={index} style={{width: "33.33%"}}>
              <div className="dc-chart">
                <p className="dc-chart-title">{item.name}
                  {item.unit ? <b style={{fontSize: 14, paddingLeft: 10}}>{item.unit}</b> : ""}
                </p>
                <NodataEcharts config={chartData[item.key]}/>
              </div>
            </div> 
            )}  
        </div>
      </div>
    </div>
  }
}
