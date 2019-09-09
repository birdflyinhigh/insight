import React from 'react';
import moment from 'moment';
import Help from '../../../common/component/Help';

function TriBPlus({data, config}){
  return <div className="trib-box dash-container">
  <h3>小B三连乘战略
    <span className="trib-subtitle">数据统计截至时间：{moment().format('YYYY-MM-DD')}</span>
  </h3>
  <div className="trib-item-groups">
    {config.map((item, index) => 
      <div className="trib-item-wrapper" key={index}>
      <div className="trib-item">
        <div className="trib-item-title">{item.name}
        {item.extraText ? <Help info={item.extraText}/> : ""}
        </div>
        <strong>{data[item.key] === undefined ? "--" : data[item.key]}
          <span style={{fontSize: 14}}>{item.unit}</span>
        </strong>
      </div>
      {item.symbol ? <span className="trib-symbol">{item.symbol}</span> : ""}
    </div>
    )}
  </div>
</div>
}
export default TriBPlus;