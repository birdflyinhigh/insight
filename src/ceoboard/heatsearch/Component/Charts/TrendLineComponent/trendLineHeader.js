import React from 'react';
import {DatePicker, Select} from 'antd';
import './trendLineHeader.css';


const Option = Select.Option;


const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
    console.log(`selected ${value}`);
}

const demoSelect = () => (
    <Select
        mode="multiple"
        style={{width: '100%'}}
        placeholder="Please select"
        defaultValue={['a10', 'c12']}
        onChange={handleChange}
    >
        {children}
    </Select>
);


const DropSelect = (props) => {

    const children = [];

    const data = [...props.data];

    let defaultV = [];
    // alert(data.length)
    let keyValue = {};

    for (let i = 0; i < data.length; i++) {

        let item = data[i];
        if (item.name === "可支撑权益工位数" || item.name === "商家工位数") {
            defaultV.push(item.name)
        }
        children.push(<Option key={item.name}>{item.name}</Option>);
        keyValue[item.name] = item.id;
    }


    return (
        <Select
            mode="multiple"
            style={{width: '400px'}}
            placeholder=""
            defaultValue={["可支撑权益工位数", "商家工位数"]}
            // showSearch={true}
            onChange={(value) => {
                let ids = [];
                if (value.length>=1){
                    for (let i = 0; i < value.length ; i++) {
                        ids.push(keyValue[value[i]])
                    }
                }
                props.selectMetrics(ids);
            }}
        >
            {children}
        </Select>
    )
};

const trendHeader = (props) => {

    return (
        <div className="trend-header-container">

            <div className="trend-header">
                <div className="traffic-select-title">
                    指标
                </div>
                <div>:</div>
                <div className="traffic-select-group">
                    <DropSelect
                        className="traffic-select-box"
                        placeholder="全部"
                        data={props.metrics}
                        selectMetrics={props.selectMetrics}
                    />
                </div>


            </div>
        </div>
    )
};

export default trendHeader;