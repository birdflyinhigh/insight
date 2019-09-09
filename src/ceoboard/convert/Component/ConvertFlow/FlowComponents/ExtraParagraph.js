import React from 'react';


const ExraParagraph = (props) => {


    return (
        <div>
            <svg className="dashed-line-svg" height={10} version="1.1" xmlns="http://www.w3.org/2000/svg">
                <line strokeDasharray="10, 5" x1="0" y1="8" x2="600" y2="8"
                      style={{strokeWidth: '1px', stroke: "rgb(174, 174, 174)"}}></line>
            </svg>
            <p className={"bigTitle"}>
        <span style={{color: "rgb(97, 118, 100)", fontWeight: 400, fontSize: "14px", lineHeight: "14px"}}>{props.data.title}<br/>{props.data.amount}
    </span>
            </p>
        </div>
    )
}

export default ExraParagraph;