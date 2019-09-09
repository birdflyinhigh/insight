import React from 'react';
import Card from './Card';


const cards = (props) => {
    const {key1, key2, key3, key4, key5} = props.titles;

    const cardItems = [
        {title: '集团uv', value: key1, info: '集团UV：集团PC、WAP、买家APP端整体UV；'},
        {title: '店铺有效UV', value: key2, info: '店铺有效UV：经过流量垃圾识别系统标识为有效的店铺UV之和'},
        {title: '咨询量', value: key3, info: '咨询量：统计周期内，咨询服务商的人数（咨询方式包括IM、隐私小号、企点），注：同一个用户咨询多个店铺，算多个店铺咨询；'},
        {title: '1V1订单提交量', value: key4, info: '1V1订单提交量：指通过店铺雇佣或者购买店铺服务提交的订单量'},
        {title: '1V1订单成交量量', value: key5, info: '1V1订单成交量：指通过店铺雇佣或者购买店铺服务提交的订单中最终成交的订单量'},
    ];


    return (
        <div className="income-tab" style={{display: "flex"}}>
            {cardItems.map((item, index)=>(
                <Card info={item.info} title={item.title} value={item.value} />
            ))}
        </div>
    )
};


export default cards;