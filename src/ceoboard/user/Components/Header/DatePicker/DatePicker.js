import React from 'react';
import {Select} from 'antd';
import {DatePicker} from 'antd';
import {quickBtns, btnDateDict} from './constant';


const {Option} = Select;


const {RangePicker} = DatePicker;


class CeoDatePicker extends React.Component {

    props;

    state = {
        curBtn: 't2',
    };

    selectTimeType = (value) => {
        this.setState({
            curBtn: value
        });
        if (value !== 'default') {
            this.props.fns.updateDate(btnDateDict[value]);
        }
    };

    pickDate = (value) => {
        this.props.fns.updateDate(value)
        this.setState({
            curBtn: 'default'
        });
    };


    render() {
        return (
            <div className="dashh-item">
                <div className="dashh-title">时间:
                </div>
                <Select
                    style={{width: 180}}
                    value={this.state.curBtn}
                    onChange={this.selectTimeType.bind(this)}
                >

                    {quickBtns.map((btn, index) =>
                        <Option key={index} value={btn.key}>{btn.name}</Option>
                    )}
                </Select>
                <div className="dashh-dates">
                    <div className="dashh-dates">
                        <DatePicker value={this.props.data.startDate}
                        />
                        <span>&nbsp;——&nbsp;</span>
                        <DatePicker value={this.props.data.endTime}
                        />
                    </div>

                </div>
            </div>
        )
    }
}

export default CeoDatePicker;