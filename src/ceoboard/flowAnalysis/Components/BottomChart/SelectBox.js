import React from 'react';
import {Component} from 'react';
import {Select} from 'antd';
import axios from 'axios';
import {SERVER_ADDRESS} from "../../../../common/common";
import './SelectBox.css';




class HeaderBox extends Component {

    props;
    state={
        options: []
    };

    componentDidMount() {
        this.getOptions()
    }

    getOptions = () => {
        axios.get(SERVER_ADDRESS + 'manager/change/index', {
            withCredentials: true,
        }).then((response) => {
            this.setState({
                options: response.data,
            })
        }).catch((error) => {
            console.log('something went wrong', error);
        })
    };

    render() {

        const Option = Select.Option;
        const {options} = this.state;
        return <div className="convert-select-2">
            <div className="flow-select-name">站内分配方式:</div>

            <Select
            mode="single"
            style={{width: '100%'}}
            placeholder="请选择指标"
            value={this.props.data.value}
            onChange={(value)=>{
                this.props.data.onChange(value)
            }}
        >
                {options.map((item, index)=>(
                    <Option key={item.id} value={item.id}>{item.name}</Option>
                ))}
        </Select>
        </div>
    }
}


export default HeaderBox;