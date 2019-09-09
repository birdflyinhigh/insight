import React from 'react';
import Help from "../../../../common/component/Help";


const uvTitleTip = "店铺有效UV：指进入店铺的有效UV，其中直访到店铺的流量占比超过整体店铺直访UV有效占比时记直访UV的整体店铺直访UV有效占比为有效，非直访UV均为有效流量（其中广告流量不计算在内）";
const shopTitleTip = "商家工位数：享受线上权益的工位数，取所选时段最后一天的数据";

const supportTitleTip = "可支撑权益工位数：店铺有效UV / 3";

const overSellTip = "超卖比例：商家工位数/可支撑工位数 -1";

const bigNumberStyle = {fontWeight: 700, fontSize: "18px"};

const rateNumberStyle = {
    fontFamily: 'Microsoft Yahei',
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: '14px',
    color: '#949494',
    textAlign: 'center',
}

export const UVCard = (props) => (
    <div className="income-tab-item-wrapper" key="index">
        <div className="income-tab-item">
            <div className="income-tab-title">日均店铺有效UV
                <Help info={uvTitleTip}/>
            </div>
            <p className="income-tab-num" >
                <span style={bigNumberStyle}>{props.data.amount}</span>
                </p>
            <p className="income-tab-num" >环比：
                <span style={rateNumberStyle}>{props.data.rate}%</span>
            </p>
        </div>
    </div>
);

export const ShopWorkscard = (props) => (
    <div className="income-tab-item-wrapper" key="index">
        <div className="income-tab-item">
            <div className="income-tab-title">商家工位数
                <Help info={shopTitleTip}/>
            </div>
            <p className="income-tab-num" >
                <span style={bigNumberStyle} >{props.data.amount}</span>
                </p>
            <p className="income-tab-num">&nbsp;
                <span>&nbsp;</span>
            </p>
        </div>
    </div>
);


export const SupportWorkscard = (props) => (
    <div className="income-tab-item-wrapper" key="index">
        <div className="income-tab-item">
            <div className="income-tab-title">日均可支撑权益工位数
                <Help info={supportTitleTip}/>
            </div>
            <p className="income-tab-num">
                <span style={bigNumberStyle}>{props.data.amount}</span>
            </p>
            <p className="income-tab-num" >
                <Help info={overSellTip}/>&nbsp;&nbsp;<strong>超卖比例：</strong>
                <span style={rateNumberStyle}>{props.data.rate}%</span>
            </p>
        </div>
    </div>
);



