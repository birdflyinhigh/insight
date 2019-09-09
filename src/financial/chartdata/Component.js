import React, {Component} from 'react';
import {Select, Button} from 'antd';
import NodataEcharts from '../../common/charts/NodataECharts';
import EConfig from '../../common/charts/EConfig';
const Option = Select.Option;
export default class ManageBody extends Component{
  constructor(props){
    super(props);
    this.selectList = [{
      name: "收入",
      id: "income"
    },{
      name: "成本",
      id: "cost"
    },{
      name: "利润",
      id: "profit"
    },{
      name: "总资产",
      id: "total_balance"
    },{
      name: "负债",
      id: "debt"
    },{
      name: "净资产",
      id: "net_balance"
    }]
  };
  selectSecond(value){
    this.props.fns.selectSecond(value);
  }
  render(){
    let income= {
      data: this.props.data.income,
			option: EConfig.radiusBarOption,
			config: {
        barColor: ["#2a7bff"]
			},
			height: 385
    };
    let assets= {
      data: this.props.data.assets,
			option: EConfig.radiusBarOption,
			config: {
        barColor: ["#0ace7e"]
			},
			height: 385
    };
    let corporationCompare= {
      data: this.props.data.corporationCompare,
			option: EConfig.radiusBarOption,
			config: {
        barColor: ["#2a7bff"]
			},
			height: 385
    }
    return <div className="container-body">
        <div className="fchart-container row">
           <div className="col-lg-4 col-sm-6 col-xs-12">
              <div className="fcontainer" style={{height: 415}}>
                <p className="hrchart-title">收入
                  <span className="chart-subunit">(万元)</span>
                </p>
                <div className="ftop-info-group">
                  <b>{`2018年1月 - 2018年${this.props.month}月`}</b>
                  <b className="ftop-info-num">
                    累计：<span>{this.props.data.totalData.income}</span>万元
                  </b>
                </div>
                <NodataEcharts config={income}/>
              </div>
           </div>
           <div className="col-lg-4 col-sm-6 col-xs-12">
              <div className="fcontainer" style={{height: 415}}>
                <p className="hrchart-title">成本
                  <span className="chart-subunit">(万元)</span>
                </p>
                <div className="ftop-info-group">
                  <b>{`2018年1月 - 2018年${this.props.month}月`}</b>
                  <b className="ftop-info-num">
                    累计：<span>{this.props.data.totalData.cost}</span>万元
                  </b>
                </div>
                <NodataEcharts config={{...income, data: this.props.data.cost}}/>
              </div>
           </div>
           <div className="col-lg-4 col-sm-6 col-xs-12">
              <div className="fcontainer" style={{height: 415}}>
                <p className="hrchart-title">净利润
                  <span className="chart-subunit">(万元)</span>
                </p>
                <div className="ftop-info-group">
                  <b>{`2018年1月 - 2018年${this.props.month}月`}</b>
                  <b className="ftop-info-num">
                    累计：<span>{this.props.data.totalData.profit}</span>万元
                  </b>
                </div>
                <NodataEcharts config={{...income, data: this.props.data.netProfit}}/>
              </div>
           </div>
           <div className="col-lg-4 col-sm-6 col-xs-12">
              <div className="fcontainer">
                <p className="hrchart-title">总资产
                  <span className="chart-subunit">(万元)</span>
                </p>
                <NodataEcharts config={assets}/>
              </div>
           </div>
           <div className="col-lg-4 col-sm-6 col-xs-12">
              <div className="fcontainer">
                <p className="hrchart-title">负债
                  <span className="chart-subunit">(万元)</span>
                </p>
                <NodataEcharts config={{...assets, data: this.props.data.debt}}/>
              </div>
           </div>
           <div className="col-lg-4 col-sm-6 col-xs-12">
              <div className="fcontainer">
                <p className="hrchart-title">净资产
                  <span className="chart-subunit">(万元)</span>
                </p>
                <NodataEcharts config={{...assets, data: this.props.data.netAssets}}/>
              </div>
           </div>
        </div>
        <div className="row">
        <div className="col-lg-12">
          <div className="fcontainer">
            <p className="hrchart-title">{this.props.month}月二级法人数据对比
              <span className="chart-subunit">(万元)</span>
            </p>
            <NodataEcharts config={corporationCompare}/>
            <div className="erp-selectbox" style={{top: 17, right: 60}}>
              <Select style={{width: 170}} defaultValue="income" onChange={this.selectSecond.bind(this)}>
                {this.selectList.map((item) =>
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                )}
              </Select>
            </div>
          </div>
           </div>
        </div>
      </div>
  }
}