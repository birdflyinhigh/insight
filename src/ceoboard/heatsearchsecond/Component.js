import React, {Component} from 'react';
import Header from '../common/component/Header';
import TrafficCards from './Component/Cards/TraficCards';
import Charts from './Component/Charts/Charts';
import EConfig from '../../common/charts/EConfig';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faStroopwafel} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom';

library.add(faStroopwafel);


export default class ServiceMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newShopType: "area",
            keyServiceType: "area"
        }
    }

    selectNewShop(value) {
        this.setState({
            newShopType: value
        });
        this.props.fns.selectNewShop(value);
    }

    selectKeyService(value) {
        this.setState({
            keyServiceType: value
        });
        this.props.fns.selectKeyService(value);
    }

    render() {
        console.log(this.props.product);
        const headerData = {
            startTime: this.props.startTime,
            endTime: this.props.endTime,
            regionId: this.props.regionId,
            provinceId: this.props.provinceId,
            productId: this.props.productId,
            curBtn: this.props.curBtn,
            role: this.props.userRole,
            heatCat: this.props.heatCat,
            defaultProduct: this.props.defaultProduct

        };
        const headerFns = {
            selectStart: this.props.selectStart,
            selectEnd: this.props.selectEnd,
            selectRegion: this.props.selectRegion,
            selectProvince: this.props.selectProvince,
            selectProduct: this.props.selectProduct,
            selectHeatCat: this.props.fns.selectHeatCat,
            queryData: this.props.queryData
        };
        const newShop = {
            data: this.props.newShop,
            option: EConfig.donutChart,
            config: {
                unit: "",
                showSelfBoth: true,
                center: ["75%", "55%"]
            },
            height: 330
        };
        const keyService = {
            data: this.props.keyService,
            option: EConfig.donutChart,
            config: {
                unit: "",
                showSelfBoth: true,
                center: ["75%", "55%"]
            },
            height: 330
        };
        const serviceVIP = {
            data: this.props.serviceVIP,
            option: EConfig.donutChart,
            config: {
                unit: "",
                showSelfBoth: true,
                center: ["75%", "55%"]
            },
            height: 330
        };
        return <div className="dash-container">
            <h3 className="ceotitle-box">热搜热力图 > 一级类目热力图

                <Link
                    to="/manager/heatsearch"
                    className="ceotitle-link"
                >
                    返回上级页面
                </Link>
            </h3>
            <Header data={headerData} fns={headerFns} specialTimeStart={true}/>
            <Charts
                flowData={this.props.flowFunnel}
                tableData={this.props.heatTable}
                trendData={this.props.trendLine}
                trendMetrics={this.props.trendLineMetrics.data}
                selectMetrics={this.props.selectMetrics}
            />
        </div>
    }
}

