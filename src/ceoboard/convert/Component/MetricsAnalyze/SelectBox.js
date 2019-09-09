import React from 'react';
import {Component} from 'react';
import {Select} from 'antd';
import './SelectBox.css';

// const Option = Select.Option;
//
// const children = [];
// for (let i = 10; i < 36; i++) {
//     children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
// }

function handleChange(value) {
    console.log(`selected ${value}`);
}


class HeaderBox extends Component {

    constructor(props){
        super(props);
    }

    handleChange(values){
        this.props.selectMetrics.bind(this)(values)
    }


    render() {
        const children= [];
        const Option = Select.Option;
        let items = this.props.metrics;

        if (items){
            for (let i = 0; i < items.length ; i++) {
                let item = items[i];
                children.push(<Option key={item.id} value={item.id}>{item.name}</Option>);
            }
        }
        return <div className="convert-select">
            <div className="convert-select-name">指标:</div>

            <Select
            mode="multiple"
            style={{width: '100%'}}
            placeholder="请选择指标"
            defaultValue={this.props.defaultValues}
            onChange={(value)=>{
                this.handleChange(value)
            }}
        >
            {children}
        </Select>
        </div>
    }
}


export default HeaderBox;