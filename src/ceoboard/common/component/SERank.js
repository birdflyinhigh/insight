import React from 'react';
function SERank({title, data}){
  return <div className="cmanage-rank-content" style={{height: "80%"}}>
    <ul className="rank-wrapper">
      <li className="crc-row">
        {title.map((item, index) => <b key={index}
        className={`crt-col${index + 1}`}>{item}</b>)}
      </li>
      {data.length === 0 ? <div style={{textAlign: "center"}}>暂无数据</div> : 
      data.map((item, index) => 
        <li className="crc-row" key={index}>
          <b className="crt-col1">{index + 1}</b>
          <b className="crt-col2">{item.name}</b>
          <b className="crt-col3">{item.value}w</b>
        </li>
        )
      }
    </ul>
</div>
}
export default SERank;