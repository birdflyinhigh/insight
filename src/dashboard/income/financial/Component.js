import React, {Component} from 'react';
import {Select, Button} from 'antd';
import NodataEcharts from '../../../common/charts/NodataECharts';
import EConfig from '../../../common/charts/EConfig';
const Option = Select.Option;
export default class ManageBody extends Component{
  constructor(props){
    super(props);
  };
  selectSecond(value){
    this.props.fns.selectSecond(value);
  }
  render(){
    let pannelData = [{
      name: "收入",
      id: "income",
      subTitle: `${this.props.data.pincome.month}：${this.props.data.pincome.total}万`,
			num: this.props.data.pincome.monthly || 0
		},{
			name: "成本",
      id: "cost",
      subTitle: `${this.props.data.pincome.month}：${this.props.data.pcost.total}万`,
			num: this.props.data.pcost.monthly || 0
		},{
      name: "利润",
      id: "profit",
      subTitle: `${this.props.data.pincome.month}：${this.props.data.pprofit.total}万`,
			num: this.props.data.pprofit.monthly || 0
		},{
      name: "总资产",
      id: "total_balance",
			num: this.props.data.passets.monthly || 0
		},{
      name: "负债",
      id: "debt",
			num: this.props.data.pdebt.monthly || 0
		},{
      name: "净资产",
      id: "net_balance",
			num: this.props.data.pnetAssets.monthly || 0
		}];
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
        <div className="hr-pannel" style={{marginLeft: -7, marginRight: -7}}>
					{pannelData.map((item, index, arr) => {
						return <div className="hrpan-item-wrapper" key={index}style={{width: `${88 / arr.length}%`}}>
											<div className={`hrpan-item itembg-${((index + 1) % arr.length) || 1}`}>
												<div className="hrpan-num">{item.num}
                          <span style={{fontSize: 16,paddingLeft: 10}}>万</span>
                        </div>
												<div className="hrpan-intro">{item.name}</div>
                        <div className="hrpan-intro" style={{fontSize: 14}}>{item.subTitle || ""}</div>
											</div>
									</div>
					})}
				</div>
        <div className="fchart-container row">
           <div className="col-lg-4 col-sm-6 col-xs-12">
              <div className="fcontainer">
                <p className="hrchart-title">收入
                  <span className="chart-subunit">(万元)</span>
                </p>
                <NodataEcharts config={income}/>
              </div>
           </div>
           <div className="col-lg-4 col-sm-6 col-xs-12">
              <div className="fcontainer">
                <p className="hrchart-title">成本
                  <span className="chart-subunit">(万元)</span>
                </p>
                <NodataEcharts config={{...income, data: this.props.data.cost}}/>
              </div>
           </div>
           <div className="col-lg-4 col-sm-6 col-xs-12">
              <div className="fcontainer">
                <p className="hrchart-title">净利润
                  <span className="chart-subunit">(万元)</span>
                </p>
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
                {pannelData.map((item) =>
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