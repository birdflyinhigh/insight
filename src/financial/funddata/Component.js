import React, {Component} from 'react';

function PanelItem(props){
  return <div className="fpanel-item" style={props.detail ? {minHeight:  props.height} : {}}>
            <p className="ffund-item-title">{props.data.name}</p>
            <p className="ffund-item-data">
              <b className="">{props.data.num != undefined ? props.data.num.toLocaleString() : 0}</b>万元
            </p>
            {props.detail ? <ul className="ffund-detail">
              {props.detail.map((item, index) => 
                <li className="ffund-detail-item" key={index}>
                  <b className="ffund-detail-title">{item.typeName}</b>
                  <div className="ffund-detail-num">
                    <b>{item.accNum.toLocaleString()}</b>
                    <span>万元</span>
                  </div>
                </li>
              )}
            </ul> : ""}
        </div>
}
export default class ManageBody extends Component{
  constructor(props){
    super(props);
    this.nameArray = ["年初余额", "累计收入", "累计支出", "月末余额"]
  }
  render(){
    let data = this.props.data;
    return <div className="container-body">
        <div className="row">
            <h3 className="section-title">合计</h3>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <PanelItem data={{name: this.nameArray[0], num: data.totalData.balance}}/>
            </div>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <PanelItem data={{name: this.nameArray[1], num: data.totalData.income}}/>
            </div>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <PanelItem data={{name: this.nameArray[2], num: data.totalData.cost}}/>
            </div>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <PanelItem data={{name: this.props.time + this.nameArray[3],
                 num: data.totalData.month_balance}}/>
            </div>
        </div>
        <div className="row">
            <h3 className="section-title">上市体系</h3>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <PanelItem data={{name: this.nameArray[0], num: data.marketData.balance}}
               detail={this.props.data.marketYearDetail}
               height={data.maxMarketLength * 30 + 85}
               />
            </div>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <PanelItem data={{name: this.nameArray[1], num: data.marketData.income}} 
              detail={this.props.data.marketIncomeDetail}
              height={data.maxMarketLength * 30 + 85}
              />
            </div>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <PanelItem data={{name: this.nameArray[2], num: data.marketData.cost}}
               detail={this.props.data.marketPayDetail}
               height={data.maxMarketLength * 30 + 85}
               />
            </div>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <PanelItem data={{name: this.props.time + this.nameArray[3], num: data.marketData.month_balance}} 
              detail={this.props.data.marketMonthRestDetail}
              height={data.maxMarketLength * 30 + 85}
              />
            </div>
        </div>
        <div className="row">
            <h3 className="section-title">非上市体系</h3>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <PanelItem data={{name: this.nameArray[0], num: data.unmarketData.balance}} 
              detail={this.props.data.yearDetail}
              height={data.maxUnmarketLength * 30 + 85}
              />
            </div>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <PanelItem data={{name: this.nameArray[1], num: data.unmarketData.income}} 
              detail={this.props.data.incomeDetail}
              height={data.maxUnmarketLength * 30 + 85}
              />
            </div>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <PanelItem data={{name: this.nameArray[2], num: data.unmarketData.cost}} 
              detail={this.props.data.payDetail}
              height={data.maxUnmarketLength * 30 + 85}
              />
            </div>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <PanelItem data={{name: this.props.time + this.nameArray[3], num: data.unmarketData.month_balance}} 
              height={data.maxUnmarketLength * 30 + 85}
              detail={this.props.data.monthRestDetail}/>
            </div>
        </div>
      </div>
  }
}