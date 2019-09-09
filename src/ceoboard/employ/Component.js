import React, {Component} from 'react';
import {Select} from 'antd';
import Header from '../common/component/Header';
import BaseInfoShow from '../common/component/BaseInfo';
import EConfig from '../../common/charts/EConfig';
import NodataEcharts from '../../common/charts/NodataECharts';
import SumDonut from '../../common/charts/SumDonut';
import Help from '../../common/component/Help';
import SERank from '../common/component/SERank';
import BottomIntro from '../../common/component/BottomIntro';
import {BaseInfo, IntroInfo, RankTitle, SelectList, BottomIntroText} from './config';

const Option = Select.Option;
export default class EmployMain extends Component{
  constructor(props){
    super(props);
    this.state = {
      areaType: SelectList[0].value,
      areaName: SelectList[0].name,
      productType: SelectList[0].value,
      productName: SelectList[0].name,
    };
  }
  chooseAreaType(value){
    const item = SelectList.find((item) => item.value === value);
    this.setState({
      areaType: value,
      areaName: item.name
    });
    this.props.fns.chooseAreaType(value);
  }
  chooseProType(value){
    const item = SelectList.find((item) => item.value === value);
    this.setState({
      productType: value,
      productName: item.name
    });
    this.props.fns.chooseProType(value);
  }
  render(){
    const headerData = {
      startTime: this.props.startTime,
      endTime: this.props.endTime,
      regionId: this.props.regionId,
      provinceId: this.props.provinceId,
      productId: this.props.productId,
      region: this.props.region,
      province: this.props.province,
      product: this.props.product,
      curBtn: this.props.curBtn,
      role: this.props.userRole
    };
    const headerFns = {
      selectStart:  this.props.selectStart,
      selectEnd:  this.props.selectEnd,
      selectRegion: this.props.selectRegion,
      selectProvince: this.props.selectProvince,
      selectProduct: this.props.selectProduct,
      queryData: this.props.queryData
    };
    const employNumTrend = {
      data: this.props.employNumTrend,
      option: EConfig.gradientLineOption,
      config: {
        lineColor: ["#5888f4", "#c1b6fb", "#b5cefc"],
        showLegend: true,
        normalLegend: true,
        smooth: true,
        hideSplitLine: true
      },
      height: 380
    };
    const employArea = {
			data: this.props.employArea,
			option: EConfig.donutChart,
			config: {
        unit: "",
        showSelfBoth: true,
				center: ["70%", "55%"]
			},
			height: 450
    };
    const employProduct = {
			data: this.props.employProduct,
			option: EConfig.donutChart,
			config: {
        unit: "",
        showSelfBoth: true,
				center: ["70%", "55%"]
			},
			height: 450
    };
    return <div className="dash-container">
    <h3 className="ceotitle-box">雇主分析</h3>
    <div className="ceocontent-body">
      <Header data={headerData} fns={headerFns}/>
      <div className="charts-content">
        <div className="dc-chart-wrapper">
          <div className="dc-chart-item" style={{width: "40%", height: 360}}>
            <div className="dc-chart">
              <p className="hrchart-title">基础信息</p>
              <BaseInfoShow data={this.props.basisInfo} config={BaseInfo} />
            </div>
          </div>
          <div className="dc-chart-item" style={{width: "60%", height: 360}}>
            <div className="dc-chart">
              <p className="hrchart-title">雇主数趋势</p>
              <NodataEcharts config={employNumTrend}/>
            </div>
          </div>
        </div>
        <div className="dc-chart-wrapper">
          <div className="dc-chart-item" style={{width: "33.33%", height: 430}}>
            <div className="dc-chart">
              <div className="hrchart-title admin-body">
              雇主区域分布
                <div 
                  className="erp-selectbox admin-select"
                  style={{right: 0, top: 15}}
                  >
                    <Select 
                    value={this.state.areaType}
                    onChange={this.chooseAreaType.bind(this)}
                    >
                      {SelectList.map((item, index) => 
                        <Option value={item.value} key={item + index}>{item.name}</Option>
                        )}
                    </Select>
                  </div>
              </div>
              <SumDonut config={employArea} 
              style={{left: "44%"}}
              total={this.props.employAreaAll} 
              title={this.state.areaName + "数"}/>
            </div>
          </div>
          <div className="dc-chart-item" style={{width: "33.33%", height: 430}}>
            <div className="dc-chart">
              <div className="hrchart-title admin-body">
              雇主产品分布
                <div 
                  className="erp-selectbox admin-select"
                  style={{right: 0, top: 15}}>
                    <Select 
                    value={this.state.productType}
                    onChange={this.chooseProType.bind(this)}
                    >
                      {SelectList.map((item, index) => 
                        <Option value={item.value} key={item + index}>{item.name}</Option>
                        )}
                    </Select>
                  </div>
              </div>
              <SumDonut config={employProduct} 
              style={{left: "44%"}}
              total={this.props.employProductAll} 
              title={this.state.productName + "数"}/>
            </div>
          </div>
          <div className="dc-chart-item" style={{width: "33.33%", height: 430}}>
            <div className="dc-chart">
              <div className="hrchart-title">雇主交易额排行-TOP20
                <Help info={IntroInfo.topRank} />
              </div>
              <SERank title={RankTitle} data={this.props.employTop} />
            </div>
          </div>
          <BottomIntro intro={BottomIntroText}/>
        </div>
      </div>
    </div>
  </div>
  }
}