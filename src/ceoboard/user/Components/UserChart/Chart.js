import React from 'react';




import TopPart from './topPart/TopPart';
import LeftPart from "./leftPart/leftPart";
import RightPart from "./rightPart/rightPart";
const chart =(props)=>(
    <div className="slice-container">
        <TopPart data={props.data.userLayer.key1}/>
        <LeftPart data={props.data.userLayer}/>
        <RightPart data={props.data}/>
    </div>
);
export default chart;