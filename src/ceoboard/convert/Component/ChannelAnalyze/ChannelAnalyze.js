import React from 'react';
import NodataEcharts from "../../../../common/charts/NodataECharts";
import EConfig from "../../../../common/charts/EConfig";
import './ChannelAnalyze.css';
import Help from "../../../../common/component/Help";
import {IntroInfo} from "../../../zwork/config";
import NewCharts from "../../../../common/charts/NewCharts";
import SelectBox from "./SelectBox";
import SumDonut from "../../../../common/charts/SumDonut";

const sumData = (data) =>{
    let sum=0;
    for (let i = 0; i < data.length; i++) {
        sum += data[i]['value']
    }
    return sum;
};


const metricsAnalyze = (props) => {

    const data = {
        ...props.data
    };
    let TrendingData = {
        data: data,
        option: EConfig.fullSizeLineOption,
        config: {
            lineColor: ["#01ce7e", "#4875fa", "#f98c4b", "#f06968"],
            yFormatter: "",
            showLegend: true
        },
        height: 346
    };

    const donut={
        data: props.donutData,
        loading: true,
        name: ['area']
    };
    let donutData = {
        data: donut,
        option: EConfig.donutChart,
        config: {
            unit: "",
            showSelfBoth: true,
            center: ["75%", "55%"]
        },
        height: 330
    };
    return <div className="dc-chart-wrapper">
        <div className="dc-chart-item" style={{width: "100%", display:'flex'}}>
            <div className="dc-chart">
                <div className="hrchart-title admin-body">各渠道对比分析（涉及金额的指标，单位均为“万元”）
                    <div className="erp-selectbox"
                         style={{right: 0, width: "auto", top: 15}}
                    >
                            <div>
                                <SelectBox
                                    metrics={props.metrics}
                                    defaultValues={props.defaultValues}
                                    selectMetrics={props.selectMetrics}
                                />
                            </div>
                        </div>
                </div>
                <div>
                    <div className="dc-chart-item" style={{ width: "70%", height: 330,}}>
                        <NodataEcharts config={TrendingData} style={{marginTop: "20px"}}/>
                    </div>
                    <div className="dc-chart-item" style={{ width: "29%", height: 330}}>
                        <SumDonut
                            config={donutData}
                            total={sumData(props.donutData).toFixed(0)}
                            title={props.title}
                            style={{left:'51%', top: '38%'}}
                        />
                    </div>
                </div>
            </div>
    </div>
    </div>
};


export default metricsAnalyze;