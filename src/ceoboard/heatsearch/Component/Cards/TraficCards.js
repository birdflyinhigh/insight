import React from 'react';
import Help from "../../../../common/component/Help";
import {TabInfo} from "../../../income/config";
import {UVCard, ShopWorkscard, SupportWorkscard} from './Card';


const data = [
    {amount: 3.0, rate: 98.9},
    {amount: 17631, rate: null},
    {amount: 9019, rate: 95.5},

];

const TrafficCards = (props) => {
    const data = [
        {amount: props.data.uv, rate: props.data.linkRelativeRatio},
        {amount: props.data.station, rate: null},
        {amount: props.data.equities, rate: props.data.rate},

    ];
    return (
        <div className="income-tab">
            <UVCard data={data[0]}/>
            <ShopWorkscard data={data[1]}/>
            <SupportWorkscard data={data[2]}/>
        </div>
    )
};

export default TrafficCards;