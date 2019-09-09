import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, Route} from 'react-router-dom';
import moment from 'moment';
import {CommonMethod} from '../../common/tools/common';
import {TopXhrAct, HeaderXhrAct, HeaderUiAct} from './action';
import TriBPlus from '../common/component/TriB';
import CeoIncome from '../income/Container';
import CeoOrder from '../order/Container';
import CeoZwork from '../zwork/Container';
import CeoEmploy from '../employ/Container';
import CeoService from '../service/Container';
import CeoTraffic from '../traffic/Container'
import CeoManager from '../manager/Container';
import CeoTrafficDetail from '../trafficHeat/Container';
import CeoHeatSearch from '../heatsearch/Container';
import CeoHeatSearchSecond from '../heatsearchsecond/Container';
import CeoFlowAnalysis from '../flowAnalysis/Container';
import CeoHr from '../hr/Container';
import CeoConvert from '../convert/Container';
import CeoUser from '../user/Container';
import {PathInfo, noHeaderPathNames} from './constant';
import {SmallBNumberList} from './config';
import TimeUtil from '../../common/tools/timeUtil';

import './index.scss';

const ComponentList = {
    CeoIncome, CeoTraffic, CeoOrder, CeoZwork, CeoEmploy,
    CeoService, CeoManager, CeoHr, CeoConvert, CeoTrafficDetail,
    CeoHeatSearch, CeoHeatSearchSecond,CeoFlowAnalysis, CeoUser
};

function mapStateToProps(state) {
    return {...state.statetree.ceoIndex};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        sendRequest: CommonMethod.sendRequest,
        finishRequest: TopXhrAct.finishRequest,
        changeTab: TopXhrAct.changeTab,
        selectStart: HeaderUiAct.selectStart,
        selectEnd: HeaderUiAct.selectEnd
    }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class CEOIndex extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const sendRequest = this.props.sendRequest;
        const that = this;
        sendRequest({
            actionName: "smallBNumber",
            path: PathInfo.smallBNumber,
            params: {},
            actions: TopXhrAct
        });

        // get authority
        async function getAuthority() {
            await sendRequest({
                actionName: "authority",
                path: PathInfo.authority,
                params: {},
                actions: TopXhrAct
            });
            const hasCurUrlAuth = that.props.authorityList.find((item) => item.link === window.location.pathname);
            if (that.props.authorityList.length && !hasCurUrlAuth) {
                that.props.history.push(that.props.authorityList[0].link)
            }
            await sendRequest({
                actionName: "province",
                path: PathInfo.province,
                params: {
                    area: that.props.regionId
                },
                actions: HeaderXhrAct
            });
            // 只在初始化的时候调用，完成之后才将符号位设置为true
            that.props.finishRequest(true);
        }

        getAuthority();
    }

    changeTab = (item) => () => {
        // 重置查询条件
        const times = (new TimeUtil()).getAllDate();
        let startTime = times.recent7Day;
        let endTime = times.yesterDay;
        let curBtn = "t2";
        if (item.key === "income") {
            startTime = moment().subtract(13, "days").format('YYYY-MM-DD');
            endTime = moment().subtract(6, "days").format('YYYY-MM-DD');
            curBtn = "-1";
        }
        this.props.selectStart({
            date: startTime,
            curBtn: curBtn
        });
        this.props.selectEnd({
            date: endTime,
            curBtn: curBtn
        });

        this.props.changeTab();
    };

    render() {
        const pathname = window.location.pathname;
        const routePathname = this.props.location.pathname;
        const dashStatsUrlStyle = {
            "backgroundColor": '#5888f4',
            "width":"200px",
            "textAlign": "right"
        }
        if (!this.props.loadingAthority) {
            return <p>权限加载中....</p>
        }

        if (this.props.loginStatus == false){
            return <p>您的登录信息已过期，请刷新页面</p>
        }
        console.log(this.props.authorityList);

        if (this.props.authorityList.length === 0) {
            return <p>您未开通权限，请从boss系统发起工作流，申请路径：新建工作流 - 信息化类 - 系统类权限申请流程 - BOSS/订单工作台权限</p>
        }

        if (noHeaderPathNames.indexOf(pathname) !== -1){
            return <div className="hr-bg ceo-board">
                <div className="ceo-content-wrapper">
                    {this.props.authorityList.map((item, index) =>
                        <Route
                            key={item.key}
                            path={item.link}
                            exact
                            component={ComponentList[item.component]}/>
                    )}
                </div>
            </div>

        }else {
            return <div className="hr-bg ceo-board">
                {/*<TriBPlus config={SmallBNumberList}*/}
                {/*          data={this.props.smallBNumber}*/}
                {/*/>*/}
                <div className="ceo-tab-link">
                    <div className="ceo-tab">
                        {this.props.authorityList.map((item) =>
                            <Link
                                className={pathname === item.link ? "active" : ""}
                                to={item.link}

                                onClick={this.changeTab(item)} key={item.key}>{item.name}</Link>
                        )}
                    </div>
                    <div className="dash-statistics">
                        <a
                            href="http://superset-bdata.zhubajie.la/superset/dashboard/ceodash"
                            className="stats-link"
                            target='_blank'
                        >查看数据工具访问情况</a>
                    </div>
                    <div className="dash-statistics" style={{right:156}}>
                        <a
                            href="http://boss.zbj.com/fe/dist/#/bossold/https%3A%2F%2Fbench.zbj.com%2Fdist%2Findex.html%3Fpage%3DGACBOJ%23%2Fboard"
                            className="stats-link"
                            target='_blank'
                        >查看服务商运营数据</a>
                    </div>
                    <div className="dash-statistics" style={{right:304}}>
                        <a
                            href="http://boss.zbj.com/fe/dist/#/bossold/https%3A%2F%2Fbench.zbj.com%2Fdist%2Findex.html%23%2Fsaashome"
                            className="stats-link"
                            target='_blank'
                        >查看销售管理数据</a>
                    </div>
                </div>
                <div className="ceo-content-wrapper">
                    {this.props.authorityList.map((item, index) =>


                        <Route
                            key={item.key}
                            path={item.link}
                            exact
                            component={ComponentList[item.component]}/>
                    )}
                </div>
            </div>
        }
    }
}

export default CEOIndex;