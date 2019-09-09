import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';
import {notification} from 'antd';

import {ComptUtils} from '../../common/tools/util';
import {CommonMethod} from '../../common/tools/common';
import {PathInfo} from './constant';
import {ZBodyXhrName, ZworkXhrAct, ZworkUiAct} from './action';
import ZworkHeader from '../header/ZworkHeader';
import ZworkBody from './Component';
function mapStateToProps(state){
  return {...state.statetree.dashZwork};
}
function mapDispatchToProps(dispatch){
	return bindActionCreators(Object.assign(
    {sendRequest: CommonMethod.sendRequest},
    ZworkUiAct
  ), dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class DashZwork extends Component{
  constructor(props){
    super(props);
    this.queryParams = {
      date: ComptUtils.getLocationProps(props, "endTime"),
      cityTypeId: -1,
      regionId: ComptUtils.getLocationProps(props, "regionId"),
      provinceId: ComptUtils.getLocationProps(props, "provinceId"),
      cityId: -1,
      communityId: -1,
    };
    // console.log(this.queryParams);
  }
  componentDidMount(){
    if(moment(this.queryParams.date).diff(moment("2018-12-25")) < 0){
      this.queryParams.date = "2018-12-25";
      notification.warn({
        message: '温馨提示',
				description: '您选择的时间小于数据开始时间,已重置',
      });
    }
    console.log(this.queryParams);
    this.props.selectEnd(this.queryParams.date);
    // this.props.selectCityType(this.queryParams.cityTypeId);
    this.props.selectRegion(this.queryParams.regionId);
    this.props.selectProvince(this.queryParams.provinceId);
    this.props.selectCity(this.queryParams.cityId);
    this.props.selectCommunity(this.queryParams.communityId);
    this.sendHeadData(this.queryParams.date);
    ZBodyXhrName.forEach((item, index) => {
      this.props.sendRequest({
        actionName: item,
        path: PathInfo[item],
        params: this.queryParams,
        actions: ZworkXhrAct
      });
    });
  }
  sendHeadData = (date) => {
    // initial use queryParam while click use props, 
    // time should be same with other request
    // this.props.sendRequest({
    //   actionName: "cityType",
    //   path: PathInfo["cityType"],
    //   params: {
    //     date: date
    //   },
    //   actions: ZworkXhrAct
    // });
    this.props.sendRequest({
      actionName: "region",
      path: PathInfo["region"],
      params: {
        date: date
      },
      actions: ZworkXhrAct
    });
    this.props.sendRequest({
      actionName: "province",
      path: PathInfo["province"],
      params: {
        regionId: this.queryParams.regionId,
        date: date
      },
      actions: ZworkXhrAct
    });
    this.props.sendRequest({
      actionName: "city",
      path: PathInfo["city"],
      params: {
        provinceId: this.queryParams.provinceId,
        date: date
      },
      actions: ZworkXhrAct
    });
    this.props.sendRequest({
      actionName: "community",
      path: PathInfo["community"],
      params: {
        cityId: this.queryParams.cityId,
        date: date
      },
      actions: ZworkXhrAct
    });
  }
  selectEnd = (value) => {
    this.props.selectEnd(value);
    this.props.selectCityType(-1);
    this.props.selectRegion(-1);
    this.props.selectProvince(-1);
    this.props.selectCity(-1);
    this.props.selectCommunity(-1);
    this.sendHeadData(value);
  }
  // selectCityType = (value) => {
  //   this.props.selectCityType(value);
  // }
  selectRegion = (value) => {
    this.props.selectRegion(value);
    this.props.selectProvince(-1);
    this.props.selectCity(-1);
    this.props.selectCommunity(-1);
    // endTime changes when click; use props;
    this.props.sendRequest({
      actionName: "province",
      path: PathInfo["province"],
      params: {
        regionId: value,
        date: this.props.endTime
      },
      actions: ZworkXhrAct
    });
    this.props.sendRequest({
      actionName: "city",
      path: PathInfo["city"],
      params: {
        provinceId: -1,
        date: this.props.endTime
      },
      actions: ZworkXhrAct
    });
    this.props.sendRequest({
      actionName: "community",
      path: PathInfo["community"],
      params: {
        cityId: -1,
        date: this.props.endTime
      },
      actions: ZworkXhrAct
    });
  }
  selectProvince = (value) => {
    this.props.selectProvince(value);
    this.props.selectCity(-1);
    this.props.selectCommunity(-1);
    this.props.sendRequest({
      actionName: "city",
      path: PathInfo["city"],
      params: {
        provinceId: value,
        date: this.props.endTime
      },
      actions: ZworkXhrAct
    });
    this.props.sendRequest({
      actionName: "community",
      path: PathInfo["community"],
      params: {
        cityId: -1,
        date: this.props.endTime
      },
      actions: ZworkXhrAct
    });
  }
  selectCity = (value) => {
    this.props.selectCity(value);
    this.props.selectCommunity(-1);
    this.props.sendRequest({
      actionName: "community",
      path: PathInfo["community"],
      params: {
        cityId: value,
        date: this.props.endTime
      },
      actions: ZworkXhrAct
    });
  }
  selectCommunity = (value) => {
    this.props.selectCommunity(value);
  }
  queryData = () => {
    this.queryParams.date = this.props.endTime;
    // this.queryParams.cityTypeId = this.props.cityTypeId;
    this.queryParams.regionId = this.props.regionId;
    this.queryParams.provinceId = this.props.provinceId;
    this.queryParams.cityId = this.props.cityId;
    this.queryParams.communityId = this.props.communityId;
    console.log(this.queryParams);
    ZBodyXhrName.forEach((item, index) => {
      this.props.sendRequest({
        actionName: item,
        path: PathInfo[item],
        params: this.queryParams,
        actions: ZworkXhrAct
      });
    });
  }
  render(){
    let headerData = {
      endTime: this.props.endTime,
      // cityTypeId: this.props.cityTypeId,
      regionId: this.props.regionId,
      provinceId: this.props.provinceId,
      cityId: this.props.cityId,
      communityId: this.props.communityId,
      // cityType: this.props.cityType,
      region: this.props.region,
      province: this.props.province,
      city: this.props.city,
      community: this.props.community,
    };
    let headerFns = {
      selectEnd: this.selectEnd,
      // selectCityType: this.selectCityType,
      selectRegion: this.selectRegion,
      selectProvince: this.selectProvince,
      selectCity: this.selectCity,
      selectCommunity: this.selectCommunity,
      queryData: this.queryData,
    }
    return <div className="hr-bg dashzwork">
    <div className="dash-container">
      <h1 className="dash-pagetitle">
      <Link to="/manager/index" style={{fontSize: 18, color: "#5888f4"}}>总经理仪表盘&nbsp;>&nbsp;</Link>	
      八戒工场分析
      </h1>
      <ZworkHeader data={headerData} fns={headerFns}/>
      <ZworkBody data={this.props}/>
    </div>
  </div>
  }
}