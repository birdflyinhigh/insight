import React from 'react';
import Header from './Components/Header/Header';
import {connect} from 'react-redux';
import * as actions from './action';
import Cards from './Components/Cards/Cards'
import UserChart from './Components/UserChart/Container';
import BottomChart from './Components/BottomChart/Container';
import {firstChartItems, insideItems, bottomItems, URLS, bottomIntroText} from "./constant";
import {SERVER_ADDRESS} from "../../common/common";
import axios from 'axios';
import BottomIntro from "../../common/component/BottomIntro";
import * as constant from "../flowAnalysis/constant";


const dateFormat = "YYYY-MM-DD";


class Dashboard extends React.Component {

    props;


    state = {
        areaId: -1,
        provinceId: -1,
        cityId: -1,
        type: 2,
    };

    componentDidMount() {
        this.queryData();
    }


    params = (action) => {
        const sharedParams = {
            region: this.state.areaId,
            province: this.state.provinceId,
            city: this.state.cityId
        };
        const dateRange = {
            startTime: this.props.startDate.format(dateFormat),
            endTime: this.props.endDate.format(dateFormat),
        };
        const params = {
            USER: {
                ...sharedParams
            },
            USER_LAYER: {
                ...sharedParams
            },
            SERVICE_LAYER: {
                ...sharedParams,
                type: this.state.type
            },
            SERVICE_INCOME_LAYER: {
                ...sharedParams,
                type: this.state.type
            },
            SALE: {
                ...sharedParams,
                ...dateRange
            },
            SALE2: {
                ...sharedParams,
                ...dateRange
            },
            SUBMIT_CHANCE: {
                ...sharedParams,
                type: this.state.type
            }
        };
        return params[action]
    };


    requestData = (action, extraParam) => {
        let params = this.params(action);

        axios.get(SERVER_ADDRESS + URLS[action], {
            withCredentials: true,
            params: {...params, ...extraParam},
        }).then((response) => {
            this.props.sendRequest(action, response.data);
        }).catch((error) => {
            console.log('something went wrong', error);
        });
    };


    queryData = () => {
        for (let action in URLS) {
            if(action !== actions.SUBMIT_CHANCE){
                this.requestData(action)
            }
        }
        this.forceUpdate();
    };

    onSelectBox = (value) => {
        this.updateType(value);
        let extraParam = {
            type: value
        };
        this.requestData(actions.SERVICE_LAYER, extraParam);
        this.requestData(actions.SERVICE_INCOME_LAYER, extraParam);
    };
    updateArea = (value) => {
        this.setState({
            areaId: value,
            provinceId: -1,
            cityId: -1,
        })
    };

    updateProvince = (value) => {
        this.setState({
            provinceId: value,
            cityId: -1,
        })
    };
    updateCity = (value) => {
        this.setState({
            cityId: value
        })
    };

    updateType = (value) => {
        this.setState({
            type: value
        })
    };


    pickStart = (start) => {
        let extraParam = {
            startTime: start.format(dateFormat)
        };
        this.requestData(actions.SALE, extraParam);
        this.requestData(actions.SALE2, extraParam);
        this.props.pickStart(start);
    };
    pickEnd = (end) => {
        let extraParam = {
            endTime: end.format(dateFormat)
        };
        this.requestData(actions.SALE, extraParam);
        this.requestData(actions.SALE2, extraParam);
        this.props.pickEnd(end);
    };
    pickRange = (value) => {
        let start = value[0];
        let end = value[1];
        let extraParam = {
            startTime: start.format(dateFormat),
            endTime: end.format(dateFormat)
        };
        this.requestData(actions.SALE, extraParam);
        this.requestData(actions.SALE2, extraParam);
        this.props.pickEnd(end);
        this.props.pickStart(start);
    };

    submitChance = (value, limits)=>{
        let params = this.params(actions.SUBMIT_CHANCE);
        let extraParam = {
            layer: value
        };

        let action = actions.SUBMIT_CHANCE;
        if(limits > 200) {
            let data = {
                message: '当前只支持向CRM系统提交200个以内的商机'
            };
            this.props.sendRequest(action, data);
            return
        }

        axios.get(SERVER_ADDRESS + URLS[action], {
            withCredentials: true,
            params: {...params, ...extraParam},
        }).then((response) => {
            this.props.sendRequest(action, response.data);
        }).catch((error) => {
                if(error.response.status === 403){
                    let data = {
                        message: '您没有开通商机推荐权限，请联系仪表盘管理员，谢谢！'
                    };
                    this.props.sendRequest(action, data);
                }
        });
    };

    render() {
        const headerData = {
            ...this.state
        };

        const headerFns = {
            updateArea: this.updateArea,
            updateProvince: this.updateProvince,
            updateCity: this.updateCity,
        };
        const selectData = {
            ...this.state,
            onChange: this.onSelectBox
        };

        const midChartData = {
            userLayer: this.props.userLayer,
            serviceLayer: this.props.serviceLayer,
            serviceIncomeLayer: this.props.serviceIncomeLayer,
            canSubmitChance: this.props.canSubmitChance,
            submit: this.submitChance,
            message: this.props.message
        };
        const bottomChartData = {
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            ...bottomItems,
            sales: this.props.sales,
            sales2: this.props.sales2,
            pickStart: this.pickStart,
            pickEnd: this.pickEnd,
            pickRange: this.pickRange,
            disabledStartTime: constant.DISABLED_START_TIME,
        };
        console.log(this.props.message)
        return (
            <div className="dash-container">
                <h3 className="ceotitle-box">用户分析</h3>
                <Header
                    data={headerData}
                    fns={headerFns}
                    submit={() => this.queryData()}
                />
                <Cards
                    data={this.props.user}
                />
                <UserChart
                    data={{...firstChartItems, ...selectData, ...midChartData}}
                    source={this.props.outSources}
                />

                <BottomChart
                    data={bottomChartData}
                />
                <BottomIntro intro={bottomIntroText}/>

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        ...state.statetree.ceoUser
    };
};


const mapDispatchToProps = dispatch => {
    return {
        pickStart: (value) => dispatch({type: actions.PICK_START, payload: value}),
        pickEnd: (value) => dispatch({type: actions.PICK_END, payload: value}),
        updateArea: (areaId) => dispatch({type: actions.UPDATE_AREA, payload: areaId}),
        updateProvince: (provinceId) => dispatch({type: actions.UPDATE_PROVINCE, payload: provinceId}),
        updateCity: (cityId) => dispatch({type: actions.UPDATE_CITY, payload: cityId}),
        onChangeSelectBox: (value) => dispatch({type: actions.ON_CHANGE_SELECTBOX, payload: value}),
        sendRequest: (action, payload) => dispatch({type: action, payload: payload})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);