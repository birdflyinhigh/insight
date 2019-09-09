import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CommonMethod} from '../../../common/tools/common';
import {ComptUtils} from '../../../common/tools/util';
import Header from './component/header';
import MainContent from './component/MainContent';
import {PathInfo, RegionList} from './constant';
import {CmanageUiAct, CmanageXhrAct, CmanageHeaderActName, CmanageXhrActName} from './action';
import './cmanage.css';
function mapStateToProps(state){
  return {...state.statetree.dashcmanage}
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(Object.assign(
    {sendRequest: CommonMethod.sendRequest}, 
    CmanageUiAct
  ), dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
class CManage extends Component{
  constructor(props){
    super(props);
    this.queryParams = {
      time: ComptUtils.getLocationProps(this.props, "monthDate"),
      product: ComptUtils.getLocationProps(this.props, "productId"),
      type: props.typeId,
      area: props.location.state && props.location.state.regionId !== undefined ? props.location.state.regionId : props.areaInfo[0].regionId,
      // 查询单个大区，可使用-1，多个大区联合查询，必须获取所有省份id
      province: props.areaInfo[0].provinceId,
      target: ComptUtils.getLocationProps(this.props, "target"),
      option: "product",
      allprovince: ""
    };
  }
  componentDidMount(){
    window.scrollTo(0, 0);
    if(this.props.location.state){
      this.props.clearArea({
        regionId: this.queryParams.area,
        regionName: this.props.location.state.regionName,
        provinceId: -1,
        provinceName: "",
      });
      this.props.chooseTarget({
        key: this.queryParams.target, 
        value: ComptUtils.getLocationProps(this.props, "targetName")
      });
      this.props.chooseDate(this.queryParams.time);
      this.props.clearProduct(this.queryParams.product);
    }
    this.queryParams.product = this.queryParams.product.join(",");
    // 可把请求提到index中去，从index传递数据过来；
    // 如果有-1的情况，根据id匹配到省份，拿取所有省份
    
    this.sendHeaderRequest();
    this.sendBodyRequest();
  }
  sendHeaderRequest = () => {
    this.props.sendRequest({
      actionName: "productList",
      path: PathInfo.productList,
      params: {
        module: "income"
      },
      actions: CmanageXhrAct
    });
    this.props.sendRequest({
      actionName: "typeList",
      path: PathInfo.typeList,
      params: {},
      actions: CmanageXhrAct
    });
    this.props.sendRequest({
      actionName: "regionList",
      path: PathInfo.regionList,
      params: {},
      actions: CmanageXhrAct
    }, (data) => {
      // 获取所有的regionId,来进行过滤
      data.data.forEach((item, index, array) => {
        let getRegionActName = RegionList.find((indexItem) => indexItem.name === item.name);
        if(getRegionActName && !getRegionActName.nosec){
          let regionActName = getRegionActName.enName;
          this.props.sendRequest({
            actionName: regionActName,
            path: PathInfo.provinceList,
            params: {
              area: item.id
            },
            actions: CmanageXhrAct
          });
        }
      });
    });
  }
  sendBodyRequest = () =>{
    CmanageXhrActName.forEach((item, index) => {
      this.props.sendRequest({
        actionName: item,
        path: PathInfo[item],
        params: this.queryParams,
        actions: CmanageXhrAct
      });
    });
  }
  queryData = () => {
    let regionIds = [];
    let provinceIds = [];
    let allProParams = [];
    console.log(this.props.areaInfo);
    this.props.areaInfo.forEach((item) => {
      regionIds.push(item.regionId);
      const provinceId = item.provinceId + "";
      // 排除从上一届到下一级的-1问题
      const isAll = item.regionId === -1 || (item.regionId + "").indexOf("all") > -1 || +item.regionId === 0;
      if(provinceId.indexOf("-1") > -1 && !isAll){
        // find ids
        let findIdItem = this.props.regionList.find((regionItem) =>  regionItem.id === item.regionId);
        this.props[findIdItem.enName].forEach((item) => {
          // 排除全部省份id -1
          if(item.id !== -1){
            provinceIds.push(item.id);
          }
        });
      }else if(provinceId.indexOf("-all") > -1 || provinceId.indexOf("-province") > -1){
        allProParams.push(provinceId);
        this.props[item.reEnName].forEach((item) => {
          if(item.id !== -1){
            provinceIds.push(item.id)
          }
        });
      }else{
        provinceIds.push(item.provinceId);
      }
    });
    const uniqueRegionIds = [...(new Set(regionIds))];
    const uniqueProvinceIds = [...(new Set(provinceIds))];
    this.queryParams.area = uniqueRegionIds.join(",");
    this.queryParams.province = uniqueProvinceIds.join(",");
    this.queryParams.allprovince = allProParams.join(",");
    this.queryParams.product = this.props.productId.join(",");
    this.queryParams.type = this.props.typeId;
    this.queryParams.time = this.props.monthDate;
    console.log(this.queryParams);
    this.sendBodyRequest();
  }
  chooseDate = (dateObj) => {
    this.props.chooseDate(dateObj);
  }
  chooseProduct = (proId) => {
    this.props.chooseProduct(proId);
  }
  chooseType = (typeId) => {
    this.props.chooseType(typeId);
  }
  chooseProvince = (areaObj) => {
    this.props.chooseProvince(areaObj);
  }
  deleteArea = (areaObj) => {
    this.props.deleteArea(areaObj)
  }
  changeTab = (typeObj) => {
    this.queryParams.target = typeObj.key;
    this.props.chooseTarget(typeObj);
    this.sendBodyRequest();
  }
  chooseRankType = (type) => {
    this.queryParams.option = type;
    this.props.sendRequest({
      actionName: "productRank",
      path: PathInfo.productRank,
      params: this.queryParams,
      actions: CmanageXhrAct
    });
  }
  render(){
    let headerData = {
      monthDate: this.props.monthDate,
      productId: this.props.productId,
      typeId: this.props.typeId,
      areaInfo: this.props.areaInfo,
      productList: this.props.productList,
      typeList: this.props.typeList,
      regionList: this.props.regionList,
      hdList: this.props.hdList,
      hnList: this.props.hnList,
      hxList: this.props.hxList,
      hbList: this.props.hbList,
      hzList: this.props.hzList,
      cyList: this.props.cyList,
      bjList: this.props.bjList
    };
    let headerFns = {
      chooseDate: this.chooseDate,
      chooseProduct: this.chooseProduct,
      chooseType: this.chooseType,
      chooseProvince: this.chooseProvince,
      deleteArea: this.deleteArea,
      queryData: this.queryData
    }
    let bodyFns ={
      changeTab: this.changeTab,
      chooseRankType: this.chooseRankType,
    }
    return <div className="hr-bg cmanage">
    <div className="hr-container dash-container">
      <h1 className="erp-pagetitle">
        <Link to="/manager/index" style={{fontSize: 14}}>返回上级页面</Link>	
        管报矩阵
      </h1>
      <Header {...headerData} fns={headerFns}/>
      <MainContent {...this.props} fns={bodyFns}/>
    </div>
    </div>
  }
}
export default CManage;