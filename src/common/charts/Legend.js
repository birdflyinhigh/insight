import React, {Component} from 'react';

const CusLegend = (props) => {
  const {data, color, dataKey} = props;
  return (
    <ul style={{padding: 0,margin: 0,textAlign: "center"}}>
          {
            dataKey.map((key, index) => (
              <li className="legend-rect" key={`item-${index}`}>
              <span style={{backgroundColor: color[index]}}></span>
              <i>{data.name[key]}</i>
              </li>
            ))
          }
    </ul>
  );
}
export default CusLegend;
