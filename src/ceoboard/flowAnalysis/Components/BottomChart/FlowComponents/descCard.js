import React from 'react';
import Help from "../../../../../common/component/Help";
import {Card} from 'antd';
import './desccard.css';


const DescCard = props => {
    const fontStyle = {
        fontFamily: 'Microsoft YaHei',
        fontWeight: 700,
        fontStyle: 'normal',
        fontSize: '14px',
        color: '#999999',
        textAlign: 'center',
    };

    const style = {
        width: props.w ? props.w : 150,
        height: 50,
        border: 'none',
        textAlign: "center",
        display: "inline-block",
        verticalAlign: "middle",
        marginRight: props.right ? props.right : null,
        position: 'relative'
    };
    const shortStyle = {
        left: props.title === "到店率" ? 65 : 116,
    };

    const offsetStyle = {
        left: props.offset? props.offset:null,
    }
    return (
        <div className="desc-card-container" style={{marginBottom: props.marginBottom, marginLeft: props.marginLeft}}>
            <div style={style} className={"desc-card"} style={{top: props.top?props.top:0, textAlign:'center'}}>

                <div className="desc-content">
                    <p><strong style={fontStyle}>{props.title}</strong></p>
                    <div className="arrow-middle-placeholder"></div>
                    <p><strong style={fontStyle}>{props.amount}</strong>&nbsp;</p>
                </div>
            </div>
        </div>
    )

};

export const DescMultiCard = props => {
    const fontStyle = {
        fontFamily: 'Microsoft YaHei',
        fontWeight: 700,
        fontStyle: 'normal',
        fontSize: '14px',
        color: '#999999',
        textAlign: 'center',
    };

    const style = {
        width: props.w ? props.w : 150,
        height: 50,
        border: 'none',
        textAlign: "center",
        display: "inline-block",
        verticalAlign: "middle",
        marginRight: props.right ? props.right : null,
        position: 'relative'
    };
    const shortStyle = {
        left: props.title === "到店率" ? 65 : 116,
    };

    const offsetStyle = {
        left: props.offset? props.offset:null,
    }
    return (
        <div className="desc-card-container" style={{marginBottom: props.marginBottom, marginLeft: props.marginLeft}}>
            <div style={style} className={"desc-card"} style={{top: props.top?props.top:0, textAlign:'center'}}>

                <div className="desc-content" style={{top: props.top1?props.top1:0}}>
                    <p><strong style={fontStyle}>{props.title1}</strong></p>
                    <p><strong style={fontStyle}>{props.amount1}</strong>&nbsp;</p>
                    <div className="arrow-middle-placeholder"></div>
                    <p><strong style={fontStyle}>{props.title2}</strong></p>
                    <p><strong style={fontStyle}>{props.amount2}</strong>&nbsp;</p>
                </div>
            </div>
        </div>
    )

};

export default DescCard;


