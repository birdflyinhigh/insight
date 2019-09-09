import React from 'react';
import Help from "../../../../../common/component/Help";
import {Card} from 'antd';
import './flowcard.css';


const flowCard = (props) => {
    const isEmpty = props.empty;
    const baseStyle = {
        width: 212,
        height: 110,
        alignItem: 'center',
        textAlign: "center",
        verticalAlign: "middle",
        // margin: "10px",
        border: props.dashBorder ? "3px dashed rgb(153,153,153)" : null,
        marginRight: props.right ? props.right : null
    };
    const emptyStyle = {
        ...baseStyle, border: "0px solid white"
    };

    const style = {
        ...baseStyle,
        backgroundColor: props.whiteBG ? "white" : "#40a9ffa1",
        // marginLeft: props.whiteBG? "-28px": "10px",
        borderRadius: "10px",
    };
    const leftHelp =()=>{
        if(props.title==="日均工场会员店铺有效UV"){
            return 182
        }else if (props.title==="日均可支撑权益工位数"){
            return 161
        }else if (props.title==="日均工场会员店铺咨询量"){
            return 182
        }else {
            return 155
        }
    }

    if (isEmpty) {
        return <Card style={emptyStyle}></Card>
    }
    else {
        return (
            <Card style={style} className={"Card"}>
                <div className="card-content">
                    <p className={"bigTitle"}>
                        <span style={{color: "#666666", fontWeight: 700, fontSize: "14px"}}>{props.title}
                        </span>
                    </p>
                    <p><span style={{color: props.title==="日均店铺有效UV"?"#FF6600":"#333333", fontWeight: 700, fontSize: "16px"}}>{props.amount}</span>
                    </p>
                    <div className="card-help" style={{left: leftHelp()}}>
                        <Help info={props.info ? props.info : "hello"}/>
                    </div>
                </div>
            </Card>
        )
    }
};

export default flowCard;



