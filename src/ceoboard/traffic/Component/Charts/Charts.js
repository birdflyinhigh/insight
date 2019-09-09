import React from 'react';
import FlowFunnel from './FlowFunnel';
import HealthHeatTable from './HealthHeatTable';
import TrendingLine from './TrendingLine';
import {BottomIntroText} from "../../config";
import BottomIntro from "../../../../common/component/BottomIntro";


const Charts = (props) => {
    let funnelData = {
        dailyUv: 24.70,
        entryUv: 3.30,
        dailyShopUv: 5.97,
        dailyShopEffectUv: 2.365,
        supportWorks: 9019,
        dailyZworkShopUv: 2.90,
        entryRate: 13.2,
        avgShopVisits: 1.8,
        shopScrapeRate: 2.665,
        zworkRatio: 19.56,
        dailyWorkUv: 5,
    };
    for (let key in props.flowData){
        funnelData[key] = props.flowData[key]
    }

    let tableData = [...props.tableData];
    let trendData = {...props.trendData};
    let metrics = [...props.trendMetrics]
    return (
        <div className="charts-content">
            <FlowFunnel data={funnelData}/>
            <HealthHeatTable data={tableData}/>
            <TrendingLine
                data={trendData}
                metrics={metrics}
                selectMetrics={props.selectMetrics}
            />
            <BottomIntro intro={BottomIntroText}/>
        </div>
    )

};

export default Charts;