import React, {Component} from 'react';
import {CommonMethod} from '../../common/tools/common';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import withSubscriptionHeader from '../common/component/BodyBox';
import ServiceMain from './Component';
import {XhrAct, XhrName} from './action';
import {PathInfo} from './constant';

function mapStateToProps(state) {
    return {...state.statetree.ceoHeatSearchSecond};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        sendRequest: CommonMethod.sendRequest,
    }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class CeoTraffic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultProduct: this.props.defaultProduct
        }
        this.queryParams = {
            startTime: this.props.startTime,
            endTime: this.props.endTime,
            product: this.state.defaultProduct.join(','),
        };
        this.selectParams = {
            newShop: "area",
            keyService: "area"
        }

    }
    updateDefaultProduct(value){
        this.setState({
            defaultProduct: value
        });
        this.props.defaultProduct = value;
    }


    selectMetrics(value){
        this.props.sendRequest({
            actionName: "trendLine",
            path: PathInfo.trendLine,
            params: {
                startTime: this.props.startTime,
                endTime: this.props.endTime,
                indexs: value.join(',')
            },
            actions: XhrAct
        });
    }

    componentDidMount() {
        this.sendRequest.bind(this)();
    }

    sendRequest() {
        XhrName.forEach((item, index) => {
                this.props.sendRequest({
                    actionName: item,
                    path: PathInfo[item],
                    params: this.queryParams,
                    actions: XhrAct
                });

        });
    }

    selectNewShop(value) {
        this.selectParams.newShop = value;
        this.props.sendRequest({
            actionName: "newShop",
            path: PathInfo.newShop,
            params: {
                target: value,
                ...this.queryParams
            },
            actions: XhrAct
        });
    }

    selectKeyService(value) {
        this.selectParams.keyService = value;
        this.props.sendRequest({
            actionName: "keyService",
            path: PathInfo.keyService,
            params: {
                target: value,
                ...this.queryParams
            },
            actions: XhrAct
        });
    }
    queryData() {
        this.queryParams.startTime = this.props.startTime;
        this.queryParams.endTime = this.props.endTime;
        this.queryParams.product = this.state.defaultProduct.join(',');
        if (this.state.defaultProduct.length<=0){
            this.queryParams.product = this.props.defaultProduct.join(',');
        }
        this.sendRequest.bind(this)();
    }

    render() {
        const fns = {
            selectMetrics: this.selectMetrics.bind(this),
            selectHeatCat: this.updateDefaultProduct.bind(this)
        };
        return <ServiceMain
            {...this.props}
            fns={fns}
            queryData={this.queryData.bind(this)}
            selectMetrics={this.selectMetrics.bind(this)}
            defaultProduct={this.state.defaultProduct}

        />
    }
}

export default withSubscriptionHeader(CeoTraffic, {
    showProduct: true
});