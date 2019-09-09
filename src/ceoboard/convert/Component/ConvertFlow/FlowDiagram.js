import React from 'react';
import {ArcherContainer, ArcherElement} from 'react-archer';
import FlowCard from './FlowComponents/flowCard';
import {ExtraFlowCard} from './FlowComponents/flowCard';
import DescCard from "./FlowComponents/descCard";
import {DescMultiCard} from "./FlowComponents/descCard";
import './FlowDiagram.css'

const rootStyle = {display: 'flex', justifyContent: 'space-between', marginTop: "10px"};
const rowStyle1 = {margin: '75px 0', display: 'flex', justifyContent: 'space-between',};
const rowStyle2 = {margin: '75px 0', display: 'flex', justifyContent: 'space-between', marginBottom: '10px'};

const App = (props) => {
    const data = {
        ...props.data
    };
    return (
        <div className="convert-flow-container">

            <ArcherContainer strokeColor='red'>
                <div style={rootStyle}>
                    <ArcherElement
                        id="root"
                        relations={[{
                            targetId: 'row32',
                            targetAnchor: 'left',
                            sourceAnchor: 'right',
                            style: {
                                strokeColor: 'rgb(255,182,133)'
                            },
                            // label: <DescCard
                            //     amount={data.invitationRate + "%"}
                            //     marginLeft={-65} w={100}
                            //     title={"投标率"}
                            //     info={123}
                            // />,

                        },
                            {
                                targetId: 'row12',
                                targetAnchor: 'left',
                                sourceAnchor: 'right',
                                style: {
                                    strokeColor: 'rgb(255,182,133)'
                                },
                                // label: <DescCard
                                //     amount={data.shopRate + "%"}
                                //     marginLeft={8} w={100}
                                //     title={"进店率"}
                                //     info={123}
                                // />,

                            }

                        ]}

                    >
                        <FlowCard
                            title="集团UV"
                            amount={data.zbjUv}
                            info={"集团UV：统计周期内，集团PC、WAP、买家APP端整体的独立访客数"}
                        />
                    </ArcherElement>
                    <ArcherElement
                        id="row12"
                        relations={[{
                            targetId: 'row13',
                            targetAnchor: 'left',
                            sourceAnchor: 'right',
                            style: {
                                strokeColor: 'rgb(255,182,133)'
                            },
                            // label: <DescMultiCard
                            //     amount1={data.directUv}
                            //     marginLeft={8} w={100}
                            //     title1={"UV直接提交量"}
                            //     title2={"UV直接提交率"}
                            //     amount2={data.directUvRate+ "%"}
                            //     info={123}
                            //     top="-18px"
                            // />,
                        },
                            {
                                targetId: 'row22',
                                targetAnchor: 'top',
                                sourceAnchor: 'bottom',
                                style: {
                                    strokeColor: 'rgb(255,182,133)'
                                },
                                label: <DescCard
                                    amount={data.advisoryRate + "%"}
                                    marginLeft={-75} w={100}
                                    title={"咨询率"}
                                    info={123}
                                />,
                            }

                        ]}
                    >
                        <FlowCard
                            title="店铺有效UV"
                            amount={data.shopUv}
                            info={"店铺有效UV：指进入店铺的有效UV，其中直访到店铺的流量占比超过 整体店铺直访UV有效占比 时记直访UV的整体店铺直访UV有效占比 为有效，非直访UV均为有效流量"}
                        />
                    </ArcherElement>
                    <ArcherElement
                        id="row13"
                        relations={[{
                            targetId: 'row14',
                            targetAnchor: 'left',
                            sourceAnchor: 'right',
                            style: {
                                strokeColor: 'rgb(255,182,133)',
                                zIndex: 1,
                            },
                            label: <DescCard
                                amount={data.dealRate + "%"}
                                marginLeft={8} w={100}
                                title={"成交率"}
                                info={123}
                            />,
                        }]}
                    >
                        <FlowCard
                            title="1V1订单提交量"
                            amount={data.submit}
                            info={"1V1订单提交量：统计周期内，全站订单中,雇佣模式的提交量（不含官方自营店铺和分包订单。)"}
                        />
                    </ArcherElement>
                    <ArcherElement
                        id="row14"
                        relations={[{
                            targetId: 'row15',
                            targetAnchor: 'left',
                            sourceAnchor: 'right',
                            style: {
                                strokeColor: 'rgb(255,182,133)'
                            },
                        }]}
                    >
                        <ExtraFlowCard
                            title="1V1订单成交量"
                            amount={data.preDeal}
                            info={"1V1订单成交量：统计周期内，全站订单中,1V1(雇佣)模式的成交量（不含官方自营店铺和分包订单。）</br>" +
                            "1V1订单成交金额：统计周期内，全站订单中,1V1(雇佣)模式的成交金额（不含官方自营店铺和分包订单。）"}
                            data={{
                                title: "1V1订单成交金额",
                                amount: data.dealCost + "万元"
                            }}
                        />
                    </ArcherElement>
                    <ArcherElement
                        id="row15"
                    >
                        <FlowCard
                            title="1V1技术服务费"
                            amount={data.technical + "万元"}
                            info={"1V1订单技术服务费：统计周期内，全站订单中,1V1(雇佣)模式的订单收取的技术服务费（不含官方自营店铺和分包订单。）"}
                        />
                    </ArcherElement>
                </div>


                <div style={rowStyle1}>
                    <ArcherElement
                        id="row21"
                    >
                        <FlowCard
                            empty={true}
                        />
                    </ArcherElement>

                    <ArcherElement
                        id="row22"
                        relations={[{
                            targetId: 'row13',
                            targetAnchor: 'bottom',
                            sourceAnchor: 'right',
                            style: {
                                strokeColor: 'rgb(255,182,133)'
                            },
                            label: <DescMultiCard
                                amount1={data.advisorySubmit}
                                amount2={data.advisorySubmitRate +"%"}
                                marginLeft={8} w={100}
                                title1={"咨询提交量"}
                                title2={"咨询提交率"}
                                top1={"34px"}
                                info={123}
                            />,
                        }]}
                    >
                        <FlowCard
                            title="店铺咨询量"
                            amount={data.shopAdvisory}
                            info={"店铺咨询量：统计周期内，咨询服务商的人数（咨询方式包括IM、隐私小号、真实号码、QQ点击服务商店铺按钮）。其中，IM咨询必须建立含雇主和服务商的会话，不包含官方系统消息；隐私小号需要拨打接通；真实号码和QQ号码统计的都是在店铺点击咨询的人"}
                        />
                    </ArcherElement>

                    <ArcherElement
                        id="row23"
                    >
                        <FlowCard empty={true}/>
                    </ArcherElement>
                    <ArcherElement
                        id="row24"
                    >
                        <FlowCard empty={true}/>
                    </ArcherElement>
                    <ArcherElement
                        id="row25"
                    >
                        <FlowCard empty={true}/>
                    </ArcherElement>
                </div>
                <div style={rowStyle2}>
                    <ArcherElement
                        id="row31"
                    >
                        <FlowCard empty={true}/>
                    </ArcherElement>

                    <ArcherElement
                        id="row32"
                        relations={[{
                            targetId: 'row33',
                            targetAnchor: 'left',
                            sourceAnchor: 'right',
                            style: {
                                strokeColor: 'rgb(255,182,133)'
                            },
                            label: <DescCard
                                amount={data.scalarRate + "%"}
                                marginLeft={8} w={100}
                                title={"中标率"}
                                info={123}
                            />,
                        }]}
                    >
                        <FlowCard
                            title="招标提交量"
                            amount={data.invitation}
                            info={"招标提交量：统计周期内，全站订单中,招标模式的提交量（不含官方自营店铺和分包订单。）</br>"}
                        />
                    </ArcherElement>

                    <ArcherElement
                        id="row33"
                        relations={[{
                            targetId: 'row34',
                            targetAnchor: 'left',
                            sourceAnchor: 'right',
                            style: {
                                strokeColor: 'rgb(255,182,133)'
                            },
                        }]}

                    >
                        <FlowCard
                            title="中标量"
                            amount={data.scalar}
                            info={"中标量：统计周期内，招标模式，服务商角度中标的订单量（不含官方自营店铺和分包订单）"}
                        />
                    </ArcherElement>
                    <ArcherElement
                        id="row34"
                        relations={[{
                            targetId: 'row35',
                            targetAnchor: 'left',
                            sourceAnchor: 'right',
                            style: {
                                strokeColor: 'rgb(255,182,133)'
                            },
                        }]}
                    >
                        <ExtraFlowCard
                            title="招标订单成交量"
                            amount={data.invitationDeal}
                            info={"招标订单成交量：统计周期内，全站订单中,招标模式的成交量（不含官方自营店铺和分包订单。）</br>" +
                            "招标订单成交金额：统计周期内，全站订单中,招标模式的成交金额（不含官方自营店铺和分包订单。）"}
                            data={{
                                title: "招标订单成交金额",
                                amount: data.invitationAmount + '万元'
                            }}
                        />
                    </ArcherElement>
                    <ArcherElement
                        id="row35"
                    >
                        <FlowCard
                            title="招标订单技术服务费"
                            amount={data.technicalService + '万元'}
                            info={"招标订单技术服务费：统计周期内，全站订单中,招标模式的订单收取的技术服务费（不含官方自营店铺和分包订单。）"}
                        />
                    </ArcherElement>
                </div>
            </ArcherContainer>

        </div>
    );
}

export default App;