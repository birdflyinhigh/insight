import React, {Component} from 'react';
import {CommonMethod} from '../../common/tools/common';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import withSubscriptionHeader from '../common/component/BodyBox';
import OrderMain from './Dashboard';
import {XhrName, XhrAct, ChartXhrAct, ChartXhrName} from './action';
import {PathInfo} from './constant';

function mapStateToProps(state) {
    return {...state.statetree.ceoConvert};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        sendRequest: CommonMethod.sendRequest,
    }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class CeoOrder extends Component {
    constructor(props) {
        super(props);
        this.queryParams = {
            startTime: this.props.startTime,
            endTime: this.props.endTime,
            channel: this.props.channelId,
            area: this.props.regionId,
            province: this.props.provinceId,
            city: this.props.cityId,
            indexes: this.props.defaultIndex.join(','),
            index: this.props.index,
        };
    }

    componentDidMount() {
        this.queryData.bind(this)();
    }

    buildQueryParam(item) {
        let queryParams = null;
        switch (item) {
            case ("city"):
                queryParams = {
                    area: this.props.regionId,
                    province: this.props.provinceId
                };
                break;
            case ("channel"):
                queryParams = {};
                break;
            case ("region"):
                queryParams = {};
                break;
            case ("province"):
                queryParams = {
                    area: this.props.regionId,
                };
                break;
            default:
                queryParams = {...this.queryParams}
        }

        return queryParams
    }

    sendRequest() {
        XhrName.forEach((item) => {
            this.props.sendRequest({
                actionName: item,
                path: PathInfo[item],
                params: this.buildQueryParam(item),
                actions: XhrAct
            });
        });
    }

    getProvince(areaId) {
        this.props.sendRequest({
            actionName: "province",
            path: PathInfo.province,
            params: {
                area: areaId
            },
            actions: XhrAct,
        })

    }

    getCity(provinceId) {
        this.props.sendRequest({
            actionName: "city",
            path: PathInfo.city,
            params: {
                area: this.props.regionId,
                province: provinceId
            },
            actions: XhrAct,
        })

    }

    selectChannelMetrics(value){
        this.queryParams.index = value;
        this.props.sendRequest({
            actionName: "channelAnalyze",
            path: PathInfo.channelAnalyze,
            params: {
                ...this.queryParams,
            },
            actions: XhrAct
        });
    }

    selectMetrics(value) {
        this.queryParams.indexes = value.join(',');
        this.props.sendRequest({
            actionName: "metricsAnalyze",
            path: PathInfo.metricsAnalyze,
            params: {
                ...this.queryParams,
            },
            actions: XhrAct
        });
    }

    queryData() {
        this.queryParams.startTime = this.props.startTime;
        this.queryParams.endTime = this.props.endTime;
        this.queryParams.area = this.props.regionId;
        this.queryParams.province = this.props.provinceId;
        this.queryParams.city = this.props.cityId;
        this.queryParams.channel = this.props.channelId;
        this.sendRequest.bind(this)();
    }

    render() {
        let fns = {
            queryData: this.queryData.bind(this),
            getCity: this.getCity.bind(this),
            getProvince: this.getProvince.bind(this),
            selectMetrics: this.selectMetrics.bind(this),
            selectChannelMetrics: this.selectChannelMetrics.bind(this)
        };
        return <OrderMain {...this.props}
                          fns={fns}
                          queryData={this.queryData.bind(this)}

        />
    }
}

export default withSubscriptionHeader(CeoOrder, {
    showProduct: true
});