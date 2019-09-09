import React from 'react';
import {Component} from 'react';
import {Select} from 'antd';
import './SelectBox.css';



class HeaderBox extends Component {

    constructor(props){
        super(props);
    }

    handleChange(value){
        this.props.selectMetrics.bind(this)(value)
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
        return <div className="convert-select-2">
            <div className="convert-select-name">指标:</div>

            <Select
            mode="single"
            style={{width: '100%'}}
            placeholder="请选择指标"
            defaultValue={1}
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