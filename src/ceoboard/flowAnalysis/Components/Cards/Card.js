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


    return (
        <div className="income-tab-item-wrapper" key="index" style={{height:'81px'}}>
            <div className="income-tab-item1">
                <div className="flow-card-title">
                    <p style={{textAlign: 'center'}}>{props.title}</p>
                    <p style={{textAlign: 'center'}}>{props.value}</p>
                </div>

                <div className="flow-card-help" >
                    <Tooltip title={props.info} placement={'left'}>
                        <div className='help'></div>
                    </Tooltip>

                </div>

            </div>
        </div>
    )
};

export default card;