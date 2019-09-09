import React, {Component} from 'react';
import {DatePicker, Select} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import {notification} from 'antd';
import moment from 'moment';
import Time from '../../../common/tools/timeUtil';
import Help from '../../../common/component/Help';

const Option = Select.Option;
const TimeUtil = new Time();

export default class IndexHeader extends Component {
    constructor(props) {
        super(props);
        this.AllTime = TimeUtil.getAllDate();
        this.allBtn = [{
            name: "昨天",
            startTime: moment(this.AllTime.yesterDay),
            key: "t1"
        }, {
            name: "近7天",
            startTime: moment(this.AllTime.recent7Day),
            key: "t2"
        }, {
            name: "近30天",
            startTime: moment(this.AllTime.recent30Day),
            key: "t3"
        }, {
            name: "本月",
            startTime: moment(this.AllTime.curMonth),
            key: "t4"
        }, {
            name: "本季度",
            startTime: moment(this.AllTime.curSeason),
            key: "t5"
        }, {
            name: "当年",
            startTime: moment(this.AllTime.curYear),
            key: "t6"
        }, {
            name: "自定义时间",
            startTime: "",
            key: "-1"
        }];
        this.quickBtn = props.specialTime ? this.allBtn.slice(4) : this.allBtn;
        this.dateFormat = "YYYY-MM-DD";
        this.oneDayTime = 1 * 24 * 60 * 60 * 1000;
        this.state = {
            curBtn: this.props.data.curBtn
        };
        this.timeParams = {
            startTime: this.props.data.startTime,
            endTime: this.props.data.endTime
        };
        this.helpText = "因ERP核算暂未实现T+1，仪表盘目前展示营收数据截止时间为5天前，5月31日（预计）ERP核算实现T+1之后，仪表盘营收数据将同步实现T+1；"
    }

    componentDidMount() {
    }

    disableFutureTime(current) {
        const endTime = this.props.specialTime ? moment().subtract(6, 'days') : moment().subtract(1, 'days');
        return current && current > endTime;
    }

    selectTimeType(value) {
        if (value !== "-1") {
            const selectItem = this.quickBtn.filter((item) => item.key === value);
            const formatDate = selectItem[0].startTime.format('YYYY-MM-DD');
            // erp系统原因，改为昨天前五天
            const yesterDay = this.props.specialTime ? moment().subtract(6, "days").format('YYYY-MM-DD') : this.quickBtn[0].startTime.format('YYYY-MM-DD');
            this.timeParams.startTime = formatDate;
            this.props.fns.selectStart({
                date: formatDate,
                curBtn: value
            });
            if (this.props.data.endTime !== yesterDay) {
                this.props.fns.selectEnd({
                    date: yesterDay,
                    curBtn: value
                });
                this.timeParams.endTime = yesterDay;
            }
        }
        this.setState({
            curBtn: value
        });
    }

    selectStart(date, dateString) {
        let formatDate = date.format('YYYY-MM-DD')
        this.timeParams.startTime = formatDate;
        this.props.fns.selectStart({
            date: formatDate,
            curBtn: "-1"
        });
        this.setState({
            curBtn: "-1"
        });
    }

    selectEnd(date, dateString) {
        let formatDate = date.format('YYYY-MM-DD')
        this.timeParams.endTime = formatDate;
        this.props.fns.selectEnd({
            date: formatDate,
            curBtn: "-1"
        });
        this.setState({
            curBtn: "-1"
        });
    }

    selectChannel(value) {
        this.props.fns.selectChannel(value);
    }

    selectCity(value) {
        this.props.fns.selectCity(value);
    }

    selectRegion(value) {
        this.props.fns.selectRegion(value);
        this.props.fns.getProvince(value);
    }

    selectProvince(value) {
        this.props.fns.selectProvince(value);
        this.props.fns.getCity(value);
    }
    popInvalidTimeNotify() {
        let mStart = moment(this.timeParams.startTime);
        let mEnd = moment(this.timeParams.endTime);
        if (mEnd.diff(mStart) < 0) {
            notification.error({
                message: '温馨提示',
                description: '您选择的开始日期小于结束日期,请重新选择',
            });
            return true;
        }
    }

    queryData() {
        if (this.popInvalidTimeNotify.bind(this)()) return;
        this.props.fns.queryData();
    }

    render() {
        return <div className="dash-header">
            <div className="dashh-item">
                <div className="dashh-title">时间:
                    {this.props.specialTime ? <Help info={this.helpText}/> : ""}
                </div>
                <Select
                    value={this.state.curBtn}
                    style={{width: 150}}
                    onChange={this.selectTimeType.bind(this)}
                >
                    {this.quickBtn.map((btn, index) =>
                        <Option key={index} value={btn.key}>{btn.name}</Option>
                    )}
                </Select>
                <div className="dashh-dates">
                    <DatePicker value={moment(this.props.data.startTime)}
                                locale={locale}
                                allowClear={false}
                                format={this.dateFormat}
                                disabledDate={this.disableFutureTime.bind(this)}
                                onChange={this.selectStart.bind(this)}/>
                    <span>&nbsp;——&nbsp;</span>
                    <DatePicker value={moment(this.props.data.endTime)}
                                locale={locale}
                                allowClear={false}
                                format={this.dateFormat}
                                disabledDate={this.disableFutureTime.bind(this)}
                                onChange={this.selectEnd.bind(this)}/>
                </div>
            </div>
            <div className="dashh-item">
                <b className="dashh-title">渠道:</b>
                <Select style={{width: 150}}
                        value={this.props.data.channelId}
                        onChange={this.selectChannel.bind(this)}
                >
                    {<Option value={-1}>全部渠道</Option>}
                    {this.props.data.channel.map((item, index) =>
                        <Option key={index} value={item.id}>{item.name}</Option>)}
                </Select>
            </div>
            <div className="dashh-item">
                <b className="dashh-title">地域:</b>
                <Select style={{width: 150, marginRight: 12}}
                        value={this.props.data.regionId===0?-1:this.props.data.regionId}
                        onChange={this.selectRegion.bind(this)}
                >
                    {<Option value={-1}>全部大区</Option>}
                    {this.props.data.region.map((item, index) =>
                        <Option key={index} value={item.id}>{item.name}</Option>)}
                </Select>
                <Select style={{width: 150}} value={this.props.data.provinceId}
                        onChange={this.selectProvince.bind(this)}
                >
                    {<Option value={-1}>全部省份</Option>}
                    {this.props.data.province.map((item, index) =>
                        <Option key={index} value={item.id}>{item.name}</Option>)}
                </Select>
                <Select style={{width: 150}} value={this.props.data.cityId}
                        onChange={this.selectCity.bind(this)}
                >
                    {<Option value={-1}>全部城市</Option>}
                    {this.props.data.city?this.props.data.city.map((item, index) =>
                        <Option key={index} value={item.id}>{item.name}</Option>):""}
                </Select>
            </div>

            <div className="dashh-item"
                 onClick={this.queryData.bind(this)}>
                <div className="query-btn">
                    <a>查询</a>
                </div>
            </div>
        </div>
    }
}