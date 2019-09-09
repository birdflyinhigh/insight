import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {notification} from 'antd';
import {CommonMethod} from '../../common/tools/common';
import AuthContent from './Component';
import {XhrAct} from './action';
import {PathInfo, RegionList} from './constant';
function mapStateToProps(state){
  return {...state.statetree.ceoAuth}
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    sendRequest: CommonMethod.sendRequest,
    postRequest: CommonMethod.postRequest,
    onlysendRequest: CommonMethod.onlysendRequest
  }, dispatch)
}
@connect(mapStateToProps, mapDispatchToProps)
export default class ceoAuth extends Component{
  constructor(props){
    super(props);
    this.queryParams = {
      userId: "",
      userName: "",
      moduleId: "",
      module: "",
      moduleName: "",
      roleId: "",
      role: "",
      roleName: "",
      areaId: "",
      areaName: "",
      provinceId: "",
      provinceName: "",
      productId: "",
      productName: ""
    }
  }
  componentDidMount(){
    this.props.sendRequest({
      actionName: "productList",
      path: PathInfo.productList,
      params: {},
      actions: XhrAct
    });
    this.props.sendRequest({
      actionName: "regionList",
      path: PathInfo.regionList,
      params: {},
      actions: XhrAct
    }, (data) => {
      const regionInfo = data.data;
      regionInfo.forEach((item) => {
        const curItem = RegionList.filter((region) => region.name === item.name);
        if(curItem.length){
          this.props.sendRequest({
            actionName: curItem[0].enName,
            path: PathInfo.provinceList,
            params: {
              area: item.id
            },
            actions: XhrAct
          });
        }
      })
    });
    this.props.sendRequest({
      actionName: "module",
      path: PathInfo.module,
      params: {},
      actions: XhrAct
    });
    this.props.sendRequest({
      actionName: "roles",
      path: PathInfo.roles,
      params: {},
      actions: XhrAct
    });
    this.props.sendRequest({
      actionName: "authList",
      path: PathInfo.authList,
      params: {},
      actions: XhrAct
    });
  }
  inputUserName = (value) => {
    this.queryParams.userName = value;
  }
  inputUserId = (value) => {
    this.queryParams.userId = +value;
  }
  chooseRole = (key, id, name) => {
    this.queryParams.role = key; 
    this.queryParams.roleId = id; 
    this.queryParams.roleName = name; 
  }
  insertRecord = () => {
    this.props.postRequest({
      path: PathInfo.insert,
      params: this.queryParams,
      successFn: () => {
         this.props.sendRequest({
          actionName: "authList",
          path: PathInfo.authList,
          params: {},
          actions: XhrAct
        });
        notification.success({ 
          message: '成功',
          description: "成功添加"
        });
      },
      failFn: () => {
        notification.error({ 
          message: '失败',
          description: "重新添加"
        });
      }
    });
  }
  submitUser = (paramObj) => {
    this.queryParams.moduleId = paramObj.moduleId.join(",");
    this.queryParams.module = paramObj.module.join(",");
    this.queryParams.moduleName = paramObj.moduleName.join(",");
    this.queryParams.productId = paramObj.productId.join(",");
    this.queryParams.productName = paramObj.productName.join(",");
    this.queryParams.areaId = paramObj.areaId.join(",");
    this.queryParams.areaName = paramObj.areaName.join(",");
    this.queryParams.provinceName = paramObj.provinceName.join(",");
    this.queryParams.provinceId = paramObj.provinceId.join(",");
    this.insertRecord();
  }
  deleteUser = (record) => {
    this.props.sendRequest({
      actionName: "deleteList",
      path: PathInfo.delete,
      params: {
        userId: record.id
      },
      actions: XhrAct
    }, () => {
      notification.success({ 
        message: '成功',
        description: "删除成功"
      });
    });
    // this.props.deleteList(record.id);
  }
  render(){
    const fns = {
      inputUserName: this.inputUserName,
      inputUserId: this.inputUserId, 
      chooseRole: this.chooseRole,
      submitUser: this.submitUser,
      deleteUser: this.deleteUser
    }
    return <AuthContent {...this.props} fns={fns}/>
  }
}