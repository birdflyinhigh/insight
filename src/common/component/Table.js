import React,{Component} from 'react';
import ReactDOM from 'react-dom'
import './table.css';
import {Methods} from '../tools/util';
import { Pagination } from 'antd';
/**
 * 
 * @param {array} fixed 
 * @param {array} data 
 * @param {array} columnKey 
 */
function addFixedData(fixed, data, columnKey){
  let len = data[columnKey].length;
  fixed.forEach((item, index) => {
    data[item["key"]] = [];
    for(let i = 0; i < len; i++){
      data[item["key"]].push(item["value"]);
    }
  });
  return data;
}
let emptyRecord = (columns, data) => {
  let temp = {};
  //创建有n条记录的临时数组
  columns.forEach((col, index) =>{
    if(data[col.key]){
      temp[col.key] = data[col.key];
    }else{
      temp[col.key] = Array.apply(null, Array(30)).map(() => "/");
    }
  });
  return temp;
}
function getAllTable(data, record, columns){
  let temp = {...record};
  columns.forEach((col, index) => {
    temp[col.key].forEach((item1, index1) => {
        record[col.key][index1] = {
          data: item1,
          show: true,
          mainColumn: col.mainColumn || false,
          render: col.render || "",
          rowspan: 1
        };
    })
  });
  return record;
}
function getCollapseTable(record, columns){
  let lastDataNumber = 0;
  columns.forEach((col, index) => {
    record[col.key].forEach((item1, index1) => {
      if(index1 > 0 && record[col.key][index1].data == record[col.key][index1 - 1].data && record[col.key][index1].mainColumn){
        record[col.key][lastDataNumber].rowspan = record[col.key][lastDataNumber].rowspan + item1.rowspan;
        item1.show = false;
      }else{
        lastDataNumber = index1;
      }      
    })
  });
  return record;
}
//转成一行对应一行
function regenerateData(records, columns){
  let temp = [];
  let keyArray = [];
  let len = records[columns[0]["key"]].length;
  for(let key in records){
    keyArray.push(key);
  }
  for(let i = 0; i < len; i++ ){
    temp[i] = [];
    keyArray.forEach((key, index) => { 
      temp[i].push(records[key][i]);   
    })
  }
  return temp;
}
export default class ErpTable extends Component{
  constructor(props){
    super(props);
    this.ascend = false;
    this.pageName = props.pageName ? props.pageName : "curPage";
  }
  // componentDidUpdate(){
  //   let divs = document.querySelectorAll(".header-div");
  //   // console.log(divs);
  //   let that = this;
  //   let startIndex = this.props.columns.length;
  //   let length = divs.length;
  //   if(that.props.config && that.props.config.second){
  //     let temp = Array.prototype.slice.call(divs, length - startIndex, length)
  //     Array.prototype.forEach.call(temp, function(item, index){   
  //       item.style.width = that.width[index] + "px"; 
  //       item.style.height = that.height[index] + "px";  
  //     });
  //   }else if(that.props.config && that.props.config.first){
  //     Array.prototype.forEach.call(divs, function(item, index){
  //       if(index < startIndex){
  //         item.style.width = that.width[index] + "px";
  //         item.style.height = that.height[index] + "px";
  //       }           
  //     });
  //   }else{
  //     Array.prototype.forEach.call(divs, function(item, index){
  //       item.style.width = that.width[index] + "px";
  //       item.style.height = that.height[index] + "px";        
  //     });
  //   }
  // }
  // getDomWidth(dom){
  //   if(dom){
  //     this.width.push(dom.offsetWidth);
  //     this.height.push(dom.offsetHeight);
  //   }
  // }
  nextPage(curPage, pageSize){
    this.props.nextPage(curPage - 1, this.pageName);
  }
  sortData(data){
    this.ascend = !this.ascend;
    this.props.sort(this.ascend);
  }
  render(){
    let {header, columns, fixed} = this.props;
    let finnalData = [];
    let isEmpty = this.props.data.data.length == 0 ? true : false;
    if(!isEmpty){
      let data =  JSON.parse(JSON.stringify(this.props.data.data));
      let dealedData = fixed ? addFixedData(fixed, data, columns[fixed.length + 1].key) : data;
      // console.log("records", dealedData);
      let records = getAllTable(dealedData, emptyRecord(columns, dealedData), columns);
      let collapseData = getCollapseTable(records, columns);
      // console.log("collapse", collapseData);
      finnalData = regenerateData(collapseData,columns);
      // console.log("finanl", finnalData);
    } 
    this.width = [];
    this.height = [];
    let subHeaderjsx = header.subtdIndex ? header.data[header.subtdIndex].subtd.map((item, index) => {
      return <td key={index} className="second-header">{item}
      {index == header.data[header.subtdIndex]["sortIndex"] ? 
      <span className="table-sort" onClick={this.sortData.bind(this, finnalData)}></span> : ""}</td>
    }) : ""
    let width = 100 / header.length + "%";
    // console.log('FINANL',finnalData);
    return <div style={{paddingBottom: 35}}>
      <table className="table">
        <thead>
          {
            header.row.map((item, index) => {
              return <tr key={index}>
                {index !== (header.row.length - 1) || header.nocollapse ? header.data.map((item1, index1) => {
                  return  <td colSpan={item1.colspan} rowSpan={item1.rowspan} key={index1} 
                  className={(!item1.subtd && header.row.length > 1) ? "more-margin" : ""}>{item1.value}
                  {item1.sort ? <span className="table-sort" onClick={this.sortData.bind(this, finnalData)}></span> : ""}
                  </td>        
                }): subHeaderjsx}
              </tr>
            })
          }
        </thead>
        <tbody>
          {finnalData.map((item, index) => {
            return <tr key={index}>
                {item.map((item1, index1) => {
                  if(item1.show) return <td rowSpan={item1.rowspan} key={index1}>{item1.render ? item1.render({value: item1.data, index: index1}) : item1.data}</td>
                })}
              </tr>
          })}
        </tbody>
      </table>
      {isEmpty ? <div className="table-nodata">暂无数据</div> : ""}
      <div style={{float: "right", paddingTop: 10}}>
        <Pagination defaultCurrent={1} total={this.props.data.total} onChange={this.nextPage.bind(this)}/>
      </div>
    </div>
  }
} 
// let header = {
    //   data: [{
    //     value: "年",
    //     colspan: 1,
    //     rowspan: 2
    //   },{
    //     value: "月",
    //     colspan: 1,
    //     rowspan: 2
    //   },{
    //     value: "事业部",
    //     colspan: 1,
    //     rowspan: 2
    //   },{
    //     value: "工作饱和度",
    //     colspan: 4,
    //     //只有当该列下面有子列的时候才设置
    //     subtd: ["当期值", "前六个月平均值", "增减变动比率", "得分"]
    //   }],
    //   //是第几个列下面有，从0开始计算, 可以改进成动态获取;
    //   subtdIndex: 3,
    //   //代表该数据有几行---可以改进成动态获取
    //   row: [1, 2]//长度代表需要循环的次数
    // };
    // let columns = [{
    //   key:"a",
    //   value: "a",
    //   mainColumn: true
    // }, {
    //   key:"b",
    //   value: "a",
    //   mainColumn: true
    // }, {
    //   key:"c",
    //   value: "a"
    // },{
    //   key:"d",
    //   value: "a"
    // },{
    //   key:"e",
    //   value: "a"
    // },{
    //   key:"f",
    //   value: "a"
    // },{
    //   key:"g",
    //   value: "a"
    // }];
    // let fixed = ["2017", "11"];