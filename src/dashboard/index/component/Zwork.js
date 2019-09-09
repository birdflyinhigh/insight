import React, {Component} from 'react';
import EConfig from '../../../common/charts/EConfig';
import NodataEcharts from '../../../common/charts/NodataECharts';
import {ZworkKey} from  '../constant';
import {Comment} from '../../comment';
import {ComptUtils} from '../../../common/tools/util';
import "echarts/map/js/china";
export default class Zwork extends Component{
  constructor(props){
    super(props);
  }
  jumpZworkPage = () => {
    this.props.jumpfn("/manager/zwork");
  }
  render(){
    let zworkMap = {
      data: this.props.zworkMap,
      option: EConfig.CNMapChart,
      config: {
        name: '八戒工场',
        color: ["#7e97f8", "#d3cff9"],
        mapFormatterKeys: [
          ["communityCount", "stationCount", "leaseStationRate", "enterCompanyCount", "revenue"],
          ["社区数", "工位数", "工位出租率", "入驻企业数", "年累计收入"]
        ],
        tips: `数据截至${this.props.zworkCollect.dataTime}`
      },
      height: 380
    };
    return <div className="dashzwork-analysis">
      <h3 className="dashsection-title">八戒工场分析
        <span style={{fontSize: 14, fontWeight: "normal", paddingLeft: 10}}>
          收入为当年累计值，其余指标为当前状态值
        </span>
        <div className="help helpn">
          <ul className="intro">
            {ComptUtils.generateToolArr(Comment.zworkpart).map((toolstr, index1) =>  
              <li key={index1}>{toolstr}</li> 
              )}
          </ul>
        </div>
      </h3>
      <div className="dz-body">
        <div className="dz-item-groups">
        {ZworkKey.map((item, index) => 
          <div className="dz-item-wrapper" key={index}>
            <div className="dz-item" onClick={this.jumpZworkPage}>
              {!item.subTitle1 ? <div>
                <p className="dz-item-title">{item.name}</p>
                <p className="dz-item-num">{this.props.zworkCollect[item.key] || 0}</p>
              </div> : <div className="self-clearfix">
                <p className="dz-isubtitle">{item.name}
                  <span className="dz-item-title-num">{this.props.zworkCollect[item.key] || 0}</span>
                </p>
                <p className="dz-isubtitle" style={{float: "left"}}>{item.subTitle1}
                  <span className="dz-item-title-num">{this.props.zworkCollect.communityTypeCount ? this.props.zworkCollect.communityTypeCount[0].communityCount : 0}</span>
                </p>
                <p className="dz-isubtitle" style={{float: "right"}}>{item.subTitle2}
                  <span className="dz-item-title-num">{this.props.zworkCollect.communityTypeCount ? this.props.zworkCollect.communityTypeCount[1].communityCount : 0}</span>
                </p>
              </div>}
            </div>
          </div>
          )} 
          <span className="dz-tips">数据截至{this.props.zworkCollect.dataTime}</span>
        </div>
        <div className="dz-cnmap-wrapper">
          <div className="dc-chart">
            <NodataEcharts config={zworkMap}/>
          </div>
        </div>
      </div>
    </div>
  }
}