import {Methods} from '../../common/tools/util';
function generateCirleArray(totalNum){
  let tempArray = (new Array(totalNum)).fill({
    x: 0,
    y: 0
  });
  return tempArray.map((item, index) => ({
    x: `${Math.floor(Math.random() * 100)}%`,
    y: `${Math.floor(Math.random() * 100)}%`
  })
  );
}
export const InitialState = {
  org1: [],
	org2: [],
	org3: [],
  org4: [],
  org1Name: "猪八戒网",
	org2Name: "全部",
	org3Name: "全部",
	org4Name: "全部",
	org1Id: "100000",
	org2Id: "-1",
	org3Id: "-1",
	org4Id: "-1",
	orgLevel: 1,
  orgId: 100000,
  ytd: "normal",
	monthId: Methods.getMonth(),
  yearId: Methods.getYear(),
  exameTab: {
    month: 0,
    season: 0
  },
  joinExameTab: {
    month: 0,
    season: 0
  },
  indexCompleteTab: 0,
  indexAvgCompleteTab: 0,
  staff: {
    data: [],
		xLabel: [],
		loading: false
  },
  // quitStaff: {
  //   "data":[[5.24,4.53,12.41,65.41,12.41]],
  //   "xLabels":["60分以下","60-70分","70-80分","80-90分","90-100分"],
  //   loading: true
  // },
  quitStaff: {
    data: [],
		xLabel: [],
		loading: false
  },
  nineBox: {
    hl: [],
    hm: [],
    hh: [],
    ml: [],
    mm: [],
    mh: [],
    ll: [],
    lm: [],
    lh: []
  },
  originCompare:{ 
    data: [],
    xLabels: [],
    name: [],
		loading: false
  },
  orgCompare:{ 
    data: [],
    xLabels: [],
    name: [],
		loading: false
  },
  originQuiteStaffCompare: {
    data: [],
    xLabels: [],
    name: [],
		loading: false
  },
  orgQuitStaffCompare: {
    data: [],
    xLabels: [],
    name: [],
		loading: false
  },
  indexCompleteRate: {
    data: [],
		xLabel: [],
		loading: false
  }
  // indexCompleteRate: {
  //   loading: true,
  //   "data":[[20, 30, 50],
  //   [20, 40, 50],
  //   [20, 45, 50]],
  //   "xLabels":["A","B","C"],
  //   "name":["下级组织业务指标达成率","下级组织员工业务指标平均完成率","一级组织下员工业务指标完成率"]}
};
export const PathInfo = {
  org: "erp/memu/getHrOrg",
  exameTab: "erp/achievement/selectAssessmentNum",
  joinExameTab: "erp/achievement/selectAssessmentRate",
  indexCompleteTab: "erp/achievement/slecetDepartmentRate",
  indexAvgCompleteTab: "erp/achievement/selectStaffRate",
  staff: "erp/achievement/selectAchievement",
  quitStaff: "erp/achievement/selectLossInfo",
  nineBox: "erp/achievement/selectMatrix",
  orgCompare: "erp/achievement/selcetJXCompared",
  orgQuitStaffCompare: "erp/achievement/selectLossCompared",
  indexCompleteRate: "erp/achievement/selectAssessCompared"
};