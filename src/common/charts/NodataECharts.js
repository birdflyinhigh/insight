import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
export default class NodataEcharts extends Component{
  constructor(props){
    super(props);
  }
  onChartReadyCallback(chart){
    if(this.props.onChartReadyCallback){
      this.props.onChartReadyCallback(chart);
    }
    return ;
  }
  render(){
    const {data, option, height, config} = this.props.config;
    let lineHeight = height - 36 + 'px';
    console.log(option);
    return <div>
      {!data.loading ? <div style={{lineHeight: lineHeight, textAlign: "center"}}>暂无权限</div>:
      data.data.length === 0 ? <div style={{lineHeight: lineHeight, textAlign: "center"}}>暂无数据</div> : 
      <ReactEcharts
      option={option(config, data)}
      notMerge={true}
      lazyUpdate={true}
      style={{height: height - 70}}
      onChartReady={this.onChartReadyCallback.bind(this)}
      />}
    </div>
  }
  
}
