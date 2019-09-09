import React, {Component} from 'react';
import {ResponsiveContainer, ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {Methods} from '../tools/util';
import CusLegend from './Legend';
import CusTooltips from './Tooltips';
// function getId(value, data){
//   let id= "";
//   data.forEach((item, index) => {
//     if(item.name.indexOf(value) > -1){
//       id = item.id
//     }
//   });
//   return id;
// }
function generateLegendColor(data, config){
  let barColor = config.barColor.slice(0, data.barKey.length);
  let lineColor = config.lineColor.slice(0, data.lineKey.length);
  return barColor.concat(lineColor);
}
export default class LineBarChart extends Component{
  constructor(props){
    super(props);
  }
  clickxAxis(option){
    if(this.props.config.link){
      let id = option.value;
      if(this.props.config.transId){
        id = option.value.substr(4);
      }
      this.props.fn(this.props.config.link, id);
    }
    return false;   
  }
  tickFormatter(optional){
    if(this.props.config.yAxisUnit){
      return optional + this.props.config.yAxisUnit;
    }
    return optional;   
  }
  xLabelFormatter(optional){
    if(this.props.config.cutLabel && optional.length > 4){
      return optional.substr(0, this.props.config.cutLabel)
    }else if(this.props.config.xAxisUnit){
      return optional + this.props.config.xAxisUnit;
    }
    return optional;
  }
  clickBar(option){
    if(this.props.config.link){
      let id = option.name;
      if(this.props.config.transId){
        id = option.name.substr(4);
      }
      this.props.fn(this.props.config.link, id);
    }
    return false;
  }
  
  render(){
    const {data, config} = {...this.props};
    return <div>
    {!data.loading ? <div style={{lineHeight: config.height + 'px', textAlign: "center"}}>暂无权限</div>: data.data.length === 0 ? <div style={{lineHeight: config.height + 'px', textAlign: "center"}}>暂无数据</div> : 
        <ResponsiveContainer width="100%" height={config.height}>
            <ComposedChart data={data.data} margin={config.margin ? config.margin : {top: 5, right: 15, left: 15, bottom: 5}}>
              <XAxis dataKey={config.xDataKey} angle={config.rotate ? config.rotate : 0} interval={0} 
              tickFormatter={this.xLabelFormatter.bind(this)}
              onClick={this.clickxAxis.bind(this)}/>
              <YAxis yAxisId="left"/>
              <YAxis yAxisId="right" orientation="right" yAxisId="1" tickFormatter={this.tickFormatter.bind(this)}/>
              <Tooltip lineStart={data.barKey.length} selfunit={config.toolunit} content={CusTooltips} names={data.name}/>
              <Legend content={CusLegend} dataKey={data.barKey.concat(data.lineKey)} data={data}
               color={generateLegendColor(data, config)} wrapperStyle={{bottom: config.bottom || 5}} />
              <CartesianGrid stroke='#f5f5f5'/>
              {data.barKey.map((key, index) => 
                <Bar yAxisId="left" dataKey={key} fill={config.barColor[index % config.barColor.length]} maxBarSize={35} key={index} stackId={config.stackId ? config.stackId : undefined}
                onClick={this.clickBar.bind(this)}/>
              )}
              {data.lineKey.map((key, index) => 
                <Line yAxisId="right" type='linear' key={"line" + index} dataKey={key} strokeWidth={2} stroke={config.lineColor[index % config.lineColor.length]} yAxisId="1"
                unit={config.unit ? config.unit : ""}/>
              )}
            </ComposedChart>
          </ResponsiveContainer>}
        </div>
  }
}