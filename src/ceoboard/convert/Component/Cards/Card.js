import React from 'react';
import Help from "../../../../common/component/Help";
import './Card.css';



const rateNumberStyle = {
    fontFamily: 'Microsoft Yahei',
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: '14px',
    color: '#949494',
    textAlign: 'center',
};


const card = (props) => {


    return (
        <div className="income-tab-item-wrapper" key="index" id="convert-card">
            <div className="income-tab-item">
                <div className="income-tab-title" id="convert-tab-title">{props.data.title}
                    {props.data.info?<Help info={props.data.info}/>: ''}
                </div>
                <p className="income-tab-title" id="convert-amount">
                    <span>{props.data.amount}</span>
                </p>
                <div className="income-tab-title" id="dashed-svg-container">
                    <svg className="dashed-line-svg" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <line strokeDasharray="10, 5" x1="0" y1="8" x2="600" y2="8"
                              style={{strokeWidth: '1px', stroke: "rgb(174, 174, 174)"}}></line>
                    </svg>
                </div>

                <p className="income-tab-title" id="convert-small-paragraph">环比：
                    <span style={rateNumberStyle}>{props.data.rate}%</span>
                </p>

                <p className="income-tab-title" id="convert-small-paragraph" >{props.data.subTitle}&nbsp;&nbsp;
                    <span style={rateNumberStyle}>{props.data.subRate}&nbsp;&nbsp;</span>
                </p>
                {/*<p className="income-tab-title" id="convert-small-paragraph">{props.data.subTitle1}&nbsp;&nbsp;*/}
                    {/*<span style={rateNumberStyle}>{props.data.subRate1}&nbsp;&nbsp;</span>*/}
                {/*</p>*/}

            </div>
        </div>
    )
};

export default card;