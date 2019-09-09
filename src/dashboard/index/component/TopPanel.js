import React, {Component} from 'react';
import {Comment} from '../../comment';
import {ComptUtils} from  '../../../common/tools/util';
export default class TopPanel extends Component{
  constructor(props){
    super(props);
  }
  clickItem(item){
    if(!item.link) return ;
    this.props.jumpFn(item);
  }
  render(){
    let pannelData = [{
      title: "成交订单数",
      num: this.props.data.orderNumber.data || 0,
      subNum: this.props.data.orderNumber.rate || 0,
      subTitle: "环比:",
      subunit: "%",
      link: "/manager/eorder",
      color: "#89acfb",
      tips: Comment.porder
    },{
      title: "GMV",
      num: (this.props.data.gmv.data || 0),
      subNum: this.props.data.gmv.rate || 0,
      subTitle: "环比:",
      subunit: "%",
      link: "/manager/eincome",
      color: "#c1b5fa",
      unit: "万",
      tips: Comment.pgmv
    },{
      title: "客户消费留存率",
      num: (this.props.data.consumeRate.rate || 0) + "%",
      link: "/manager/cusrate",
      color: "#84e1bf",
      subTitle: "该指标为前12月累计",
      tips: Comment.cusrate
    },{
      title: "核心雇主数",
      num: this.props.data.keyEmploy.value || 0,
      link: "/manager/kemploy",
      // subTitle: "所选时段新增:",
      // subNum: this.props.data.keyEmploy.rate,
      color: "#89acfb",
      subTitle: "该指标为当年累计",
      tips: Comment.keyemploy
    },{
      title: "核心商家数",
      num: this.props.data.keyService.value || 0,
      link: "/manager/keyshop",
      subTitle: "该指标为当年累计",
      // subTitle: "所选时段新增:",
      // subNum: this.props.data.keyEmploy.rate,
      color: "#89acfb",
      tips: Comment.keyservice
    }]
    return <div className="dashtop-panel self-clearfix">
      {pannelData.map((item, index) => 
        <div className="dashtop-panel-iwrapper" key={index}
        onClick={this.clickItem.bind(this, item)}>
          <div className="dashtop-panel-item">
            <div className="dtpanel-item-title" style={{backgroundColor: item.color}}>{item.title}
              <div className="help">
                <ul className="intro">
                  {ComptUtils.generateToolArr(item.tips).map((toolstr, index1) =>  
                    <li key={index1}>{toolstr}</li> 
                    )}
                </ul>
              </div>
            </div>
            <p className="dtpanel-item-num" style={{color: item.color}}>{item.num}
              <span style={{fontSize: 18, paddingLeft: 10}}>{item.unit || ""}</span>
            </p>
            <div className="dtpanel-item-subnum">
              <div>
                <span style={{paddingRight: 5}}>{item.subTitle ? item.subTitle : ""}</span>
                {typeof item.subNum != "undefined" ? <span className={item.subNum > 0 ? "panel-num-up" : "panel-num-down"}></span> : ""}
                {typeof item.subNum != "undefined" ? <span>{item.subNum + (item.subunit ? item.subunit : "")}</span> : ""}
              </div>
            </div>
          </div>
        </div>
        )}   
    </div>
  }
}