import React, {Component} from 'react';

export default class SecPanel extends Component{
  constructor(props){
    super(props);
    this.color = 	["#5888f4", "#94b3fa", "#c0a1fe", "#a9e3af", "#fa939f", "#a9e3af"];
    this.state = {
      curActiveState: this.props.defaultValue
    }
  }
  clickPanelItem(item){
    this.setState({
      curActiveState: item.key
    });
    if(this.props.clickFn) this.props.clickFn(item);
    if(this.props.jumpFn) this.props.jumpFn(item.link);
  }
  render(){
    return <div className="dashsec-panel">
        <div className="dashsec-panel-wrapper">
        {this.props.data.map((item, index, arr) => 
          <div className={`${item.key === this.state.curActiveState ? "active " : ""}dashsec-pitem`} key={index} 
          style={{width: `${100/arr.length}%`}}
          onClick={this.clickPanelItem.bind(this, item)}
          >
            <b className="dashsec-ptitle">{item.title}</b>
            <div className="dashsec-num" style={{color: item.key === this.state.curActiveState ? "#fff" : this.color[index]}}>
              <b>{typeof item.num == "undefined" ? "-" : item.num}</b>
              {item.unit ? <b style={{fontSize: 16, paddingLeft: 10}}>{item.unit}</b> : ""}
            </div>
            {(index === (arr.length - 1) || item.key === this.state.curActiveState) ? "" : <span className="dashsec-splitline"></span>}
            {typeof item.ratio === "undefined" ? <div className="dashsec-ratio"></div> : 
            <div className="dashsec-ratio">
              <span style={{paddingRight: 10}}>环比: </span>
              <span className={item.ratio > 0 ? "panel-num-up" : "panel-num-down"}></span>
              <span>{item.ratio}%</span>
            </div>}
          </div>
          )}
        </div>
      </div>
  }
}