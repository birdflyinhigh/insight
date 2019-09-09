import React from 'react';
import NodataECharts from './NodataECharts';
// export default class SumDonut extends Component{
//   constructor(props){
//     super(props);
//     this.wrapperRef = null;
    // this.getWrapperRef = element => {
    //   this.wrapperRef = element;
    // };
    // this.state = {
    //   left: 0,
    //   top: 0,
    //   width: 0
    // }
    
  // }
  // componentDidMount(){
    // const style = this.getTopPosition();
    // this.setState({
    //   left: style.left,
    //   top: style.top,
    //   width: style.width
    // });
  // }
  // getTopPosition = () => {
  //   const width = this.wrapperRef.clientWidth;
  //   const height = this.wrapperRef.clientHeight;
  //   const minBaseNum = Math.min(width, height);
  //   const position = this.getConfigCenter();
  //   const radiusRate = this.getConfigRadius();
  //   const halfRadius = (radiusRate *  minBaseNum) / 2;
  //   const wrapPad = this.props.wrapPad === undefined ? 30 : this.props.wrapPad;
  //   return {
  //     left: (width * position.centerLeft - halfRadius) / 100 + wrapPad,
  //     top: (height * position.centerTop) / 100 + 36,
  //     width: radiusRate * minBaseNum / 100
  //   }
  // }
  // getConfigCenter = () => {
  //   const config = this.props.config.config;
  //   let position = {
  //     centerLeft: 50,
  //     centerTop: 50
  //   };
  //   if(config.center){
  //     position.centerLeft = +(config.center[0].split("%")[0]);
  //     position.centerTop = +(config.center[1].split("%")[0]);
  //   }
  //   return position;
  // }
  // getConfigRadius = () => {
  //   const config = this.props.config.config;
  //   let outerRadius = 55;
  //   if(config.radius){
  //     outerRadius = +(config.radius[0].split("%")[0]);
  //   }
  //   return outerRadius;
  // }
//   render(){
//     return <div ref={this.getWrapperRef}>
//       {this.props.config.data.data.length ? <div className="donut-total"
//       style={{
//         left: this.state.left,
//         top: this.state.top,
//         width: this.state.width,
//         background: "#000"
//       }}>
//         <p>社区总数</p>
//         <p>{this.props.total}</p>
//       </div> : ""}
//       <NodataECharts config={this.props.config}/>
//       </div>
//   }
// }
function SumDonut({config, style={}, total, title}){
    return <div>
      {config.data.data.length ? <div className="donut-total"
      style={{
        left: style.left === undefined ? "35%" : style.left,
        top: style.top === undefined ? "53%" : style.top
      }}>
        <p>{title}</p>
        <p>{total}</p>
      </div> : ""}
      <NodataECharts config={config}/>
    </div>
}
export default SumDonut;