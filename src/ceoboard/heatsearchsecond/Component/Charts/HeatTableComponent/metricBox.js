import React from 'react';
import './metricbox.css';
import Help from "../../../../../common/component/Help";

const colorMap = {
    green: 'rgba(125, 200, 86, 1)',
    red: 'rgba(255, 102, 0, 1)',
    yellow: 'rgba(255, 255, 51, 1)'
};


const tipMap = {
    green: '可售卖商家版工位：</br>' +
        '大区、省：如果某大区或省份下属的城市在某个类目下，有一个城市为可售卖状态，则该大区或省份在该类目下为可售卖状态；</br>' +
        '城市：当一个城市在某个类目下的售卖比例<=80%，则该城市在该类目下的状态为可售卖；',
    yellow: '谨慎售卖商家版工位：</br>' +
        '大区、省：如果某大区或省份下属的城市在某个类目下，无一个状态为可售卖的城市，且有状态为谨慎售卖的城市，则该大区或省份在该类目下的状态为谨慎售卖；</br>' +
        '城市：当一个城市在某个类目下的售卖比例满足“100%>售卖比例>80%”，则该城市在该类目下的状态为谨慎售卖；',
    red: '建议停止售卖商家版工位：</br>' +
        '大区、省：如果某大区或省份下属的城市在某个类目下，全部城市为建议停止售卖状态，则该大区或省份在该类目下为建议停止售卖状态;</br>' +
        '城市：当一个城市在某个类目下的售卖比例>=100%，则该城市在该类目下的状态为建议停止售卖；'
};

const metricBoxs = (props) => {
    return (<div className="metric-container1">
            <div className="metric-box1">
                <div className="metric-reg" style={{backgroundColor: colorMap.green}}>
                </div>

                <div className="metric-info">
                    工位不够,需继续招商
                </div>
                <Help info={tipMap.green} width={200}/>
            </div>
            <div className="metric-box2">
                <div className="metric-reg" style={{backgroundColor: colorMap.yellow}}>
                </div>
                <div className="metric-info">
                    预警状态
                </div>
                <Help info={tipMap.yellow} width={200}/>
            </div>
            <div className="metric-box3">
                <div className="metric-reg" style={{backgroundColor: colorMap.red}}>
                </div>

                <div className="metric-info">
                    工位过多，建议停止售卖
                </div>
                <Help info={tipMap.red} width={200}/>
            </div>


        </div>
    )
};


export default metricBoxs;