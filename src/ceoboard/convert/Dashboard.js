import React, {Component} from 'react';
import {Table} from 'antd';
import {Column, IntroText, FunelConfig, BottomIntroText} from './config';
import Header from '../common/component/ConvertHeader';
import EConfig from '../../common/charts/EConfig';
import Cards from './Component/Cards/Cards';
import ConvertFlow from './Component/ConvertFlow/ConvertFlow';
import MetricsAnalyze from './Component/MetricsAnalyze/MetricsAnalyze';
import ChannelAnalyze from './Component/ChannelAnalyze/ChannelAnalyze';
import NodataEcharts from '../../common/charts/NodataECharts';
import SumDonut from '../../common/charts/SumDonut';
import Help from '../../common/component/Help';
import BottomIntro from '../../common/component/BottomIntro';
import TrafficCards from "../traffic/Component/Cards/TraficCards";
import Charts from "../traffic/Component/Charts/Charts";
import {ShopWorkscard, SupportWorkscard, UVCard} from "../traffic/Component/Cards/Card";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trendType: "count"
        }
    }

    selectTrend(value) {
        this.setState({
            trendType: value
        });
        this.props.fns.selectTrend(value);
    }


    render() {
        const headerData = {
            startTime: this.props.startTime,
            endTime: this.props.endTime,
            regionId: this.props.regionId,
            provinceId: this.props.provinceId,
            productId: this.props.productId,
            region: this.props.region,
            province: this.props.province,
            product: this.props.product,
            curBtn: this.props.curBtn,
            role: this.props.userRole,
            channel: this.props.channel,
            channelId: this.props.channelId,
            cityId: this.props.cityId,
            city: this.props.city,
        };
        const headerFns = {
            selectStart: this.props.selectStart,
            selectEnd: this.props.selectEnd,
            selectRegion: this.props.selectRegion,
            selectCity: this.props.selectCity,
            selectProvince: this.props.selectProvince,
            selectChannel: this.props.selectChannel,
            getCity: this.props.fns.getCity,
            getProvince: this.props.fns.getProvince,
            queryData: this.props.fns.queryData
        };

        console.log("22222", this.props.channelDonut)
        return <div className="dash-container">
            <h3 className="ceotitle-box">ZBJ卖场流量转化分析</h3>
            <Header data={headerData} fns={headerFns}/>
            <Cards data={this.props.bigNumbers}/>
            <ConvertFlow data={this.props.convertFlow}/>
            <MetricsAnalyze
                data={this.props.metricsAnalyze}
                metrics={this.props.convertMetrics}
                defaultValues={this.props.defaultIndex}
                selectMetrics={this.props.fns.selectMetrics}
            />
            <ChannelAnalyze
                data={this.props.channelTrend}
                donutData={this.props.channelDonut}
                metrics={this.props.convertMetrics}
                defaultValues={1}
                selectMetrics={this.props.fns.selectChannelMetrics}
                title={this.props.title}
            />
            <BottomIntro intro={BottomIntroText}/>

        </div>
    }
}

export default Dashboard;
