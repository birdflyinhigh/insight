import React from 'react';
import Arrow from 'react-arrow';
import './flowcard.css';
import DescCard from './descCard';


const style={
    position: "absolute",
    float: "right",
    top: "15px",
    right: "-200px"
};


const flowArrow = (props) => (
    <div className="arrow-card">
        <div className="arrow-content">
            <Arrow
                style={{marginTop:"27px"}}
                direction="up"
                shaftWidth={2}
                shaftLength={85}
                headWidth={10}
                headLength={15}
                fill="white"
                stroke="rgb(153,153,153)"
                strokeWidth={2.6}
                // style={{strokeDasharray: ("4, 4")}}
            />
        </div>

        <div className="arrow-card-content" style={style}>
            <DescCard
                amount={props.amount}
                title={props.title}
                info={props.info}
                offset={137}
            />
        </div>

    </div>

);

export default flowArrow;