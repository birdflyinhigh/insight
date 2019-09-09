import React from 'react';
import Help from "../../../../common/component/Help";
import FlowArrow from './FlowComponents/flowArrow';
import FlowCard from './FlowComponents/flowCard';
import DescCard from './FlowComponents/descCard';
import {Card} from 'antd';
import {ArcherContainer, ArcherElement} from 'react-archer';
import {ExtraFlowCard} from "../../../convert/Component/ConvertFlow/FlowComponents/flowCard";

const dailyUvTip = "集团UV：集团整体UV，剔除八戒知产、八戒财税、八戒科技服务、八戒金融等业务的UV";
const entryUvTip = "日均进店UV：指访问过shop.zbj.com域的UV数/所选时段天数";
const dailyShopUvTip = "日均店铺UV：所有服务商店铺UV之和（如果1个访客访问3个店铺，记为3个UV）/ 所选时段天数";
const dailyShopEffectUvTip = "店铺有效UV：指进入店铺的有效UV，其中直访到店铺的流量占比超过整体店铺直访UV有效占比时记直访UV的整体店铺直访UV有效占比为有效，非直访UV均为有效流量（其中广告流量不计算在内）";
const supportWorksTip = "可支撑权益工位数：店铺有效UV / 5";
const dailyZworkShopUvTip = "工场会员店铺有效UV：工场会员店铺的店铺有效uv";
const entryRateTip = "到店率：进店UV  / ZBJ平台UV。";
const agvShopVisitsTip = "人均浏览店铺数：店铺UV /  进店UV。";
const shopScrapeRateTip = "店铺UV损耗率：1 - 店铺有效UV / 店铺UV";
const zworkRatioTip = "工场会员占比: 工场会员店铺UV / 店铺有效UV";
const dailyWorkUvTip = "平均每个工位日均UV： 已购买有流量权益的服务商日均UV / 有流量权益总工位数";
const dailyWorkAskTip = "日均店铺咨询量：统计周期内，每天咨询服务商的人数均值（咨询方式包括IM、隐私小号、企点）。注：IM咨询必须建立含雇主和服务商的会话，不包含官方系统消息；企点数据为T-2，所以昨日咨询量不包含企点部分的数据；同一个用户咨询多个店铺，算多个店铺咨询";
const dailyZWorkAskTip = "工场会员店铺咨询量：统计周期内，每天咨询工场会员服务商的人数均值（咨询方式包括IM、隐私小号、企点）。注：IM咨询必须建立含雇主和服务商的会话，不包含官方系统消息；企点数据为T-2，所以昨日咨询量不包含企点部分的数据；同一个用户咨询多个店铺，算多个店铺咨询"
const FlowContainer = (props) => {
    const rootStyle = {marginTop: '20px', display: 'flex', justifyContent: 'space-between',};
    const rowStyle = {margin: '150px 0', display: 'flex', justifyContent: 'space-between',};
    const boxStyle = {padding: '10px', border: '1px solid black',};
    const {
        dailyUv, entryUv, dailyShopUv, dailyShopEffectUv,
        supportWorks, dailyZworkShopUv, entryRate, avgShopVisits,
        shopScrapeRate, zworkRatio, dailyWorkUv
    } = props.data;
    const data = {
        ...props.data
    };
    return (
        <div>

            <ArcherContainer strokeColor='red'>
                <div style={rootStyle}>
                    <ArcherElement
                        id="row11"
                        relations={[{
                            targetId: 'row21',
                            targetAnchor: 'top',
                            sourceAnchor: 'bottom',
                            style: {
                                strokeColor: 'rgb(255,182,133)'
                            },
                            label: <DescCard
                                amount={entryRate + "%"}
                                marginLeft={150} w={100}
                                title={"到店率"}
                                info={entryRateTip}
                            />,
                        }]}
                    >
                        <FlowCard amount={dailyUv.toFixed(0)} title={"集团UV"} info={dailyUvTip}></FlowCard>
                    </ArcherElement>
                    <ArcherElement
                        id="row12"
                    >
                        <FlowCard amount={1} empty={true}></FlowCard>
                    </ArcherElement>
                    <ArcherElement
                        id="row13"
                    >
                        <FlowCard amount={data.shopCon} title={"日均店铺咨询量"} info={dailyWorkAskTip}/>
                    </ArcherElement>
                    <ArcherElement
                        id="row14"
                    >
                        <FlowCard amount={data.memberCon} title={"日均工场会员店铺咨询量"} info={dailyZWorkAskTip}/>
                    </ArcherElement>


                </div>

                <div style={rowStyle}>
                    <ArcherElement
                        id="row21"
                        relations={[{
                            targetId: 'row22',
                            targetAnchor: 'left',
                            sourceAnchor: 'right',
                            style: {
                                strokeColor: 'rgb(255,182,133)',
                            },
                            label: <DescCard
                                amount={avgShopVisits}
                                marginBottom={-120}
                                title={"人均浏览店铺数"}
                                info={agvShopVisitsTip}
                            />,
                        }]}
                    >
                        <FlowCard amount={entryUv} title={"日均进店UV"} info={entryUvTip}/>
                    </ArcherElement>

                    <ArcherElement
                        id="row22"
                        relations={[{
                            transform: 'rotate(-180deg)',
                            targetId: 'row23',
                            targetAnchor: 'left',
                            sourceAnchor: 'right',
                            style: {
                                strokeColor: 'rgb(255,182,133)',
                            },
                            label: <DescCard
                                amount={shopScrapeRate + "%"}
                                marginBottom={-120}
                                title={"店铺UV损耗率"}
                                info={shopScrapeRateTip}
                            />,
                        }]}
                    >
                        <FlowCard amount={dailyShopUv} title={"日均店铺UV"} info={dailyShopUvTip}/>
                    </ArcherElement>

                    <ArcherElement
                        id="row23"
                        relations={[{
                            targetId: 'row24',
                            targetAnchor: 'left',
                            sourceAnchor: 'right',
                            style: {
                                strokeColor: 'rgb(255,182,133)',
                            },
                        }, {
                            targetId: 'row13',
                            targetAnchor: 'bottom',
                            sourceAnchor: 'top',
                            style: {
                                strokeColor: 'rgb(255,182,133)',
                            },
                            label: <DescCard
                                amount={data.shopConRate + "%"}
                                marginBottom={0}
                                marginLeft={-173}
                                offset={105}
                                title={"店铺咨询率"}
                                info={"咨询率：日均店铺咨询量/日均店铺有效UV"}
                            />,
                        }]}
                    >
                        <ExtraFlowCard
                            width={212}
                            title="日均店铺有效UV"
                            amount={data.shopvuv}
                            helpStyle={{
                                "left":'156px',
                                "top":'9px'}}
                            info={"店铺有效UV：指进入店铺的有效UV，其中直访到店铺的流量占比超过整体店铺直访UV有效占比时记直访UV的整体店铺直访UV有效占比为有效，非直访UV均为有效流量（其中广告流量不计算在内）;</br>" +
                            "日均可支撑权益工位数：可支撑权益工位数：店铺有效UV / 3"}
                            data={{
                                title: "日均可支撑权益工位数",
                                amount: data.eqstation
                            }}
                        />
                    </ArcherElement>

                    <ArcherElement
                        id="row24"
                        relations={[{
                            targetId: 'row14',
                            targetAnchor: 'bottom',
                            sourceAnchor: 'top',
                            style: {
                                strokeColor: 'rgb(255,182,133)',
                            },
                            label: <DescCard
                                amount={data.memberConRate + "%"}
                                marginBottom={0}
                                marginLeft={-184}
                                offset={131}
                                title={"工场会员店铺咨询率"}
                                info={"工场会员店铺咨询率： 日均工场会员店铺咨询量/日均工场会员店铺有效UV"}
                            />,
                        }]}
                    >
                        <FlowCard amount={data.avgmemberuv} title={"日均工场会员店铺有效UV"} info={dailyZworkShopUvTip}/>
                    </ArcherElement>
                </div>
            </ArcherContainer>

        </div>
    );
};


const FlowFunnel = (props) => {

    return (<div className="dc-chart-wrapper">
        <div className="dc-chart-item" style={{width: "100%", height: "450px"}}>
            <div className="dc-chart">
                <div className="hrchart-title admin-body">
                    流量漏斗
                    <div className="erp-selectbox"
                         style={{right: 0, width: "auto", top: 15}}
                    >
                    </div>
                </div>

                <FlowContainer data={props.data}/>

            </div>
        </div>
    </div>)
};

export default FlowFunnel;