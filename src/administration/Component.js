import React, {Component} from 'react';
import NodataEcharts from '../common/charts/NodataECharts';
import EConfig from '../common/charts/EConfig';
import {Select} from 'antd';
import './admin.css';
const Option = Select.Option;
export default class AdminBody extends Component{
  constructor(props){
    super(props);
    this.selectIndex = [{
      name: "超标总金额汇总",
      value: "excess"
    },{
      name: "同性出差损失金额",
      value: "same"
    },{
      name: "酒店损失总金额",
      value: "total"
    }];
    this.state = {
      ticketLoseOpt: "costLoss",
      ticketCompareOpt: "costLoss"
    }
  }
  selectHotelCompare(value){
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
  render(){
    let xcTotalTrend = {
			data: this.props.data.xcTotalTrend,
			option: EConfig.sumTipsRBarChart,
			config: {
        barColor: ["#2a7bff","#16c17a", "#78a7ff"],
        sameSeriesColor: true,
        showLegend: true,
        stackId: "trend",
        grid: {
          left: '10%',
          right: '10%',
          top: 60,
          bottom: 60,
          containLabel: false
        }
			},
			height: 320
    };
    let hotelUsage = {
			data: this.props.data.hotelUsage,
			option: EConfig.lineBarChart,
			config: {
        color: ["#2a7bff","#16c17a", "#78a7ff"],
        startAntherIndex: 1,
        lineIndex: 1
			},
			height: 385
    };
    let hotelLose = {
			data: this.props.data.hotelLose,
			option: EConfig.radiusBarOption,
			config: {
        barColor: ["#2a7bff","#16c17a", "#78a7ff"],
        sameSeriesColor: true,
        showLegend: true,
        grid: {
          left: '10%',
          right: '10%',
          top: 60,
          bottom: 60,
          containLabel: false
        }
			},
			height: 385
    };
    let hotelCompare = {
			data: this.props.data.hotelCompare,
			option: EConfig.radiusBarOption,
			config: {
        barColor: ["#2a7bff","#16c17a", "#78a7ff"],
        sameSeriesColor: true,
        showLegend: true,
        grid: {
          left: '10%',
          right: '10%',
          top: 60,
          bottom: 60,
          containLabel: false
        },
        // interval: 0
			},
			height: 385
    };
    let ticketUsage = {
      data: this.props.data.ticketUsage,
			option: EConfig.lineBarChart,
			config: {
        color: ["#2a7bff","#16c17a", "#78a7ff"],
        startAntherIndex: 1,
        lineIndex: 1
			},
			height: 385
    };
    let ticketLoseFee= {
      data: this.props.data.ticketLoseFee,
			option: EConfig.radiusBarOption,
			config: {
        barColor: ["#2a7bff","#16c17a", "#78a7ff"],
        sameSeriesColor: true,
        showLegend: true,
        stackId: "losefee",
        grid: {
          left: '10%',
          right: '10%',
          top: 60,
          bottom: 60,
          containLabel: false
        }
			},
			height: 385
    };
    let ticketCompareFee = {
      data: this.props.data.ticketCompareFee,
			option: EConfig.radiusBarOption,
			config: {
        barColor: ["#2a7bff","#16c17a", "#78a7ff"],
        sameSeriesColor: true,
        showLegend: true,
        stackId: "comparefee",
        grid: {
          left: '10%',
          right: '10%',
          top: 60,
          bottom: 100,
          containLabel: false
        },
        // interval: 0
			},
			height: 385
    }
    let ticketLoseOutRule = {
      data: this.props.data.ticketLoseOutRule,
			option: EConfig.radiusBarOption,
			config: {
        barColor: ["#2a7bff","#16c17a", "#78a7ff"],
        sameSeriesColor: true,
        showLegend: true,
        // stackId: "losefee",
        grid: {
          left: '10%',
          right: '10%',
          top: 60,
          bottom: 60,
          containLabel: false
        }
			},
			height: 385
    };
    let ticketCompareOutRule = {
      data: this.props.data.ticketCompareOutRule,
			option: EConfig.radiusBarOption,
			config: {
        barColor: ["#2a7bff","#16c17a", "#78a7ff"],
        sameSeriesColor: true,
        showLegend: true,
        grid: {
          left: '10%',
          right: '10%',
          top: 60,
          bottom: 100,
          containLabel: false
        },
        // interval: 0
			},
			height: 385
    }
    return <div className="container-body">
      <div className="fchart-container row">
        <div className="col-lg-6">
          <div className="fcontainer" style={{height: 300}}>
            <p className="hrchart-title">携程差旅费用支出总走势(元)</p>
            <NodataEcharts config={xcTotalTrend}/>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="fcontainer" style={{height: 300}}>
            <p className="hrchart-title">差旅（酒店）损失费用TOP5组织</p>
            <div>
              <ul className="adminList">
                <li className="atitle-item">
                  <strong className="arank">排名</strong>
                  <strong className="aorg">组织</strong>
                  <strong className="amoney">损失费用</strong>
                </li>
                {this.props.data.hotelLoseTop5.length > 0 ? this.props.data.hotelLoseTop5.map((item, index) =>
                  <li key={index}>
                    <i className="arank">{index + 1}</i>
                    <i className="aorg">{item.deptName}</i>
                    <i className="amoney" style={{color: "#2a7bff"}}>{item.hotelLoss}</i>
                  </li>
                  ) : <li style={{textAlign: "center"}}>暂无数据</li>}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="fcontainer" style={{height: 300}}>
            <p className="hrchart-title">差旅（机票）损失费用TOP5组织</p>
            <ul className="adminList">
                <li className="atitle-item">
                  <strong className="arank">排名</strong>
                  <strong className="aorg">组织</strong>
                  <strong className="amoney">损失费用</strong>
                </li>
                {this.props.data.ticketLoseTop5.length > 0 ? this.props.data.ticketLoseTop5.map((item, index) =>
                  <li key={index}>
                    <i className="arank">{index + 1}</i>
                    <i className="aorg">{item.deptName}</i>
                    <i className="amoney" style={{color: "#2a7bff"}}>{item.airfareLoss}</i>
                  </li>
                  ) : <li style={{textAlign: "center"}}>暂无数据</li>}
              </ul>
          </div>
        </div>
      </div>
      <div className="fchart-container row">
        <div className="col-lg-4 col-sm-6">
          <div className="fcontainer">
            <p className="hrchart-title">携程酒店费用支出走势(元)</p>
            <NodataEcharts config={hotelUsage}/>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6">
          <div className="fcontainer">
            <p className="hrchart-title">酒店费用损失走势(元)</p>
            <NodataEcharts config={hotelLose}/>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6">
          <div className="fcontainer">
            <p className="hrchart-title">酒店损失同级对比(元)</p>
            <div className="erp-selectbox" style={{right: 10, top: 15}}>
              <b className="erp-selectbox-title">对比指标：</b>
              <Select style={{width: 170}} defaultValue="excess" onChange={this.selectHotelCompare.bind(this)}>
                {this.selectIndex.map((item, index) =>
                  <Option key={index}value={item.value}>{item.name}</Option>
                  )}
              </Select>
            </div>
            <NodataEcharts config={hotelCompare}/>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6">
          <div className="fcontainer">
            <p className="hrchart-title">携程机票费用支出走势(元)</p>
            <NodataEcharts config={ticketUsage}/>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6">
          <div className="fcontainer">
            <p className="hrchart-title">机票费用损失走势(元)</p>
            {this.state.ticketLoseOpt === "costLoss" ? <NodataEcharts config={ticketLoseFee}/> :
              <NodataEcharts config={ticketLoseOutRule}/>
              }
           
            <div className="erp-selectbox" style={{top: 17, right: 10}}>
              <div className="selecticon-group">
                <span className={this.state.ticketLoseOpt == "costLoss" ? "active-btnicon" : ""}
                  onClick={this.chooseTicketLose.bind(this, "costLoss")}>费用损失</span>
                <span className={this.state.ticketLoseOpt == "wgCondition" ? "active-btnicon" : ""}
                  onClick={this.chooseTicketLose.bind(this, "wgCondition")}>违规情况</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6">
          <div className="fcontainer">
            <p className="hrchart-title">机票损失同级对比(元)</p>
            {this.state.ticketCompareOpt === "costLoss" ? <NodataEcharts config={ticketCompareFee}/> :
              <NodataEcharts config={ticketCompareOutRule}/>
            }
            <div className="erp-selectbox" style={{top: 17, right: 10}}>
              <div className="selecticon-group">
                <span className={this.state.ticketCompareOpt == "costLoss" ? "active-btnicon" : ""}
                  onClick={this.chooseTicketCompare.bind(this, "costLoss")}>费用损失</span>
                <span className={this.state.ticketCompareOpt == "wgCondition" ? "active-btnicon" : ""}
                  onClick={this.chooseTicketCompare.bind(this, "wgCondition")}>违规情况</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
} 