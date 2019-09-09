import React from 'react';
import Card from './Card';


const demoData = {
    "channelMoney": 121541,
    "zbjUv": 221541,
    "zbjUvRate": 3,
    "channelMoneyRate": 4,
    "uvCost": 521541,
    "shopUv": 621541,
    "shopUvRate": 7,
    "shopCost": 821541,
    "shopValue": 921541,
    "submit": 1021541,
    "submitRate": 11,
    "orderCost": 1221541,
    "deal": 1321541,
    "dealAmount": 1421541,
    "dealRate": 15,
    "month": "4"
};

const cards = (props) => {

    const data = {
        ...props.data,
    };

    const semData = {
        title: data.month+"月SEM渠道投放金额(万元）",
        amount: data.channelMoney,
        rate: data.channelMoneyRate,
        info: "SEM渠道投放金额：运营中心SEM渠道投放每个月实际花费金额；",
        subTitle: null,
        subRate: null,
        subTitle1: null,
        subRate1: null
    };

    const zbjUvData = {
        title: "集团UV",
        amount: data.zbjUv,
        rate: data.zbjUvRate,
        info: "集团UV：统计周期内，集团PC、WAP、买家APP端整体的独立访客数</br>",
        subTitle: null,
        subRate: null,
        subTitle1: null,
        subRate1: null
    };

    const shopUvData = {
        title: "店铺有效UV",
        amount: data.shopUv,
        rate: data.shopUvRate,
        info: "店铺有效UV：指进入店铺的有效UV，其中直访到店铺的流量占比超过整体店铺直访UV有效占比时记直访UV的整体店铺直访UV有效占比为有效，非直访UV均为有效流量（其中广告流量不计算在内）</br>",
        subTitle: null,
        subRate: null,
        subTitle1: null,
        subRate1: null
    };

    const submitData = {
        title: "ZBJ卖场订单提交量",
        amount: data.submit,
        rate: data.submitRate,
        info: "ZBJ卖场订单提交量：统计周期内，ZBJ卖场订单的提交量（不含官方自营店铺和分包订单）</br>",
        subTitle: null,
        subRate: null,
        subTitle1: null,
        subRate1: null
    };

    const dealData = {
        title: "ZBJ卖场订单成交量",
        amount: data.deal,
        rate: data.dealRate,
        info: "ZBJ卖场订单成交量：统计周期内，ZBJ卖场订单的成交量（不含官方自营店铺和分包订单）</br>" +
            "ZBJ卖场订单成交金额：统计周期内，ZBJ卖场订单的成交金额（不含官方自营店铺和分包订单）",
        subTitle: "ZBJ卖场订单成交金额：",
        subRate: data.dealAmount + '万元',
        subTitle1: null,
        subRate1: null
    };
    return (
        <div className="income-tab" style={{display: "flex"}}>
            <Card data={semData}/>
            <Card data={zbjUvData}/>
            <Card data={shopUvData}/>
            <Card data={submitData}/>
            <Card data={dealData}/>
        </div>
    )
};


export default cards;