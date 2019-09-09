import React, {Component} from 'react';
import {PieChart, Pie, Legend, Tooltip, Cell} from 'recharts';

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
     
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);

 return (
   <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
     {`${(percent * 100).toFixed(0)}%`}
   </text>
 );
};
export default class CusPieChart extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const {data, config} = this.props;
    return <div>
        {!data.loading ? <div style={{lineHeight: config.height + 'px', textAlign: "center"}}>暂无权限</div>: data.data.length === 0 ? <div style={{lineHeight: config.height + 'px', textAlign: "center"}}>暂无数据</div> : 
          <PieChart width={config.width} height={config.height}>
                  <Pie isAnimationActive={true} data={data} cx={config.cx} cy={config.cy} outerRadius={config.outerRadius} fill="#8884d8" isAnimationActive={false} label>
                  {
                    data.map((entry, index) => <Cell fill={config.color[index % config.color.length]}/>)
                  }
                  </Pie>
                  <Legend/>
                  <Tooltip/>
               </PieChart>}
      </div>
  }
}