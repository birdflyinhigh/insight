import React, {Component} from 'react';
import ErpTable from '../../../common/component/Table';
import StackBarChart from '../../../common/charts/StackBar';
import {chartTool} from '../../../common/tools/transChartData';
import {DetailConfig} from '../../config';
import {Methods} from '../../../common/tools/util';

function generateMonth(month){
  let tempHeader = [];
  let tempColumn = [];
  let aMonth = month.split(",");
  aMonth.forEach((item, index) => {
    tempHeader.push({
      value: `${item}月`,
      colspan: 1,
      rowspan: 1
    });
    tempColumn.push({
      key: `month${item}`
    });
  });
  return {
    tempColumn,
    tempHeader
  }
}
export default class ManageDetail extends Component{
  constructor(props){
    super(props);
    this.state = {
      curPage: 0,
      curCategory: props.location.state && props.location.state.name ? props.location.state.name : ""
    };
    // console.log(props)
  }
  componentDidMount(){
    let returnLink = this.props.level - 1 > 0 ? `/purchase/purmanage/cate${this.props.level -1
    }` : "/purchase";
    this.props.fns.getReturnLink(returnLink, this.props.level);
  }
  nextPage(curPage){
    this.setState({
      curPage: curPage
    });
  }
  download(name){
    this.props.fns.download(name);
  }
  // prevCategory(){
  //   if(this.props.level == 2){
  //     //去cateone
  //   }else if(this.props.level == 3){
  //     //去catetwo
  //   }
  // }
  nextCategory(categoryName){
    // console.log(categoryName);
    let level = this.props.level;
    this.setState({
      curCategory: categoryName
    });
    let choosedItem = this.props.data.manageBarData.data.filter((item, index) => item.name == categoryName);
    // console.log(choosedItem);
    this.props.fns.nextCategory(choosedItem[0].id, level, categoryName);
  }
  render(){
    // const data = {
    //   data: [{name: '品类 A', manage1: 590, manage2: 800, manage3: 800, manage4: 800},
    //     {name: '品类 B', manage1: 590, manage2: 800, manage3: 200, manage4: 800},
    //     {name: '品类 C', manage1: 590, manage2: 800, manage3: 100, manage4: 800},
    //     {name: '品类 D', manage1: 590, manage2: 800, manage3: 800, manage4: 800},
    //     {name: '品类 E', manage1: 590, manage2: 800, manage3: 300, manage4: 800},
    //     {name: '品类 F', manage1: 590, manage2: 800, manage3: 800, manage4: 400}],
    //     name: {
    //       manage1: "管控1",
    //       manage2: "管控2",
    //       manage3: "管控3",
    //       manage4: "管控4"
    //     },
    //     loading: true
    //   };
    let {manageBarData, firstTableData} = this.props.data;
    let header = {
      data: [{
        value: "品类",
        colspan: 1,
        rowspan: 1
      },{
        value: "集中管控金额(万元)",
        colspan: 1,
        rowspan: 1
      },{
        value: "集中管控金额占比（%）",
        colspan: 1,
        rowspan: 1
      },{
        value: "自购金额（万元）",
        colspan: 1,
        rowspan: 1,
      },{
        value: "自购金额占比(%)",
        colspan: 1,
        rowspan: 1,
      }],
      row: [1],//长度代表需要循环的次数
      nocollapse: true
    };
    let columns = [{
      key: "categoryName"
    },{
      key:"centerAmount",
    }, {
      key:"centerRate",
    },{
      key:"oneselfAmount",
    },{
      key:"oneselfRate",
    }];
    // let mutableHeader = generateMonth(this.props.month);
    // for(let i = 0; i < mutableHeader.tempColumn.length; i++){
    //   header.data.splice(2 + i, 0, mutableHeader.tempHeader[i])
    //   columns.splice(2 + i, 0, mutableHeader.tempColumn[i])
    // }    
    return <div className="erp-body">
        <div className="self-row self-clearfix">
        <div className="self-col-4" style={{height: 700, width: "40%"}}>
        <div className="item-container">
          <h3 className="chart-title">月度采购管控方式采购金额（万元）</h3>
          {/*<StackBarChart data={chartTool.generateChartKeyData(manageBarData)} config={DetailConfig.manage}/>*/}
           <StackBarChart data={chartTool.generateChartKeyData(manageBarData)} config={DetailConfig.manage}
           clickFn={{
            clickAxis: this.nextCategory.bind(this),
            clickBar: this.nextCategory.bind(this)
           }}
           />
        </div>
      </div>
      <div className="self-col-6" style={{height: 700, width: "60%"}}>
        <div className="item-container">
          <h3 className="chart-title">{this.state.curCategory}管控金额明细表
            <span onClick={this.download.bind(this, "manageDetail")}>下载</span>
          </h3>
            <div className="common-padding table-wrapper self-clearfix" style={{overflowY: "scroll"}}>
              <ErpTable header={header}  columns={columns} data={firstTableData}
              data={Methods.getNextPage(this.state.curPage, 10, firstTableData.data)}
              nextPage={this.nextPage.bind(this)}/>
            </div>
        </div>
        </div>
      </div>
      </div>
  }
}