import React, {Component} from 'react';

export default class TopPanel extends Component{
  constructor(props){
    super(props);
  }
  render(){
    let data = this.props.data;
    let pinData = [{
      title: "机票金额",
      allYearTitle: "全年累计",
      allYearNumber: (data.ticketPrice.grandTotalFee || 0) + "万",
      rio: data.ticketPrice.rate || 0,
      mainNum: data.ticketPrice.airfareFee || 0,
      unit: "万"
    },{
      title: "机票均价",
      allYearTitle: "全年均价",
      allYearNumber: (data.ticketAvgPrice.grandAverage || 0) + "元",
      rio: data.ticketAvgPrice.rate || 0,
      mainNum: data.ticketAvgPrice.airfareAverage || 0,
      unit: "元"
    },{
      title: "酒店金额",
      allYearTitle: "全年累计",
      allYearNumber: (data.hotelPrice.grandTotalFee || 0) + "万",
      rio: data.hotelPrice.rate || 0,
      mainNum: data.hotelPrice.hotelFee || 0,
      unit: "万"
    },{
      title: "酒店均价",
      allYearTitle: "全年均价",
      allYearNumber: (data.hotelAvgPrice.grandAverage || 0) + "元",
      rio: data.hotelAvgPrice.rate || 0,
      mainNum: data.hotelAvgPrice.hotelAverage || 0,
      unit: "元"
    },{
      title: "携程商旅平均折扣",
      allYearTitle: "全年平均折扣",
      allYearNumber: (data.xcTicketDiscount.grandAverage || 0) + "%",
      rio: data.xcTicketDiscount.rate || 0,
      mainNum: data.xcTicketDiscount.xcDiscount || 0
    },{
      title: "集团机票平均折扣",
      allYearTitle: "全年平均折扣",
      allYearNumber: (data.orgTicketDiscount.grandAverage || 0) + "%",
      rio: data.orgTicketDiscount.rate || 0,
      mainNum: data.orgTicketDiscount.discount || 0
    }];
    let pinStyle = [{
      bgColor: {
        backgroundColor: "#89abf6"
      }, 
      lineColor: {
        borderColor: "#81a1e6"
      }
    },{
      bgColor: {
        backgroundColor: "#b4b6f7"
      }, 
      lineColor: {
        borderColor: "#a3a5ea"
      }
    },{
      bgColor: {
        backgroundColor: "#70a4fa"
      }, 
      lineColor: {
        borderColor: "#6a9df0"
      }
    },{
      bgColor: {
        backgroundColor: "#f89fa4"
      }, 
      lineColor: {
        borderColor: "#e6979b"
      }
    },{
      bgColor: {
        backgroundColor: "#b4b6f7"
      }, 
      lineColor: {
        borderColor: "#a3a5ea"
      }
    },{
      bgColor: {
        backgroundColor: "#70a4fa"
      }, 
      lineColor: {
        borderColor: "#6a9df0"
      }
    }]
    return <div className="fchart-container xiechenghead">
      <div className="total-wrapper row">
        <div className="col-lg-6">
          <div className="fcontainer top-total-pin">
            <h3>差旅费总额</h3>
            <p>
              <span className="panel-big-num">{data.tripTotal.totalFee || 0}</span>
              <span className="panel-big-num" style={{fontSize: 18}}>万</span>
              <span className="panel-ratio">（环比：
                <span className={data.tripTotal.rate > 0 ? "panel-num-up" : "panel-num-down"}>{data.tripTotal.rate}</span>）
              </span>
            </p>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="fcontainer top-total-pin">
            <h3>全年累计差旅费总额</h3>
            <p>
              <span className="panel-big-num">{data.tripTotal.grandTotalFee || 0}</span>
              <span className="panel-big-num" style={{fontSize: 18}}>万</span>
            </p>
          </div>
        </div>
      </div>
      <div className="row">
          {pinData.map((item, index) => 
            <div className="col-md-4 col-lg-2" key={index}>
              <div className="pin-item fcontainer" style={pinStyle[index]["bgColor"]}>
                <div className="pin-title-wrapper" style={pinStyle[index]["lineColor"]}>
                  <span className="pin-title">{item.title}</span>
                </div>
                <p className="pin-num">{item.mainNum}<span style={{fontSize: 18}}>{item.unit}</span></p>
                <span className="pin-total-num">{item.allYearTitle}：{item.allYearNumber}</span>
                <p>环比：
                  <span className={item.rio < 0 ? "panel-num-down" : "panel-num-up"}>{item.rio}%</span>
                </p>
              </div>
            </div>
            )}
        </div>
      </div>
  }
}