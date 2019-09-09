import React from 'react';
import Help from "../../../../common/component/Help";
import TrendHeader from './TrendLineComponent/trendLineHeader';
import NodataEcharts from "../../../../common/charts/NodataECharts";
import EConfig from '../../../../common/charts/EConfig';
import {Select} from 'antd';


const TrendingLine = (props) => {

    let TrendingData = {
        data: props.data,
        option: EConfig.fullSizeLineOption,
        config: {
            lineColor: ["#01ce7e", "#4875fa", "#f98c4b", "#f06968"],
            yFormatter: "",
            showLegend: true
        },
        height: 346
    };

    return (<div className="dc-chart-wrapper">
        <div className="dc-chart-item" style={{width: "100%"}}>
            <div className="dc-chart">
                <div className="hrchart-title admin-body">
                    趋势分析
                    <div className="erp-selectbox"
                         style={{right: 0, width: "auto", top: 15}}
                    >
                        {/*<div className="selecticon-group">*/}
                        <TrendHeader
                            metrics={props.metrics}
                            selectMetrics={props.selectMetrics}
                        />
                        {/*</div>*/}
                    </div>
                </div>
                <NodataEcharts config={TrendingData} style={{marginTop: "20px"}}/>
            </div>
        </div>
    </div>)
};

export default TrendingLine;



