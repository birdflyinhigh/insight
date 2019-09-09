import React from 'react';
import {Table} from 'antd'
import './chart.css';

const {Column} = Table;
const colors =[
    '#3366cc',
    '#dc3912',
    '#ff9900',
    '#109618',
    '#990099',
    '#0099c6',
    '#dd4477',
    '#66aa00',
    '#b82e2e',
    '#316395',
    '#994499',
    '#22aa99',
    '#aaaa11',
    '#6633cc',
    '#e67300',
    '#8b0707',
    '#651067',
    '#329262',
    '#5574a6',
    '#3b3eac',]

const Chart1 = (props)=>{
    let cat = null;
    let i = 0;

    return (
        <Table dataSource={props.data.sales}
               className={"flow-table"}
               bordered
               scroll={{y: props.scroll}}
               pagination={props.paging}
               useFixedHeader={false}
               expanded={true}
        >
            {props.data.ths.map((item, index)=>(
                <Column
                    title={item}
                    dataIndex={'key' + (index+1)}
                    key={'key' + (index+1)}
                    id="bg-column"
                    render={(value)=>{
                        return (
                            <div style={{color: colors[index]}}>{value}</div>
                        )
                    }}
                />
            ))}
        </Table>
    )
};


 const Charts =(props)=>{

     const data1 = {
         sales: props.data.sales,
         ths: ['套餐名', '套餐价格/月', '售卖数量', '新签收款(元)','财务记收金额(元)']
     };
     const data2 = {
         sales: props.data.sales2,
         ths: ['单品类型', '单品名称', '版本', '产品价格','售卖数量', '新签收款(元)', '财务记收金额(元)']
     };

     return (
         <div>
             <div style={{height:30,borderBottom: '1px solid #4a4a4a',marginTop: 15, marginBottom: 30,textAlign: 'center', fontSize: 16, fontWeight: 700}}>套餐售卖情况</div>
             <Chart1 data={data1}  paging={false} scroll={150}/>
             <div style={{height:30,borderBottom: '1px solid #4a4a4a', marginTop: 15,marginBottom: 30,textAlign: 'center',fontSize: 16,fontWeight: 700}}>单品售卖情况</div>
             <Chart1 data={data2} paging={true} scroll={550}/>
         </div>
     );
 };

export default Charts;

