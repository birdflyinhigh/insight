import React from 'react';
import FlowDiagram from './FlowDiagram';
import './ConvertFlow.css';
import SelectBox from "./SelectBox";


const ConvertFlow = (props) => {

    return (<div className="dc-chart-wrapper">
        <div className="dc-chart-item" style={{width: "100%", height: "375px"}}>
            <div className="dc-chart">
                <div className="hrchart-title admin-body">
                    <p className="hrchart-title admin-body">{props.data.header}</p>
                    <div className="erp-selectbox"
                         style={{right: 0, width: "auto", top: 15}}
                    >
                        <div>
                            <SelectBox
                                data={props.data}
                            />
                        </div>
                    </div>
                </div>

                <FlowDiagram data={props.data} source={props.source}/>

            </div>
        </div>
    </div>)
};

export default ConvertFlow;