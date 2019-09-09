import React from 'react';
import './metricbox.css';


const colorMap = {
    green: 'rgba(125, 200, 86, 1)',
    red: 'rgba(255, 102, 0, 1)',
    yellow: 'rgba(255, 255, 51, 1)'
};


const metricBoxs = (props) => {
    return (<div className="metric-container" style={{width: 400}}>
            <div className="metric-box" style={{width:90}}>
                <div className="metric-reg" style={{backgroundColor: colorMap.green}}>
                </div>
                <div >
                    流量健康
                </div>
            </div>
            <div className="metric-box" style={{width:90}}>
                <div className="metric-reg" style={{backgroundColor: colorMap.yellow}}>
                </div>
                <div className="metric-info">
                    流量预警
                </div>
            </div>
            <div className="metric-box" style={{width:90}}>
                <div className="metric-reg" style={{backgroundColor: colorMap.red}}>
                </div>

                <div className="metric-info">
                    流量紧张
                </div>
            </div>


        </div>
    )
};


export default metricBoxs;