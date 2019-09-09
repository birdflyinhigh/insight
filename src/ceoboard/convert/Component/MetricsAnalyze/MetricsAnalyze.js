import React from 'react';
import SelectBox from './SelectBox';
import NodataEcharts from "../../../../common/charts/NodataECharts";
import EConfig from "../../../../common/charts/EConfig";


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
    return <div className="dc-chart-wrapper">

        <div className="convert-channel-chart-container">
            <div className="dc-chart-item" style={{width: "100%"}}>
                <div className="dc-chart">
                    <div className="hrchart-title admin-body">
                        <div className="hrchart-title admin-body">各指标对比分析（涉及金额的指标，单位均为“万元”）</div>
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
                    <NodataEcharts config={TrendingData} style={{marginTop: "20px"}}/>
                </div>
            </div>
        </div>

    </div>
};


export default metricsAnalyze;