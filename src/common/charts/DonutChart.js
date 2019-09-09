import React, {Component} from 'react';
import {PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell, label} from 'recharts';
import {Methods} from '../tools/util';

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  debugger
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
  console.log('props', this);
 return (
   <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
     {`${(100).toFixed(0)}%`}
   </text>
 );
};
export default class DonutChart extends Component{
  constructor(props){
    super(props);
  }
  clickChart(option){
    if(this.props.config.link){
      this.props.fn(this.props.config.link, option.name, this.props.config.isPie);
    }
    return false; 
  }
  mouseover(option){
    // console.log(option, this);
  }
  render(){
    const {data, config} = this.props;
    return <div>
        {!data.loading ? <div style={{lineHeight: config.height + 'px', textAlign: "center"}}>暂无权限</div>: data.data.length === 0 ? <div style={{lineHeight: config.height + 'px', textAlign: "center"}}>暂无数据</div> : 
          <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={data.data} cx="50%" cy="50%" dataKey={config.dataKey} innerRadius={config.innerRadius} outerRadius={config.outerRadius}
                    onClick={this.clickChart.bind(this)} onMouseOver={this.mouseover.bind(this)} label={renderCustomizedLabel}>
                      {
                        data.data.map((entry, index) => <Cell key={index} fill={config.color[index % config.color.length]}/>)
                      }    
                    </Pie>
                    <Tooltip/>
                    <Legend />     
                  </PieChart>     
               </ResponsiveContainer>}
      </div>
  }
}