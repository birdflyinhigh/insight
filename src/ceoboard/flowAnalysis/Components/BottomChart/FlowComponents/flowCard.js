import React from 'react';
import Help from "../../../../../common/component/Help";
import {Card} from 'antd';
import ExtraParagraph from './ExtraParagraph';
import './flowcard.css';


const flowCard = (props) => {
    const isEmpty = props.empty;
    const baseStyle = {
        width: 176,
        height: 110,
        alignItem: 'center',
        textAlign: "center",
        verticalAlign: "middle",
        border: props.dashBorder ? "3px dashed rgb(153,153,153)" : null,
    };
    const emptyStyle = {
        ...baseStyle, border: "0px solid white", zIndex: -1000
    };

    const style = {
        ...baseStyle,
        backgroundColor: props.whiteBG ? "white" : "#40a9ffa1",
        borderRadius: "10px",
    };

    if (isEmpty) {
        return <Card style={emptyStyle}></Card>
    }
    else {
        return (
            <Card style={style} className={"convert-card"}>
                <div >
                    <div className="convert-card-content">
                        <p className={"bigTitle"}>
                        <span style={{color: "#666666", fontWeight: 700, fontSize: "14px"}}>{props.title}
                        </span>
                        </p>
                        <p><span style={{color: props.title==="日均店铺有效UV"?"#FF6600":"#333333", fontWeight: 700, fontSize: "16px"}}>{props.amount}</span>
                        </p>
                    </div>
                    <div className="convert-card-help" >
                        <Help info={props.info ? props.info : "hello"}/>
                    </div>
                </div>
            </Card>
        )
    }
};

export const ExtraFlowCard = (props) => {
    const isEmpty = props.empty;
    const baseStyle = {
        width: props.width? props.width:176,
        height: 110,
        alignItem: 'center',
        textAlign: "center",
        verticalAlign: "middle",
        border: props.dashBorder ? "3px dashed rgb(153,153,153)" : null,
    };
    const emptyStyle = {
        ...baseStyle, border: "0px solid white", zIndex: -1000
    };

    const style = {
        ...baseStyle,
        backgroundColor: props.whiteBG ? "white" : "#40a9ffa1",
        borderRadius: "10px",
    };

    if (isEmpty) {
        return <Card style={emptyStyle}></Card>
    }
    else {
        return (
            <Card style={style} className={"convert-card"} id={"desc-muti-text"}>
                <div >
                    <div className="convert-card-content" style={{position: "relative", top:"8px"}}>
                        <p className={"bigTitle"}>
                        <span style={{color: "#666666", fontWeight: 700, fontSize: "14px"}}>{props.title}
                        </span>
                        </p>
                        <p><span style={{color: props.title==="日均店铺有效UV"?"#FF6600":"#333333", fontWeight: 700, fontSize: "16px"}}>{props.amount}</span>
                        </p>
                    </div>
                    <ExtraParagraph data={props.data}/>
                    <div className="convert-card-help" style={props.helpStyle?props.helpStyle:null}>
                        {props.info? <Help info={props.info}/>:''}
                    </div>
                </div>
            </Card>
        )
    }
};

export default flowCard;



