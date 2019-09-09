import React, {Component} from 'react';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import CusLegend from './Legend';
import CusTooltips from './Tooltips';

export default class CusLineChart extends Component{
  constructor(props){
    super(props);
  }
  tickFormatter(optional){
    if(this.props.config.yAxisUnit){
      return optional + this.props.config.yAxisUnit;
    }
    return optional;   
  }
  xFormatter(optional){
     if(this.props.config.xAxisUnit){
      return optional + this.props.config.xAxisUnit;
    }
    return optional;
  }
  clickxAxis(option){
    if(this.props.config.link){
      this.props.fn(this.props.config.link, option.value);
    }
    return false;    
  }
  clickLine(option){
    if(this.props.config.link){
      this.props.fn(this.props.config.link, option.payload.name);
    }
    return false; 
  }
  render(){
    const {data, config} = this.props;
    return <div>
      {!data.loading ? <div style={{lineHeight: config.height + 'px', textAlign: "center"}}>暂无权限</div>: data.data.length === 0 ? <div style={{lineHeight: config.height + 'px', textAlign: "center"}}>暂无数据</div> : 
      <ResponsiveContainer width="100%" height={config.height}>
              <LineChart data={data.data} margin={{top: 5, right: 30, left: 30, bottom: 5}}>
                <XAxis dataKey="name" onClick={this.clickxAxis.bind(this)} tickFormatter={this.xFormatter.bind(this)}/>
                <YAxis label={{ value: config.yAxisLabel, angle: -90, position: 'insideLeft' }}  tickFormatter={this.tickFormatter.bind(this)}/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip content={CusTooltips} names={data.name} lineStart={0} selfunit={config.toolunit} />
                <Legend content={CusLegend} dataKey={data.dataKey} data={data} color={config.color}/>
                {data.dataKey.map((key, index) => {
                   return <Line type="linear" key={index} dataKey={key} strokeWidth={2} stroke={config.color[index]} 
                   activeDot={{ onClick: this.clickLine.bind(this) }} onClick={this.clickLine.bind(this)}/>
                  })
                }
              </LineChart>
            </ResponsiveContainer>}
      </div>
  }
}