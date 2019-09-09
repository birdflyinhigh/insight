import React, {Component} from 'react';
import {DatePicker} from 'antd';
import moment from 'moment';
import Help from '../../../../common/component/Help';
const {MonthPicker} = DatePicker;
function hasItem(regionId, data, provinceId){
  let strRegionId = regionId + "";
  let strProvinceId = provinceId === -1 ? `${regionId}-province` : provinceId + "";
  let filterItem = data.filter((item) => (item.regionId + "") === strRegionId);
  if(provinceId !== undefined){
    for(let i = 0; i < filterItem.length; i++){
      const itemRegionId = filterItem[i].regionId + "";
      const itemProvinceId = filterItem[i].provinceId + "";
      if(itemProvinceId === strProvinceId && strRegionId === itemRegionId){
        return true;
      }
    }
  }else{
    return filterItem.length > 0;
  }
}
export default class Header extends Component{
  constructor(props){
    super(props);
    this.state = {
      headerTop: 0
    }
    this.infoText = "因ERP核算暂未实现T+1，仪表盘目前展示管报数据截止时间为当前时间的5天前，2019年5月31日（预计）ERP核算实现T+1之后，仪表盘营收数据将同步实现T+1；"
  }
  componentDidMount(){
    // window.addEventListener('scroll', this.handleScroll); 
  }
  componentWillUnmount(){
    // window.removeEventListener('scroll', this.handleScroll);
  }
  // handleScroll = (e) => {
  //    let scrollTop = window.scrollY;
  //     if(scrollTop < 75){
  //       scrollTop = 0;
  //     }else{
  //       scrollTop = scrollTop - 75;
  //     }
  //     requestAnimationFrame(() => {
  //       this.setState({
  //         headerTop: scrollTop
  //       })
  //     });
  // }
  chooseDate = (date, dateString) => {
    this.props.fns.chooseDate(dateString);
  }
  chooseProduct(productId){
    this.props.fns.chooseProduct(productId);
  }
  chooseType(typeId){
    this.props.fns.chooseType(typeId);
  }
  chooseProvince = (areaObj) => () => {
    this.props.fns.chooseProvince(areaObj);
  }
  deleteArea = (deleteObj) => () => {
    this.props.fns.deleteArea(deleteObj);
  }
  queryData = () => {
    this.props.fns.queryData();
  }
  render(){
    // console.log('props', this.props.productId)
    // let transform = {
    //   transform: `translateY(${this.state.headerTop}px)`
    // };
    return <div className="hr-header" style={{paddingLeft: 0}}>
      <div className="cmanage-hwrapper">
        <div className="cmanageh-item">
          <div className="dashh-title">时间:
          </div>
          <MonthPicker value={moment(this.props.monthDate)}
          allowClear={false}
          disabledDate={(currentDate) => currentDate > moment()}
          onChange={this.chooseDate}
          />
          <Help info={this.infoText} />
        </div>
        <div className="cmanageh-item">
          <i className="dashh-title">产品:</i>
          <ul className="cmh-list">
            {/* <li className="active"
            className={this.props.productId.indexOf(-1) > -1 ? "active": ""}
            onClick={this.chooseProduct.bind(this, -1)}>全部产品</li> */}
            {this.props.productList.map((item, index) =>
              <li 
              key={index}
              className={this.props.productId.indexOf(item.id) > -1 ? "active": ""}
              onClick={this.chooseProduct.bind(this, item.id)}
              >{item.name}</li>
              )}
          </ul>
        </div>
        <div className="cmanageh-item">
          <i className="dashh-title">类型:</i>
          <ul className="cmh-list">
            <li
            className={this.props.typeId === -1 ? "active": ""}
            onClick={this.chooseType.bind(this, -1)}>全部类型</li>
            {this.props.typeList.map((item, index) =>
              <li 
              key={index}
              className={this.props.typeId === item.id ? "active": ""}
              onClick={this.chooseType.bind(this, item.id)}
              >{item.name}</li>
              )}
          </ul>
        </div>
        <div className="cmanageh-item">
          <i className="dashh-title">大区:</i>
          <div className="area-wrapper">
            <div className="area-choose-item">
              {this.props.areaInfo.map((item, index) =>
              <b 
              key={index}
              onClick={this.deleteArea(item)}
              >{item.regionName + (item.provinceName ? ("-" + item.provinceName) : "")}</b>
                )}
            </div>
            <ul className="cmh-list">
              <li 
              className = {hasItem(-1, this.props.areaInfo)  ? "active": ""}
              onClick={this.chooseProvince({
                regionName: "全部大区",
                regionId: -1,
                provinceName: "",
                provinceId: -1
              })} 
              >全部大区</li>
              <li 
              className = {hasItem("all", this.props.areaInfo)  ? "active": ""}
              onClick={this.chooseProvince({
                regionName: "全部省份",
                regionId: "all",
                provinceName: "",
                provinceId: -1
              })} 
              >全部省份</li>
              {this.props.regionList.map((item, index) => 
                item.nosec ? <li 
                key={index} 
                className = {hasItem(item.id, this.props.areaInfo)  ? "active": ""}
                onClick={this.chooseProvince({
                  regionName: item.name,
                  regionId: item.id + "",
                  provinceName: "",
                  provinceId: -1,
                  reEnName: ""
                })}
                >{item.name}</li> : <li 
                key={index}
                className = {hasItem(item.id, this.props.areaInfo)  ? "active": ""}
                >
                  <b>{item.name}</b>
                  <div className="cmh-seclist">
                    <ul>
                      {/* <li 
                      className = {hasItem(item.id, this.props.areaInfo, `${item.id}all`) ? "active" : ""}
                      onClick={this.chooseProvince({
                        regionName: item.name,
                        regionId: item.id + "",
                        provinceName: "大区整体",
                        provinceId: `${item.id}-all`,
                        reEnName: item.enName
                      })}
                      >
                      大区整体</li> */}
                      {/* <li 
                      onClick={this.chooseProvince({
                        regionName: item.name,
                        regionId: item.id + "",
                        provinceName: "全部省份",
                        provinceId: `${item.id}-province`,
                        reEnName: item.enName
                      })}
                      className = {hasItem(item.id, this.props.areaInfo, -1) ? "active" : ""}
                      >
                      全部省份</li> */}
                      {/* <br/> */}
                      {this.props[item.enName].map((province, pindex) =>
                        <li 
                        key={pindex}
                        className={hasItem(item.id, this.props.areaInfo, province.id)  ? "active" : ""}
                        onClick={this.chooseProvince({
                          regionName: item.name,
                          regionId: item.id + "",
                          provinceName: province.name,
                          provinceId: province.id === -1 ? `${item.id}-province` : province.id + "",
                          reEnName: item.enName
                        })}>{province.name}</li> 
                      )}
                    </ul>
                  </div>
                </li>
                )}
            </ul>
          </div>
        </div>
        <div style={{textAlign: "center"}} onClick={this.queryData.bind(this)}>
        <div className="hrquery-btn">
          <a>查询</a>
        </div>
      </div>                
      </div>
    </div>
  }
}