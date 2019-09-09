import React, {Component} from 'react';
import NodataEcharts from '../../common/charts/NodataECharts';
import EConfig from '../../common/charts/EConfig';
import NineBoxChart from '../../common/charts/NineBoxChart';
import {CommonMethod} from '../../common/tools/common';
import './nine.css';
export default class perManageBody extends Component{
  constructor(props){
    super(props);
    this.scoreArray = [60, 70, 80, 90, 100];
  }
  clickSingleStaff(obj, instance){
    let temp = {
      title: obj.title,
      link: obj.link,
      urlName: obj.urlName,
      query1: "",
      query2: obj.quit
    };
    let handler = instance.on('click', (params) => {
      temp.query1 = this.scoreArray[params.dataIndex];
      temp.query1Name = params.name;
      instance.off(handler);
      this.props.fns.jumpSecondPage(temp);
    });
  }
  clickCompare(obj, instance){
    let temp = {
      title: obj.title,
      link: obj.link,
      urlName: obj.urlName,
      query1: "",
      query1Name: "",
      newOrgName: "",
      newOrgId: ""
    };
    let handler = instance.on('click', (params) => {
      temp.query1 = this.scoreArray[params.seriesIndex];
      temp.query1Name = params.name;
      temp.newOrgName = params.name;
      temp.newOrgId = params.data.specifiedId;
      temp.query2 = "";
      temp.extraText = params.seriesName;
      instance.off(handler);
      this.props.fns.jumpSecondPage(temp);
    });
  }
  clickQuitStaffCompare(obj, instance){
    let temp = {
      title: obj.title,
      link: obj.link,
      urlName: obj.urlName,
      query1: "",
      query1Name: "",
      newOrgName: "",
      newOrgId: ""
    };
    let handler = instance.on('click', (params) => {
      temp.query1 = params.seriesName.indexOf("优") > -1 ? "high" : "low"
      temp.query1Name = params.seriesName;
      temp.newOrgId = params.data.specifiedId;
      temp.newOrgName = params.name;
      temp.extraText = params.name;
      instance.off(handler);
      this.props.fns.jumpSecondPage(temp);
    });
  }
  clickIndex(obj, instance){
    let temp = {
      title: obj.title,
      link: obj.link,
      urlName: obj.urlName
    };
    let handler = instance.on('click', (params) => {
      instance.off(handler);
      this.props.fns.jumpSecondPage(temp);
    });
  }
  clickNineBoxItem(item){
    this.props.fns.jumpSecondPage({
      title: "人员贡献明细表",
      query1: item.key,
      query1Name: item.title,
      // 和constan中pathinfo中的key相同
      urlName: "contribute",
      link: "hr/pmcontritable"
    });
  }
  allZeroData(data){
    for(let key in data){
      if(data[key] != 0){
        return false;
      }
    }
    return true;
  }
  nextStaffCompare(curPage){
    this.props.fns.nextStaffCompare(curPage);
  }
  nextQuitStaffCompare(curPage){
    this.props.fns.nextQuitStaffCompare(curPage);
  }
  render(){
    let pannelData = [{
      title1: `月度应考核人数: ${this.props.data.exameTab.month}人`,
      title2: `季度应考核人数: ${this.props.data.exameTab.season}人`
		},{
      title1: `月度参评率: ${this.props.data.joinExameTab.month}%`,
      title2: `季度参评率: ${this.props.data.joinExameTab.season}%`
		},{
      title1: `组织业务指标达成率: ${this.props.data.indexCompleteTab}%`
		},{
			title1: `员工业务指标平均完成率: ${this.props.data.indexAvgCompleteTab}%`
		}];
    let staff = {
			data: this.props.data.staff,
			option: EConfig.stairsBarOption,
			config: {
				barColor: ["#2a7bff"],
				formatter: "%"
			},
			height: 385
    };
    let quitStaff = {
			data: this.props.data.quitStaff,
			option: EConfig.hRadiusBarOption,
			config: {
				barColor: ["#0ace7e"],
				formatter: "%"
			},
			height: 385
    };
    let orgCompare = {
      data: this.props.data.orgCompare,
			option: EConfig.multiStackHBar,
			config: {
        color: ["#2b7bff", "#f98c4a", "#f35555", "#0ace7f", "#78a7ff",  "#94bdff", "#6aa3ff"],
        stackIdIndex: 100,
        max: 100,
        formatter: "%",
        horizontal: true
      },
			height: 385
    };
    let orgQuitStaffCompare = {
      data: this.props.data.orgQuitStaffCompare,
			option: EConfig.hRadiusBarOption,
			config: {
				barColor: ["#2a7bff", "#0ace7e"],
        formatter: "%",
        sameSeriesColor: true,
        showLegend: true
			},
			height: 385
    };
    let indexCompleteRate = {
      data: this.props.data.indexCompleteRate,
			option: EConfig.lineBarChart,
			config: {
        color: ["#2a7bff","#16c17a", "#78a7ff"],
        startAntherIndex: 2,
        lineIndex: 2,
        bottom: 120
			},
			height: 385
    }

    return <div>
      <div className="hr-pannel hr-overview">
					{pannelData.map((item, index) => {
						return <div className="hrpan-item-wrapper" key={index}>
											<div className={`hrpan-item itembg-${index + 1}`}>
												<div className="hrpan-intro" style={{lineHeight: "50px", paddingTop: item.title2 ? 0 : 25}}>{item.title1}</div>
                        <div className="hrpan-intro" style={{lineHeight: "50px"}}>{item.title2}</div>
											</div>
									</div>
					})}
			</div>
      <div>
          <div className="hrchart-container">
            <p className="manage-sectitle">组织整体情况</p>
            <div className="row">
              <div className="col-sm-4 col-md-4 col-lg-4">
                <div className="hrsec-container">
                  <p className="hrchart-title">在职人员绩效得分分布</p>
                  <NodataEcharts config={staff} 
                  onChartReadyCallback={this.clickSingleStaff.bind(this, {
                    title: "在职人员绩效得分分布",
                    link: "hr/pmstafftable",
                    urlName: "staff",
                    quit: "Incumbent"
                    })}/>
                </div>
              </div>
              <div className="col-sm-4 col-md-4 col-lg-4">
                <div className="hrsec-container">
                  <p className="hrchart-title">离职人员绩效分布</p>
                  <NodataEcharts config={quitStaff} 
                  onChartReadyCallback={this.clickSingleStaff.bind(this, {
                    title: "离职人员绩效分布",
                    link: "hr/pmstafftable",
                    urlName: "staff",
                    quit: "resigned"
                  })}/>
                </div>
              </div>
              <div className="col-sm-4 col-md-4 col-lg-4">
                <div className="hrsec-container">
                  <p className="hrchart-title">绩效人才应用九宫格</p>
                  {this.allZeroData(this.props.data.nineBox) ? <div style={{textAlign: "center", lineHeight: "325px"}}>暂无数据</div>: <div>
                      <div className="nine-palace-wrapper">
                        <div className="palace-tindex">
                          <strong className="pacharctor-intro">角色维度</strong>
                          <p style={{top: 35}}>高</p>
                          <p style={{top: 125}}>中</p>
                          <p style={{top: 215}}>低</p>
                        </div>
                        <NineBoxChart showMask={true} data={this.props.data.nineBox} clickNineBoxItem={this.clickNineBoxItem.bind(this)}/>
                      </div>
                      <div className="palace-bindex">
                        <p className="col-lg-4">低</p>
                        <p className="col-lg-4">中</p>
                        <p className="col-lg-4">高</p>
                        <strong className="pacharctor-intro">业务维度</strong>
                      </div>
                    </div>}
                  </div>
                </div>
              </div>
            </div>
      </div>
      <div>
      <p className="manage-sectitle">下属各组织对比</p>
          <div className="row">
            <div className="col-sm-4 col-md-4 col-lg-4">
              <div className="hrsec-container">
                <p className="hrchart-title">各组织人员绩效分数对比</p>
                {this.props.data.orgCompare.totalArrPage ? <div className="chart-pager">
                  {this.props.data.orgCompare.totalArrPage.map((item, index) => 
                    <i className={this.props.data.orgCompare.curPage == index ? "active" : ""} 
                    key={index}
                    onClick={this.nextStaffCompare.bind(this, index)}>{index + 1}</i>
                    )}
                </div> : ""}
                <NodataEcharts config={orgCompare} 
                onChartReadyCallback={this.clickCompare.bind(this, {
                  title: "各组织人员绩效分数对比",
                  link: "hr/pmstafftable",
                  urlName: "staff",
                  multiCondition: true
                })}/>
              </div>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-4">
              <div className="hrsec-container">
                <p className="hrchart-title">各组织绩优绩差离职人员对比</p>
                {this.props.data.orgQuitStaffCompare.totalArrPage ? <div className="chart-pager">
                  {this.props.data.orgQuitStaffCompare.totalArrPage.map((item, index) => 
                    <i className={this.props.data.orgQuitStaffCompare.curPage == index ? "active" : ""} 
                    key={index}
                    onClick={this.nextQuitStaffCompare.bind(this, index)}>{index + 1}</i>
                    )}
                </div> : ""}
                <NodataEcharts config={orgQuitStaffCompare}
                  onChartReadyCallback={this.clickQuitStaffCompare.bind(this, {
                  title: "各组织绩优绩差离职人员对比",
                  link: "hr/pmstafftable",
                  urlName: "staffStatus",
                  multiCondition: true
                })}/>
              </div>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-4">
              <div className="hrsec-container">
                <p className="hrchart-title">各组织业务指标达成率与员工业务指标达成率</p>
                <NodataEcharts config={indexCompleteRate}
                onChartReadyCallback={this.clickIndex.bind(this, {
                  title: "各组织业务指标达成率与员工业务指标达成率",
                  link: "hr/pmindextable",
                  urlName: "index",
                  multiCondition: true
                })}/>
              </div>
            </div>
          </div>
      </div>
    </div>
  }
}