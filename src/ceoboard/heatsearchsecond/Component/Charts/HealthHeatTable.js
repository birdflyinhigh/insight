import React from 'react';
import ReactDOM from 'react-dom';

import Help from "../../../../common/component/Help";
import MetricBoxs from './HeatTableComponent/metricBox';
import HeatTableHeader from './HeatTableComponent/tableHeader';


import './healthHeatTable.css';

import {Table, Divider, Tag} from 'antd';

const {Column, ColumnGroup} = Table;

const heatTableTip = "搜索次数: 雇主（按照雇主来源IP解析城市)在搜索某个类目次数，其中类目根据搜索内容解析匹配一级类目</br>" +
    "工场会员服务商数： 在某个地区的某类目下，工场会员服务商数量，地区按工场会员服务商购买工位和漫游工位的地区统计";




const colorMap = {
    g: 'rgba(125, 200, 86, 1)',
    r: 'rgba(255, 102, 0, 1)',
    y: 'rgba(255, 255, 51, 1)'
};




class HeatTable extends React.PureComponent {

    static updateColor(value){
        if(typeof(value) !=='undefined'){
            if(value.toString().indexOf(',') !==-1){
                let info = value.split(',');
                let ratio = info[0];
                let color = info[1];
                let style = {
                    backgroundColor: colorMap[color],
                    height:'50px',
                    lineHeight: '50px'
                };
                if(ratio.indexOf('--') !== -1){
                    ratio = ratio.replace('%', '')
                }
                return <div style={style}>{ratio}</div>
            }else {
                return value
            }
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
                    className="column-area"
                    id="header-coloum"
                />
                {this.props.data.titles ? this.props.data.titles.map((item) => {
                    return <ColumnGroup
                        title={item}
                        style={{border: "2px solid black", backgroundColor: 'orange'}}
                        id="bg-column"
                        className='column-group'
                    >
                        <Column
                            title="搜索次数"
                            dataIndex={item + "1"}
                            key={item + "1"}
                            id="bg-column"
                        />
                        <Column
                            title="工场会员服务商数"
                            dataIndex={item + "2"}
                            key={item + "2"}
                            id={item + "2"}
                            className={"sell-ratio"}
                            render={(value)=>{
                                return HeatTable.updateColor(value)
                            }}
                        />
                    </ColumnGroup>
                }) : ""
                }
            </Table>
        )
    }
}


const HealthHeatTable = (props) => {
    const dashUrl = "https://chaos.zhubajie.la/boss-app/public/wp-data";
    return (<div className="dc-chart-wrapper">
        <div className="dc-chart-item" style={{width: "100%", height: "625px"}}>
            <div className="dc-chart">
                <div className="hrchart-title admin-body">
                    热搜热力图
                    <Help info={heatTableTip} width={200}/>
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
                <div style={{marginTop: "20px"}}>

                </div>

                {/*<MetricBoxs/>*/}
                <HeatTable data={props.data} className="heat-table"/>
            </div>
        </div>
    </div>)
};

export default HealthHeatTable;