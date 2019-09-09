import React, {Component} from 'react';
import EConfig from '../../../common/charts/EConfig';
import NodataEcharts from '../../../common/charts/NodataECharts';
import {ComptUtils} from '../../../common/tools/util';
import {CusEmployeKey, CusServiceKey, CusChartKey} from '../constant';
export default class Customer extends Component{
  constructor(props){
    super(props);
  }
  clickEmployItem(item, productType){
    if(!item.link) return ;
    this.props.fns.jumpEmploySec({
      link: item.link, 
      productType
    });
  }
  jumpServiceSec(item){
    this.props.fns.jumpServiceSec(item);
  }
  render(){
    let chartData = {
      employeTrend: {
        data: this.props.employeTrend,
        option: EConfig.areaLineChart,
        config: {
          color: ["#689ef9","#c0c5fa", "#f89fa4"],
          startAntherIndex: 1,
          lineIndex: 1,
          showLegend: true,
          normalLegend: true,
          noRadius: true,
          smooth: true,
          stackId: "employeTrend",
          gridLeft: "12%"
        },
        height: 330
      },
      shopZwork: {
        data: this.props.shopZwork,
        option: EConfig.gradientLineOption,
        config: {
          lineColor: ["#689ef9","#f89fa4"],
          showLegend: true,
          normalLegend: true,
          smooth: true,
          hideSplitLine: true
        },
        height: 330
      },
      shopBusniessContri: {
        data: this.props.shopBusniessContri,
        option: EConfig.gradientLineOption,
        config: {
          lineColor: ["#50efb4","#fb8747"],
          showLegend: true,
          normalLegend: true,
          smooth: true,
          hideSplitLine: true
        },
        height: 330
      }
    
    }
    return <div className="dashcus-analysis">
      <h3 className="dashsection-title">客户分析</h3>
      <div className="dashcus-body">
        <div className="dc-map-wrapper">
          <div className="dc-title">客户</div>
          <div className="dc-lmap-wrapper">
            <div className="dc-map-employe">
              <div className="dc-map-indexline"></div>
              <p className="dc-map-title">雇主</p>
              <div className="dc-employe-groups" style={{paddingBottom: 30}}>
                {CusEmployeKey.map((item, index, arr) => 
                  <div className="dc-employe-item" key={index}
                  onClick={this.clickEmployItem.bind(this, item, -1)}
                  >
                    <p className="dc-mitem-title">{item.name}</p>
                    <p className="dc-map-num">
                      <span>{this.props.cusAnaEmploy[item.key] || 0}</span>
                    </p>
                    <div className="dc-mapnum-ratio">
                      <span>环比：</span>
                      {typeof this.props.cusAnaEmploy[item.subNumKey] != "undefined" ? <span className={this.props.cusAnaEmploy[item.subNumKey] > 0 ? "panel-num-up" : "panel-num-down"}></span> : ""}
                      {typeof this.props.cusAnaEmploy[item.subNumKey] != "undefined" ? <span>{this.props.cusAnaEmploy[item.subNumKey]}%</span> : ""}
                    </div>
                    {index === arr.length - 1 ? "" : <i className="dc-map-split"></i>}
                  </div>
                )}          
              </div>
            </div>
            <div className="dc-map-manager">
              <div>
                  <div className="dc-mwrapper">
                    <div className="dc-map-indexline" style={{left: "51%"}}></div>
                    <p className="dc-map-title">企业管家</p>  
                    <div className="dc-employe-groups">
                      {CusEmployeKey.map((item, index, arr) => 
                        <div className="dc-employe-item" key={index}
                        onClick={this.clickEmployItem.bind(this, item, 0)}
                        >
                          <div className="dc-mitem-title">{item.name}
                            <div className="help">
                              <ul className="intro">
                                {ComptUtils.generateToolArr(item.manatips).map((toolstr, index1) =>  
                                  <li key={index1}>{toolstr}</li> 
                                  )}
                              </ul>
                            </div>
                          </div>
                          <p className="dc-map-num">
                            <span>{this.props.cusBusManager[item.key] || 0}</span>
                          </p>
                          <div className="dc-mapnum-ratio">
                            <span>环比：</span>
                            {typeof this.props.cusBusManager[item.subNumKey] != "undefined" ? <span className={this.props.cusBusManager[item.subNumKey] > 0 ? "panel-num-up" : "panel-num-down"}></span> : ""}
                            {typeof this.props.cusBusManager[item.subNumKey] != "undefined" ? <span>{this.props.cusBusManager[item.subNumKey]}%</span> : ""}
                          </div>
                          {(index === arr.length - 1 || (index + 1) % 2 === 0) ? "" : <i className="dc-map-split"></i>}
                        </div>
                      )}          
                    </div>
                  </div>
                </div>
              <div>
                <div className="dc-mwrapper">
                  <div className="dc-map-indexline" style={{left: "48.3%"}}></div>
                  <p className="dc-map-title">非企业管家</p>  
                  <div className="dc-employe-groups">
                      {CusEmployeKey.map((item, index, arr) => 
                        <div className="dc-employe-item" key={index}
                        onClick={this.clickEmployItem.bind(this, item, 1)}
                        >
                          <div className="dc-mitem-title">{item.name}
                            <div className="help">
                              <ul className="intro">
                                {ComptUtils.generateToolArr(item.nonetips).map((toolstr, index1) =>  
                                  <li key={index1}>{toolstr}</li> 
                                  )}
                              </ul>
                            </div>
                          </div>
                          <p className="dc-map-num">
                            <span>{this.props.cusNoneBusManager[item.key] || 0}</span>
                          </p>
                          <div className="dc-mapnum-ratio">
                            <span>环比：</span>
                            {typeof this.props.cusNoneBusManager[item.subNumKey] != "undefined" ? <span className={this.props.cusNoneBusManager[item.subNumKey] > 0 ? "panel-num-up" : "panel-num-down"}></span> : ""}
                            {typeof this.props.cusNoneBusManager[item.subNumKey] != "undefined" ? <span>{this.props.cusNoneBusManager[item.subNumKey]}%</span> : ""}
                          </div>
                          {(index === arr.length - 1  || (index + 1) % 2 === 0) ? "" : <i className="dc-map-split"></i>}
                        </div>
                      )}          
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dc-rmap-wrapper">
            <div className="dc-map-service">
              <div className="dc-map-indexline"></div>
              <p className="dc-map-title">商家</p>
              <div className="dc-employe-groups">
                  {CusServiceKey.map((item, index, arr) => 
                    <div className="dc-employe-item" key={index}
                    onClick={this.jumpServiceSec.bind(this, item)}
                    >
                      <div className="dc-mitem-title">{item.name}
                        {item.tips ? <div className="help">
                          <ul className="intro">
                            {ComptUtils.generateToolArr(item.tips).map((toolstr, index1) =>  
                              <li key={index1}>{toolstr}</li> 
                              )}
                          </ul>
                        </div> : ""}
                        {item.subTitle ? <span className="dc-mitem-subtitle">{item.subTitle}</span> : ""}
                      </div>
                      <p className="dc-map-num">
                        <span>{this.props.cusService[item.key] || 0}</span>
                      </p>
                      <div className="dc-mapnum-ratio" style={{bottom: 25}}>
                        {typeof this.props.cusService[item.subNumKey] != "undefined" ? <span>环比：</span> : ""}
                        {typeof this.props.cusService[item.subNumKey] != "undefined" ? <span className={this.props.cusService[item.subNumKey] > 0 ? "panel-num-up" : "panel-num-down"}></span> : ""}
                        {typeof this.props.cusService[item.subNumKey] != "undefined" ? <span>{this.props.cusService[item.subNumKey]}%</span> : ""}
                        </div>
                      {(index === arr.length - 1 || (index + 1) % 3 === 0)? "" : <i className="dc-map-split"></i>}
                    </div>
                  )}          
              </div>
            </div>
          </div>
        </div>  
        <div className="dc-chart-wrapper">
          {CusChartKey.map((item, index) => 
            <div className="dc-chart-item" key={index} style={{width: "33.33%"}}>
              <div className="dc-chart">
                <p className="dc-chart-title">{item.name}
                {item.unit ? <span style={{fontSize: 14, paddingLeft: 10}}>{item.unit}</span> : ""}
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