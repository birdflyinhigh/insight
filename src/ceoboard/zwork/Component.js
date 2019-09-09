import React, { Component } from 'react';
import { Select } from 'antd';
import ZworkHeader from './ZworkHeader';
import EConfig from '../../common/charts/EConfig';
import SumDonut from '../../common/charts/SumDonut';
import NewCharts from '../../common/charts/NewCharts';
import Help from '../../common/component/Help';
import Time from '../../common/tools/timeUtil';
import BottomIntro from '../../common/component/BottomIntro';
import { IntroInfo, BottomIntroText, InvestInfo } from './config';

const Option = Select.Option;
const time = (new Time()).getAllDate();
export default class ZwokMain extends Component {
  constructor(props) {
    super(props);
    this.timeList = [{
      name: "昨天",
      value: time.yesterDay
    }, {
      name: "本周",
      value: time.curweek
    }, {
      name: "当月",
      value: time.curMonth
    }, {
      name: "当年",
      value: time.curYear
    },
    ];

    // 控制第六个图表 本月按钮 和 本年按钮切换条件的
    this.state = {
      curTime: 'month'
    };
  }
  chooseTime(value) {
    this.props.bodyFns.chooseTime(value);
  }
  recieptTime(value) {
    this.setState({
      curTime: value
    });
    this.props.bodyFns.recieptTime(value);
  }
  render() {
    let headerData = {
      regionId: this.props.regionId,
      provinceId: this.props.provinceId,
      cityId: this.props.cityId,
      communityId: this.props.communityId,
      region: this.props.region,
      province: this.props.province,
      city: this.props.city,
      community: this.props.community,
    };
    const zworkSign = {
      data: this.props.zworkSign,
      option: EConfig.donutChart,
      config: {
        unit: "",
        showSelfBoth: true,
        center: ["75%", "55%"]
      },
      height: 330
    };
    const zworkCons = {
      data: this.props.zworkCons,
      option: EConfig.donutChart,
      config: {
        unit: "",
        showSelfBoth: true,
        center: ["75%", "55%"]
      },
      height: 330
    };
    const stationSign = {
      data: this.props.stationSign,
      option: EConfig.donutChart,
      config: {
        unit: "",
        showSelfBoth: true,
        center: ["75%", "55%"]
      },
      height: 330
    };
    const newSignStation = {
      data: this.props.newSignStation,
      option: EConfig.donutChart,
      config: {
        unit: "",
        showSelfBoth: true,
        center: ["75%", "55%"]
      },
      height: 330,
    };
    const investment = {
      data: this.props.investment.data,  //图表应用的数据
      loading: this.props.investment.loading, //图表权限
      config: { //图表配置
        color: '#78a7ff',
        height: 145,
        center: ["50%", "55%"],
      },
      text: {  //图表中间文字的位置
        left: '28%',
        top: '48%'
      }
    };
    const yearInvestment = {
      data: this.props.yearInvestment.data,
      loading: this.props.yearInvestment.loading,
      config: {
        color: '#2b7bff',
        height: 145,
        center: ["50%", "55%"]
      },
      text: {
        left: '28%',
        top: '48%'
      }
    };
    const continueInvestment = {
      data: this.props.continueInvestment.data,
      loading: this.props.continueInvestment.loading,
      config: {
        color: '#f98c4a',
        height: 145,
        center: ["50%", "45%"]
      },
      text: {
        left: '28%',
        top: '40%'
      }
    };
    const stopInvestment = {
      data: this.props.stopInvestment.data,
      loading: this.props.stopInvestment.loading,
      config: {
        color: '#f06868',
        height: 145,
        center: ["50%", "45%"]
      },
      text: {
        left: '28%',
        top: '40%'
      }
    };
    const receiptSituation = {
      data: this.props.receiptSituation,
      option: EConfig.donutChart,
      config: {
        unit: "",
        showSelfBoth: true,
        center: ["75%", "55%"]
      },
      height: 330
    };

    console.log('zwork sign', this.props.zworkSign)
    console.log('zwork sign all', this.props.zworkConsAll)

    return <div className="dash-container">
      <h3 className="ceotitle-box">八戒工场分析
      <a className="ceotitle-link" target="blank"
          href="https://workboss.zbj.com/welcome/index">更多工场分析>>
        <ul className="intro">
            <li>点击后将进入八戒工场BI，若提示无权限访问，请联系 ”八戒工场取经团-税清茂“ 开通；</li>
          </ul>
        </a>
      </h3>
      <div className="ceocontent-body">
        <ZworkHeader data={headerData} fns={this.props.fns} hideTime={true} />
        <div className="charts-content">
          <div className="dc-chart-wrapper">
            <div className="dc-chart-item" style={{ width: "33.33%" }}>
              <div className="dc-chart">
                <div className="hrchart-title">签约客户构成
                <Help info={IntroInfo.signCons} />
                  <span className="title-right-text">截至昨天</span>
                </div>
                <SumDonut config={zworkSign}
                  total={this.props.zworkSignAll}
                  title="签约客户数" 
                  style={{left:'48%'}}/>
              </div>
            </div>
            <div className="dc-chart-item" style={{ width: "33.33%" }}>
              <div className="dc-chart">
                <div className="hrchart-title">社区构成
                <Help info={IntroInfo.communityCons} />
                  <span className="title-right-text">截至昨天</span>
                </div>
                <SumDonut config={zworkCons}
                  total={this.props.zworkConsAll}
                  title="社区总数"
                  style={{left:'48%'}} />
              </div>
            </div>
            <div className="dc-chart-item" style={{ width: "33.33%" }}>
              <div className="dc-chart">
                <div className="hrchart-title">工位签约情况
                <Help info={IntroInfo.signSituation} />
                  <span className="title-right-text">截至昨天</span>
                </div>
                <SumDonut config={stationSign}
                  total={this.props.stationSignAll}
                  title="工位总数" 
                  style={{left:'48%'}}/>
                <p className="sign-roaming">已签约漫游工位数 ：{this.props.signRoaming}</p>
              </div>
            </div>
          </div>
          {<div className="dc-chart-wrapper">
            <div className="dc-chart-item" style={{ width: "33.33%" }}>
              <div className="dc-chart">
                <div className="hrchart-title admin-body">新签情况
                <Help info={IntroInfo.newSign} />
                  <div
                    className="erp-selectbox admin-select"
                    style={{ right: 0, top: 15 }}
                  >
                    <label className="erp-selectbox-title">时间：</label>
                    <Select
                      defaultValue={this.timeList[0].value}
                      onChange={this.chooseTime.bind(this)}
                    >
                      {this.timeList.map((item, index) =>
                        <Option value={item.value} key={item + index}>{item.name}</Option>
                      )}
                    </Select>
                  </div>
                </div>
                <SumDonut config={newSignStation}
                  total={this.props.newSignStationAll}
                  title="新签工位数"
                  style={{left:'48%'}} />
                <p className="sign-roaming"
                  style={{ bottom: 60 }}
                >新签总金额 ：{this.props.newSignCount}</p>
                <p className="sign-roaming">新签客户数 ：{this.props.newSignCus}</p>
              </div>
            </div>
            <div className="dc-chart-item" style={{ width: "33.33%" }}>
              <div className="dc-chart">
                <div className="hrchart-title">招商情况
                <Help info={IntroInfo.shop} />
                  <span className="title-right-text">截至昨天</span>
                </div>
                <div>
                  <div className="dc-chart-item" style={{ width: "50%", height: 150 }}>
                    <NewCharts options={investment}
                      total={this.props.investAll + "%"}
                      title="招商率" />
                  </div>
                  <div className="dc-chart-item" style={{ width: "50%", height: 150 }}>
                    <NewCharts options={yearInvestment}
                      total={this.props.yearInvestAll + "%"}
                      title="年化招商率" />
                  </div>
                </div>
                <div>
                  <div className="dc-chart-item" style={{ width: "50%", height: 150 }}>
                    <NewCharts options={continueInvestment}
                      total={this.props.continueInvestAll + "%"}
                      title="续签率" />
                  </div>
                  <div className="dc-chart-item" style={{ width: "50%", height: 150 }}>
                    <NewCharts options={stopInvestment}
                      total={this.props.stopInvestAll + "%"}
                      title="退租率" />
                  </div>
                </div>
              </div>
            </div>
            <div className="dc-chart-item" style={{ width: "33.33%" }}>
              <div className="dc-chart">
                <div className="hrchart-title admin-body">收款情况
                <Help info={IntroInfo.receipt} />
                  <div className="erp-selectbox"
                    style={{ right: 0, width: "auto", top: 15 }}>
                    <div className="selecticon-group">
                      <span
                        className={this.state.curTime === 'month' ? "active-btnicon" : ""}
                        onClick={this.recieptTime.bind(this, 'month')}
                      >本月</span>
                      <span
                        className={this.state.curTime === 'year' ? "active-btnicon" : ""}
                        onClick={this.recieptTime.bind(this, 'year')}
                      >本年</span>
                    </div>
                  </div>
                </div>
                <SumDonut config={receiptSituation}
                  total={this.props.receiptSituationAll}
                  title="当期应收账款"
                  style={{left:'48%'}} />
              </div>
            </div>
          </div>}
          <BottomIntro intro={BottomIntroText} />
        </div>
      </div>
    </div>
  }
}
