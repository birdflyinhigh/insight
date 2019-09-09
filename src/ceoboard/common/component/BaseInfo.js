import React from 'react';
import {ComptUtils} from '../../../common/tools/util';
function BaseInfoShow({data, config}){
  return <div className="flex-hwrapper">
  {config.map((item, index) => 
    <div className="baseinfo-item-wrapper"
    key={index}
    >
    <div className="baseinfo-item">
      <div>
        <span style={item.rateKey ? {}: {lineHeight: "35px"}}>{item.name}</span>
        <div className="help">
          <ul className="intro">
            {ComptUtils.generateToolArr(item.extraText).map((toolstr, index1) =>  
              <li key={index1}>{toolstr}</li> 
              )}
          </ul>
        </div>
      </div>
      <strong style={item.rateKey ? {} : {lineHeight: "27px"}}>{data[item.key] || 0}{item.unit}</strong>
      {item.rateKey ? <p>环比:{data[item.rateKey] || 0}%</p> : ""}
    </div>
  </div>
  )}
  </div>
}
export default BaseInfoShow;