import React from 'react';
import FlowDiagram from './FlowDiagram';
import './ConvertFlow.css';


const ConvertFlow = (props) => {

    return (<div className="dc-chart-wrapper">
        <div className="dc-chart-item" style={{width: "100%", height: "570px"}}>
            <div className="dc-chart">
                <div className="hrchart-title admin-body" >
                    <p className="hrchart-title admin-body">ZBJ卖场流量转化路径</p>
                    <div className="erp-selectbox"
                         style={{right: 0, width: "auto", top: 15}}
                    >
                    </div>
                </div>

                <FlowDiagram data={props.data}/>

            </div>
        </div>
    </div>)
};

export default ConvertFlow;