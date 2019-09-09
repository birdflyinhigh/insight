import React, {Component} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer, LabelList} from 'recharts';
import {Methods} from '../tools/util';
import CusLegend from './Legend';
import CusTooltips from './Tooltips';
export default class CusBarChart extends Component{
  constructor(props){
    super(props);
  }
  clickxAxis(option){
    if(this.props.config.link){
      this.props.fn(this.props.config.link, option.value);
    }
    return false;    
  }
  xFormatter(optional){
     if(this.props.config.xAxisUnit){
      return optional + this.props.config.xAxisUnit;
    }
    return optional;
  }
  tickFormatter(optional){
    return optional;
  }
  clickBar(option){
    if(this.props.config.link){
      this.props.fn(this.props.config.link, option.name);
    }
    return false;
  }
  render(){
    const {data, config} = this.props;
    return <div>
        {!data.loading ? <div style={{lineHeight: config.height + 'px', textAlign: "center"}}>暂无权限</div>: data.data.length === 0 ? <div style={{lineHeight: config.height + 'px', textAlign: "center"}}>暂无数据</div> : 
        <ResponsiveContainer width="100%" height={config.height}>
                  <BarChart data={data.data} margin={{top: 5, right: 30, left: 30, bottom: 5}}>
                    <XAxis dataKey="name" onClick={this.clickxAxis.bind(this)}
                     tickFormatter={this.xFormatter.bind(this)}>
                      <Label value={config.xAxisLable} offset={0} position="insideBottom" />
                    </XAxis>
                    {/*<YAxis label={{ value: config.yAxisLabel, angle: -90, position: 'left'}}/>*/}
                    <YAxis yAxisId="left"/>
                    <YAxis orientation="right" yAxisId="1" tickFormatter={this.tickFormatter.bind(this)}/>
                    <Tooltip content={CusTooltips} names={data.name} selfunit={config.toolunit} />
                    {config.showLegend ? <Legend content={CusLegend} dataKey={data.dataKey} data={data} color={config.color}/> : ""}
                    {data.dataKey.map((key, index) => {
                      if(config.secondYIndex && index >= config.secondYIndex){
                          return <Bar dataKey={key} fill={config.color[index]} yAxisId="1" key={index} maxBarSize={30} onClick={this.clickBar.bind(this)}>
                          {index == 1 && config.showsaveRate ? <LabelList dataKey="saverate" position="top" /> : ""}
                         </Bar>
                      }else{
                        return <Bar dataKey={key} fill={config.color[index]} yAxisId="left" key={index} maxBarSize={30} onClick={this.clickBar.bind(this)}>
                          {index == 1 && config.showsaveRate ? <LabelList dataKey="saverate" position="top" /> : ""}
                         </Bar>
                       
                      }
                    })
                      }
                  </BarChart>
                </ResponsiveContainer>}
      </div>
  }
}