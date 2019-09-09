import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Header from './header';
import PerformanceBody from './Component';
import {PathInfo} from './constant';
import {CommonMethod} from '../../common/tools/common';
import {Methods} from '../../common/tools/util';
import {perManageXhrActName, perManageXhrAct, perManageUiAct} from '../action';

function mapStateToProps(state){
  return {...state.statetree.hrperManage};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(Object.assign({sendRequest: CommonMethod.sendRequest}, {...perManageUiAct}), dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class HrBase extends Component{
  constructor(props){
    super(props);
    this.queryParams = {
			orgLevel: this.props.orgLevel, 
			year: this.props.yearId,
			month: this.props.monthId,
			orgID: this.props.orgId,
			index: this.props.ytd
		};
	}
	componentDidMount(){
		let {sendRequest} = this.props;
		if(this.props.org1.length > 0){
			return; 
		}
		sendRequest({
			actionName: "org1",
			path: PathInfo.org,
			params: {
				prentOrgLevel: -1,
        prentOrgID: -1
			},
			actions: perManageXhrAct
		});
		sendRequest({
			actionName: "org2",
			path: PathInfo.org,
			params: {
				prentOrgLevel: 1,
        prentOrgID: 100000
			},
			actions: perManageXhrAct
		});
		perManageXhrActName.forEach((item, index) => {
			if(index > 3){
				sendRequest({
					actionName: item,
					path: PathInfo[item],
					params: this.queryParams,
					actions: perManageXhrAct
				});
			}
		});
	}
  selectFirstOrg(value){
		this.queryParams.orgLevel = 1;
		this.queryParams.orgID = value;
		this.props.selectOrg1(value);
		this.props.selectLevel({
			orgId: this.queryParams.orgID,
			orgLevel: this.queryParams.orgLevel 
		});
	}
	selectSecondOrg(value){
		this.queryParams.orgLevel = 2;
		this.queryParams.orgID = value;
		if(value == -1){
			this.queryParams.orgLevel = 1;		
			this.queryParams.orgID = this.props.org1Id;
		}
		this.props.sendRequest({
			actionName: "org3",
			path: PathInfo.org,
			params: {
				prentOrgLevel: 2,
        prentOrgID: value
			},
			actions: perManageXhrAct
		});
		this.props.sendRequest({
			actionName: "org4",
			path: PathInfo.org,
			params: {
				prentOrgLevel: 3,
        prentOrgID: -1
			},
			actions: perManageXhrAct
		});
		this.props.selectOrg2(value);
		this.props.selectLevel({
			orgId: this.queryParams.orgID,
			orgLevel: this.queryParams.orgLevel 
		});
	}
	selectThirdOrg(value){
		this.queryParams.orgLevel = 3;
		if(value == -1){
			this.queryParams.orgLevel = 2;
			this.queryParams.orgID = this.props.org2Id;
		}else{
			this.queryParams.orgID = value;
		}	
		this.props.sendRequest({
			actionName: "org4",
			path: PathInfo.org,
			params: {
				prentOrgLevel: 3,
        prentOrgID: value
			},
			actions: perManageXhrAct
		});
		this.props.selectOrg3(value);
		this.props.selectLevel({
			orgId: this.queryParams.orgID,
			orgLevel: this.queryParams.orgLevel 
		});
	}
	selectForthOrg(value){
		this.queryParams.orgLevel = 4;
		if(value == -1){
			this.queryParams.orgLevel = 3;
			this.queryParams.orgID = this.props.org3Id;
		}else{
			this.queryParams.orgID = value;
		}	
		this.props.selectOrg4(value);
		this.props.selectLevel({
			orgId: this.queryParams.orgID,
			orgLevel: this.queryParams.orgLevel 
		});
	}
	selectYear(value){
		this.queryParams.year = value;
		this.props.selectYear(value);
	}
	selectMonth(value){
		this.queryParams.month = value;
		this.props.selectMonth(value);
	}
	selectYTD(value){
		this.queryParams.index = value;
		this.props.selectYTD(value);
  }
	jumpSecondPage(dataObj){
		let temp = {
			org1Name: this.props.org1Name,
			org2Name: this.props.org2Name,
			org3Name: this.props.org3Name,
			org4Name: this.props.org4Name,
			month: this.props.monthId,
			year: this.props.yearId,
			orgLevel: this.queryParams.orgLevel,
			orgID: dataObj.newOrgId ? dataObj.newOrgId : this.queryParams.orgID,
			ytd: this.queryParams.index,
			title: dataObj.title,
			query1: dataObj.query1,
			query1Name: dataObj.query1Name,
			urlName: dataObj.urlName
		};
		if(dataObj.query2 != undefined){
			temp.query2 = dataObj.query2;
			temp.query2Name = dataObj.query2Name;
		}
		if(dataObj.extraText){
			temp.extraText = dataObj.extraText;
		}
		this.props.history.push(dataObj.link, temp);
	} 
	nextStaffCompare(curPage){
    this.props.nextStaffCompare(curPage);
  }
  nextQuitStaffCompare(curPage){
    this.props.nextQuitStaffCompare(curPage);
  }
  queryData(){
		perManageXhrActName.forEach((item, index) => {
			if(index > 3){
				this.props.sendRequest({
					actionName: item,
					path: PathInfo[item],
					params: this.queryParams,
					actions: perManageXhrAct
				});
			}
		});
  }
  render(){
    let hdata = {
			org1: this.props.org1,
			org2: this.props.org2,
			org3: this.props.org3,
			org4: this.props.org4,
			org1Id: this.props.org1Id,
			org2Id: this.props.org2Id,
			org3Id: this.props.org3Id,
			org4Id: this.props.org4Id,
			ytd: this.props.ytd,
			monthId: this.props.monthId,
			yearId: this.props.yearId
		}
		let fns = {
			selectFirstOrg: this.selectFirstOrg.bind(this), 
			selectSecondOrg: this.selectSecondOrg.bind(this), 
			selectThirdOrg: this.selectThirdOrg.bind(this), 
			selectForthOrg: this.selectForthOrg.bind(this), 
			selectYear: this.selectYear.bind(this), 
			selectMonth: this.selectMonth.bind(this),
			selectYTD: this.selectYTD.bind(this),
			queryData: this.queryData.bind(this)
		};
		let bodyFns = {
			jumpSecondPage: this.jumpSecondPage.bind(this),
			nextStaffCompare: this.nextStaffCompare.bind(this),
			nextQuitStaffCompare: this.nextQuitStaffCompare.bind(this)
		}
    return <div className="hr-bg">
      <div className="hr-container">
        <h1 className="erp-pagetitle">绩效管理</h1>
        <Header fns={fns} data={hdata}/>
        <PerformanceBody data={{...this.props}} fns={bodyFns}/>
      </div>
  </div>
  }
}