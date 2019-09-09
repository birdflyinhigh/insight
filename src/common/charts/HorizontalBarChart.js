import React, {Component} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer, LabelList} from 'recharts';
import {Methods} from '../tools/util';
import CusTooltips from './Tooltips';
export default class HorizontalBarChart extends Component{
  constructor(props){
    super(props);
  }
  clickxAxis(option){
    if(this.props.config.link){
      this.props.fn(this.props.config.link, option.value);
    }
    return false;    
  }
  render(){
    const {data, config} = this.props;
    return <div>
        {!data.loading ? <div style={{lineHeight: config.height + 'px', textAlign: "center"}}>暂无权限</div>: data.data.length === 0 ? <div style={{lineHeight: config.height + 'px', textAlign: "center"}}>暂无数据</div> : 
          <ResponsiveContainer width="100%" height={config.height}>
                <BarChart data={data.data} layout="vertical" margin={config.margin ? config.margin : { top: 5, right: 55, bottom: 5, left: 85 }}>
                  <XAxis type="number" onClick={this.clickxAxis.bind(this)}>
                    <Label value={config.xAxisLable} offset={0} position="insideBottom" />
                  </XAxis>
                  <YAxis dataKey="name" type="category" label={{ value: config.yAxisLabel, angle: -90, position: 'left'}}/>
                  <Tooltip content={CusTooltips} names={data.name} selfunit={config.toolunit} />
                  {config.showLegend ? <Legend/> : ""}
                  {data.dataKey.map((key, index) => {
                     return <Bar dataKey={key} fill={config.color[index]} key={index} maxBarSize={30} >
                        <LabelList dataKey={key} position="right" formatter={(optional) => `${optional}${config.toolunit}`}/>
                     </Bar>
                    })
                  }
                </BarChart>
                </ResponsiveContainer>}
      </div>
  }
}