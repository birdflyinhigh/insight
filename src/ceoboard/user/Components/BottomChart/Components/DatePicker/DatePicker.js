import React from 'react';
import {Select} from 'antd';
import {DatePicker} from 'antd';
import {quickBtns, btnDateDict} from './constant';
import moment from 'moment';


const {Option} = Select;



class CeoDatePicker extends React.Component {

    props;

    state = {
        curBtn: 't2',
    };

    disableFutureTime(current) {
        const endTime =  moment().subtract(1, 'days');
        const startTime = moment('2019-09-01 00:00:00');
        return (current && current > endTime) || (current && current < startTime);
    }


    selectTimeType = (value) => {
        this.setState({
            curBtn: value
        });
        if (value !== 'default') {
            this.props.data.pickRange(btnDateDict[value])
        }
    };

    pickStart = (value) => {
        this.props.data.pickStart(value);
        this.setState({
            curBtn: 'default'
        });
    };

    pickEnd = (value) => {
        this.props.data.pickEnd(value);
        this.setState({
            curBtn: 'default'
        });
    };


    render() {

        return (
            <div style={{color: 'rgba(0, 0, 0, 0.65)',fontSize: 14}}>
                <div className="dashh-title" >
                </div>
                <Select
                    style={{width: 90}}
                    value={this.state.curBtn}
                    onChange={this.selectTimeType}
                >

                    {quickBtns.map((btn, index) =>
                        <Option key={index} value={btn.key}>{btn.name}</Option>
                    )}
                </Select>
                <div className="dashh-dates" style={{marginLeft: 10, marginRight: 15}}>
                        <DatePicker
                            value={this.props.data.startDate}
                            onChange={this.pickStart}
                            disabledDate={this.disableFutureTime.bind(this)}
                        />
                        <span>&nbsp;——&nbsp;</span>
                        <DatePicker value={this.props.data.endDate}
                                    onChange={this.pickEnd}
                                    disabledDate={this.disableFutureTime.bind(this)}
                        />
                </div>
            </div>
        )
    }
}

export default CeoDatePicker;