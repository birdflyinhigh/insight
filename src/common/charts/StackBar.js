import React, {Component} from 'react';
import {Area, Line, ComposedChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer, LabelList} from 'recharts';
import {Methods} from '../tools/util';
import CusTooltips from './Tooltips';
import CusLegend from './Legend';
export default class CusBarChart extends Component{
  constructor(props){
    super(props);
  }
  clickAxis(optional){
    if(this.props.clickFn.clickAxis){
      this.props.clickFn.clickAxis(optional.value);
    }
  }
  clickBar(optional){
    if(this.props.clickFn.clickBar){
      this.props.clickFn.clickBar(optional.payload.name);
    }
  }
  render(){
    const {data, config} = this.props;
    return <div>
        {!data.loading ? <div style={{lineHeight: config.height + 'px', textAlign: "center"}}>暂无权限</div>: data.data.length === 0 ? <div style={{lineHeight: config.height + 'px', textAlign: "center"}}>暂无数据</div> : 
        <ResponsiveContainer width="100%" height={config.height}>
          <BarChart data={data.data} margin={config.margin} layout="vertical">
           <XAxis type="number">
              <Label value={config.xAxisLable} offset={0} position="insideBottom" />
            </XAxis>
            <YAxis dataKey="name" type="category" label={{ value: config.yAxisLabel, angle: -90, position: 'left'}} onClick={this.clickAxis.bind(this)}/>
            <Tooltip content={CusTooltips} names={data.name} selfunit={config.toolunit}/>
            {config.showLegend ? <Legend  content={CusLegend} dataKey={data.dataKey} data={data} color={config.color}/> : ""}
            {data.dataKey.map((key, index) => {
               return <Bar dataKey={key} fill={config.color[index]} key={index} stackId="a" barSize={30} onClick={this.clickBar.bind(this)}>
                {index == 1 && config.showsaveRate ? <LabelList dataKey="saverate" position="top" /> : ""}
               </Bar>
              })
            }
          </BarChart>
        </ResponsiveContainer>}
      </div>
  }
}