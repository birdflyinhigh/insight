import React, {Component} from 'react';
import {Select} from 'antd';
import NodataEcharts from '../../common/charts/NodataECharts';
import EConfig from '../../common/charts/EConfig';
import {travelFeeRateOpts, hotelCompareOpts, lostOutRule, marginStyle} from '../constant';
const Option = Select.Option;
export default class TopPart extends Component{
  constructor(props){
    super(props);
    this.state = {
      hotelCompareOpt: "excess",
      ticketLoseOpt: "costLoss",
      ticketCompareOpt: "costLoss"
    }
  }
  selectHotelCompare(value){
    this.setState({
      hotelCompareOpt: value
    });
    this.props.fns.selectHotelCompare(value);
  }
  chooseTicketLose(value){
    this.setState({
      ticketLoseOpt: value
    });
  }
  chooseTicketCompare(value){
    this.setState({
      ticketCompareOpt: value
    });
  }
  selectTravelFee(value){
    this.props.fns.selectTravelFee(value);
  }
  downloadData(type){
    this.props.fns.downloadData(type);
  }
  render(){
    let xcTotalTrend = {
      data: this.props.data.xcTotalTrend,
			option: EConfig.sumTipsRBarChart,
			config: {
        barColor: ["#fcfa29","#70a4fa", "#78a7ff"],
        sameSeriesColor: true,
        showLegend: true,
        normalLegend: true,
        noRadius: true,
        stackId: "trend",
			},
			height: 380
    };
    let orgFeeRate = {
      data: this.props.data.orgFeeRate,
			option: EConfig.donutChart,
			config: {
        color: ["#5688f4","#98a1fb", "#a1bdfa", "#8cd2fe", "#f89fa4"],
        hideLegend: false,
        legendGap: 4,
        radius: ['30%', '45%'],
        center: ['23%', '55%'],
        legendLeft: "48%",
        showSelfPercent: true,
        maxLegendLength: 9
        // legendTop: 60,
        // legendBottom: 50,
        // legendGap: 10
			},
			height: 380
    };
    let hotelUsage = {
      data: this.props.data.hotelUsage,
			option: EConfig.lineBarChart,
			config: {
        color: ["#98a1fb","#f8a3a8", "#9ff8c7"],
        startAntherIndex: 1,
        lineIndex: 1,
        normalLegend: true,
        noRadius: true,
        smooth: true,
        yFormatter: "万",
        y1Formatter: "元",
        hideY1AxisFormat: true,
        hideY2AxisFormat: true
			},
			height: 330
    };
    let hotelLoseTrend = {
      data: this.props.data.hotelLoseTrend,
			option: EConfig.areaLineChart,
			config: {
        color: ["#689ef9","#c0c5fa"],
        startAntherIndex: 1,
        lineIndex: 1,
        showLegend: true,
        normalLegend: true,
        noRadius: true,
        smooth: true,
        stackId: "hotellose",
        hideYformatter: true
			},
			height: 330
    };
    let hotelCompare = {
      data: this.props.data.hotelCompare,
      option: EConfig.lineBarChart,
			config: {
        color: ["#8cd2fe"],
        startAntherIndex: 1,
        lineIndex: 1,
        normalLegend: true,
        noRadius: true,
        smooth: true,
        bottom: 120
			},
			height: 330
    };
    let ticketUsage = {
      data: this.props.data.ticketUsage,
			option: EConfig.lineBarChart,
			config: {
        color: ["#8cd2fe","#608ef5", "#f89fa4"],
        startAntherIndex: 1,
        lineIndex: 1,
        normalLegend: true,
        noRadius: true,
        smooth: true,
        yFormatter: "万",
        y1Formatter: "%",
        hideY1AxisFormat: true,
        hideY2AxisFormat: true
			},
			height: 330
    };
    let ticketLoseFee = {
      data: this.props.data.ticketLoseFee,
			option: EConfig.areaLineChart,
			config: {
        color: ["#689ef9","#c0c5fa", "#f89fa4"],
        startAntherIndex: 1,
        lineIndex: 1,
        showLegend: true,
        normalLegend: true,
        noRadius: true,
        smooth: true,
        stackId: "hotellose",
        gridLeft: "12%"
			},
			height: 330
    };
    let ticketCompareFee = {
      data: this.props.data.ticketCompareFee,
			option: EConfig.radiusBarOption,
			config: {
        barColor: ["#689ef9","#fcfa29", "#f89fa4"],
        sameSeriesColor: true,
        showLegend: true,
        normalLegend: true,
        noRadius: true,
        stackId: "comparefee",
        gridLeft: '12%',
        gridRight: '10%',
        gridTop: 60,
        bottom: 120,
        containLabel: false,
			},
			height: 330
    };
    let ticketLoseOutRule = {
      data: this.props.data.ticketLoseOutRule,
			option: EConfig.radiusBarOption,
			config: {
        barColor: ["#689ef9", "#f89fa4"],
        sameSeriesColor: true,
        showLegend: true,
        normalLegend: true,
        noRadius: true,
        gridLeft: '10%',
        gridRight: '10%',
        gridTop: 60,
        bottom: 60,
        containLabel: false,
			},
			height: 330
    };
    let ticketCompareOutRule = {
      data: this.props.data.ticketCompareOutRule,
			option: EConfig.radiusBarOption,
			config: {
        barColor: ["#689ef9", "#f89fa4"],
        sameSeriesColor: true,
        showLegend: true,
        normalLegend: true,
        noRadius: true,
        gridLeft: '12%',
        gridRight: '10%',
        gridTop: 60,
        bottom: 120,
        containLabel: false,
        // interval: 0
			},
			height: 330
    };
    return <div className="admin-body">
        <div className="fchart-container row">
          <div className="col-sm-6 col-lg-4">
            <div className="fcontainer" style={{height: 370}}>
              <p className="hrchart-title">携程差旅费用支出总走势（费用单位：万元）</p>
              <div style={marginStyle}>
                <NodataEcharts config={xcTotalTrend}/>
              </div>
              
            </div>
          </div>
          <div className="col-sm-6 col-lg-4">
            <div className="fcontainer" style={{height: 370}}>
              <p className="hrchart-title">各下级组织差旅费占比</p>
              <div style={{marginLeft: 30}}>
                <NodataEcharts config={orgFeeRate}/>
              </div> 
              <div className="erp-selectbox admin-select" style={{right: 30, top: 15}}>
                <b className="erp-selectbox-title">对比指标：</b>
                <Select style={{width: 120}} defaultValue="totalFee" onChange={this.selectTravelFee.bind(this)}>
                  {travelFeeRateOpts.map((item, index) =>
                    <Option key={index}value={item.value}>{item.name}</Option>
                    )}
                </Select>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-4">
            <div className="fcontainer" style={{height: 370}}>
              <p className="hrchart-title">差旅出发地与目的地排名</p>
              {!this.props.data.startDistination.loading ? <div style={{lineHeight: "325px", textAlign: "center"}}>暂无权限</div> : 
              this.props.data.startDistination.noData ? <div style={{lineHeight: "325px", textAlign: "center"}}>暂无数据</div> : 
              <div className="admin-distination">
                <div className="dis-item1">
                  <b className="dis-title">出发地</b>
                  <div className="dis-gradius">
                    {this.props.data.startDistination.departure.map((item, index) =>
                      <div className="dis-radius" style={{width: "150%"}} key={index}>{index + 1}.{item}</div>
                    )}
                  </div>
                </div>
                <div className="dis-item2">
                  <b className="dis-title">目的地</b>
                  <div className="dis-gradius">
                    {this.props.data.startDistination.destination.map((item, index) =>
                      <div className="dis-radius" style={{width: "150%"}} key={index}>{index + 1}.{item}</div>
                    )}
                  </div>
                </div>
                <div className="dis-item3">
                  <b className="dis-title">路线</b>
                  <div className="dis-gradius">
                    {this.props.data.startDistination.route.map((item, index) =>
                      <div className="dis-radius" style={{width: "100%"}} key={index}>{index + 1}.{item}</div>
                    )}
                  </div>
                </div>
              </div>}
            </div>
          </div>
          <div className="col-sm-6 col-lg-4">
            <div className="fcontainer" style={{height: 320}}>
              <p className="hrchart-title">携程酒店费用支出走势（费用单位：万元）</p>
              <div style={marginStyle}>
                <NodataEcharts config={hotelUsage}/>
              </div>
              
            </div>
          </div>
          <div className="col-sm-6 col-lg-4">
            <div className="fcontainer" style={{height: 320}}>
              <p className="hrchart-title">酒店费用损失走势（费用单位：元）</p>
              <div style={marginStyle}>
                <NodataEcharts config={hotelLoseTrend}/>
              </div>
              
            </div>
          </div>
          <div className="col-sm-6 col-lg-4">
            <div className="fcontainer" style={{height: 320}}>
              <p className="hrchart-title">酒店损失同级对比（费用单位：元）
                {(this.state.hotelCompareOpt === "same" || this.state.hotelCompareOpt === "total" ) ? 
                <span className="admin-download" onClick={this.downloadData.bind(this, this.state.hotelCompareOpt)}></span>
              : ""}
              </p>
              <div style={marginStyle}>
                <NodataEcharts config={hotelCompare}/>
              </div>
              <div className="erp-selectbox" style={{top: 55, left: 0}}>
                <div className="selecticon-group">
                  {
                    hotelCompareOpts.map((item, index) => 
                    <span className={this.state.hotelCompareOpt == item.value ? "active-btnicon" : ""}
                    key={index}
                    onClick={this.selectHotelCompare.bind(this, item.value)}>{item.name}</span>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-4">
            <div className="fcontainer" style={{height: 320}}>
              <p className="hrchart-title">携程机票费用支出走势（费用单位：万元）</p>
              <div style={marginStyle}>
                <NodataEcharts config={ticketUsage}/>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-4">
            <div className="fcontainer" style={{height: 320}}>
              <p className="hrchart-title">机票费用损失走势（费用单位：元）</p>
              {this.state.ticketLoseOpt === "costLoss" ?  <div style={marginStyle}>
                <NodataEcharts config={ticketLoseFee}/>
              </div> :
              <div style={marginStyle}>
                <NodataEcharts config={ticketLoseOutRule}/>
              </div>
              
              }
              <div className="erp-selectbox" style={{top: 55, left: 0}}>
                <div className="selecticon-group">
                {
                    lostOutRule.map((item, index) => 
                    <span className={this.state.ticketLoseOpt == item.value ? "active-btnicon" : ""}
                    key={index}
                    onClick={this.chooseTicketLose.bind(this, item.value)}>{item.name}</span>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-4">
            <div className="fcontainer" style={{height: 320}}>
              <p className="hrchart-title">机票损失同级对比（费用单位：元）
              {this.state.ticketCompareOpt === "costLoss" ? 
                <span className="admin-download" onClick={this.downloadData.bind(this, this.state.ticketCompareOpt)}></span>
              : ""}
              </p>
              {this.state.ticketCompareOpt === "costLoss" ?  <div style={marginStyle}>
                <NodataEcharts config={ticketCompareFee}/> 
              </div> :
              <div style={marginStyle}>
                <NodataEcharts config={ticketCompareOutRule}/>
              </div>
              }
              <div className="erp-selectbox" style={{top: 55, left: 0}}>
                <div className="selecticon-group">
                {
                    lostOutRule.map((item, index) => 
                    <span className={this.state.ticketCompareOpt == item.value ? "active-btnicon" : ""}
                    key={index}
                    onClick={this.chooseTicketCompare.bind(this, item.value)}>{item.name}</span>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  }
}