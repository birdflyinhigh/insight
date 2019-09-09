import React from 'react';
import ReactDOM from 'react-dom';

import Help from "../../../../common/component/Help";
import MetricBoxs from './HeatTableComponent/metricBox';
import HeatTableHeader from './HeatTableComponent/tableHeader';


import './healthHeatTable.css';

import {Table, Divider, Tag} from 'antd';

const {Column, ColumnGroup} = Table;

const heatTableTip = "店铺有效UV：指进入店铺的有效UV，其中直访到店铺的流量占比超过整体店铺直访UV有效占比时记直访UV的整体店铺直访UV有效占比为有效，非直访UV均为有效流量（其中广告流量不计算在内）</br>" +
    "可支撑权益工位数: 店铺有效UV / 3；</br>" +
    "商家工位数: 享受线上权益的工位数；</br>" +
    "售卖比例: 商家工位数 / 可支撑权益工位数";

const toPoint = (html) => {
    let str = html.replace("%", "");
    str = str / 100;
    return str
};

const colorMap = {
    g: 'rgba(125, 200, 86, 1)',
    r: 'rgba(255, 102, 0, 1)',
    y: 'rgba(255, 255, 51, 1)'
}

const columnGroup = (titles) => {
    const groups = titles.map((item) => {
        return <ColumnGroup
            title={item}
            style={{border: "2px solid black"}}
            id="bg-column"
        >
            <Column
                title="日均店铺有效UV"
                dataIndex={item + "1"}
                key={item + "1"}
                id="bg-column"
            />
            <Column
                title="可支撑权益工位数"
                dataIndex={item + "2"}
                key={item + "2"}
                id={item + "2"}
            />
            <Column
                title="商家工位数"
                dataIndex={item + "3"}
                key={item + "3"}
                id={item + "3"}
            />
            <Column
                title="售卖比例"
                dataIndex={item + "4"}
                key={item + "4"}
                id={item + "4"}
                className={item + "4"}
            />
        </ColumnGroup>
    });
    return groups
};


class HeatTable extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {}
    }

    updateColor(value){
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
    }

    render() {

        return (

            <Table dataSource={this.props.data.data}
                   className={"flow-table"}
                   bordered
                   scroll={{y: 400}}
                   pagination={false}
                   useFixedHeader={false}
                   expanded={true}
            >
                <Column
                    title="区域"
                    dataIndex="area"
                    key="age"
                    className="area-column"
                    id="bg-column"
                    style={{width: "71px"}}
                />
                {this.props.data.titles ? this.props.data.titles.map((item) => {
                    return <ColumnGroup
                        title={item}
                        style={{border: "2px solid black"}}
                        id="bg-column"
                    >
                        <Column
                            title="日均店铺有效UV"
                            dataIndex={item + "1"}
                            key={item + "1"}
                            id="bg-column"
                        />
                        <Column
                            title="可支撑权益工位数"
                            dataIndex={item + "2"}
                            key={item + "2"}
                            id={item + "2"}
                        />
                        <Column
                            title="商家工位数"
                            dataIndex={item + "3"}
                            key={item + "3"}
                            id={item + "3"}
                        />
                        <Column
                            title="售卖比例"
                            dataIndex={item + "4"}
                            key={item + "4"}
                            id={item + "4"}
                            className={"sell-ratio"}
                            render={(value)=>{
                                return this.updateColor(value)
                            }}
                        />
                        <Column
                            title="日均潜在需求量"
                            dataIndex={item + "5"}
                            key={item + "5"}
                            id={item + "5"}
                        />
                        <Column
                            title="工场会员服务商数"
                            dataIndex={item + "6"}
                            key={item + "6"}
                            id={item + "6"}
                        />
                        <Column
                            title="招收新的会员服务商建议"
                            dataIndex={item + "7"}
                            key={item + "7"}
                            id={item + "7"}
                        />
                        <Column
                            title="操作"
                            dataIndex={item + "8"}
                            key={item + "8"}
                            id={item + "8"}
                            render={(value)=>{
                                return                     <a
                                    href={value.link}
                                    target='_blank'
                                >{value.title}</a>
                            }}
                        />
                    </ColumnGroup>
                }) : ""
                }
            </Table>)
    }
}


const HealthHeatTable = (props) => {
    const dashUrl = "https://chaos.zhubajie.la/boss-app/public/wp-data";
    return (<div className="dc-chart-wrapper">
        <div className="dc-chart-item" style={{width: "100%", height: "625px"}}>
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