import React, {Component} from 'react';
import {Select, Button} from 'antd';
import NodataEcharts from '../../common/charts/NodataECharts';
import EConfig from '../../common/charts/EConfig';
const Option = Select.Option;
export default class ManageBody extends Component{
  constructor(props){
    super(props);
    this.incomeBtn = [{
      key: "org",
      value: "下级组织"
    },{
      key: "income_kind",
      value: "收入科目"
    // },{
    //   key: "product",
    //   value: "商业产品"
    }];
    this.costBtn = [{
      key: "org",
      value: "下级组织"
    },{
      key: "cost_kind",
      value: "成本科目"
    }];
    this.profitBtn = [{
      key: "org",
      value: "下级组织"
    }];
    this.state = {
      icpIndex: "income",
      icpDimension: "org",
      regionIndex: "income",
      regionDimension: "region",
      icpClickableChart: true,
      icpUnclikableChart: false,
      regionLevel1Chart: true,
      regionLevel2Chart: false,
      regionLevel3Chart: false,
      icpCurBtn: this.incomeBtn
    };
  }
  chooseICPIndex(value){
    this.setState({
      icpIndex: value,
      icpDimension: "org",
      icpCurBtn: this[`${value}Btn`],
      icpClickableChart: true,
      icpUnclikableChart: false,
    });
    this.props.fns.chooseICPIndex(value);
  }
  chooseICPDimension(value){
    let tempClickable = true;
    if(value == "income_kind" || value == "product"){
      tempClickable = false;
    }
    this.setState({
      icpDimension: value,
      icpClickableChart: tempClickable,
      icpUnclikableChart: !tempClickable,
    });
    this.props.fns.chooseICPDimension(value);
  }
  chooseAreaIndex(value){
    this.setState({
      regionIndex: value,
      regionDimension: "region",
      regionLevel1Chart: true,
      regionLevel2Chart: false,
      regionLevel3Chart: false,
    });
    this.props.fns.chooseAreaIndex(value);
  }
  chooseAreaDimension(value){
    this.setState({
      regionDimension: value,
      regionLevel1Chart: true,
      regionLevel2Chart: false,
      regionLevel3Chart: false,
    });
    this.props.fns.chooseAreaDimension(value);
  }
  getICPchartLevel1(instance){
    let that = this;
    let handler = instance.on('click', (params) => {
      that.setState({
        icpClickableChart: false,
        icpUnclikableChart: true,
      });
      instance.off('click', handler);
      this.props.fns.clickICPChart(params.data.barKey);
      
    });
    
  }
  getRegionchartLevel1(instance){
    let that = this;
    let handler = instance.on('click', (params) => {
      that.setState({
        regionLevel1Chart: false,
        regionLevel2Chart: true,
        regionLevel3Chart: false
      });
      this.props.fns.clickAreaChart1(params.data.barKey);
      instance.off('click', handler);
    });
    
  }
  getRegionchartLevel2(instance){
    let that = this;
    let handler = instance.on('click', (params) => {
      that.setState({
        regionLevel1Chart: false,
        regionLevel2Chart: false,
        regionLevel3Chart: true
      });
      this.props.fns.clickAreaChart2(params.data.barKey);
      instance.off('click', handler);
    });
    
  }
  regionBackLevel1(){
    this.setState({
      regionLevel1Chart: true,
      regionLevel2Chart: false,
      regionLevel3Chart: false
    });
    this.props.fns.returnLevel1();
  };
  regionBackLevel2(){
    this.setState({
      regionLevel1Chart: false,
      regionLevel2Chart: true,
      regionLevel3Chart: false
    });
    this.props.fns.returnLevel2();
  }
  icpBackChart(){
    this.setState({
      icpClickableChart: true,
      icpUnclikableChart: false,
    });
    // 参数复原到一级
    this.props.fns.icpBackChart();
  }
  jumptoDetail(){
    this.props.fns.jumptoDetail();
  }
  render(){
    let incomeRate= {
      data: this.props.data.incomeRate,
			option: EConfig.lineBarChart,
			config: {
        color: ["#2a7bff", "#0ace7e", "#f98c4a"],
        lineIndex: 2,
        y1Formatter: "%",
        xFormatter: "月",
        startAntherIndex: 2
			},
			height: 385
    };
    let combineChart1 = {
      data: this.props.data.incomeRate,
			option: EConfig.lineBarChart,
			config: {
        color: ["#2a7bff", "#0ace7e", "#f98c4a"],
        lineIndex: 2,
        y1Formatter: "%",
        bottom: 120,
        startAntherIndex: 2
			},
			height: 490
    };
    let combineChart2 = {
      data: this.props.data.incomeRate,
			option: EConfig.lineBarChart,
			config: {
        color: ["#2a7bff", "#0ace7e", "#f98c4a"],
        lineIndex: 2,
        y1Formatter: "%",
        bottom: 120,
        startAntherIndex: 2
			},
			height: 385
    }
    return <div className="container-body">
        <div className="fpanel row">
          {this.props.panelData.map((item, index) => 
            <div className="col-lg-3 col-sm-6 col-xs-6" key={index}>
              <div className="fpanel-item">
                <div className="fpanel-title1">
                  <span className="fpanel-title-info">{item.title1}</span>
                  <span className="fpanel-title-num">{item.num}</span>
                </div>
                <div className="fpanel-title2">
                  <span className="fpanel-title-info">{item.title2}</span>
                  <span className="fpanel-title-num">{item.stackNum}</span>
                </div>
                <div className="fpanel-title2">
                  <span className="fpanel-title-info">{item.title3}</span>
                  <span className="fpanel-title-num">{item.avgNum}</span> 
                </div>
              </div>
          </div>
          )}
        </div>
        <div className="fchart-container row">
            <div className="col-lg-4 col-sm-4 col-xs-12">
              <div className="fcontainer">
                <p className="hrchart-title">收入预算完成率<b className="unit-title">(单位：万元)</b></p>
                <NodataEcharts config={incomeRate}/>
              </div>
            </div>
            <div className="col-lg-4 col-sm-4 col-xs-12">
              <div className="fcontainer">
                <p className="hrchart-title">成本预算完成率<b className="unit-title">(单位：万元)</b></p>
                <NodataEcharts config={{...incomeRate, data: this.props.data.costRate}}/>
              </div>
            </div>
            <div className="col-lg-4 col-sm-4 col-xs-12">
              <div className="fcontainer">
                <p className="hrchart-title">利润预算完成率<b className="unit-title">(单位：万元)</b></p>
                <NodataEcharts config={{...incomeRate, data: this.props.data.profitRate}}/>
              </div>
            </div>
            <div className="col-lg-6 col-sm-6 col-xs-12">
              <div className="fcontainer">
                <p className="hrchart-title">成交雇主数目标完成率</p>
                <NodataEcharts config={{...incomeRate, data: this.props.data.empoyeRate}}/>
              </div>
            </div>
            
            <div className="col-lg-6 col-sm-6 col-xs-12">
              <div className="fcontainer">
                <p className="hrchart-title">核心知识工作者数目标完成率</p>
                <NodataEcharts config={{...incomeRate, data: this.props.data.keyworkerRate}}/>
              </div>
            </div>    
            {/* <div className="col-lg-6 col-sm-6 col-xs-12">
              <div className="fcontainer">
                <p className="hrchart-title">跨一级类目复购率目标完成率</p>
                <NodataEcharts config={{...incomeRate, data: this.props.data.categoryRate}}/>
              </div>
            </div> */}
            <div className="col-lg-12 col-sm-12 col-xs-12">
              <div className="fcontainer" style={{height: 480}}>
                <p className="hrchart-title">{this.props.month}月收入、成本、利润完成情况<b className="unit-title">(单位：万元)</b></p>
                {this.state.icpClickableChart ? <NodataEcharts config={{...combineChart1, data: this.props.data.icpClickableData}}
                onChartReadyCallback={this.getICPchartLevel1.bind(this)}/> : 
                <div>
                  {(this.state.icpDimension == "income_kind" || this.state.icpDimension == "product") ? "" : <span className="return-last-btn" onClick={this.icpBackChart.bind(this)}>返回上级</span>}
                  <NodataEcharts config={{...combineChart1, data: this.props.data.icpUnclickableData}}/>
                </div>}
                
                <div className="erp-selectbox" style={{top: 17, right: 400}}>
                  <b className="erp-selectbox-title">对比指标：</b>
                  <div className="selecticon-group">
                    <span className={this.state.icpIndex == "income" ? "active-btnicon" : ""} 
                    onClick={this.chooseICPIndex.bind(this, "income")}>收入</span>
                    <span className={this.state.icpIndex == "cost" ? "active-btnicon" : ""} 
                     onClick={this.chooseICPIndex.bind(this, "cost")}>成本</span>
                    <span className={this.state.icpIndex == "profit" ? "active-btnicon" : ""}
                     onClick={this.chooseICPIndex.bind(this, "profit")}>利润</span>
                  </div>
                </div>
                <div className="erp-selectbox" style={{top: 17, right: 60}}>
                  <b className="erp-selectbox-title">对比维度：</b>
                  <div className="selecticon-group">
                    {this.state.icpCurBtn.map((item) => 
                      <span key={item.key} className={this.state.icpDimension == item.key ? "active-btnicon" : ""} 
                      onClick={this.chooseICPDimension.bind(this, item.key)}>{item.value}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-sm-12 col-xs-12">
              <div className="fcontainer">
                <p className="hrchart-title">{this.props.month}月 区域线收入、成本、利润完成情况<b className="unit-title">(单位：万元)</b></p>
                {this.state.regionLevel1Chart ? <NodataEcharts config={{...combineChart2, data: this.props.data.regionLevel1}}  
                onChartReadyCallback={this.getRegionchartLevel1.bind(this)}/> : 
                this.state.regionLevel2Chart ? <div>
                  <span className="return-last-btn" onClick={this.regionBackLevel1.bind(this)}>返回大区</span>
                  <NodataEcharts config={{...combineChart2, data: this.props.data.regionLevel2}}  
                  onChartReadyCallback={this.getRegionchartLevel2.bind(this)}/> 
                  </div>
                  : 
                <div>
                  {this.state.regionDimension == "allCountry" ? 
                    <span className="return-last-btn" style={{right: 710}}
                    onClick={this.jumptoDetail.bind(this)}>查看全部城市明细</span> : ""}
                  <span className="return-last-btn" onClick={this.regionBackLevel2.bind(this)}>返回省</span>
                  <NodataEcharts config={{...combineChart2, data: this.props.data.regionLevel3}}/>
                </div>
              }
                <div className="erp-selectbox" style={{top: 17, right: 400}}>
                  <b className="erp-selectbox-title">对比指标：</b>
                  <div className="selecticon-group">
                    <span className={this.state.regionIndex == "income" ? "active-btnicon" : ""}
                     onClick={this.chooseAreaIndex.bind(this, "income")}>收入</span>
                    <span className={this.state.regionIndex == "cost" ? "active-btnicon" : ""}
                    onClick={this.chooseAreaIndex.bind(this, "cost")}>成本</span>
                    <span className={this.state.regionIndex == "profit" ? "active-btnicon" : ""}
                    onClick={this.chooseAreaIndex.bind(this, "profit")}>利润</span>
                    {/* <span className={this.state.regionIndex == "little_profit" ? "active-btnicon" : ""}
                    onClick={this.chooseAreaIndex.bind(this, "little_profit")}>毛利</span> */}
                    
                  </div>
                </div>
                <div className="erp-selectbox" style={{top: 17, right: 60}}>
                  <b className="erp-selectbox-title">对比维度：</b>
                  <div className="selecticon-group">
                    <span className={this.state.regionDimension == "region" ? "active-btnicon" : ""}
                     onClick={this.chooseAreaDimension.bind(this, "region")}>单个区域下钻</span>
                    <span className={this.state.regionDimension == "allCountry" ? "active-btnicon" : ""}
                     onClick={this.chooseAreaDimension.bind(this, "allCountry")}>全国范围对比</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
  }
}