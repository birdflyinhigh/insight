import React, {Component} from 'react';
import {Radar, RadarChart, PolarGrid,Tooltip, Legend,PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer} from 'recharts';

export default class CusRadarChart extends Component{
  constructor(props){
    super(props);
  }
  clickRadar(option){
    if(this.props.config.link){
      this.props.fn(this.props.config.link, option.value);
    }
    return false;    
  }
  formatName(optionnal){
    return this.props.data.data[optionnal.slice(3)]["indexTypeName"];
  }
  render(){
    const {data, config} = this.props;
    const CusTooltips = (props) => {
      if(props.active){
          return (<div className="tooltips-wrapper">
            <ul style={{padding: 0,margin: 0,textAlign: "left"}}>
              <li>{props.payload[0].payload.indexTypeName}:{props.payload[0].payload.score}</li>
            </ul>
          </div>);
      }
 
    }
    return <div>
      {!data.loading ? <div style={{lineHeight: config.height + 'px', textAlign: "center"}}>暂无权限</div>: data.data.length === 0 ? <div style={{lineHeight: config.height + 'px', textAlign: "center"}}>暂无数据</div> : 
      <ResponsiveContainer width="100%" height={config.height}>
              <RadarChart cx="50%" cy="50%" outerRadius={config.outerRadius} data={data.data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="axisKey" tickFormatter={this.formatName.bind(this)}
                onClick={this.clickRadar.bind(this)}/>
                <PolarRadiusAxis domain={[0, 1]}/>
                <Tooltip content={CusTooltips}  />
                <Radar name="" dataKey="score" stroke="none" fill={config.color} fillOpacity={0.6}/>
              </RadarChart>
            </ResponsiveContainer>}
      </div>
  }
}