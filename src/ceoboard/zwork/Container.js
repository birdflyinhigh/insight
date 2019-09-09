import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CommonMethod } from '../../common/tools/common';
import ZworkMain from './Component';
import { PathInfo } from './constant';
import { BodyXhrName, ZworkXhrAct, ZworkUiAct } from './action';

function mapStateToProps(state) {
  return {
    ...state.statetree.ceoZwork
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    sendRequest: CommonMethod.sendRequest,
    ...ZworkUiAct
  }, dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class CeoZwork extends Component {
  constructor(props) {
    super(props);
    this.queryParams = {
      regionId: this.props.regionId,
      provinceId: this.props.provinceId,
      cityId: this.props.cityId,
      communityId: this.props.communityId,
      date: moment().subtract(1, 'days').format('YYYY-MM-DD'),
    };
    this.selectParams = {
      newSignStation: moment().subtract(1, 'days').format('YYYY-MM-DD'),
      receiptSituation: "month"
    };
    // this.specialParams={
    //   regionId: this.props.regionId,
    //   provinceId: this.props.provinceId,
    //   cityId: this.props.cityId,
    //   communityId: this.props.communityId,
    //   startTime: moment().subtract(1, 'days').format('YYYY-MM-DD'),
    //   endTime: moment().subtract(1, 'days').format('YYYY-MM-DD')
    // }
  }
  componentDidMount() {
    this.props.sendRequest({
      actionName: "region",
      path: PathInfo.region,
      params: {
        date: this.queryParams.date
      },
      actions: ZworkXhrAct
    });
    this.sendRequest.bind(this)();
  }
  sendRequest() {
    // BodyXhrName.forEach((item, index) => {
    //   if(item === "newSignStation" || item === "receiptSituation"){
    //     this.props.sendRequest({
    //       actionName: item,
    //       path: PathInfo[item],
    //       params: this.queryParams,
    //       actions: ZworkXhrAct
    //     });
    //   }else{
    //     this.props.sendRequest({
    //       actionName: item,
    //       path: PathInfo[item],
    //       params: {
    //         target: this.selectParams[item],
    //         ...this.queryParams
    //       },
    //       actions: ZworkXhrAct
    //     });
    //   }
    //   });
    BodyXhrName.forEach((item, index) => {
      if (item === "newSignStation") {
        this.props.sendRequest({
          actionName: item,
          path: PathInfo[item],
          params: {
            ...this.queryParams,
            // target: this.selectParams[item],
            startTime: this.selectParams.newSignStation,
            endTime: this.selectParams.newSignStation,
          },
          actions: ZworkXhrAct
        });
      } else {
        this.props.sendRequest({
          actionName: item,
          path: PathInfo[item],
          params: {
            ...this.queryParams,
            target: this.selectParams[item],
          },
          actions: ZworkXhrAct
        });
      }
    });

  }
  selectRegion = (value) => {
    this.props.selectRegion(value);
    this.props.selectProvince(-1);
    this.props.selectCity(-1);
    this.props.selectCommunity(-1);
    // date changes when click; use props;
    this.props.sendRequest({
      actionName: "province",
      path: PathInfo["province"],
      params: {
        regionId: value,
        date: this.queryParams.date
      },
      actions: ZworkXhrAct
    });
    this.props.sendRequest({
      actionName: "city",
      path: PathInfo["city"],
      params: {
        provinceId: -1,
        date: this.queryParams.date
      },
      actions: ZworkXhrAct
    });
    this.props.sendRequest({
      actionName: "community",
      path: PathInfo["community"],
      params: {
        cityId: -1,
        date: this.queryParams.date
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
        date: this.queryParams.date
      },
      actions: ZworkXhrAct
    });
    this.props.sendRequest({
      actionName: "community",
      path: PathInfo["community"],
      params: {
        cityId: -1,
        date: this.queryParams.date
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
        date: this.queryParams.date
      },
      actions: ZworkXhrAct
    });
  }
  selectCommunity = (value) => {
    this.props.selectCommunity(value);
  }
  chooseTime(value) {
    console.log(value);
    // this.selectParams.newSignStation = value;
    this.props.sendRequest({
      actionName: "newSignStation",
      path: PathInfo.newSignStation,
      params: {
        ...this.queryParams,
        // target: value,
        startTime:value,
        endTime:this.selectParams.newSignStation
      },
      actions: ZworkXhrAct
    });
  }
  recieptTime(value) {
    this.selectParams.receiptSituation = value;
    this.props.sendRequest({
      actionName: "receiptSituation",
      path: PathInfo.receiptSituation,
      params: {
        target: value,
        ...this.queryParams
      },
      actions: ZworkXhrAct
    });
  }
  queryData = () => {
    this.queryParams.regionId = this.props.regionId;
    this.queryParams.provinceId = this.props.provinceId;
    this.queryParams.cityId = this.props.cityId;
    this.queryParams.communityId = this.props.communityId;
    this.sendRequest.bind(this)();
  }
  render() {
    const headerFns = {
      selectRegion: this.selectRegion,
      selectProvince: this.selectProvince,
      selectCity: this.selectCity,
      selectCommunity: this.selectCommunity,
      queryData: this.queryData,
    };
    const bodyFns = {
      chooseTime: this.chooseTime.bind(this),
      recieptTime: this.recieptTime.bind(this)
    };
    return <ZworkMain {...this.props}
      fns={headerFns}
      bodyFns={bodyFns}
    />
  }
}