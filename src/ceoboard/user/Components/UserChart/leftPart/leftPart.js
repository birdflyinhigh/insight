import React from 'react';
import './leftPart.css';
import {Tooltip} from 'antd'



const leftPart =(props)=>{

    const items = [
        {title: '潜在雇主', info: '潜在雇主数：有提交需求记录的用户中，近三月有登录的用户数；'},
        {title: '提交雇主数', info: '提交需求雇主数：近三月有提交需求的用户数；'},
        {title: '成交雇主数', info: '成交雇主数：近三月有订单成交的雇主用户数；'},
    ];

    const info = <div>


        雇主分层中的数据，均按找雇主注册地进行地域划分；<br/>

        潜在雇主数：有提交需求记录的用户中，近三月有登录的用户数；<br/>

        提交雇主数：近三月有提交需求的用户数；<br/>

        成交雇主数：近三月有订单成交的雇主用户数；<br/>

        普通雇主：没有购买工场会员或没在有效期内的雇主数量；<br/>

        工场会员：购买了工场会员，且在有效期内的雇主数量；<br/>
    </div>;

    const lefts  =['0%', '6%', '11%'];
    const widths = [100, 85, 75];



    return(
        <div className='chart-left-part'>
            <div className="item-header">
                <p>雇主分层
                <Tooltip title={info} placement={'right'}>
                    <div className='help'></div>
                </Tooltip>
                </p>
            </div>
            <div className='vertical-line'></div>

            {items.map((item, index)=>{
                let width = props.data['key'+(index*5+6)];
                return (
                    <div className='top-part'>
                        <div className="chart-data-grid" style={{top: 100*(index+1)}}>
                            <p>{item.title}
                            </p>
                            <p>{props.data['key'+(index*5+2)]}</p>
                        </div>
                        <div className="chart-data-grid1" style={{top: 100*(index+1)}}>
                            <div style={{position: 'relative'}}>
                            <div style={{width: widths[index]+'%',margin: 'o auto', left: lefts[index]}} className='bottom-bar'>
                                </div>
                                <div style={{width: width*widths[index]/100+'%',margin: 'o auto',left: lefts[index], }} className='progress'>

                            </div>
                            </div>
                            <div className='content'>
                                <p>普通雇主：{props.data['key'+(index*5+3)]}（{props.data['key'+(index*5+5)]}%）</p>
                                <p>工场会员：{props.data['key'+(index*5+4)]}（{props.data['key'+(index*5+6)]}%）</p>

                            </div>
                            {index===0?<div className='header'>
                                <p>雇主分层</p>
                            </div>:''}
                        </div>


                    </div>
                )
            }

            )}








        </div>
    )
};
export default leftPart;