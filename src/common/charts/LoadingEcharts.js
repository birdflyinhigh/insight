import React, {Component} from 'react';
import NodataEcharts from './NodataECharts';
export default class LoadingEcharts extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return <div>
      {this.props.config.data.hasLoaded ? <NodataEcharts config={this.props.config}/> : <div>
				<div style={{lineHeight: `${this.props.config.height - 25}px`, fontSize: 14, textAlign: "center"}}>正在加载</div>
			</div>}
    </div>
  }
}