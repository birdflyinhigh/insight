import React, {Component} from 'react';
import Header from '../common/component/Header';
import BaseInfoShow from '../common/component/BaseInfo';
import EConfig from '../../common/charts/EConfig';
import SumDonut from '../../common/charts/SumDonut';
import Help from '../../common/component/Help';
import SERank from '../common/component/SERank';
import BottomIntro from '../../common/component/BottomIntro';
import {IntroInfo, BaseInfo, RankTitle,
  ConsColor, FunelConfig, BottomIntroText} from './config';

export default class ServiceMain extends Component{
  constructor(props){
    super(props);
    this.state = {
      newShopType: "area",
      keyServiceType: "area"
    }
  }
  selectNewShop(value){
    this.setState({
      newShopType: value
    });
    this.props.fns.selectNewShop(value);
  }
  selectKeyService(value){
    this.setState({
      keyServiceType: value
    });
    this.props.fns.selectKeyService(value);
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
    const newShop = {
			data: this.props.newShop,
			option: EConfig.donutChart,
			config: {
        unit: "",
        showSelfBoth: true,
				center: ["75%", "55%"]
			},
			height: 330
    };
    const keyService = {
			data: this.props.keyService,
      option: EConfig.donutChart,
			config: {
        unit: "",
        showSelfBoth: true,
				center: ["75%", "55%"]
			},
			height: 330
    };
    const serviceVIP = {
			data: this.props.serviceVIP,
      option: EConfig.donutChart,
			config: {
        unit: "",
        showSelfBoth: true,
				center: ["75%", "55%"]
			},
			height: 330
    };

    return <div className="dash-container">
    <h3 className="ceotitle-box">服务商分析</h3>
    <div className="ceocontent-body">
      <Header data={headerData} fns={headerFns}/>
      <div className="charts-content">
        <div className="dc-chart-wrapper">
          {/* 基础信息 */}
          <div className="dc-chart-item" style={{width: "33.33%", height: 340}}>
            <div className="dc-chart">
              <p className="hrchart-title">基础信息</p>
              <BaseInfoShow 
              data={this.props.basicInfo}
              config={BaseInfo}
              />
            </div>
          </div>
          {/* 有收入服务商构成 */}
          <div className="dc-chart-item" style={{width: "33.33%", height: 340}}>
            <div className="dc-chart">
              <p className="hrchart-title">有收入服务商构成</p>
              <FunelChart
              config={FunelConfig} 
              data={this.props.incomeService}
              color={ConsColor}
              />
            </div>
          </div>
          {/* 服务商成交金额排行-TOP20 */}
          <div className="dc-chart-item" style={{width: "33.33%",height: 340}}>
            <div className="dc-chart">
              <div className="hrchart-title">服务商收入排行-TOP20
              </div>
              <SERank title={RankTitle} data={this.props.serviceAmountTop}/>
            </div>
          </div>
        </div>
        <div className="dc-chart-wrapper">
          {/* 新增开店分布 */}
          <div className="dc-chart-item" style={{width: "33.33%"}}>
            <div className="dc-chart">
              <div className="hrchart-title admin-body">
                新增开店分布
                <div className="erp-selectbox"
                style={{right: 0, width: "auto", top: 15}}>
                  <div className="selecticon-group">
                      <span 
                      className={this.state.newShopType === "product" ? "active-btnicon" : ""}
                      onClick={this.selectNewShop.bind(this, "product")}
                      >产品</span>
                      <span
                      className={this.state.newShopType === "area" ? "active-btnicon" : ""}
                      onClick={this.selectNewShop.bind(this, "area")}
                      >地区</span>
                  </div>
                </div>
              </div>
              <SumDonut config={newShop} 
              total={this.props.newShopAll} 
              title="新增开店数"
              style={{top: "48%",left:"47.5%"}}/>
            </div>
          </div>
          {/* 核心服务商分布 */}
          <div className="dc-chart-item" style={{width: "33.33%"}}>
            <div className="dc-chart">
              <div className="hrchart-title admin-body">
              核心服务商分布
                <div className="erp-selectbox"
                style={{right: 0, width: "auto", top: 15}}>
                  <div className="selecticon-group">
                      <span className={this.state.keyServiceType === "product" ? "active-btnicon" : ""}
                      onClick={this.selectKeyService.bind(this, "product")}
                      >产品</span>
                      <span className={this.state.keyServiceType === "area" ? "active-btnicon" : ""}
                      onClick={this.selectKeyService.bind(this, "area")}
                      >地区</span>
                  </div>
                </div>
              </div>
              <SumDonut config={keyService} 
              total={this.props.keyServiceAll} 
              title="核心服务商数"
              style={{top: "48%",left:"47.5%"}}/>
            </div>
          </div>
          {/* 服务商会员构成 */}
          <div className="dc-chart-item" style={{width: "33.33%"}}>
            <div className="dc-chart">
              <div className="hrchart-title">服务商会员构成
                <Help info={IntroInfo.serviceVIP} />
              </div>
              <SumDonut config={serviceVIP} 
              total={this.props.serviceVIPAll} 
              title="服务商会员数"
              style={{top: "48%",left:"47.5%"}}/>
            </div>
          </div>
        </div>
        <BottomIntro intro={BottomIntroText}/>
      </div>
    </div>
  </div>
  }
}
function FunelChart({data, color, config}){
  return <div className="funel-wrapper">
  {config.map((item, index) => 
  <div className="funel-item-wrapper" key={index}>
    <span className="funel-title">{item.name}</span>
    <div className="funel-item" style={{width: `${data[item.rateKey] * 0.6}%`,backgroundColor: color[index]}}>
      <p>{data[item.key]}</p>
      <p>{data[item.rateKey] || 0}%</p>
    </div>
  </div>)
  }
  </div>
}
