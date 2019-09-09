import React from 'react';
import Help from "../../../../common/component/Help";
import './Card.css';
import { Tooltip , Icon} from 'antd';



const rateNumberStyle = {
    fontFamily: 'Microsoft Yahei',
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: '14px',
    color: '#949494',
    textAlign: 'center',
};


const card = (props) => {
    const item = props.item;
    return (
        <div className="income-tab-item-wrapper" key="index" >
            <div className="income-tab-item2">
                <div className="flow-card-title1">
                    <p style={{textAlign: 'left'}}>{item.title}</p>
                </div>
                <p style={{textAlign: 'center', position: 'absolute', top: 42.5, marginLeft: 5}}>
                    <span style={{textAlign: 'left', fontSize: 13, color: '#999999'}}>合同生效中:</span><span className='card-number'>{item.key1}</span>
                </p>
                <br/>

                <div className='bottom-extra-content'>

                    <p style={{textAlign: 'left', fontSize: 13, marginBottom: 3}} >
                        昨日{props.midEnd}：{item.key2}
                    </p>
                    <p style={{textAlign: 'left', fontSize: 13, marginBottom: 3}} >
                        近7日{props.midEnd}：{item.key3}
                    </p>
                    <p style={{textAlign: 'left', fontSize: 13, marginBottom: 3}}>
                        近30日{props.midEnd}：{item.key4}
                    </p>
                    {item.title === '服务商会员数'?<p>&nbsp;&nbsp;&nbsp;</p>:<p style={{textAlign: 'left', fontSize: 13, color: '#2A7BFF'}}>
                        9月5日起{props.bottomEnd}：{item.key5}
                    </p>}
                </div>

                <div className="flow-card-help"  style={{top: '8%'}}>
                    <Tooltip title={item.info} placement={'bottom'}>
                        <div className='help'></div>
                    </Tooltip>

                </div>

            </div>
        </div>
    )
};

export default card;