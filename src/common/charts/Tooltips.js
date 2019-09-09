import React, {Component} from 'react';

const CusTooltips = (props) => {
  if(props.active){
      return (<div className="tooltips-wrapper">
        <div>{props.label}</div>
        <ul style={{padding: 0,margin: 0,textAlign: "left"}}>
             {props.payload ? props.payload.map((item, index) => {
              // return <li key={`tool${index}`} style={{color: index >= props.lineStart ? item.stroke : item.fill}}>
              return <li key={`tool${index}`} style={{color: "#fff"}}>
              {(props.names[item.dataKey] ? props.names[item.dataKey] : "值") + ":" + item.value + props.selfunit[index]}</li>
             }) : ""} 
        </ul>
      </div>);
  }
 
}
export default CusTooltips;
