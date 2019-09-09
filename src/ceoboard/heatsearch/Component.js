import React, {Component} from 'react';
import Header from '../common/component/Header';
import TrafficCards from './Component/Cards/TraficCards';
import Charts from './Component/Charts/Charts';
import EConfig from '../../common/charts/EConfig';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

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
        const headerData = {
            startTime: this.props.startTime,
            endTime: this.props.endTime,
            regionId: this.props.regionId,
            provinceId: this.props.provinceId,
            productId: this.props.productId,
            curBtn: this.props.curBtn,
            role: this.props.userRole,
        };
        const headerFns = {
            selectStart: this.props.selectStart,
            selectEnd: this.props.selectEnd,
            selectRegion: this.props.selectRegion,
            selectProvince: this.props.selectProvince,
            selectProduct: this.props.selectProduct,
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
            <h3 className="ceotitle-box">热搜热力图</h3>
            <Header data={headerData} fns={headerFns} specialTimeStart={true}/>
            <Charts
                flowData={this.props.flowFunnel}
                tableData={this.props.heatTable.data}
                trendData={this.props.trendLine}
                trendMetrics={this.props.trendLineMetrics.data}
                selectMetrics={this.props.selectMetrics}
            />
        </div>
    }
}

