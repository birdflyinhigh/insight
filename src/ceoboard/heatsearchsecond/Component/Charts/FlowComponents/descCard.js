import React from 'react';
import Help from "../../../../../common/component/Help";
import {Card} from 'antd';
import './desccard.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faQuestionCircle} from '@fortawesome/free-solid-svg-icons';


const descCard = props => {
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
        backgroundColor: "white",
        border: 'none',
        textAlign: "center",
        margin: props.title === "到店率" ? null : "20px",
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
        <div style={{marginBottom: props.marginBottom, marginLeft: props.marginLeft}}>
            <div style={style} className={"desc-card"}>

                <div className="desc-content">
                    <p><strong style={fontStyle}>{props.title}</strong></p>
                    <p><strong style={fontStyle}>{props.amount}</strong>&nbsp;</p>
                    <div className="desc-help" style={props.offset?offsetStyle:shortStyle}>
                        <Help info={props.info ? props.info : "hello"}/>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default descCard;