import React from 'react';



const submitBtn = (props) => (
    <div className="dashh-item"
         onClick={props.clicked}>
        <div className="query-btn">
            <a>查询</a>
        </div>
    </div>
);

export default submitBtn;