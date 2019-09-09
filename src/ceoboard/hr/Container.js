import React, {Component} from 'react';
import {CommonMethod} from '../../common/tools/common';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import HrMain from './Component';
import {BaseUiAct, XhrAct, XhrName} from './action';
import {PathInfo} from './constant';

function mapStateToProps(state){
  return {...state.statetree.ceoHr};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    sendRequest: CommonMethod.sendRequest,
    ...BaseUiAct
    }, dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class CeoHr extends Component{
  constructor(props){
    super(props);
    this.queryParams = {
			orgLevel: this.props.orgLevel, 
			year: this.props.location.state && this.props.location.state.year ? this.props.location.state.year : this.props.yearId,
			month: this.props.location.state && this.props.location.state.month ? this.props.location.state.month : this.props.monthId,
			orgID: this.props.orgId
		};
		this.tempObj = {
			org1Name: this.props.org1Name,
			org2Name: this.props.org2Name,
			org3Name: this.props.org3Name,
			org4Name: this.props.org4Name,
		};
  }
  componentDidMount(){
    this.props.sendRequest({
			actionName: "org1",
			path: PathInfo.org,
			params: {
				prentOrgLevel: -1,
				prentOrgID: -1,
				state: 1
			},
			actions: XhrAct
		});
		this.props.sendRequest({
			actionName: "org2",
			path: PathInfo.org,
			params: {
				prentOrgLevel: 1,
				prentOrgID: 100000,
				state: 1
			},
			actions: XhrAct
    });
    XhrName.forEach((item, index) => {
      if(index < 4) return ;
      this.props.sendRequest({
        actionName: item,
        path: PathInfo[item],
        params: this.queryParams,
        actions: XhrAct
      });
    })
  }
  jumpSecondPage(){
    this.props.history.push("/secmanager/ihr", {
      // year: this.queryParams.year,
      // month: this.queryParams.month,
      // orgLevel: this.queryParams.orgLevel,
			// orgID: this.queryParams.orgID,
    });
	}
  selectFirstOrg(value){
		this.props.selectOrg1(value);
		this.props.selectLevel({
			orgId: value,
      orgLevel: 1,
      orgLevel: this.queryParams.orgLevel,
			orgID: this.queryParams.orgID,
		});
	}
	selectSecondOrg(value){
		this.props.selectOrg2(value);
		this.props.selectLevel({
			orgId: value == -1 ? this.props.org1Id : value,
			orgLevel: value == -1 ?  1 : 2
		});
		this.props.sendRequest({
			actionName: "org3",
			path: PathInfo.org,
			params: {
				prentOrgLevel: 2,
				prentOrgID: value,
				state: 1
			},
			actions: XhrAct
		});
		this.props.sendRequest({
			actionName: "org4",
			path: PathInfo.org,
			params: {
				prentOrgLevel: 3,
				prentOrgID: -1,
				state: 1
			},
			actions: XhrAct
		});
	}
	selectThirdOrg(value){
		this.props.selectOrg3(value);
		this.props.selectLevel({
			orgId: value == -1 ? this.props.org2Id : value,
			orgLevel: value == -1 ?  2 : 3
		});
		this.props.sendRequest({
			actionName: "org4",
			path: PathInfo.org,
			params: {
				prentOrgLevel: 3,
				prentOrgID: value,
				state: 1
			},
			actions: XhrAct
		});
		
	}
	selectForthOrg(value){
		this.props.selectOrg4(value);
		this.props.selectLevel({
			orgId: value == -1 ? this.props.org3Id : value,
			orgLevel: value == -1 ?  3 : 4
		});
	}
	selectYear(value){
		this.props.selectYear(value);
	}
	selectMonth(value){
		this.props.selectMonth(value);
	}
  queryData(){
		this.queryParams.year = this.props.yearId;
		this.queryParams.month = this.props.monthId;
		this.queryParams.orgID = this.props.orgId;
    this.queryParams.orgLevel = this.props.orgLevel;
    XhrName.forEach((item, index) => {
      if(index < 4) return ;
      this.props.sendRequest({
        actionName: item,
        path: PathInfo[item],
        params: this.queryParams,
        actions: XhrAct
      });
    });
	}
  render(){
    let fns = {
			selectFirstOrg: this.selectFirstOrg.bind(this), 
			selectSecondOrg: this.selectSecondOrg.bind(this), 
			selectThirdOrg: this.selectThirdOrg.bind(this), 
			selectForthOrg: this.selectForthOrg.bind(this), 
			selectYear: this.selectYear.bind(this), 
			selectMonth: this.selectMonth.bind(this),
			queryData: this.queryData.bind(this)
    };
    return <HrMain {...this.props} fns={fns} jumpSecondPage={this.jumpSecondPage.bind(this)}/>
  }
}