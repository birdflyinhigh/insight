import React from 'react';
import Header from './Components/Header/Header';
import {connect} from 'react-redux';
import * as actions from './action';
import * as constant from './constant';
import Cards from './Components/Cards/Cards'
import SourceConvertFlow from './Components/FlowChart/ConvertFlow';
import BottomChart from './Components/BottomChart/ConvertFlow';
import {outSideItems, insideItems, bottomItems, URLS, bottomIntroText} from "./constant";
import {SERVER_ADDRESS} from "../../common/common";
import axios from 'axios';
import BottomIntro from "../../common/component/BottomIntro";


const dateFormat = "YYYY-MM-DD";


class Dashboard extends React.Component {

    props;

    componentDidMount() {
        this.queryData();
    }

    requestData = (action, extraParam) => {
        let params = {
            startTime: this.props.startDate.format(dateFormat),
            endTime: this.props.endDate.format(dateFormat),
            region: this.props.areaId,
            province: this.props.provinceId,
            city: this.props.cityId
        };
        if (action === 'SERVICE') {
            params['type'] = this.props.type
        }
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
            this.requestData(action)
        }
    };

    onSelectBox = (value) => {
        this.props.onChangeSelectBox(value);
        let extraParam = {
            type: value
        };
        this.requestData(actions.SERVICE, extraParam);
    };

    render() {
        const headerData = {
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            areaId: this.props.areaId,
            provinceId: this.props.provinceId,
            cityId: this.props.cityId,
            disabledStartTime: constant.DISABLED_START_TIME,
        };

        const headerFns = {
            updateDate: this.props.updateDate,
            updateArea: this.props.updateArea,
            updateProvince: this.props.updateProvince,
            updateCity: this.props.updateCity,
        };
        const selectData = {
            value: this.props.type,
            onChange: this.onSelectBox
        };
        return (
            <div className="dash-container">
                <h3 className="ceotitle-box">流量分析</h3>
                <Header
                    data={headerData}
                    fns={headerFns}
                    submit={() => this.queryData()}
                />
                <Cards
                    titles={this.props.titles}
                />
                <SourceConvertFlow
                    data={outSideItems}
                    source={this.props.outSources}
                />
                <SourceConvertFlow
                    data={insideItems}
                    source={this.props.innerSources}
                />
                <BottomChart
                    data={{...bottomItems, ...selectData}}
                    source={this.props.service}
                />
                <BottomIntro intro={bottomIntroText}/>

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        ...state.statetree.ceoFlowAnalysis
    };
};


const mapDispatchToProps = dispatch => {
    return {
        updateDate: (dateRange) => dispatch({type: actions.UPDATE_DATE, payload: dateRange}),
        updateArea: (areaId) => dispatch({type: actions.UPDATE_AREA, payload: areaId}),
        updateProvince: (provinceId) => dispatch({type: actions.UPDATE_PROVINCE, payload: provinceId}),
        updateCity: (cityId) => dispatch({type: actions.UPDATE_CITY, payload: cityId}),
        onChangeSelectBox: (value) => dispatch({type: actions.ON_CHANGE_SELECTBOX, payload: value}),
        sendRequest: (action, payload) => dispatch({type: action, payload: payload})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);