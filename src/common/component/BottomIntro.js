import React from 'react';
function BottomIntro({intro}){
  const splitArr = intro.split("</br>");
  return <ul className="bottom-intro">
  <li className="title">指标说明</li>
  {splitArr.map((item, index) => 
    <li key={index}>{item}</li>
  )}
  </ul>
}
export default BottomIntro;