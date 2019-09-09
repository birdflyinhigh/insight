import React from 'react';
import ReactDOM from 'react-dom';

import Help from "../../../../common/component/Help";
import MetricBoxs from './HeatTableComponent/metricBox';
import HeatTableHeader from './HeatTableComponent/tableHeader';
import {Link} from 'react-router-dom';


import './healthHeatTable.css';

import {Table, Divider, Tag} from 'antd';

const {Column, ColumnGroup} = Table;

const heatTableTip ="店铺有效UV：指进入店铺的有效UV，其中直访到店铺的流量占比超过整体店铺直访UV有效占比时记直访UV的整体店铺直访UV有效占比为有效，非直访UV均为有效流量（其中广告流量不计算在内）</br>" +
    "可支撑权益工位数: 店铺有效UV / 3；</br>" +
    "商家工位数: 享受线上权益的工位数；</br>" +
    "售卖比例: 商家工位数 / 可支撑权益工位数";

const toPoint = (html)=>{
    let str = html.replace("%", "");
    str = str/100;
    return str
};

const colorMap = {
    g: 'rgba(125, 200, 86, 1)',
    r: 'rgba(255, 102, 0, 1)',
    y: 'rgba(255, 255, 51, 1)'
}

class HeatTable extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {}
    }

    updateColor = (value) =>{
        if(typeof(value) !=='undefined'){
            let info = value.split(',');
            let ratio = info[0];
            let color = info[1];
            let style = {
                backgroundColor: colorMap[color],
                height:'50px',
                lineHeight: '50px',
                width: '100%',
                boxSizing: 'border-box'
            };
            if(ratio.indexOf('--') !== -1){
                ratio = ratio.replace('%', '')
            }
            return <div style={style}>{ratio}</div>
        }else {
            return value
        }
    };
    render() {
        return (

            <Table dataSource={this.props.data}
                   className={"flow-table"}
                   bordered
                   scroll={{y: 425, x: 1700}}
                   pagination={false}
                   useFixedHeader={false}
                   expanded={true}

            >
                <Column
                    title="区域"
                    dataIndex="area"
                    key="age"
                    className="column-area"
                    id="bg-column"
                />
                <ColumnGroup
                    title="设计"
                    style={{border: "2px solid black"}}
                    id="bg-column"
                >
                    <Column
                        title="日均店铺有效UV"
                        dataIndex="design_1"
                        key="design_1"
                        id="bg-column"
                    />
                    <Column
                        title="可支撑权益工位数"
                        dataIndex="design_2"
                        key="design_2"
                        id="bg-column"
                    />
                    <Column
                        title="商家工位数"
                        dataIndex="design_3"
                        key="design_3"
                        id="bg-column"
                    />
                    <Column
                        title="售卖比例"
                        dataIndex="design_4"
                        key="design_4"
                        id="bg-column"
                        className="sell-ratio"
                        render={(value)=>{
                            return this.updateColor(value)
                        }}
                    />
                    <Column
                        title="日均潜在需求量"
                        dataIndex="design_5"
                        key="design_5"
                        id="bg-column"
                    />
                    <Column
                        title="工场会员服务商数"
                        dataIndex="design_6"
                        key="design_6"
                        id="bg-column"
                    />
                </ColumnGroup>
                <ColumnGroup title="IT">
                    <Column
                        title="日均店铺有效UV"
                        dataIndex="it_1"
                        key="it_1"
                        id="bg-column"
                    />
                    <Column
                        title="可支撑权益工位数"
                        dataIndex="it_2"
                        key="it_2"
                        id="bg-column"
                    />
                    <Column
                        title="商家工位数"
                        dataIndex="it_3"
                        key="it_3"
                        id="bg-column"
                    />
                    <Column
                        title="售卖比例"
                        dataIndex="it_4"
                        key="it_4"
                        id="bg-column"
                        className="sell-ratio"
                        render={(value)=>{
                            return this.updateColor(value)
                        }}
                    />
                    <Column
                        title="日均潜在需求量"
                        dataIndex="it_5"
                        key="it_5"
                        id="bg-column"
                    />
                    <Column
                        title="工场会员服务商数"
                        dataIndex="it_6"
                        key="it_6"
                        id="bg-column"
                    />
                </ColumnGroup>
                <ColumnGroup title="营销">
                    <Column
                        title="日均店铺有效UV"
                        dataIndex="market_1"
                        key="market_1"
                        id="bg-column"
                    />
                    <Column
                        title="可支撑权益工位数"
                        dataIndex="market_2"
                        key="market_2"
                        id="bg-column"
                    />
                    <Column
                        title="商家工位数"
                        dataIndex="market_3"
                        key="market_3"
                        id="bg-column"
                    />
                    <Column
                        title="售卖比例"
                        dataIndex="market_4"
                        key="market_4"
                        id="bg-column"
                        className="sell-ratio"
                        render={(value)=>{
                            return this.updateColor(value)
                        }}
                    />
                    <Column
                        title="日均潜在需求量"
                        dataIndex="market_5"
                        key="market_5"
                        id="bg-column"
                    />
                    <Column
                        title="工场会员服务商数"
                        dataIndex="market_6"
                        key="market_6"
                        id="bg-column"
                    />
                </ColumnGroup>
                <ColumnGroup title="其他">
                    <Column
                        title="日均店铺有效UV"
                        dataIndex="others_1"
                        key="others_1"
                        id="bg-column"
                    />
                    <Column
                        title="可支撑权益工位数"
                        dataIndex="others_2"
                        key="others_2"
                        id="bg-column"
                    />
                    <Column
                        title="商家工位数"
                        dataIndex="others_3"
                        key="others_3"
                        id="bg-column"
                    />
                    <Column
                        title="售卖比例"
                        dataIndex="others_4"
                        key="others_4"
                        id="bg-column"
                        className="sell-ratio"
                        render={(value)=>{
                            return this.updateColor(value)
                        }}
                    />
                    <Column
                        title="日均潜在需求量"
                        dataIndex="others_5"
                        key="others_5"
                        id="bg-column"
                    />
                    <Column
                        title="工场会员服务商数"
                        dataIndex="others_6"
                        key="others_6"
                        id="bg-column"
                    />
                </ColumnGroup>
            </Table>)
    }
}


const HealthHeatTable = (props) => {
    const dashUrl = "https://chaos.zhubajie.la/boss-app/public/wp-data";
    return (<div className="dc-chart-wrapper">
        <div className="dc-chart-item" style={{width: "100%", height: "650px"}}>
            <div className="dc-chart">
                <div className="hrchart-title admin-body">
                    热力图 <Help info={heatTableTip} width={200}/>
                    <div className="erp-selectbox"
                         style={{right: 0, width: "auto", top: 15}}
                    >
                        <div className="selecticon-group" id='dash-url'>
                            <a href={dashUrl}
                               className={"dash-redirect-url"}
                               target='_blank'>
                                查看服务商运营看板
                            </a>
                        </div>
                        <div className="selecticon-group" id='dash-url'>
                            <Link
                                to="/manager/trafficdetail"
                                className={"dash-redirect-url"}
                                onClick={()=>{
                                    document.documentElement.scrollTop = document.body.scrollTop =0;
                                }}
                            >
                                查看一级类目热力图
                            </Link>
                        </div>
                    </div>
                </div>
                <div style={{marginTop: "10px"}}>

                </div>

                <MetricBoxs/>
                <HeatTable data={props.data} className="heat-table"/>
            </div>
        </div>
    </div>)
};

export default HealthHeatTable;