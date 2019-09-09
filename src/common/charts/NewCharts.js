//新增图表配置文件 和条件过滤
import React from 'react';
import ReactEcharts from 'echarts-for-react';

//八戒工厂中第5个图表中的每个小图表使用该配置项
var getPieOption1 = (data,config) => {
    // console.log(data);
    var color = config.color;
    var center = config.center;
    // var height = options.config.height;  //？？?
    var data2 = { name: '', value: 100 - data.value }  //？？？
    return {
        color: [color, '#efefef'],
        tooltip: {
            trigger: 'item',
            formatter: "{b} ({d}%)"
        },
        series: [{
            type: 'pie',
            radius: ['60%', '75%'],
            center: center,
            label: {
                normal: {
                    show: false,
                    fontSize: '10',
                    position: 'center',
                    // formatter: '{b}:{c}%',
                    // formatter: data.name + '\n' + data.value + '%'
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        fontSize: '14',
                        fontWeight: 'bold'
                    }
                }
            },
            data: [data, data2]
        }]
    }
}


export const ChartOptions = {
    getPieOption1: getPieOption1,
}




function NewCharts(props) {
    var options=props.options;
    // console.log(options);
    var data=options.data; 
    var loading=options.loading; 
    var config=options.config;
    var text=options.text;

    //传递的data数据是对象
    return <div>
        {data.length||data ? <div className="donut-total"
            style={{
                left: text.left === undefined ? "35%" : text.left,
                top: text.top === undefined ? "53%" : text.top
            }}>
            <p>{props.title}</p>
            <p>{props.total}</p>
        </div> : ""}

        {!loading ? <div style={{ lineHeight: config.height, textAlign: "center" }}>暂无权限</div> :
            data.length === 0||data===null ? <div style={{ lineHeight: config.height, textAlign: "center" }}>暂无数据</div> :
                <ReactEcharts option={ChartOptions.getPieOption1(data,config)}
                    style={{ height: config.height }} />}
    </div>
}

export default NewCharts;