import React from 'react';
import './TopPart.css';
import {Tooltip} from 'antd'
const topPart =(props)=>{

    return (
    <div>
        <div id="top-part" className="">
                <p style={{fontSize:16}} className="top-div-text"><span>注册用户</span><span
                    style={{fontSize:14}}>（累计）</span><span>：{props.data}</span>

                    <Tooltip title={'注册用户数：历史记录中所有的注册用户数量'} placement={'right'}>
                    <div className='help'></div>
                </Tooltip></p>
        </div>
    </div>
)};
export default topPart;