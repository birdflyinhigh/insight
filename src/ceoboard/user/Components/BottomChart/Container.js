import React from 'react';
import CeoDatePicker from './Components/DatePicker/DatePicker';
import Chart from './Components/Chart';
import {Tooltip} from 'antd'
import './container.css';



const Container = (props) => {

    return (<div className="dc-chart-wrapper">
        <div className="dc-chart-item" style={{width: "100%", height: "1040px"}}>
            <div className="dc-chart">
                <div className="hrchart-title admin-body">
                    <p className="hrchart-title admin-body">{props.data.header}
                        <Tooltip title={'售卖数量与金额，指套餐或单品对应的成交订单的数量与成交金额，按成交时间计算'} placement={'right'}>
                            <div className='help'></div>
                        </Tooltip>
                    </p>
                    <div className="erp-selectbox"
                         style={{right: 0, width: "auto", top: 15}}
                    >
                        <div>
                            <CeoDatePicker
                                data={props.data}
                            />
                        </div>
                    </div>
                </div>

                <Chart
                    data={props.data}
                />

            </div>
        </div>
    </div>)
};

export default Container;