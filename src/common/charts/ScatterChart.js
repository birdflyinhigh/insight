import React, {Component} from 'react';
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from 'recharts';

export default class CusScatterChart extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const {data, config} = this.props;
    return <div>
        <ScatterChart width={1200} height={300} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
          <XAxis dataKey={'x'} type="number">
            <Label value="服务商活跃度" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis dataKey={'y'} type="number" label={{ value: "服务商成交金额", angle: -90, position: 'left'}}/>
          <Scatter data={data} fill='#8884d8'/>
          <Tooltip cursor={{strokeDasharray: '3 3'}}/>
      </ScatterChart>
      </div>
  }
}