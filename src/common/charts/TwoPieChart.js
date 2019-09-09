import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import {PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell} from 'recharts';
import {Methods} from '../tools/util';
import {getPieOption} from '../charts/EDonut';
// function getPiePointsAxis(data, r, config) {
//   let padding = 0;
//   let tocenterWidth = this.eachContainerWidth * (+config.cx1.split("%")[0])/100;
//   let tocenterHeigh = config.height * (+config.cy1.split("%")[0])/100;
//     if (r && data.length > 0) {
//         let sum = data.reduce((sum, item) => {
//             return sum + item.value;
//         }, 0);
//         let angles = Math.round(360 * (data[0].value / sum) / 2);
//         if(angles > 90){
//         	angles = 90;
//         }
//         let angleHeight = Math.sin(Math.PI / 180 * angles) * r;
//         let angleWidth = Math.cos(Math.PI / 180 * angles) * r;
//         return {
//             x1: tocenterWidth + angleWidth - padding,
//             y1: tocenterHeigh - angleHeight + padding,
//             x2: tocenterWidth + angleWidth - padding,
//             y2: tocenterHeigh + angleHeight + padding
//         };
//     }else{
//     	return {
//     		x1: 0,
//         y1: 0,
//         x2: 0,
//         y2: 0
//     	}
//     }
// }
// function getPie2Points(containerWidth, r, config){
//   return {
//     x1: containerWidth/2 * (+config.cx2.split("%")[0])/100,
//     y1: config.height/2 * (+config.cy2.split("%")[0])/100 - r,
//     x2: containerWidth/2 * (+config.cx2.split("%")[0])/100,
//     y2: config.height/2 * (+config.cy2.split("%")[0])/100 + r,
//   }
// }
function getPiePointsAxis(data) {
    if (this.r1 && data.length > 0) {
      let sum = data.reduce((sum, item) => {
          return sum + item.value;
      }, 0);
      let angles = (360 * (data[0].value / sum) / 2).toFixed(2);
        if(angles > 90){
        	angles = 90;
        }
        let angleHeight = Math.sin(Math.PI / 180 * angles) * this.r1;
        let angleWidth = Math.cos(Math.PI / 180 * angles) * this.r1;
        return {
            x1: this.eachContainerWidth/4 + angleWidth,
            y1: this.props.config.height/2 - angleHeight,
            x2: this.eachContainerWidth/4 + angleWidth,
            y2: this.props.config.height/2 + angleHeight
        };
    }else{
    	return {
    		x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
    	}
    }
}

function getPie2Points(containerWidth, containerHeight, r2){
  console.log(r2)
  return {
    x1: Math.round(containerWidth*3/4),
    y1: Math.round(containerHeight/2 - r2),
    x2: Math.round(containerWidth*3/4),
    y2: Math.round(containerHeight/2 + r2),
  }
}
export default class CusBarChart extends Component{
  constructor(props){
    super(props);
    this.style = {
      svgcontainer: {
        width: "100%",
        height: "100%"
      }
    }
  }
  componentDidMount(){
    this.eachContainerWidth = document.getElementById("#combine-container").offsetWidth ;
    // this.r1 = this.props.config.outerRadius1;	//radius
    // this.r2 = this.props.config.outerRadius2;
    this.r1 = Math.min(this.props.config.height, this.eachContainerWidth/2) * 0.7/2;
    this.r2 = Math.min(this.props.config.height, this.eachContainerWidth/2) * 0.5/2;
    this.pie2Axis = getPie2Points.bind(this)(this.eachContainerWidth, this.props.config.height, this.r2);
  }
  render(){
    const {pdata1, config, pdata2} = this.props;
    let data1 = pdata1.data;
    let data2 = pdata2.data;
    let pie1Axis = getPiePointsAxis.bind(this, data1)();
    console.log(pie1Axis);
    return <div id="#combine-container" style={{position: "relative"}}>
        {!pdata1.loading || !pdata2.loading ? <div style={{lineHeight: config.height + 'px', textAlign: "center"}}>暂无权限</div>: data1.length == 0 || data2.length == 0 ? <div style={{lineHeight: config.height + 'px', textAlign: "center"}}>暂无数据</div> : 
          <div className="twopie-wrapper">
            <div className="twopie-item">
              <ReactEcharts
              option={getPieOption(data1, {radius: "70%"})}
              notMerge={true}
              lazyUpdate={true} 
              />
            </div>
            <div className="twopie-item">
            <ReactEcharts
              option={getPieOption(data2, {})}
              notMerge={true}
              lazyUpdate={true} 
              />
            </div>
            {pie1Axis && this.pie2Axis ? <div style={{position: "absolute",width: "100%", height: "100%"}}>
            <svg style={this.style.svgcontainer}>
              <g>
                <line x1={pie1Axis.x1} y1={pie1Axis.y1} x2={this.pie2Axis.x1} y2={this.pie2Axis.y1} stroke="#bdbdbd"/>
                <line x1={pie1Axis.x2} y1={pie1Axis.y2} x2={this.pie2Axis.x2} y2={this.pie2Axis.y2} stroke="#bdbdbd"/>
              </g>
            </svg>
            </div>: ""}
          </div>
                // <ResponsiveContainer width="100%" height={config.height}>
                //   <PieChart>
                //     <Pie isAnimationActive={false} data={data1} cx={config.cx1} cy={config.cy1} outerRadius={config.outerRadius1} fill="#8884d8"
                //     startAngle={config.startAngle} endAngle={360 + config.startAngle} label>
                //       {
                //       data1.map((entry, index) => <Cell fill={config.color1[index % config.color1.length]} key={index}/>)
                //       }
                //     </Pie>
                //     <Pie data={data2} cx={config.cx2} cy={config.cy1} outerRadius={config.outerRadius2} label>
                //     {
                //       data2.map((entry, index) => <Cell fill={config.color2[index % config.color2.length]} key={index}/>)
                //     }
                //     </Pie>
                //     <Tooltip/>
                //     {pie1Axis && this.pie2Axis ? <g>
                //       <line x1={pie1Axis.x1} y1={pie1Axis.y1} x2={this.pie2Axis.x1} y2={this.pie2Axis.y1} stroke="#bdbdbd"/>
                //       <line x1={pie1Axis.x2} y1={pie1Axis.y2} x2={this.pie2Axis.x2} y2={this.pie2Axis.y2} stroke="#bdbdbd"/>
                //     </g> : ""}
                //   </PieChart>
                // </ResponsiveContainer>
              }
      </div>
  }
}