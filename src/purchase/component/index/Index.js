import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Modal} from 'antd';
import ReactEcharts from 'echarts-for-react';

import LineBarChart from '../../../common/charts/LineBarChart';
import DonutChart from '../../../common/charts/DonutChart';
import BarChart from '../../../common/charts/BarChart';
import {IndexConfig} from '../../config';
import {getDonutOption} from '../../../common/charts/EDonut';
import {chartTool} from '../../../common/tools/transChartData';
import ErpTable from '../../../common/component/Table';
import {Methods} from '../../../common/tools/util';
export default class PurchaseIndex extends Component{
  constructor(props){
    super(props);
    this.state = {
      curPage: 0,
      visible: false
    }
  }
  onChartReadyCallback(chart){
    const jumpSecondPage = this.props.fns.jumpSecondPage;
    chart.on('click', function(params){
      jumpSecondPage('/purrate', params.data.id);
    });
  }
  clickLegend(data, optional){
    let clickItem = data.filter((item, index) =>{return item.name == optional.name});
    this.props.fns.jumpSecondPage('/purrate', clickItem[0].id);
  }
  manageJump(link, chart){
    const jumpSecondPage = this.props.fns.jumpSecondPage;
    chart.on('click', function(params){
      jumpSecondPage(link, (new Date()).getFullYear());
    });
  }
  clickManageLegend(link, optional){
     this.props.fns.jumpSecondPage(link, (new Date()).getFullYear());
  }
  providerJumpSecond(link, value){
    let clickItem = this.props.data.providerData.data.filter((item, index) => item.name == value);
    this.props.fns.jumpSecondPage(link, clickItem[0].id);
  }
  nextPage(curPage){
    this.setState({
      curPage: curPage
    });
  }
  showModal(){
    this.setState({
      visible: true
    });
    // this.props.fns.clickAllPro();
  }
  closeModal(){
    this.setState({
      visible: false
    })
  }
  download(name){
    this.props.fns.download(name);
  }
  render(){
  let that = this;
    let header = {
      data: [{
        value: "排名",
        colspan: 1,
        rowspan: 1
      },{
        value: "供应商名字",
        colspan: 1,
        rowspan: 1
      },{
        value: "性质",
        colspan: 1,
        rowspan: 1
      },{
        value: "注册资本(万元)",
        colspan: 1,
        rowspan: 1
      },{
        value: "交易总金额(万元)",
        colspan: 1,
        rowspan: 1
      }],
      row: [1],
      nocollapse: true
    };
    let columns = [{
      key:"rank"
    },{
      key:"providerName",
      render: function(record){
        let providerIndex = that.props.data.allProData.data.providerName.indexOf(record.value);
        return <Link to={{
          pathname: "/purchase/purprovider/pursubpro",
          state: {
            id: that.props.data.allProData.data.providerID[providerIndex]
          }
        }}>{record.value}</Link>
      }
    }, {
      key:"providerType"
    }, {
      key:"providerCapital",
    },{
      key:"amount",
    }];
  let data = [{"name":"市场类","id":10,"value":5705.8},{"name":"IT类","id":20,"value":374.02},{"name":"咨询","id":50,"value":90.0},{"name":"行政类/HR类/法务","id":40,"value":20.85},{"name":"工程类","id":30,"value":18.85}]
  const jumpSecondPage = this.props.fns.jumpSecondPage;
  const {allProData, overviewData, rateData, saveData, manageData, providerData, urgentData, projectData, examineData} = this.props.data;
  return <div className="erp-body">
    <div className="self-row self-clearfix">
      <div className="self-col-3" style={{height: 360}}>
        <div className="item-container">
          <h3 className="chart-title">采购金额总览
            <a className="help">
              <ul className="intro">
                <li>近三年采购金额与采购订单数量的情况，用于监控采购总体行情，了解公司的总体资源投入情况与变化趋势。</li>
                <li>订单数量：统计周期内采购单位（某公司/事业部）实际采购</li>
              </ul>
            </a>
          </h3>
          <LineBarChart data={chartTool.generateBarLineData(overviewData, ["num"])} config={IndexConfig.overview} fn={jumpSecondPage}/>
        </div>
      </div>
      <div className="self-col-3" style={{height: 360}}>
        <div className="item-container">
          <h3 className="chart-title"><Link to="/purchase/purrate">一级采购品类占比分析</Link>
            <a className="help">
              <ul className="intro">
                <li>一级采购品类年度采购金额及采购金额的占比情况，以促进采购策略持续优化，以降低采购成本。</li>
                <li>一级采购品类：包括市场类、IT类、工程类、行政/HR/法务类、质询类</li>
              </ul>
            </a>
          </h3>
          {!rateData.loading ? <div style={{lineHeight: IndexConfig.save.height + 'px', textAlign: "center"}}>暂无权限</div>: 
                    rateData.data.length === 0 ? <div style={{lineHeight: IndexConfig.save.height + 'px', textAlign: "center"}}>暂无数据</div> : 
                     <ReactEcharts
                      option={getDonutOption(rateData.data, {unit: "万"})}
                      notMerge={true}
                      lazyUpdate={true} 
                      onChartReady={this.onChartReadyCallback.bind(this)}
                      onEvents={{legendselectchanged: this.clickLegend.bind(this, data)}}
                      />}
           {/*<ReactEcharts
            option={getDonutOption(data, {unit: "万"})}
            notMerge={true}
            lazyUpdate={true} 
            onChartReady={this.onChartReadyCallback.bind(this)}
            onEvents={{legendselectchanged: this.clickLegend.bind(this, data)}}
            />*/}
        </div>
      </div>
      <div className="self-col-3" style={{height: 360}}>
        <div className="item-container">
          <h3 className="chart-title">采购节约金额分析
            <a className="help">
              <ul className="intro">
                <li>近三年预估采购金额与实际采购金额的对比情况及采购节约比率，逐步实现采购中心运营化。</li>
                <li>预估金额：统计周期内（月）采购单位（公司/事业部）采购预算金额；</li>
                <li>节约金额=预估金额-实际采购金额。</li>
              </ul>
            </a>
          </h3>
          <LineBarChart data={chartTool.generateBarLineData(saveData, ["rate"])} config={IndexConfig.save}  fn={jumpSecondPage}/>
        </div>
      </div>
    </div>
    <div className="self-row self-clearfix">
      <div className="self-col-3" style={{height: 400}}>
        <div className="item-container">
          <h3 className="chart-title">采购管控方式金额占比分析(全集团)
            <a className="help">
              <ul className="intro">
                <li>近三年不同管控方式下采购金额与采购金额占比的情况，以持续提高管控集中度，达成高度集中的采购业务集团管控模式，最终实现集中管控运营。</li>
                <li>管控方式：集团总部，分公司和孙公司采用不同的采购管理方案和成本控制措施。</li>
              </ul>
            </a>
          </h3>
          {/*<LineBarChart orginData={manageData} data={chartTool.generateBarLineData(manageData,  ["rate"])} config={IndexConfig.manage} fn={jumpSecondPage}/>*/}
           {!manageData.loading ? <div style={{lineHeight: IndexConfig.manage.height + 'px', textAlign: "center"}}>暂无权限</div>: 
                    manageData.data.length === 0 ? <div style={{lineHeight: IndexConfig.manage.height + 'px', textAlign: "center"}}>暂无数据</div> : 
          <ReactEcharts
            option={getDonutOption(manageData.data, {unit: "万"})}
            notMerge={true}
            lazyUpdate={true} 
            onChartReady={this.manageJump.bind(this, '/purmanage')}
            onEvents={{legendselectchanged: this.clickManageLegend.bind(this, "/purmanage")}}
            />}
        </div>
      </div>
      <div className="self-col-3" style={{height: 400}}>
        <div className="item-container" style={{position: "relative"}}>
          <h3 className="chart-title"><Link to="/purchase/purprovider/alltrade">供应商排名TOP5</Link>
           <a className="help">
              <ul className="intro">
                <li>本年度各个供应商采购金额和订单数量的情况，持续优化供应商战略，以针对重点供应商制定合作策略，保障供应。</li>
              </ul>
           </a>
          </h3>
          <a className="provider-total" onClick={this.showModal.bind(this)}>总供应商数：{this.props.data.totalProvider}个</a>
          <Modal title="所有供应商基本信息" visible={this.state.visible} footer={null} width={805}
          onCancel={this.closeModal.bind(this)}>
            <span className="download-icon" onClick={this.download.bind(this, "iallprovider")} style={{marginTop: -20, marginBottom: 5}}>下载</span>
            <ErpTable header={header} columns={columns}
                  data={Methods.getNextPage(this.state.curPage, 10, allProData.data)}
                  nextPage={this.nextPage.bind(this)}/>
          </Modal>
          <LineBarChart orginData={providerData} data={chartTool.generateBarLineData(providerData,  ["num"])} config={IndexConfig.provider} fn={this.providerJumpSecond.bind(this)}/>
        </div>
      </div>
      <div className="self-col-3" style={{height: 400}}>
        <div className="item-container">
          <h3 className="chart-title">年度紧急采购
            <a className="help">
              <ul className="intro">
                <li>近三年紧急采购金额占比及紧急采购订单数量的占比情况，督促需求部门依照公司标准采购流程进行请购，以减少因紧急采购而造成的成本增加。</li>
                <li>紧急采购：针对采购单上属于紧急采购的采购单/采购合同。</li>
              </ul>
            </a>
          </h3>
         {/* <LineBarChart data={chartTool.generateBarLineData(urgentData, ["num"])} config={IndexConfig.urgent}  fn={jumpSecondPage}/>*/}
          {!urgentData.loading ? <div style={{lineHeight: IndexConfig.urgent.height + 'px', textAlign: "center"}}>暂无权限</div>: 
                    urgentData.data.length === 0 ? <div style={{lineHeight: IndexConfig.urgent.height + 'px', textAlign: "center"}}>暂无数据</div> : 
          <ReactEcharts
            option={getDonutOption(urgentData.data, {unit: "笔"})}
            notMerge={true}
            lazyUpdate={true} 
            onChartReady={this.manageJump.bind(this, "/pururgent")}
            onEvents={{legendselectchanged: this.clickManageLegend.bind(this, "/pururgent")}}
            />}
        </div>
      </div>
    </div>
    <div className="self-row self-clearfix">
      <div className="self-col-3" style={{height: 400}}>
        <div className="item-container">
          <h3 className="chart-title">工程品类采购总览
            <a className="help">
            </a>
          </h3>
         <LineBarChart data={chartTool.generateBarLineData(projectData, ["num"])} config={IndexConfig.project} fn={jumpSecondPage}/>
        </div>
      </div>
      <div className="self-col-3" style={{height: 400}}>
        <div className="item-container">
          <h3 className="chart-title">审批中订单/合同采购金额总览
            <a className="help">
            </a>
          </h3>
          <LineBarChart data={chartTool.generateBarLineData(examineData, ["num"])} config={IndexConfig.examine} fn={jumpSecondPage}/>
        </div>
      </div>
    </div>
  </div>
  }
}
