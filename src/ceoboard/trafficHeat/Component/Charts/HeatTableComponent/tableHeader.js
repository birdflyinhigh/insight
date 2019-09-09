import React from 'react';
import {DatePicker, Select} from 'antd';
import './tableheader.css';

const metricHeader = (props) => {


    return (

        <div className="heat-table-header-container">

            <div className="heat-table-header">

                    <div className="traffic-select-title">
                        区域
                    </div>
                    <div className="qutation-mark">:</div>
                    <div className="traffic-select-group">
                        <Select
                            className="traffic-select-box"
                            placeholder="全部大区"
                        />
                        <Select
                            className="traffic-select-box"
                            placeholder="全部省份"
                        />
                        <Select
                            className="traffic-select-box"
                            placeholder="全部城市"
                        />
                    </div>



                    <div className="traffic-select-title">
                        类目
                    </div>
                    <div >:</div>
                    <div className="traffic-select-group" >
                        <Select
                            className="traffic-select-box"
                            placeholder="全部"
                        />
                    </div>


            </div>
        </div>
    )
};


export default metricHeader;